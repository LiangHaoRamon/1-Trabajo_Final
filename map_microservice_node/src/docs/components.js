
module.exports = {
    components:{
        schemas:{
            Sun:{
                type:'string',
                description:"An id of a todo",
                example: "tyVgf"
            },
            Planet:{
                type:'object',
                properties:{
                    id:{
                        type:'string',
                        description:"Todo identification number",
                        example:"ytyVgh"
                    },
                    title:{
                        type:'string',
                        description:"Todo's title",
                        example:"Coding in JavaScript"
                    },
                    completed:{
                        type:"boolean",
                        description:"The status of the todo",
                        example:false
                    }
                }
            },
            Moon:{
                type:'string',
                description:"An id of a todo",
                example: "tyVgf"
            },
            Character:{
                type:'string',
                description:"An id of a todo",
                example: "tyVgf"
            }
        }
    }
}