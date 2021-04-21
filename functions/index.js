const functions = require('firebase-functions');
const Parse = require('parse/node');

let express = require('express');
let app = express();
app.get('/', (request, response)=>{
  response.send("The best app");
})

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'D5oj2d9hl14GgupWVJ2S9vJbsMLfSchlwhXbfi25', // This is your Application ID
  'ZHUJ5gAfln75SjPJML7V7jf3Tfi6VKRCJhQs85Ip', // This is your Javascript key
  'gaehOoahjNe7e9eJ7UKF23p1NGKCiUjdoRl1iaCJ' // This is your Master key (never use it in the frontend)
);

async function getCreators(alboName){
    const Character = Parse.Object.extend('Character')
    const query = new Parse.Query(Character)
    query.equalTo("alboName", alboName)

    const result = await query.first()
    if(result){
        let formated = { last_sync: result.get('lastSync')}
        let creators = result.get('creators')
        for (let prop in creators) {
            if (Object.prototype.hasOwnProperty.call(creators, prop)) {
                formated[prop]= creators[prop]
            }
        }

        return formated
    }else{
        return undefined;
    }
}

async function getSharedCharacters(alboName){
    const Character = Parse.Object.extend('Character')
    const query = new Parse.Query(Character)
    query.equalTo("alboName", alboName)

    const result = await query.first()
    if(result){
        let formated = { last_sync: result.get('lastSync')}
        let sharedCharacters = result.get('shared')
        let resultShared = []
        for (let prop in sharedCharacters) {
            if (Object.prototype.hasOwnProperty.call(sharedCharacters, prop)) {
                resultShared.push({
                    character: prop,
                    comics : sharedCharacters[prop]
                })
            }
        }
        formated[`characters`] = resultShared
        return formated
    }else{
        return undefined;
    }
}

app.get('/colaborators/:alboName', async (req, res) => {
    try{
        let result = await getCreators(req.params.alboName)
        
        if(result){
            return res.send(result);
        }
        return res.send(404).send()

    }catch(e){
        return res.status(500).send(e)
    }
});

app.get('/characters/:alboName', async (req, res) => {
    try{
        let result = await getSharedCharacters(req.params.alboName)
        
        if(result){
            return res.send(result);
        }
        return res.send(404).send()

    }catch(e){
        return res.status(500).send(e)
    }
});

app.get('/article/search/:alboName', async (req, res) => {
    try{
        return res.send(404).send()
    }catch(e){
        return res.status(500).send(e)
    }
});

exports.app = functions.https.onRequest(app);
