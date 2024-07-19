function obtenerCaracter(don) {
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
  
  //Define una función que toma un arreglo de campeones y los muestra en la página.
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
  
  obtenerCaracter((datos) => {   //llama a la funcion 
    const campeones = Object.values(datos.data);    // Convierte los datos de campeones a un arreglo
    document.getElementById("Todos").addEventListener("click", () => {  //Añade eventos de clic a los botones para filtrar campeones según su rol.
      displayChampions(campeones);
    });
  
    document.getElementById("Magos").addEventListener("click", () => {
      const magos = campeones.filter((campeon) => // Filtra todos los campeones según su rol.
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
      const searchBar = document.getElementById("searchBar"); //Selecciona el input del buscador.
      searchBar.addEventListener("input", (e) => {   //Añade un evento input al buscador.
        const query = e.target.value.toLowerCase();   //Obtiene el valor del buscador y lo convierte a minúsculas.
        const filteredChampions = campeones.filter((campeon) => //Filtra los campeones cuyo nombre incluye el valor del buscador.
          campeon.name.toLowerCase().includes(query) //Muestra los campeones filtrados.
        );
        
        displayChampions(filteredChampions); //Muestra todos los campeones al cargar la página.
  
      });
  
      // Mostrar todos los campeones al cargar la página
      displayChampions(campeones);
  });
  