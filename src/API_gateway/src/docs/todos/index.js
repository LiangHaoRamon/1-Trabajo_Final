const register = require('./register');
const getPlanetas = require('./get-planets');
const getCharacters = require('./get-characters');
const getCharsPlanet = require('./get-char-planet');
const getCharID = require('./get-char-id');
const getResponse = require('./get-response');

module.exports = {
    paths:{
        '/api_register':{
            ...register
        },
        '/api_planets':{
            ...getPlanetas
        },
        '/api_characters':{
            ...getCharacters
        },
        '/api_characters/{planet}':{
            ...getCharsPlanet
        },
        '/api_char/{id}':{
            ...getCharID
        },
        '/api_get_response/{id}':{
            ...getResponse
        },
    }
}