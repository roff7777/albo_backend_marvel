const express = require("express");
const app = express();

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


app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});