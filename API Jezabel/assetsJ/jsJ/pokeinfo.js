const listaPokemon = document.querySelector("#listaPokemon");
const URL_BASE = "https://pokeapi.co/api/v2/";

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

            // Obtener el tipo principal del Pokémon en inglés
            const tipoIngles = data.types[0].type.name;

            // Obtener el nombre del tipo principal del Pokémon en español
            const tipoPrincipal = await obtenerNombreEnEspañol(data.types[0].type.url);

            // Obtener la habilidad principal del Pokémon en español
            const habilidadPrincipal = await obtenerNombreEnEspañol(data.abilities[0].ability.url);

            // Mostrar el Pokémon en la lista
            mostrarPokemon(data, tipoPrincipal, tipoIngles, habilidadPrincipal);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// Función para obtener el nombre en español de un recurso de la PokeAPI
async function obtenerNombreEnEspañol(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const nombreEspañol = data.names.find(name => name.language.name === 'es').name;
        return nombreEspañol;
    } catch (error) {
        console.error('Error fetching Spanish name:', error);
        return "Desconocido";
    }
}

// Función para mostrar un Pokémon en la lista
function mostrarPokemon(poke, tipoPrincipal, tipoIngles, habilidadPrincipal) {
    let pokeId = poke.id.toString().padStart(3, '0'); // Ajustar el ID a tres dígitos con ceros a la izquierda si es necesario

    const div = document.createElement("div");
    div.classList.add("pokemon1");
    div.innerHTML = `
        <button class="pokeboton ${tipoIngles}">${poke.name}</button>
        <p class="pokemon-id-back">#${pokeId}</p>

        <div class="pokemon-gif">
            <img src="${poke.sprites.other['showdown'].front_default}" alt="${poke.name}">
        </div>

        <div class="poke-info">
            <div class="container-info">
                <p class="pokeinfo">Altura</p>
                <p class="pokeinfo1">${poke.height / 10} m</p>
                <p class="pokeinfo">Peso</p>
                <p class="pokeinfo1">${poke.weight / 10} kg</p>
                <p class="pokeinfo">Tipo</p>
                <p class="pokeinfo1">${tipoPrincipal}</p>
                <p class="pokeinfo">Habilidad</p>
                <p class="pokeinfo1">${habilidadPrincipal}</p>
            </div>
        </div>
    `;
    listaPokemon.appendChild(div);
}

// Llamar a la función para cargar y mostrar los Pokémon
cargarPokemon();