module.exports = {
    get:{
        tags:['Operaciones GET de Planets'],
        description: "Get planets",
        operationId: 'getPlanets',
        parameters:[],
        responses:{
            '200':{
                description:"Planets were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Planet'
                        }
                    }
                }
            }
        }
    }
}