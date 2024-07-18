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
  Fighter: "Luchador",
  Tank: "Tanque",
  Mage: "Mago",
  Assassin: "Asesino",
  Support: "Soporte",
  Marksman: "Tirador",
};

function displayChampions(champions) {
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear previous content
  champions.forEach((campeon) => {
    const article = document.createRange().createContextualFragment(`
        <article>
            <div class="img-container">
             <img src="https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${
               campeon.image.full
             }" alt="${campeon.name}">
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
    main.append(article);
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
});
