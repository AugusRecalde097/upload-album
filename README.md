
# Gestión de Porfolio Fotográfico.

## Descripción del Proyecto
**Gestión de Porfolio Fotográfico** es una aplicación desarrollada en **ReactJs** que ayuda a mantener actualizado tu porfolio. Entregando comodidad a la hora de gentionar las fotos y albums 
---

## Características


---

## Tecnologías Utilizadas

- **Frontend**: React
- **Backend**: ExpessJs
- **Base de Datos**: SQLite con Turso.io
- **Autenticación**: JWT
- **Estilado**: CSS Modules / Tailwind CSS 
- **Cloud de Fotos**: Cloudinary

---

## Instalación y Configuración

### Requisitos previos

- Node.js v18 o superior
- pnpm o yarn

### Instrucciones

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/gentionPorfolio.git
   cd gentionPorfolio
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
     ```plaintext
     VITE_CLOUD_NAME=CLOUD_NAME
     VITE_UPLOAD_PRESET=UPLOAD_PRESET
     ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

5. (Opcional) Realiza el despliegue en Vercel:
   - Conecta tu repositorio en [Vercel](https://vercel.com/).
   - Configura las mismas variables de entorno en el panel de Vercel.

---

## Estructura del Proyecto

```
gentionPorfolio/
├── public/             # Archivos estáticos
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── layout/         # Capas que envuelven las páginas
│   ├── pages/          # Páginas de la aplicación
│   ├── services/       # Servicios al backend
│   └── utilities/      # Configuración y utilidades
├── .env                # Variables de entorno
├── package.json        # Dependencias del proyecto
└── README.md           # Documentación
```

---

## Uso de la Aplicación

- **Inicio** Vista general de los albums.
- **Subir Album** Crear un album y subir todas las fotos que necesite. Estas se subirnan en un formato 1920 x 1080 con un máximo de 10 MB
- **Gestión de album** Entrar en un album, y modificar el titulo o descripción. Asi como también subir fotos nuevas o eliminarlas

---

## Futuras Mejoras

---

## Contribuciones

Este proyecto es personal y no acepta contribuciones externas en este momento. Sin embargo, si tienes sugerencias o encuentras errores, no dudes en abrir un issue en el repositorio.

---

## Autor

**Augusto**  
Full Stack Developer
[LinkedIn](https://www.linkedin.com/in/arecaldedev/) | [GitHub](https://github.com/AugusRecalde097)

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
