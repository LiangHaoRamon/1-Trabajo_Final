module.exports = {
    get:{
        tags: ['Operaciones GET de Planetas'],
        description: "Get todos",
        operationId: 'getPlanetas',
        parameters:[],
        responses:{
            '200':{
                description:"Todos were obtained",
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