module.exports = {
    get:{
        tags:['Operaciones GET de Character'],
        description: "Get all characters",
        operationId: 'getCharacters',
        parameters:[],
        responses:{
            '200':{
                description:"Characters were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Character'
                        }
                    }
                }
            }
        }
    }
}