const express = require("express");
const app = express();

app.get('/colaborators', function (req, res) {
    console.log(req.params)
    res.send('Saludos desde express');
});



app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});