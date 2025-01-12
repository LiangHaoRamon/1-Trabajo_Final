
module.exports = {
    post:{
        tags:['POST de registro de usuario'],
        description: "Create User",
        operationId: "createUser",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/UserInput'
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