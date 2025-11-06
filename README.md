# Hospital Web App

Una aplicación web simple para gestión hospitalaria con login y dashboard, construida con HTML, Tailwind CSS y JavaScript puro.

## 🚀 Características

- ✅ Sistema de autenticación con datos hardcodeados
- ✅ Dashboard con estadísticas y datos de ejemplo
- ✅ Diseño responsivo con Tailwind CSS
- ✅ Tres roles de usuario: Administrador, Doctor, Enfermero
- ✅ Interfaz moderna y profesional
- ✅ Dockerizada y lista para desplegar

## 👥 Credenciales de Acceso

### Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`

### Doctor
- **Usuario:** `doctor`
- **Contraseña:** `doctor123`

### Enfermero
- **Usuario:** `nurse`
- **Contraseña:** `nurse123`

## 📦 Instalación y Uso Local

### Opción 1: Servidor Local Simple

1. Abre `index.html` directamente en tu navegador, o
2. Usa un servidor HTTP simple:

```bash
# Con Python 3
python -m http.server 8080

# Con Node.js (http-server)
npx http-server -p 8080
```

3. Accede a `http://localhost:8080`

### Opción 2: Con Webpack (Desarrollo)

```bash
npm install
npm start
```

## 🐳 Docker

### Construir la imagen

```bash
docker build -t hospital-app .
```

### Ejecutar el contenedor

```bash
docker run -d -p 8080:80 --name hospital-app hospital-app
```

### Usar Docker Compose

```bash
docker-compose up -d
```

La aplicación estará disponible en `http://localhost:8080`

## 📤 Publicar en Docker Hub

### 1. Iniciar sesión en Docker Hub

```bash
docker login
```

### 2. Etiquetar la imagen

```bash
docker tag hospital-app TU_USUARIO/hospital-app:latest
docker tag hospital-app TU_USUARIO/hospital-app:v1.0
```

### 3. Publicar la imagen

```bash
docker push TU_USUARIO/hospital-app:latest
docker push TU_USUARIO/hospital-app:v1.0
```

### 4. Descargar y ejecutar desde Docker Hub

```bash
docker pull TU_USUARIO/hospital-app:latest
docker run -d -p 8080:80 TU_USUARIO/hospital-app:latest
```

## 🗂️ Estructura del Proyecto

```
S12-web-estatica/
├── index.html              # Página de login
├── dashboard.html          # Dashboard principal
├── js/
│   └── app.js             # Lógica de la aplicación
├── css/
│   └── style.css          # Estilos adicionales
├── img/                   # Imágenes
├── Dockerfile             # Configuración de Docker
├── docker-compose.yml     # Docker Compose
├── nginx.conf             # Configuración de Nginx
├── .dockerignore          # Archivos excluidos de Docker
└── README.md              # Este archivo
```

## 🔧 Tecnologías Utilizadas

- **HTML5** - Estructura de las páginas
- **Tailwind CSS** - Framework CSS (vía CDN)
- **JavaScript (Vanilla)** - Lógica de la aplicación
- **Nginx** - Servidor web en Docker
- **Docker** - Containerización

## 📊 Funcionalidades del Dashboard

- Estadísticas en tiempo real
- Lista de pacientes recientes con estados
- Próximas citas médicas
- Información del usuario logueado
- Sistema de cierre de sesión

## 🔐 Seguridad

⚠️ **NOTA IMPORTANTE:** Esta aplicación usa datos hardcodeados y es solo para demostración. NO usar en producción sin implementar:

- Backend real con base de datos
- Hash de contraseñas
- Autenticación JWT o similar
- HTTPS
- Validación de entrada
- Protección CSRF

## 🌐 Variables de Entorno (Producción)

Para producción, considera usar variables de entorno:

```bash
docker run -d \
  -p 8080:80 \
  -e TZ=America/Mexico_City \
  --name hospital-app \
  TU_USUARIO/hospital-app:latest
```

## 📝 Notas de Desarrollo

- La autenticación usa `localStorage` para mantener la sesión
- Los datos son completamente estáticos (hardcodeados)
- No hay persistencia de datos
- Diseñado para desarrollo y demostración

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado como proyecto de demostración.

---

**¿Preguntas o sugerencias?** Abre un issue en el repositorio.

