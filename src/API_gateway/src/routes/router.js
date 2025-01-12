const express = require("express");
var expressLayouts=require("express-ejs-layouts"); // add this requirement
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const { get } = require("http");
const axios = require("axios");
const { log } = require("console");
const router = express.Router();

router.use(expressLayouts); // add this use()
// This is to get POST requests working. We want to parse 
// request bodies, so that we can use their parameters.
//Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));

// fake db
const users = [{username: "pipo", password: "man"}];
const web_nombre = "El Portal del Saltamundos"
const JWT_SECRET = process.env.JWT_SECRET;

const IP_OLLAMA = 'chat-webui:8080'
const IP_WIKI = 'app:8000'
const IP_MAPA = 'map-neo:3030'
const base_url = "http://"

// cookies
router.use(cookieParser());

// main page
router.get("/", async function (req, res) {
    // Render the index template with the variable `name`.
    res.render('index', { portal: web_nombre});
});

// register
router.post("/register", async function (req, res) {
    const { username, password } = req.body;

    try {
        const newUser = await axios.post(`${base_url}${IP_WIKI}/user`, {
            name: username,
            password: password
        });
        // JWT token
        const token = jwt.sign({ username: newUser.data.name, id: newUser.data.id }, JWT_SECRET);

        // cookies
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Cambia según el entorno
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Configuración CORS
            maxAge: 3600000, // 1h
        });

        res.status(201).json({ message: "Usuario registrado con éxito" });

    } catch (error) {
        // Manejar errores del microservicio
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : 'Internal Server Error';
        res.status(status).json({ error: message });
    }

});

// login
router.post("/login", async function (req, res) {
    const { username, password } = req.body;

    const user = await axios.get(`${base_url}${IP_WIKI}/user/${username}`);
    // const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).send("Usuario no encontrado");
    }

    // check pass
    const validPassword = password === user.data.password
    if (!validPassword) {
        return res.status(401).send("Contraseña incorrecta");
    }

    // JWT token
    const token = jwt.sign({ id: user.data.id, username: user.data.name }, JWT_SECRET, {
        expiresIn: "1h",
    });

    // cookies
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Cambia según el entorno
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Configuración CORS
        maxAge: 3600000, // 1h
    });

    // res.json({ message: "Inicio de sesión exitoso" });
    res.redirect('/map');
});

router.get("/map", authenticateToken, async (req, res) => {
    const cosmerePlanets = await axios.get(`${base_url}${IP_MAPA}/mapa/planetas_api`);
    res.render('map', { user_name: req.user.username, elements: cosmerePlanets.data});
});

router.get("/characters", authenticateToken, async (req, res) => {
    const characters = await axios.get(`${base_url}${IP_WIKI}/allchars`);
    
    res.render('characters', { user_name: req.user.username, planet_name: "Scadrial", elements: characters.data});
});

router.get("/characters/:planet", authenticateToken, async (req, res) => {
    const planet = req.params.planet;
    try {
        // Intenta hacer la solicitud a la API
        const characters = await axios.get(`${base_url}${IP_WIKI}/chars/${planet}`);

        res.render('characters', { user_name: req.user.username, planet_name: planet, elements: characters.data});
    } catch (error) {
        // Maneja los errores de Axios
        if (error.response && error.response.status === 404) {
            // Si es un error 404, responde con un mensaje adecuado
            return res.status(404).send("No hay personajes en este planeta");
        }

        // Maneja otros errores
        console.error("Error al obtener los personajes:", error.message);
        return res.status(500).send("Hubo un error al procesar la solicitud");
    }
});

router.get("/char/:id", authenticateToken, async (req, res) => {
    const characterId = req.params.id;
    const character = await axios.get(`${base_url}${IP_WIKI}/char/${characterId}`);
    res.render('char_detail', { char: character.data});
});

router.get("/vinculacanas/:id", authenticateToken, async (req, res) => {
    const characterId = req.params.id;

    const characterResponse = await axios.get(`${base_url}${IP_WIKI}/char/${characterId}`);
    const character = characterResponse.data;

    res.render('vinculacanas', { char: character,  chatHistory: []});
});

router.post("/add_entry/:id", authenticateToken, async (req, res) => {
    try {
        const { question, chatHistory: previousHistory} = req.body;
        const characterId = req.params.id;

        const characterResponse = await axios.get(`${base_url}${IP_WIKI}/char/${characterId}`);
        const character = characterResponse.data;

        const chatbotResponse = await axios.get(`${base_url}${IP_OLLAMA}/query/${character.name}/${character.personality}/${question}`);
        // console.log(chatbotResponse)
        var chatHistory = []
        if (typeof previousHistory === "string") {
            try {
                chatHistory = JSON.parse(previousHistory); // Parsear solo si es una cadena JSON
            } catch (err) {
                console.error("Error al parsear previousHistory:", err.message);
            }
        } else if (Array.isArray(previousHistory)) {
            chatHistory = previousHistory; // Ya es un array
        } else {
            console.warn("Formato inesperado para previousHistory:", previousHistory);
        }
        console.log(chatHistory)
        chatbotResponse.data.forEach(([type, content]) => {
            chatHistory.push({ type, content });
        });

        res.render('vinculacanas', { char: character, chatHistory: chatHistory});
    } catch (error) {
        console.error("Error al procesar la entrada:", error.message);
        res.status(500).send("Hubo un error al procesar tu solicitud.");
    }
});

// ############### Progrmatic Interface #########################
router.post("/api_register", async function (req, res) {
    const { username, password } = req.body;

    try {
        const newUser = await axios.post(`${base_url}${IP_WIKI}/user`, {
            name: username,
            password: password
        });
        // JWT token
        const token = jwt.sign({ username: newUser.data.name, id: newUser.data.id }, JWT_SECRET);

        // cookies
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Cambia según el entorno
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Configuración CORS
            maxAge: 3600000, // 1h
        });

        res.status(201).json({ message: "Usuario registrado con éxito" });

    } catch (error) {
        // Manejar errores del microservicio
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : 'Internal Server Error';
        res.status(status).json({ error: message });
    }

});
router.get("/api_planets", async (req, res) => {
    const cosmerePlanets = await axios.get(`${base_url}${IP_MAPA}/mapa/planetas_api`);
    res.status(200).send(cosmerePlanets.data)
});
router.get("/api_characters", async (req, res) => {
    const characters = await axios.get(`${base_url}${IP_WIKI}/allchars`);
    res.status(200).send(characters.data)
});
router.get("/api_characters/:planet", async (req, res) => {
    const planet = req.params.planet;
    try {
        // Intenta hacer la solicitud a la API
        const characters = await axios.get(`${base_url}${IP_WIKI}/chars/${planet}`);
        res.status(200).send(characters.data)
    } catch (error) {
        // Maneja los errores de Axios
        if (error.response && error.response.status === 404) {
            // Si es un error 404, responde con un mensaje adecuado
            return res.status(404).send("No hay personajes en este planeta");
        }

        // Maneja otros errores
        console.error("Error al obtener los personajes:", error.message);
        return res.status(500).send("Hubo un error al procesar la solicitud");
    }
});
router.get("/api_char/:id", async (req, res) => {
    const characterId = req.params.id;
    const character = await axios.get(`${base_url}${IP_WIKI}/char/${characterId}`);
    res.status(200).send(character.data)
});
router.post("/api_get_response/:id", async (req, res) => {
    try {
        const { question } = req.body;
        const characterId = req.params.id;

        const characterResponse = await axios.get(`${base_url}${IP_WIKI}/char/${characterId}`);
        const character = characterResponse.data;

        const chatbotResponse = await axios.get(`${base_url}${IP_OLLAMA}/query/${character.name}/${character.personality}/${question}`);
        // console.log(chatbotResponse)
        res.status(200).send(chatbotResponse.data)
    } catch (error) {
        console.error("Error al procesar la entrada:", error.message);
        res.status(500).send("Hubo un error al procesar tu solicitud.");
    }
});

// token check
function authenticateToken(req, res, next) {
    const token = req.cookies.jwt; // token from cookie
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // user info inyection to request
        next();
    });
}

// JWT use test route
router.get("/protected", authenticateToken, (req, res) => {
    res.send(`Hola ${req.user.username} con id:${req.user.id}, esta es una ruta protegida`);
});

module.exports = router;
