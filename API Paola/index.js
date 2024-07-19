function obtenerDatos(don) {
  const results = fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.14.1/data/es_ES/champion.json"
  );
  results
    .then((response) => response.json()) //cuando la soluc. sea completada la dev en formato json
    .then((datos) => {  //Cuando los datos JSON están listos, se llama a la función don con esos datos.
      don(datos);
    });
}

//Define un objeto que mapea los roles en inglés a sus equivalentes en español.
const rolesMap = {
  Fighter: "Luchador",
  Tank: "Tanque",
  Mage: "Mago",
  Assassin: "Asesino",
  Support: "Soporte",
  Marksman: "Tirador",
};

function displayChampions(champions) {
  const main = document.querySelector("main");  // Selecciona el elemento <main> en el DOM

  main.innerHTML = ""; // Clear previous content main
  
   // Itera sobre los campeones y crea el HTML para cada uno
  champions.forEach((campeon) => {

     //string HTML a documentfragment, eficiencia, un fragmento de documento a partir de un string HTML 
    const article = document.createRange().createContextualFragment(`
        <article>
            <div class="img-container">
             <img src="https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${campeon.image.full}" alt="${campeon.name}">
            </div>
            
            <div class="name"> 
              <h2>${campeon.name}</h2>
            </div>

            <div class="title">
              <h5>${campeon.title}</h5>
            </div>

            <div class="rol">
             <p >ROL<soan class= "texto-rol">  ${rolesMap[campeon.tags[0]] || campeon.tags[0]}</span> </p>
            </div>

            <div class="description">
              <p>${campeon.blurb}</p>
            </div>

         </article>  
        `);
    main.append(article); // Añade el fragmento al <main>.
  });
}

obtenerCaracter((datos) => {
  const campeones = Object.values(datos.data);

  document.getElementById("Todos").addEventListener("click", () => {
    const todos = campeones.filter((campeon) => campeon.tags);
    displayChampions(todos);
  });

  document.getElementById("Magos").addEventListener("click", () => {
    const magos = campeones.filter((campeon) =>
      campeon.tags[0].includes("Mage")
    );
    displayChampions(magos);
  });

  document.getElementById("Asesino").addEventListener("click", () => {
    const asesinos = campeones.filter((campeon) =>
      campeon.tags[0].includes("Assassin")
    );
    displayChampions(asesinos);
  });

  document.getElementById("Luchador").addEventListener("click", () => {
    const luchadores = campeones.filter((campeon) =>
      campeon.tags[0].includes("Fighter")
    );
    displayChampions(luchadores);
  });

  document.getElementById("Tirador").addEventListener("click", () => {
    const tiradores = campeones.filter((campeon) =>
      campeon.tags[0].includes("Marksman")
    );
    displayChampions(tiradores);
  });

  document.getElementById("Tanque").addEventListener("click", () => {
    const tanques = campeones.filter((campeon) =>
      campeon.tags[0].includes("Tank")
    );
    displayChampions(tanques);
  });

    // Buscador
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filteredChampions = campeones.filter((campeon) => 
        campeon.name.toLowerCase().includes(query)
      );
      
      displayChampions(filteredChampions);

    });



  
    // Mostrar todos los campeones al cargar la página
    displayChampions(campeones);
});



// function displayChampionsReverse(champions) {
//   const main = document.querySelector("main");
//   champions.forEach((campeon) => {
//     const article = document.createRange().createContextualFragment(`
//    <div class="card-back">

  

//     <p>Estadísticas:</p>
//     <ul>
//       <li>Daño de ataque: ${campeon.info.attack}</li>
//       <li>Defensa: ${campeon.info.defense}</li>
//       <li>Dificultad: ${campeon.info.difficulty}</li>
//      </ul>

//      `);
//     main.append(article);
//   });
// }


