
module.exports = {
    components:{
        schemas:{
            Character:{
                type:'object',
                properties: {
                    id: {
                        type:'int',
                        description:"An id of a character",
                        example: "1"
                    },
                    name: {
                        type:'str',
                        description:"Name of the character",
                        example: "Kelsier"
                    },
                    planet: {
                        type:'str',
                        description:"Planet of origin of the character",
                        example: "Scadrial"
                    },
                    description: {
                        type:'str',
                        description:"Description of the character",
                        example: "Kelsier is a half skaa, also known as the survivor of Hathsin ..."
                    },
                    personality: {
                        type:'str',
                        description:"Personality of the character",
                        example: "Kelsier is a fighter for justice, often violent ..."
                    },
                    main_ability: {
                        type:'str',
                        description:"Main ability of the character",
                        example: "Mistborn"
                    },
                    quote: {
                        type:'str',
                        description:"Famous quote of the character",
                        example: "There is always another secret"
                    },
                }
            },
            User:{
                properties: {
                    id: {
                        type:'int',
                        description:"An id of a user",
                        example: "1"
                    },
                    name: {
                        type:'str',
                        description:"Name of the user",
                        example: "pipo"
                    }, 
                    password: {
                        type:'str',
                        description:"Password of the user",
                        example: "man13"
                    }, 
                    isCompletionist: {
                        type:'bool',
                        description:"Is this user a completionist?",
                        example: "False"
                    }, 
                    characters_known: {
                        type:'list[Character]',
                        description:"List of characters known by the user",
                        example: "[Kelsier, Kaladin]"
                    }, 
                }
            },
            Sun:{
                type:'object',
                description:"A sun node",
                example: "Scadrian Sun"
            },
            Planet:{
                type:'object',
                properties:{
                    name: {
                        type:'str',
                        description:"Name of the planet",
                        example: "scadrial"
                    }, 
                    system: {
                        type:'str',
                        description:"Name of the planetary system the planet belongs to",
                        example: "scadrian system"
                    }
                }
            },
            Moon:{
                type:'object',
                description:"A mooon of a planet",
                example: "Nomon"
            },
            UserInput: {
                properties: {
                    username: {
                        type:'str',
                        description:"Name of the user",
                        example: "pipo"
                    }, 
                    password: {
                        type:'str',
                        description:"Password of the user",
                        example: "man13"
                    },  
                }
            },
            Question: {
                properties: {
                    question: {
                        type:'str',
                        description:"Question to ask a character",
                        example: "What is your favourite meal?"
                    }
                }
            }
        }
    }
}