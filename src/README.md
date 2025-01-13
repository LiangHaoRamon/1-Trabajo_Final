# 🦘 Trabajo_Final Web Avanzada 🌐

Esta es la aplicación WEB de El Portal del Saltamundos. Una web dedicada a poder explorar los diferentes mundos del Cosmere, universo literario de Brandon Sanderson, conociendo algunos de sus personajes.

Esta web está compuesta por varios microservicios y un API Gateway para conectarlos todos. Para su correcto funcionamiento se habrán de seguir los próximos pasos.

## Índice
0. [Software que se necesita instalar](#0-Software-que-se-necesita-instalar)
1. [Servicios que hay que arrancar](#1-Servicios-que-hay-que-arrancar)
2. [Dependencias que hay que instalar](#2-Dependencias-que-hay-que-instalar)
3. [Cómo arrancar la parte servidora y la parte cliente](#3-Cómo-arrancar-la-parte-servidora-y-la-parte-cliente)

## 0) Software que se necesita instalar:
 - Se necesitará instalar **Docker Desktop**, pues la aplicación está totalmente construida sobre containers de docker.
 - Se necesitará instalar **Node**, pues los microservicios "map_microservice_node" y "API_gateway" funcionan con nodeJS, aunque en realidad docker se encargará de ello.
 - Se necesita instalar **Neo4J**, pues el microservicio "map_microservice_node" funcionan con Neo4J, aunque en realidad docker se encargará de ello.
 - Se necesitará instalar **Python**, pues los microservicios "chat_microservice_flask" y "wiki_microservice_fastapi" funcionan con python, aunque en realidad docker se encargará de ello.
 - Se necesitará descargar **Mistral**, el modelo de IA necesario para el funcionamiento del microservicio "chat_microservice_flask". Para ello en la carpeta "chat_microservice_flask/mistral_model" hay un docker-compose en el que se deberá abrir una consola de comandos y ejecutar los siguientes comandos:
```
docker-compose up -d
docker-compose exec ollama ollama pull mistral
```
Una vez descargado el modelo de 4Gb puedes eliminar el contenedor y las imagenes asociadas.

## 1) Servicios que hay que arrancar:
Hay que crear una serie de imágenes para que la aplicación funcione correctamente
- Imagen del microservicio "wiki_microservice_fastapi", en "wiki_microservice_fastapi/":
```
docker build --tag wiki-micro-docker .
```
- Imagen del microservicio "chat_microservice_flask" en "chat_microservice_flask/**app_folder**/":
```
docker build --tag chat-micro-docker .
```
- Imagen del microservicio "map_microservice_node" en "map_microservice_node/":
```
docker build --tag map-neo-image .
```
- Imagen del microservicio "API_gateway" en "API_gateway/":
```
docker build --tag api_gateway .
```
- El resto de imágenes necesarias de **ollama**, **neo4J** y **mySQL** se descargarán automáticamente al ejecutar el docker-compose.
## 2) Dependencias que hay que instalar
La instalación de dependencias se realiza en cada imagen correspondiente a cada microservicio. Esta instalación se realiza en los **Dockerfiles** gracias a los archivos **package.lock** en el caso de nodeJS y **requirements.txt** en el caso de python.
## 3) Cómo arrancar la parte servidora y la parte cliente
En la ruta "src/" ejecutar el comando:
```
docker-compose up -d
```
Ahora todas la imagenes restante se descargan, el volumen de la base de datos mySQL se crea y se generan todos los contenedores necesarios para que funcione la aplicación.

**Antes de poder ejecutar la aplicación como cliente**, es necesario **iniciar** la **base de datos de Neo4J**. Para ello, como administrador del servidor, entre en la ruta http://localhost:7474, inicie sesión con la contraseña "**pipoman13**" y en la consola de neo4J pegue y ejecute el contenido del archivo "src\map_microservice_node\neo_db\**create_map_db.txt**" hasta la fila **233**. La base de datos de Planetas estará entonces creada.

**Por último**, la parte **cliente**, incluida en el microservicio de **API_gateway**, será accesible desde la ruta http://localhost:3000 y la documentación con swagger UI en http://localhost:3000/api-docs.
