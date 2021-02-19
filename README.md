# albo_backend_marvel
Integración con API de marvel para ejercicio practivo albo backend

Realize un deploy del API con los siguientes endpoint para poder probarlo sin ambientar el código.

https://us-central1-albo-api-marvel.cloudfunctions.net/app/colaborators/capamerica

https://us-central1-albo-api-marvel.cloudfunctions.net/app/characters/spiderman

En caso de que quieras ejecutarlo en local, se puede usar la utilidad de firebase.

1. Ve a la carpeta "functions"
2. Ejecuta el comando "firebase serve"

Esto hará que se cree una instancia el API en el puerto 5000, por lo que puedes consultar directamente el API en:

http://localhost:5000/albo-api-marvel/us-central1/app/colaborators/ironman

http://localhost:5000/albo-api-marvel/us-central1/app/characters/ironman


Si quieres probar el script que prueba la base de datos

Utilize back4app (parse server) para la base de datos, por lo que para poblar la BD
es necesario ejecutar el archivo 'populateCharacters' de la carpeta raiz.

Esto hará que el script actulice la info de 3 personajes:
-ironman
-capamerica
-spiderman

Solo deje estos 3 personajes por facilidad para el test, pero el script esta preparado para ejecutarse para todos
los personajes que regresa el API de marvel (agregando un loop)

El código esta publico y lo puedes encontrar en:
https://github.com/roff7777/albo_backend_marvel

