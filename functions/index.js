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
    console.log(alboName)
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
        return null;
    }
}



app.get('/colaborators/:alboName', async (req, res) => {
    
    let result = await getCreators(req.params.alboName)
    
    console.log(result)

    return res.send(result);
});

app.get('/characters/:userId', (req, res) => {
    console.log(req.params.userId)
    return res.send(
        {
            'last_sync': 'Fecha de la última sincronización en dd/mm/yyyy hh:mm:ss', 
            'characters' : [
                {
                    'character': 'Squirrel Girl',
                    'comics' : ['The Unbeateable Squirrel Girl (2015) #38','The Unbeateable Squirrel Girl(2015) #39']
                },
                {
                    'character': 'Jocasta',
                    'comics' :['Tony Stark: Iron Man (2018) #2','Tony Stark: Iron Man (2018) #3']
                },
            ]
        }
    )
});

exports.app = functions.https.onRequest(app);
