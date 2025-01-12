const express = require("express");
const router = express.Router();
const graphDBConnect = require('../../connectionDB');

function formatResponse(resultObj_list) {
    const result = [];
    for(let i = 0; i < resultObj_list.length; i++){
        if (resultObj_list[i].records.length > 0) {
            resultObj_list[i].records.map(record => {
                //result.push(record._fields[0].properties);
                result.push(record._fields[0]);
            });
        }
    }
    return result;
  }

router.get('/', async function(req,res) {

    //const query = 'MATCH (n)-[r]-(s) OPTIONAL MATCH (d)-[r2]-(n) RETURN d, r2, n, r, s;';
    const query_r = 'MATCH (n)-[r]-(s) RETURN distinct r;';
    const params_r = {};
    const resultObj_r = await graphDBConnect.executeCypherQuery(query_r, params_r);

    const query_p = 'MATCH (n) RETURN distinct n;';
    const params_p = {};
    const resultObj_p = await graphDBConnect.executeCypherQuery(query_p, params_p);

    const result = formatResponse([resultObj_r, resultObj_p]);

    res.send(result);//result

});

router.get('/relaciones', async function(req,res) {

    //const query = 'MATCH (n)-[r]-(s) OPTIONAL MATCH (d)-[r2]-(n) RETURN d, r2, n, r, s;';
    const query = 'MATCH (n)-[r]-(s) RETURN distinct r;';
    const params = {};
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    const result = formatResponse([resultObj]);

    res.send(result);//result

});

router.get('/planetas', async function(req,res) {

    const query = 'MATCH (n:Planet) RETURN n {.*} AS planet;';
    const params = {};
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    // const result = formatResponse([resultObj]);
    const planets = resultObj.records.map(record => {
        const planet = record._fields[0]; // Accede al primer campo que es el nodo 'planet'
        return planet; // Devuelve directamente el objeto con las propiedades
    });
    res.json(planets);

});

router.get('/planetas/:name', async function(req,res) {

    const params = {"name": req.params.name};

    const query_r = 'MATCH (n)-[r]-(s) WHERE n.name = $name RETURN distinct r;';
    const resultObj_r = await graphDBConnect.executeCypherQuery(query_r, params);
    
    const query_p = 'MATCH (n) WHERE n.name = $name RETURN distinct n;';
    const resultObj_p = await graphDBConnect.executeCypherQuery(query_p, params);

    const query_s = 'MATCH (n)-[r]-(s) WHERE n.name = $name RETURN distinct s;';
    const resultObj_s = await graphDBConnect.executeCypherQuery(query_s, params);

    const result = formatResponse([resultObj_r, resultObj_p, resultObj_s]);
    
    res.send(result);//result
});

router.get('/planetas_api', async function(req,res) {

    const query = 'MATCH (n:Planet) RETURN n {.*} AS planet;';
    const params = {};
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    // const result = formatResponse([resultObj]);
    const planets = resultObj.records.map(record => {
        const planet = record._fields[0]; // Accede al primer campo que es el nodo 'planet'
        return planet; // Devuelve directamente el objeto con las propiedades
    });
    res.json(planets);
});

router.post('/', (req,res) => {

    // let todo = {
    //     id:nanoid(idLength),
    //     ...req.body
    // };

    try {

        // req.app.db.get("todos").push(todo).write();
        
        return res.sendStatus(201).send("Planeta saved successfully");

    }catch(error){

        return res.sendStatus(500).send(error);
    }
});

router.put('/:id', (req,res) => {

    //find todo.
    // let todo = req.app.db.get("todos").find({
    //     id: req.params.id
    // }).value();

    // if(!todo){

    //     return res.sendStatus(404);

    // };

    //update that todo.
    try {

        // req.app.db.get("todos").find({
        //     id:req.params.id
        // })
        // .assign({ completed: !todo['completed'] })
        // .write();

        return res.send("Todo updated");

    } catch(error) {

        res.sendStatus(500);

        return res.send(error);

    };

});

router.delete('/:id', (req,res) => {

    //find todo.
    // let todo = req.app.db.get("todos").find({
    //     id:req.params.id
    // }).value();

    // if(!todo){

    //     return res.sendStatus(404);

    // };

    // delete the todo.
    try {
        // req.app.db.get("todos").remove({
        //     id:req.params.id
        // })
        // .write();

        return res.send("Todo deleted");

    } catch(error) {

        return res.sendStatus(500);

    }

});

module.exports = router;