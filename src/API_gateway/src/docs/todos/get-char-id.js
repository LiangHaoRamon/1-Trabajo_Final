module.exports = {
    get:{
        tags:['Operaciones GET de Character'],
        description: "Get a character",
        operationId: "getChar",
        parameters:[
            {
                name:"id",
                in:"path",
                required:true,
                description: "A single char id"
            }
        ],
        responses:{
            '200':{
                description:"Character is obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Character"
                        }
                    }
                }
            },
            '404':{
                description: "Character is not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"We can't find the character",
                                internal_code:"Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}