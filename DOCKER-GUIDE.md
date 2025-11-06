# Guía Completa de Docker - Hospital App

## 📋 Índice
1. [Configuración Inicial](#configuración-inicial)
2. [Desarrollo Local](#desarrollo-local)
3. [Docker - Comandos Básicos](#docker---comandos-básicos)
4. [Docker Hub - Publicación](#docker-hub---publicación)
5. [Despliegue](#despliegue)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Configuración Inicial

### Prerrequisitos
- Docker Desktop instalado
- Cuenta en Docker Hub (para publicar)
- Git (opcional)

### Verificar instalación de Docker
```bash
docker --version
docker-compose --version
```

---

## 💻 Desarrollo Local

### Opción 1: Servidor Node.js Simple
```bash
node server.js
```
Accede a: http://localhost:8080

### Opción 2: Servidor HTTP Python
```bash
python -m http.server 8080
```

### Opción 3: Abrir directamente
Abre `index.html` en tu navegador (puede tener limitaciones por CORS)

---

## 🐳 Docker - Comandos Básicos

### 1. Construir la imagen Docker
```bash
docker build -t hospital-app .
```

**Opciones útiles:**
```bash
# Construir sin usar cache
docker build --no-cache -t hospital-app .

# Construir con un nombre específico
docker build -t hospital-app:v1.0 .
```

### 2. Ver imágenes creadas
```bash
docker images
```

### 3. Ejecutar el contenedor
```bash
docker run -d -p 8080:80 --name hospital-web-app hospital-app
```

**Explicación de parámetros:**
- `-d` : Ejecutar en modo detached (background)
- `-p 8080:80` : Mapear puerto 8080 del host al 80 del contenedor
- `--name` : Nombre del contenedor
- `hospital-app` : Nombre de la imagen

**Otras opciones útiles:**
```bash
# Ejecutar en modo interactivo
docker run -it -p 8080:80 hospital-app

# Ejecutar con reinicio automático
docker run -d -p 8080:80 --restart unless-stopped --name hospital-web-app hospital-app

# Ejecutar con variables de entorno
docker run -d -p 8080:80 -e TZ=America/Mexico_City --name hospital-web-app hospital-app
```

### 4. Ver contenedores en ejecución
```bash
# Solo contenedores activos
docker ps

# Todos los contenedores (activos e inactivos)
docker ps -a
```

### 5. Ver logs del contenedor
```bash
# Todos los logs
docker logs hospital-web-app

# Logs en tiempo real
docker logs -f hospital-web-app

# Últimas 50 líneas
docker logs --tail 50 hospital-web-app
```

### 6. Detener el contenedor
```bash
docker stop hospital-web-app
```

### 7. Iniciar un contenedor detenido
```bash
docker start hospital-web-app
```

### 8. Reiniciar el contenedor
```bash
docker restart hospital-web-app
```

### 9. Eliminar el contenedor
```bash
# Primero detenerlo
docker stop hospital-web-app

# Luego eliminarlo
docker rm hospital-web-app

# O forzar eliminación (sin detener)
docker rm -f hospital-web-app
```

### 10. Eliminar la imagen
```bash
docker rmi hospital-app
```

### 11. Ejecutar comandos dentro del contenedor
```bash
# Acceder a la shell del contenedor
docker exec -it hospital-web-app sh

# Ejecutar un comando específico
docker exec hospital-web-app ls -la /usr/share/nginx/html
```

### 12. Inspeccionar el contenedor
```bash
docker inspect hospital-web-app
```

---

## 🐳 Docker Compose

### 1. Iniciar con Docker Compose
```bash
docker-compose up -d
```

### 2. Ver logs
```bash
docker-compose logs -f
```

### 3. Detener
```bash
docker-compose down
```

### 4. Reconstruir y ejecutar
```bash
docker-compose up -d --build
```

---

## 📤 Docker Hub - Publicación

### 1. Crear cuenta en Docker Hub
Ve a https://hub.docker.com/ y crea una cuenta

### 2. Login desde la terminal
```bash
docker login
```
Ingresa tu usuario y contraseña de Docker Hub

### 3. Etiquetar la imagen
```bash
# Formato: docker tag imagen usuario/repositorio:tag
docker tag hospital-app TU_USUARIO/hospital-app:latest
docker tag hospital-app TU_USUARIO/hospital-app:v1.0
```

**Ejemplo con usuario "johndoe":**
```bash
docker tag hospital-app johndoe/hospital-app:latest
docker tag hospital-app johndoe/hospital-app:v1.0
```

### 4. Publicar en Docker Hub
```bash
docker push TU_USUARIO/hospital-app:latest
docker push TU_USUARIO/hospital-app:v1.0
```

**Ejemplo:**
```bash
docker push johndoe/hospital-app:latest
docker push johndoe/hospital-app:v1.0
```

### 5. Verificar publicación
Ve a https://hub.docker.com/ y revisa tu repositorio

---

## 🚀 Despliegue

### Descargar y ejecutar desde Docker Hub

```bash
# Descargar la imagen
docker pull TU_USUARIO/hospital-app:latest

# Ejecutar
docker run -d -p 8080:80 --name hospital-app TU_USUARIO/hospital-app:latest
```

### Despliegue en servidor remoto

```bash
# SSH al servidor
ssh usuario@tu-servidor.com

# Descargar y ejecutar
docker pull TU_USUARIO/hospital-app:latest
docker run -d -p 80:80 --restart unless-stopped --name hospital-app TU_USUARIO/hospital-app:latest
```

### Actualizar aplicación en producción

```bash
# Detener contenedor actual
docker stop hospital-app
docker rm hospital-app

# Descargar última versión
docker pull TU_USUARIO/hospital-app:latest

# Ejecutar nueva versión
docker run -d -p 8080:80 --restart unless-stopped --name hospital-app TU_USUARIO/hospital-app:latest

# Limpiar imágenes antiguas
docker image prune -f
```

---

## 🔧 Solución de Problemas

### Problema: Puerto ya en uso
```bash
# Ver qué está usando el puerto 8080
netstat -ano | findstr :8080

# Usar otro puerto
docker run -d -p 3000:80 --name hospital-app hospital-app
```

### Problema: Contenedor no inicia
```bash
# Ver logs detallados
docker logs hospital-app

# Ver estado del contenedor
docker ps -a

# Reintentar en modo interactivo
docker run -it -p 8080:80 hospital-app
```

### Problema: Cambios no se reflejan
```bash
# Reconstruir sin cache
docker build --no-cache -t hospital-app .

# Eliminar contenedor y recrear
docker rm -f hospital-app
docker run -d -p 8080:80 --name hospital-app hospital-app
```

### Limpiar todo (reset completo)
```bash
# Detener todos los contenedores
docker stop $(docker ps -aq)

# Eliminar todos los contenedores
docker rm $(docker ps -aq)

# Eliminar todas las imágenes
docker rmi $(docker images -q)

# Limpiar volúmenes, redes y cache
docker system prune -a --volumes
```

---

## 📊 Comandos Útiles de Monitoreo

### Ver uso de recursos
```bash
docker stats hospital-app
```

### Ver información del sistema Docker
```bash
docker system df
```

### Ver procesos dentro del contenedor
```bash
docker top hospital-app
```

---

## 🎯 Workflow Completo Ejemplo

### Desarrollo → Producción
```bash
# 1. Desarrollar y probar localmente
node server.js

# 2. Construir imagen Docker
docker build -t hospital-app .

# 3. Probar localmente con Docker
docker run -d -p 8080:80 --name test-hospital hospital-app

# 4. Verificar funcionamiento
# Abrir http://localhost:8080

# 5. Si funciona, etiquetar para Docker Hub
docker tag hospital-app miusuario/hospital-app:v1.0

# 6. Publicar
docker push miusuario/hospital-app:v1.0

# 7. En servidor de producción
ssh usuario@servidor
docker pull miusuario/hospital-app:v1.0
docker run -d -p 80:80 --restart unless-stopped --name hospital-app miusuario/hospital-app:v1.0
```

---

## 🔐 Mejores Prácticas

1. **Versionado**: Usa tags específicos (v1.0, v1.1) además de `latest`
2. **Logs**: Revisa logs regularmente con `docker logs`
3. **Reinicio**: Usa `--restart unless-stopped` en producción
4. **Recursos**: Limita recursos con `--memory` y `--cpus` si es necesario
5. **Backup**: Haz backup del código y configuración
6. **Seguridad**: Mantén Docker actualizado

---

## 📞 Ayuda Adicional

### Documentación oficial
- Docker: https://docs.docker.com/
- Docker Hub: https://docs.docker.com/docker-hub/

### Verificar que todo funciona
```bash
# 1. Docker instalado
docker --version

# 2. Construir imagen
docker build -t hospital-app .

# 3. Ejecutar
docker run -d -p 8080:80 --name hospital-app hospital-app

# 4. Verificar
docker ps
curl http://localhost:8080

# 5. Ver logs
docker logs hospital-app

# 6. Detener
docker stop hospital-app
docker rm hospital-app
```

---

**¡Listo!** Ahora tienes toda la información necesaria para trabajar con Docker y Docker Hub.

