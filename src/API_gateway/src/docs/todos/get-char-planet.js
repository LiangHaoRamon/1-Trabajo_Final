module.exports = {
    get:{
        tags:['Operaciones GET de Character'],
        description: "Get characters of a planet",
        operationId: "getCharPlanet",
        parameters:[
            {
                name:"planet",
                in:"path",
                required:true,
                description: "A planet name"
            }
        ],
        responses:{
            '200':{
                description:"Characters are obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Character"
                        }
                    }
                }
            },
            '404':{
                description: "Characters not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"We can't find the characters",
                                internal_code:"Invalid planet"
                            }
                        }
                    }
                }
            }
        }
    }
}