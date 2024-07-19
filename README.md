# INFORMACION DE LAS APIs

# ⭐ Pokédex con API Pokemon

## Definición del proyecto
La Pokédex no atiende un "problema" de un usuario sino un "interés" del mismo por la información ordenada de los Pokémon, permitiendo interactuar para obtener informacion sobre los Pokémon. El prototipo de la página se hizo en Canva para tener una guía de cómo diseñarlo con CSS y HTML. Con la ayuda de las clases de CTC y videos de YouTube, comprendimos cómo enlazar las APIs y cómo hacer consultas. 

## Historias de usuario
Las historias de usuario representan todo lo que el usuario necesita hacer/ver. Estas historias son el resultado del proceso de investigación de los usuarios. 


Los usuarios que deseen ver los datos del API son:

- Orientado a los fans de todas las edades de Pokémon, o interesados en saber más de ellos, como sus habilidades, tipos y características.
- Mis usuarios principales serían niños porque tiene una interfaz llamativa y colorida que llama la atención e incentiva la interacción con todos los tipos de Pokémon.

### Ejemplo de historia de usuario
**Yo como:** Aficionado de Pokémon  
**Quiero:** Ver más sobre mis personajes favoritos de la serie  
**Para:** Aprender y tener información de los Pokémon

### Criterios de aceptación
Lo que debe suceder para considerar que satisface al usuario:

- El usuario inicia y ve un fondo dinámico con un botón que llama la atención, por lo cual da click fácilmente.
- El usuario, al ser redirigido a la otra página, puede ver instantáneamente los 151 Pokémon de la primera generación.
- El usuario puede interactuar fácilmente entre los botones para ver sus divisiones por tipos.

### Definición de terminado
Lo que determina que la "historia" está completa:

- El código CSS está definido claramente en base a sus clases.
- El código HTML es generado por la API de manera rápida.
- El código JavaScript funciona de la mejor manera para mostrar los Pokémon de manera ordenada en base a lo que se pide.

## Diseño de la Interfaz de Usuario
![Diseño de la Interfaz de Usuario](https://github.com/jezabel7/ProyectoAPI/blob/main/API%20Jezabel/assetsJ/filesJ/Pokedex.jpg)

# ⭐ PDF Blocks API Client

Esta aplicación web permite a los usuarios interactuar con la API de PDF Blocks para agregar contraseñas, eliminar contraseñas y fusionar archivos PDF. 

## Características

- **Agregar Contraseña a PDF**: Permite a los usuarios agregar una contraseña a un archivo PDF.
- **Eliminar Contraseña de PDF**: Permite a los usuarios eliminar la contraseña de un archivo PDF protegido.
- **Fusionar PDFs**: Permite a los usuarios fusionar múltiples archivos PDF en uno solo.


## Archivos del Proyecto

- `indexL.html`: El archivo HTML principal que contiene la estructura de la aplicación.
- `stylesL.css`: El archivo CSS que contiene los estilos de la aplicación.
- `scriptL.js`: El archivo JavaScript que maneja la lógica de la aplicación.


## Detalles de Implementación

### Estructura HTML

El archivo `index.html` contiene:

- Un menú con tres botones grandes para seleccionar la funcionalidad deseada.
- Tres formularios ocultos que se muestran según la funcionalidad seleccionada.
- Una lista de archivos modificados que se actualiza con cada operación.


### Lógica 

El archivo `script.js` maneja:

- La visibilidad de los formularios.
- Las solicitudes a la API de PDF Blocks.
- La actualización de la lista de archivos modificados.

### Ejemplo de Uso

#### Agregar Contraseña a un PDF

1. Haz clic en el botón "Add Password to PDF".
2. Selecciona un archivo PDF.
3. Ingresa una contraseña y selecciona un algoritmo de encriptación.
4. Haz clic en "Add Password".

#### Eliminar Contraseña de un PDF

1. Haz clic en el botón "Remove Password from PDF".
2. Selecciona un archivo PDF protegido.
3. Ingresa la contraseña actual.
4. Haz clic en "Remove Password".

#### Fusionar PDFs

1. Haz clic en el botón "Merge PDFs".
2. Selecciona múltiples archivos PDF.
3. Haz clic en "Merge PDFs".

# ⭐ Recetario con API Meals
Este proyecto es una aplicación web que permite buscar recetas de comidas utilizando la API de TheMealDB. Los usuarios pueden introducir un ingrediente en inglés y obtener una lista de recetas relacionadas. Además, pueden marcar sus recetas favoritas y ver los detalles de cada receta.

## Características

- **Búsqueda de recetas**: Permite a los usuarios buscar recetas introduciendo un ingrediente en inglés.
- **Favoritos**: Los usuarios pueden marcar y desmarcar recetas como favoritas.
- **Detalles de las recetas**: Visualización detallada de la receta seleccionada, incluyendo ingredientes, instrucciones y un enlace a un video tutorial.

## Estructura del proyecto

- Archivo principal HTML que contiene la estructura de la aplicación.
- Hoja de estilos CSS para la aplicación.
- Archivo JavaScript que contiene la lógica de la aplicación.

## Uso

- Introduce un ingrediente en inglés en el campo de búsqueda y haz clic en el botón de búsqueda.
- Marca recetas como favoritas utilizando el botón de estrella.
- Haz clic en el botón de utensilios para ver los detalles de una receta.

# ⭐ League of Legends API

Este proyecto es una aplicación web que permite a los usuarios seleccionar y filtrar campeones de League of Legends utilizando la API de Riot Games. Los usuarios pueden buscar campeones por rol o por nombre y ver detalles específicos de cada campeón.

### Funcionalidades

- **Mostrar todos los campeones**: Permite a los usuarios ver todos los campeones disponibles.
- **Filtrar por roles**: Los usuarios pueden filtrar campeones por roles (Mago, Asesino, Luchador, Tirador, Tanque).
- **Buscar por nombre**: Permite a los usuarios buscar campeones por nombre utilizando la barra de búsqueda.
- **Detalles del campeón**: Muestra una breve descripción, rol y título de cada campeón.

### Estructura del proyecto

- `index.html`: Contiene la estructura de la aplicación.
- `style.css`: Hoja de estilos para la aplicación.
- `index.js`: Archivo JavaScript que contiene la lógica de la aplicación.

### Manera de utilizarlo

- Utiliza los botones para filtrar campeones por rol.
- Utiliza la barra de búsqueda para buscar campeones por nombre.

### Tecnologías

- HTML
- CSS
- JavaScript
- [Riot Games API](https://developer.riotgames.com/)
