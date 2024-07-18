function obtenerCaracter(done) {
  const results = fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.14.1/data/es_ES/champion.json"
  );
  results
    .then((response) => response.json())
    .then((datos) => {
      done(datos);
    });
}
const rolesMap = {
    "Fighter": "Luchador",
    "Tank": "Tanque",
    "Mage": "Mago",
    "Assassin": "Asesino",
    "Support": "Soporte",
    "Marksman": "Tirador"
  };

obtenerCaracter((datos) => {
  console.log(datos);
  Object.values(datos.data).forEach((campeon) => {
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
              <p>Rol: ${rolesMap[campeon.tags[0]] || campeon.tags[0]}</p>
            </div>

            <div class="description">
              <p>${campeon.blurb}</p>
            </div>


         </article>  
        `);
    const main = document.querySelector("main");
    main.append(article);
  });
    //   // Mostrar todos los campeones inicialmente
    //   displayChampions(Object.values(datos.data));

    //   // Evento para filtrar campeones
    //   searchBar.addEventListener("keyup", (event) => {
    //       const searchString = event.target.value.toLowerCase();
    //       const filteredChampions = Object.values(datos.data).filter(campeon => {
    //           return campeon.name.toLowerCase().includes(searchString);
    //       });
    //       displayChampions(filteredChampions);
    //   });
});



