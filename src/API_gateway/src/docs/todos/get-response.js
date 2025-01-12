
module.exports = {
    post:{
        tags:['POST de conversación con chat'],
        description: "Get a Response to a question",
        operationId: "getResponse",
        parameters:[
            {
                name:"id",
                in:"path",
                required:true,
                description: "A single char id"
            }
        ],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/Question'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "User created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}