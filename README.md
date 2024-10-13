<a href="https://www.gotoiot.com/">
    <img src="doc/gotoiot-logo.png" alt="logo" title="Goto IoT" align="right" width="60" height="60" />
</a>

Web App Full Stack Base
=======================

*Ayudaría mucho si apoyaras este proyecto con una ⭐ en Github!*

Este proyecto es una aplicación web fullstack que se ejecuta sobre el ecosistema `Docker`. Está compuesta por un compilador de `TypeScript` que te permite utilizar este superset de JavaScript para poder programar un `cliente web`. También tiene un servicio en `NodeJS` que te permite ejecutar código en backend y al mismo tiempo disponibilizar el código del cliente web para interactar con el servicio. Además tiene una `base de datos` MySQL que puede interactuar con el backend para guardar y consultar datos, y de manera adicional trae un `administrador` de base de datos para poder administrar la base en caso que lo necesites.

La aplicación IoT de base que viene con este proyecto se encarga de crear una tabla llamada `Devices` en la base de datos, y la idea es que vos puedas desarrollar el código de backend y frontend que te permita controlar desde el navegador el estado de los devices de un hogar inteligente - *como pueden ser luces, TVs, ventiladores, persianas, enchufes y otros* - y almacenar los estados de cada uno en la base de datos. 

Realizando estas tareas vas a a tener una aplicación fullstack IoT del mundo real que utiliza tecnologías actuales en la que un backend es capaz de interactuar con una DB para cumplir con las peticiones de control que se le mandan desde el cliente web.

En esta imagen podés ver una posible implementación del cliente web que controla los artefactos del hogar.

![architecture](doc/image.png)

## Comenzando 🚀

Esta sección es una guía con los pasos escenciales para que puedas poner en marcha la aplicación.

<details><summary><b>Mira los pasos necesarios</b></summary><br>

### Instalar las dependencias

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`. 

En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado en nuestra web están los detalles para instalar Docker y Docker Compose en una máquina Linux. Si querés instalar ambas herramientas en una Raspberry Pi podés seguir [este artículo](https://www.gotoiot.com/pages/articles/rpi_docker_installation) de nuestra web que te muestra todos los pasos necesarios.

En caso que quieras instalar las herramientas en otra plataforma o tengas algún incoveniente, podes leer la documentación oficial de [Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Continua con la descarga del código cuando tengas las dependencias instaladas y funcionando.

### Descargar el código

Para descargar el código, lo más conveniente es que realices un `fork` de este proyecto a tu cuenta personal haciendo click en [este link](https://github.com/gotoiot/app-fullstack-base/fork). Una vez que ya tengas el fork a tu cuenta, descargalo con este comando (acordate de poner tu usuario en el link):

```
git clone https://github.com/USER/app-fullstack-base.git
```

>En caso que no tengas una cuenta en Github podes clonar directamente este repo.

### Ejecutar la aplicación

Para ejecutar la aplicación tenes que correr el comando:

```
docker compose up -d
```
desde la raíz del proyecto. Este comando va a descargar las imágenes de Docker de node, de typescript, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento. 

Para acceder al cliente web ingresa a a la URL [http://localhost:8000/](http://localhost:8000/) y para acceder al admin de la DB accedé a [localhost:8001/](http://localhost:8001/). 

Si pudiste acceder al cliente web y al administrador significa que la aplicación se encuentra corriendo bien. 

</details>


Continuá explorando el proyecto una vez que lo tengas funcionando.

## Configuraciones de funcionamiento 🔩

Al crearse la aplicación se ejecutan los contenedores de Docker de cada servicio, se crea la base de datos y sus tablas. A continuación podés encontrar info si querés cambiar la estructura de la DB o bien sus configuraciones de acceso.

<details><summary><b>Lee cómo configurar la aplicación</b></summary><br>

### Configuración de la DB

Como ya comprobaste, para acceder PHPMyAdmin tenés que ingresar en la URL [localhost:8001/](http://localhost:8001/). En el login del administrador, el usuario para acceder a la db es `root` y contraseña es la variable `MYSQL_ROOT_PASSWORD` del archivo `docker-compose.yml`.

Para el caso del servicio de NodeJS que se comunica con la DB fijate que en el archivo `src/backend/mysql-connector.js` están los datos de acceso para ingresar a la base.

Si quisieras cambiar la contraseña, puertos, hostname u otras configuraciones de la DB deberías primero modificar el servicio de la DB en el archivo `docker-compose.yml` y luego actualizar las configuraciones para acceder desde PHPMyAdmin y el servicio de NodeJS.

### Estructura de la DB

Al iniciar el servicio de la base de datos, si esta no está creada toma el archivo que se encuentra en `db/dumps/smart_home.sql` para crear la base de datos automáticamente.

En ese archivo está la configuración de la tabla `Devices` y otras configuraciones más. Si quisieras cambiar algunas configuraciones deberías modificar este archivo y crear nuevamente la base de datos para que se tomen en cuenta los cambios.

Tené en cuenta que la base de datos se crea con permisos de superusuario por lo que no podrías borrar el directorio con tu usuario de sistema, para eso debés hacerlo con permisos de administrador. En ese caso podés ejecutar el comando `sudo rm -r db/data` para borrar el directorio completo.

</details>


## Detalles principales 🔍

En esta sección vas a encontrar las características más relevantes del proyecto.

<details><summary><b>Mira los detalles más importantes de la aplicación</b></summary><br>
<br>

### Arquitectura de la aplicación

Como ya pudiste ver, la aplicación se ejecuta sobre el ecosistema Docker, y en esta imagen podés ver el diagrama de arquitectura.

![architecture](doc/architecture.png)

### El cliente web

El cliente web es una Single Page Application que se comunica con el servicio en NodeJS mediante JSON a través de requests HTTP. Puede consultar el estado de dispositivos en la base de datos (por medio del servicio en NodeJS) y también cambiar el estado de los mismos. Los estilos del código están basados en **Material Design**.

### El servicio web

El servicio en **NodeJS** posee distintos endpoints para comunicarse con el cliente web mediante requests HTTP enviando **JSON** en cada transacción. Procesando estos requests es capaz de comunicarse con la base de datos para consultar y controlar el estado de los dispositivos, y devolverle una respuesta al cliente web también en formato JSON. Así mismo el servicio es capaz de servir el código del cliente web.

### La base de datos

La base de datos se comunica con el servicio de NodeJS y permite almacenar el estado de los dispositivos en la tabla **Devices**. Ejecuta un motor **MySQL versión 5.7** y permite que la comunicación con sus clientes pueda realizarse usando usuario y contraseña en texto plano. En versiones posteriores es necesario brindar claves de acceso, por este motivo la versión 5.7 es bastante utilizada para fases de desarrollo.

### El administrador de la DB

Para esta aplicación se usa **PHPMyAdmin**, que es un administrador de base de datos web muy utilizado y que podés utilizar en caso que quieras realizar operaciones con la base, como crear tablas, modificar columnas, hacer consultas y otras cosas más.

### El compilador de TypeScript

**TypeScript** es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Para esta aplicación se usa un compilador de TypeScript basado en una imagen de [Harmish](https://hub.docker.com/r/harmish) en Dockerhub, y está configurado para monitorear en tiempo real los cambios que se realizan sobre el directorio **src/frontend/ts** y automáticamente generar código compilado a JavaScript en el directorio  **src/frontend/js**. Los mensajes del compilador aparecen automáticamente en la terminal al ejecutar el comando **docker-compose up**.

### Ejecución de servicios

Los servicios de la aplicación se ejecutan sobre **contenedores de Docker**, así se pueden desplegar de igual manera en diferentes plataformas. Los detalles sobre cómo funcionan los servicios los podés ver directamente en el archivo **docker-compose.yml**.

### Organización del proyecto

En la siguiente ilustración podés ver cómo está organizado el proyecto para que tengas en claro qué cosas hay en cada lugar.

```sh
├── db                          # directorio de la DB
│   ├── data                    # estructura y datos de la DB
│   └── dumps                   # directorio de estructuras de la DB
│       └── smart_home.sql      # estructura con la base de datos "smart_home"
├── doc                         # documentacion general del proyecto
└── src                         # directorio codigo fuente
│   ├── backend                 # directorio para el backend de la aplicacion
│   │   ├── index.js            # codigo principal del backend
│   │   ├── mysql-connector.js  # codigo de conexion a la base de datos
│   │   ├── package.json        # configuracion de proyecto NodeJS
│   │   └── package-lock.json   # configuracion de proyecto NodeJS
│   └── frontend                # directorio para el frontend de la aplicacion
│       ├── js                  # codigo javascript que se compila automáticamente
│       ├── static              # donde alojan archivos de estilos, imagenes, fuentes, etc.
│       ├── ts                  # donde se encuentra el codigo TypeScript a desarrollar
│       └── index.html          # archivo principal del cliente HTML
├── docker-compose.yml          # archivo donde se aloja la configuracion completa
├── README.md                   # este archivo
├── CHANGELOG.md                # archivo para guardar los cambios del proyecto
├── LICENSE.md                  # licencia del proyecto
```

> No olvides ir poniendo tus cambios en el archivo `CHANGELOG.md` a medida que avanzas en el proyecto.

</details>

## Detalles de implementación 💻

En esta sección podés ver los detalles específicos de funcionamiento del código y que son los siguientes.

<details><summary><b>Mira los detalles de implementación</b></summary><br>

### Agregar un Dispositivo
Para agregar un nuevo dispositivo, sigue estos pasos:

1. **Presiona el botón "AGREGAR DISPOSITIVO"**: Esto abrirá un panel de registro.
2. **Completa los datos del dispositivo**: En el panel, ingresa la siguiente información:
   - **Nombre del Dispositivo**: Asigna un nombre que identifique al dispositivo.
   - **Descripción del Dispositivo**: Proporciona una breve descripción de su función o características.
   - **Tipo de Dispositivo**: Selecciona el tipo de dispositivo en el menú desplegable "Tipo de Dispositivo".
3. **Guardar o Cancelar**: Una vez completados los campos, puedes presionar el botón "Guardar" para registrar el dispositivo o "Cancelar" si deseas volver atrás sin realizar cambios.

### Editar o Eliminar un Dispositivo
Para modificar o eliminar un dispositivo existente:

- **Editar**: Presiona el botón "EDITAR" en la tarjeta del dispositivo correspondiente. Esto abrirá un diálogo similar al de la creación del dispositivo, donde podrás hacer las modificaciones necesarias. Guarda los cambios al finalizar.
  
- **Eliminar**: Si deseas eliminar un dispositivo, simplemente haz clic en el botón "ELIMINAR" en la tarjeta del dispositivo. Ten en cuenta que esta acción es irreversible y eliminará el dispositivo permanentemente.

### Frontend

#### Interfaz de Usuario y Comunicación con el Servidor

##### Descripción General
Esta aplicación cuenta con un frontend desarrollado en **TypeScript** y utiliza la librería **Materialize** para la creación de la interfaz visual. El diseño es el de una Single Page Application (SPA), lo que asegura una experiencia fluida para el usuario, evitando recargas de página completas al interactuar con el servidor.

##### Estructura de la Aplicación

###### Diseño de la Interfaz
La interfaz está creada usando **Materialize**, una librería que facilita el uso de componentes estilizados, como formularios, tarjetas y controles deslizantes, asegurando un diseño adaptable a diferentes tamaños de pantalla. El enfoque es hacer la aplicación funcional y accesible tanto en navegadores de escritorio como en dispositivos móviles, optimizando la experiencia en ambos.

#### Manejo de Eventos
Para gestionar los eventos, se utiliza una clase principal que sigue el patrón `EventListenerObject`. Aquí, toda la lógica de los eventos se centraliza para un manejo más eficiente. Los eventos son capturados mediante `addEventListener` y gestionados en el método `handleEvent`. Entre las acciones que se controlan a través de esta lógica están:
- Actualización de estados de los dispositivos.
- Registro de nuevos dispositivos.
- Modificación de dispositivos existentes.
- Eliminación de dispositivos.

#### Comunicación con el Backend
La aplicación se comunica con el servidor utilizando la API `fetch`. Esta configuración permite realizar solicitudes HTTP asincrónicas y manejar respuestas en formato **JSON**. A continuación se describen las solicitudes principales que se realizan:

- **GET**: Para obtener la lista de dispositivos y sus tipos.
- **POST**: Para crear un nuevo dispositivo.
- **PUT**: Para actualizar los datos de un dispositivo existente.
- **PATCH**: Para cambiar el estado de un dispositivo.
- **DELETE**: Para eliminar un dispositivo.

Ejemplo de una función de solicitud utilizando `fetch`:

```typescript
const BASE_URL = 'http://localhost:8000';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function getDevices(): Promise<Device[]> {
    return fetchJson<Device[]>(`${BASE_URL}/devices`);
}
```

### Funcionalidades Principales

#### Visualización de Dispositivos
Los dispositivos disponibles se presentan en una cuadrícula de tarjetas. Cada tarjeta contiene la información clave de un dispositivo, como su nombre, descripción y estado actual.

#### Modificación de Dispositivos
Los dispositivos pueden ser modificados fácilmente haciendo clic en el botón "Editar" correspondiente. Al hacerlo, se despliega un panel donde se pueden ajustar los atributos del dispositivo.

#### Control de Estados
Para los dispositivos que permiten ajustar su estado, se incluye un control deslizante que permite cambiar su valor entre 0 y 1. Los cambios realizados en el estado se envían al servidor para su actualización.

#### Agregar y Eliminar Dispositivos
La aplicación permite añadir nuevos dispositivos desde un panel dedicado, además de brindar la opción de eliminar dispositivos existentes. Al eliminar un dispositivo, se solicita confirmación por parte del usuario para evitar eliminaciones accidentales.

## Backend

El backend está desarrollado utilizando **Node.js** y **Express** para gestionar las solicitudes HTTP. La base de datos utilizada es **MySQL**, y se conecta mediante un módulo personalizado (`mysql-connector`). Los datos se intercambian en formato **JSON** para facilitar la integración con el frontend.

### Estructura del Backend

- **Node.js y Express**: Se encarga de manejar las rutas y las solicitudes HTTP.
- **Base de datos MySQL**: Los datos de los dispositivos y sus tipos se almacenan en una base de datos MySQL.
- **Módulo personalizado**: El archivo `mysql-connector.js` gestiona las conexiones y consultas a la base de datos.
- **Manejo de errores**: El backend devuelve códigos de error HTTP estándar y mensajes de error informativos si ocurre algún problema en las solicitudes.

### Endpoints Disponibles

<details><summary><b>Ver los endpoints disponibles</b></summary><br>

#### 1. Obtener todos los dispositivos

```json
{
    "method": "GET",
    "endpoint": "/devices",
    "description": "Obtiene una lista de todos los dispositivos disponibles.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": "",
    "response_code": 200,
    "response_body": [
        {
            "id": 1,
            "name": "Lámpara de cocina",
            "description": "Luz principal de la cocina",
            "state": 0,
            "typeId": 2
        }
    ],
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "GET /devices",
        "response": [
            {
                "id": 1,
                "name": "Lámpara de cocina",
                "description": "Luz principal de la cocina",
                "state": 0,
                "typeId": 2
            }
        ]
    }
}
```

#### 2. Obtener un dispositivo por ID

```json
{
    "method": "GET",
    "endpoint": "/device/:id",
    "description": "Obtiene un dispositivo específico basado en el ID proporcionado.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": "",
    "response_code": 200,
    "response_body": {
        "id": 1,
        "name": "Lámpara de cocina",
        "description": "Luz principal de la cocina"
    },
    "response_code_error": 400,
    "response_body_error": {
        "error": "Número de ID no válido"
    },
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "GET /device/1",
        "response": {
            "id": 1,
            "name": "Lámpara de cocina",
            "description": "Luz principal de la cocina"
        }
    }
}

```
#### 3. Agregar un nuevo dispositivo

```json
{
    "method": "POST",
    "endpoint": "/device",
    "description": "Crea un nuevo dispositivo con los datos proporcionados.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": {
        "name": "Nuevo dispositivo",
        "description": "Descripción del dispositivo",
        "typeId": 1
    },
    "response_code": 201,
    "response_body": {
        "id": 2,
        "name": "Nuevo dispositivo",
        "description": "Descripción del dispositivo",
        "state": 0,
        "typeId": 1
    },
    "response_code_error": 400,
    "response_body_error": {
        "error": "Parámetros inválidos"
    },
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "POST /device",
        "response": {
            "id": 2,
            "name": "Nuevo dispositivo",
            "description": "Descripción del dispositivo",
            "state": 0,
            "typeId": 1
        }
    }
}
```

#### 4. Actualizar un dispositivo existente

```json
{
    "method": "PUT",
    "endpoint": "/device/:id",
    "description": "Actualiza los detalles de un dispositivo existente.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": {
        "name": "Nombre actualizado",
        "description": "Descripción actualizada",
        "typeId": 2
    },
    "response_code": 200,
    "response_body": {
        "id": 1,
        "name": "Nombre actualizado",
        "description": "Descripción actualizada",
        "state": 0,
        "typeId": 2
    },
    "response_code_error": 400,
    "response_body_error": {
        "error": "Parámetros inválidos"
    },
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "PUT /device/1",
        "response": {
            "id": 1,
            "name": "Nombre actualizado",
            "description": "Descripción actualizada",
            "state": 0,
            "typeId": 2
        }
    }
}
```
#### 5. Actualizar el estado de un dispositivo

```json
{
    "method": "PATCH",
    "endpoint": "/device/:id/state",
    "description": "Actualiza el estado de un dispositivo específico.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": {
        "state": 1
    },
    "response_code": 200,
    "response_body": {
        "message": "Estado actualizado exitosamente"
    },
    "response_code_error": 400,
    "response_body_error": {
        "error": "Parámetros inválidos"
    },
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "PATCH /device/1/state",
        "response": {
            "message": "Estado actualizado exitosamente"
        }
    }
}

```
#### 6. Eliminar un dispositivo

```json
{
    "method": "DELETE",
    "endpoint": "/device/:id",
    "description": "Elimina un dispositivo existente basado en su ID.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": "",
    "response_code": 200,
    "response_body": {
        "message": "Dispositivo eliminado"
    },
    "response_code_error": 400,
    "response_body_error": {
        "error": "ID de dispositivo no válido"
    },
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "DELETE /device/1",
        "response": {
            "message": "Dispositivo eliminado"
        }
    }
}

```
#### 7. Obtener tipos de dispositivos

```json
{
    "method": "GET",
    "endpoint": "/deviceTypes",
    "description": "Obtiene la lista de todos los tipos de dispositivos disponibles.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": "",
    "response_code": 200,
    "response_body": [
        {
            "id": 1,
            "name": "Tipo A",
            "material_icon_name": "lightbulb"
        }
    ],
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "GET /deviceTypes",
        "response": [
            {
                "id": 1,
                "name": "Tipo A",
                "material_icon_name": "lightbulb"
            }
        ]
    }
}

```

#### 8. Obtener dispositivos por tipo

```
{
    "method": "GET",
    "endpoint": "/devices/type/:typeId",
    "description": "Obtiene todos los dispositivos de un tipo específico.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": "",
    "response_code": 200,
    "response_body": [
        {
            "id": 1,
            "name": "Dispositivo 1",
            "description": "Descripción del dispositivo",
            "state": 0,
            "typeId": 1
        }
    ],
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "GET /devices/type/1",
        "response": [
            {
                "id": 1,
                "name": "Dispositivo 1",
                "description": "Descripción del dispositivo",
                "state": 0,
                "typeId": 1
            }
        ]
    }
}

```

#### 9. Obtener el número total de dispositivos

```json
{
    "method": "GET",
    "endpoint": "/devices/count",
    "description": "Obtiene el número total de dispositivos.",
    "request_headers": {
        "Content-Type": "application/json"
    },
    "request_body": "",
    "response_code": 200,
    "response_body": {
        "count": 10
    },
    "response_code_error": 500,
    "response_body_error": {
        "error": "Error en la base de datos"
    },
    "example": {
        "request": "GET /devices/count",
        "response": {
            "count": 10
        }
    }
}

```

</details>

</details>


## Tecnologías utilizadas 🛠️

En esta sección podés ver las tecnologías más importantes utilizadas.

<details><summary><b>Mira la lista completa de tecnologías</b></summary><br>

* [Docker](https://www.docker.com/) - Ecosistema que permite la ejecución de contenedores de software.
* [Docker Compose](https://docs.docker.com/compose/) - Herramienta que permite administrar múltiples contenedores de Docker.
* [Node JS](https://nodejs.org/es/) - Motor de ejecución de código JavaScript en backend.
* [MySQL](https://www.mysql.com/) - Base de datos para consultar y almacenar datos.
* [PHPMyAdmin](https://www.phpmyadmin.net/) - Administrador web de base de datos.
* [Material Design](https://material.io/design) - Bibliotecas de estilo responsive para aplicaciones web.
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado y con clases.

</details>

## Contribuir 🖇️

Si estás interesado en el proyecto y te gustaría sumar fuerzas para que siga creciendo y mejorando, podés abrir un hilo de discusión para charlar tus propuestas en [este link](https://github.com/gotoiot/app-fullstack-base/issues/new). Así mismo podés leer el archivo [Contribuir.md](https://github.com/gotoiot/gotoiot-doc/wiki/Contribuir) de nuestra Wiki donde están bien explicados los pasos para que puedas enviarnos pull requests.

## Sobre Goto IoT 📖

Goto IoT es una plataforma que publica material y proyectos de código abierto bien documentados junto a una comunidad libre que colabora y promueve el conocimiento sobre IoT entre sus miembros. Acá podés ver los links más importantes:

* **[Sitio web](https://www.gotoiot.com/):** Donde se publican los artículos y proyectos sobre IoT. 
* **[Github de Goto IoT:](https://github.com/gotoiot)** Donde están alojados los proyectos para descargar y utilizar. 
* **[Comunidad de Goto IoT:](https://groups.google.com/g/gotoiot)** Donde los miembros de la comunidad intercambian información e ideas, realizan consultas, solucionan problemas y comparten novedades.
* **[Twitter de Goto IoT:](https://twitter.com/gotoiot)** Donde se publican las novedades del sitio y temas relacionados con IoT.
* **[Wiki de Goto IoT:](https://github.com/gotoiot/doc/wiki)** Donde hay información de desarrollo complementaria para ampliar el contexto.

## Muestas de agradecimiento 🎁

Si te gustó este proyecto y quisieras apoyarlo, cualquiera de estas acciones estaría más que bien para nosotros:

* Apoyar este proyecto con una ⭐ en Github para llegar a más personas.
* Sumarte a [nuestra comunidad](https://groups.google.com/g/gotoiot) abierta y dejar un feedback sobre qué te pareció el proyecto.
* [Seguirnos en twitter](https://github.com/gotoiot/doc/wiki) y dejar algún comentario o like.
* Compartir este proyecto con otras personas.

## Autores 👥

Las colaboraciones principales fueron realizadas por:

* **[Agustin Bassi](https://github.com/agustinBassi)**: Ideación, puesta en marcha y mantenimiento del proyecto.
* **[Ernesto Giggliotti](https://github.com/ernesto-g)**: Creación inicial del frontend, elección de Material Design.
* **[Brian Ducca](https://github.com/brianducca)**: Ayuda para conectar el backend a la base de datos, puesta a punto de imagen de Docker.

También podés mirar todas las personas que han participado en la [lista completa de contribuyentes](https://github.com/###/contributors).

## Licencia 📄

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE.md](LICENSE.md) para más detalles sobre el uso de este material.

---

**Copyright © Goto IoT 2021** ⌨️ [**Website**](https://www.gotoiot.com) ⌨️ [**Group**](https://groups.google.com/g/gotoiot) ⌨️ [**Github**](https://www.github.com/gotoiot) ⌨️ [**Twitter**](https://www.twitter.com/gotoiot) ⌨️ [**Wiki**](https://github.com/gotoiot/doc/wiki)
