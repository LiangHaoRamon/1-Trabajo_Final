# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm ci --only=production

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que corre tu aplicación
EXPOSE 3030

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]
