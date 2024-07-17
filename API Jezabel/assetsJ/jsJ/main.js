const listaPokemon = document.querySelector("#listaPokemon");
const URL_BASE = "https://pokeapi.co/api/v2/";

// Array para almacenar los datos de los Pokémon en orden
const pokemonData = [];

// Función para cargar y mostrar los datos de los Pokémon
async function cargarPokemon() {
    try {
        // Hacer las solicitudes para obtener los datos de los primeros 151 Pokémon
        for (let i = 1; i <= 151; i++) {
            const pokemonURL = `${URL_BASE}pokemon/${i}`;
            const response = await fetch(pokemonURL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            pokemonData.push(data); // Almacenar datos del Pokémon en el array
        }

        // Hacer las solicitudes para obtener los nombres en japonés de los Pokémon
        for (let i = 0; i < pokemonData.length; i++) {
            const speciesURL = pokemonData[i].species.url;
            const response = await fetch(speciesURL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const speciesData = await response.json();
            const nombreJapones = speciesData.names.find(name => name.language.name === 'ja').name;

            // Obtener el tipo principal del Pokémon
            const tipoPrincipal = pokemonData[i].types[0].type.name;

            // Mostrar el Pokémon en la lista
            mostrarPokemon(pokemonData[i], nombreJapones, tipoPrincipal);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// Función para mostrar un Pokémon en la lista
function mostrarPokemon(poke, nombreJapones, tipoPrincipal) {
    let pokeId = poke.id.toString().padStart(3, '0'); // Ajustar el ID a tres dígitos con ceros a la izquierda si es necesario

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <button class="pokeboton ${tipoPrincipal}">${poke.name}</button>
    <p class="pokemon-id-back">#${pokeId}</p>

    <div class="pokemon-imagen">
        <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
    </div>

    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <h2 class="pokemon-nombre">${nombreJapones}</h2>
        </div>
    </div>
    `;
    listaPokemon.appendChild(div);
}


// Llamar a la función para cargar y mostrar los Pokémon
cargarPokemon();

