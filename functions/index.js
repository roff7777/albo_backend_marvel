const functions = require('firebase-functions');

let express = require('express');
let app = express();
app.get('/', (request, response)=>{
  response.send("The best app");
})


app.get('/colaborators/:userId', (req, res) => {
    return res.send(
      {
        'last_sync': 'Fecha de la última sincronización en dd/mm/yyyy hh:mm:ss', 
        'editors' : [
            'Wilson Moss',
            'Andy Smidth'
        ],
        'writers' : [
            'Ed Brubaker',
            'Ryan North'
        ],
        'colorists' : [
            'Rico Renzi'
        ]
      }
    );
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
