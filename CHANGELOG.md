# DAW Base App - Changes Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## 3.0.0


### Added
- Implementación de la API REST para la gestión de dispositivos:
  - **GET** `/device/:id`: Obtener un dispositivo por su ID.
  - **GET** `/devices`: Obtener todos los dispositivos disponibles.
  - **POST** `/device`: Agregar un nuevo dispositivo al panel.
  - **PUT** `/device/:id`: Actualizar un dispositivo existente en el panel.
  - **PATCH** `/device/:id/state`: Actualizar el estado de un dispositivo en el panel.
  - **DELETE** `/device/:id`: Eliminar un dispositivo del panel.
  - **GET** `/deviceTypes`: Obtener tipos de dispositivos.
  - **GET** `/devices/type/:typeId`: Obtener dispositivos por tipo.
  - **GET** `/devices/count`: Obtener el número total de dispositivos en el panel.
- Reestructuración completa del frontend, mejorando la interfaz de usuario y la experiencia del usuario. Se han implementado nuevos componentes y una navegación más intuitiva.

### Changed
- Se ha implementado el manejo de errores para las consultas a la base de datos, devolviendo mensajes claros en caso de fallos.
- Se ha añadido la validación de parámetros para asegurar que se reciben datos correctos en las solicitudes.
- Mejora en el rendimiento de la aplicación gracias a la optimización de las consultas a la base de datos.

### Fixed
- Corrección de la lógica de validación para asegurar que los valores numéricos son válidos y no nulos.
- Se han solucionado varios errores menores en el frontend que afectaban la usabilidad.

## 2.2.0

* Project modification
    * Adds TypeScript compiler service to Docker Compose
    * Reestructures frontend folder for TypeScript
    * Adds new info to README accordingly
    * Changes project architecture image

## 2.1.0

* Project modification
    * Enhaces README accordingly to Goto IoT
    * Adds example of finished application
    * Removes unnecessary frontend images
    * Changes src code folders names

## 2.0.0

* Project modification
    * Changes project and organization names
    * Removes Typescript container
    * Removes Typescript Code
    * Executes Javascript code directly
    * Changes licence to MIT
    * Modifies README accordingly

## 1.0.0

* Project creation
    * Docker Compose implementation for whole project.
    * Typescript compilation into docker-compose.
    * MySQL 5.7 DB Server.
    * PHPMyAdmin.
    * NodeJS backend application.
    * Materialize CSS framework.
