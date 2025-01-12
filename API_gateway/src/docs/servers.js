module.exports = {
    servers:[
        {
            url:"http://localhost:3000",
            description:"API Gateway and front server"
        },
        {
            url:"http://localhost:3030",
            description:"Microservice (Map) connected to the Neo4J server"
        },
        {
            url:"http://localhost:8080",
            description:"Microservice (Chat) connected to the ollama (Mistral) model server"
        },
        {
            url:"http://localhost:8000",
            description:"Microservice (wiki) connected to the User and Character MySQL database"
        },
        {
            url:"http://localhost:7474",
            description:" Neo4J server"
        },
        {
            url:"http://localhost:11434",
            description:"Ollama (Mistral) model server"
        },
        {
            url:"http://localhost:3306",
            description:"MySQL database od Characters and Users"
        },
    ]
}