const searchInput = document.getElementById("searchInput");
const mostrarComida = document.querySelector(".mostrarComida");
const btnFav = document.querySelector(".btnFav");
const btnSearch = document.querySelector(".btnSearch");

let data = [];
let seleccionarComidas = JSON.parse(localStorage.getItem("seleccionarComidas")) || [];
let mostrarSeleccionado = false;

function favorito(button, comida){
    const comidaIndex = seleccionarComidas.findIndex( (item) => {
        return item.idMeal === comida.idMeal;
    } );
    if (comidaIndex !== -1) {
        seleccionarComidas.splice(comidaIndex, 1);
    } else {
        seleccionarComidas.push(comida);
    }

    const dataIndex = data.findIndex( (item) => item.idMeal === comida.idMeal);
    if (dataIndex !== -1) {
        data[dataIndex].selected = !data[dataIndex].selected;
    }

    localStorage.setItem("seleccionarComidas", JSON.stringify(seleccionarComidas));

    if (mostrarSeleccionado) {
        mostrarComidaSeleccionada();
    } else {
        buscarComida(searchInput.value.trim());
    }
}


function eliminarComida(comida) {
    const comidaIndex = seleccionarComidas.findIndex((item) => item.idMeal === comida.idMeal);

    if (comidaIndex !== -1) {
        seleccionarComidas.splice(comidaIndex, 1);
        const cdataIndex = data.findIndex((item) => item.idMeal === comida.idMeal);
        
        if (cdataIndex !== -1) {
            data[cdataIndex].selected=false;
        }
        localStorage.setItem("seleccionarComidas", JSON.stringify(seleccionarComidas));
        mostrarComidaSeleccionada();
    }
}


function mostrarComidaSeleccionada() {
    const seleccionarComidasHTML = seleccionarComidas.map(
        (comida) => `<div class="comidaa">
                        <img src="${comida.strMealThumb}" alt="${comida.strMeal}">
                        <div class="wrapper">
                            <h3>
                                ${comida.strMeal.length > 10 ? comida.strMeal.slice(0,10) + "..." : comida.strMeal}
                            </h3>
                            <button class="detalleVer"><i class="fa-solid fa-utensils"></i></button>
                            <button class="eliminar selected"><i class="fa-solid fa-trash fav"></i></button>
                        </div>
                     </div>`
    ).join("");

    mostrarComida.innerHTML = seleccionarComidasHTML;

    const btnEliminarLista = document.querySelectorAll(".eliminar");
    btnEliminarLista.forEach(
        (button, index) => {
                            button.addEventListener("click", (event) => {
                                event.stopPropagation();
                                const seleccionarComida = seleccionarComidas[index];
                                eliminarComida(seleccionarComida);
                                console.log("Seleccionar comida:", seleccionarComidas);
                            });
    });

    const btnDetalleVer = document.querySelectorAll(".detalleVer");
    btnDetalleVer.forEach(
        (button, index) => {
                            button.addEventListener("click", (event) => {
                                event.stopPropagation();
                                const seleccionarComida = seleccionarComidas[index];
                                buscarDetalleComida(seleccionarComida.idMeal);
                                searchInput.disabled = true;
                            });
    });
}


function buscarDetalleComida(comidaId){
    const apiURL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${comidaId}`;

    fetch(apiURL).then((response) => response.json())
                 .then((data) => {
                    if (data.meals === null) {
                        console.log("detalle de comida no funciona");
                        return;
                    }

                    const comidaDetalles = data.meals[0];
                    
                    const comidaDetallesHTML = `
                        <div class="comidaDetalless">
                            <img src="${comidaDetalles.strMealThumb}" alt="${comidaDetalles.strMeal}">
                            <div class="detalleWrapper">
                                <h2>${comidaDetalles.strMeal}</h2>
                                <p> <strong>Categoria:</strong> ${comidaDetalles.strCategory} </p>
                                <p> <strong>Area:</strong> ${comidaDetalles.strArea} </p>
                                <p> <strong>Tags:</strong> ${comidaDetalles.strTags} </p>
                                <p> <strong>Ingredientes:</strong> </p>
                                
                                <ul> ${getIngredientes(comidaDetalles)}</ul>
                                
                                <p> <strong>Instrucciones:</strong> ${comidaDetalles.strInstructions} </p>
                                <p> <strong>Video Tutorial:</strong> </p>

                                <a href="${comidaDetalles.strYoutube}" target="_blank"> ${comidaDetalles.strYoutube}</a>
                                
                                <button class="volver>Atras</button>
                            </div>
                        </div>
                    `;


                    function getIngredientes(comidaDetalles) {
                        const Ingredientes = [];
                        for(let i=1; i<= 20 ; i++){
                            const Ingrediente = comidaDetalles[`strIngredient${i}`];
                            const cantidades = comidaDetalles[`strMeasure${i}`];
                            if (Ingrediente) {
                                Ingredientes.push(`<li>${cantidades ? `${cantidades}` : ""} ${Ingrediente}</li>`);
                            }
                        }
                        return Ingredientes.join("");
                    }

                    mostrarComida.innerHTML = comidaDetallesHTML;
                 }).catch((error) => {
                    console.log("Error en detalles", error);
                    mostrarComida.innerHTML = "<p> Error de busqueda, intentelo nuevamente</p>";
                 });
}


function buscarComida(value) {
    if (value === "") {
        mostrarComida.innerHTML = "";
        return;
    }

    const apiURL = `https://themealdb.com/api/json/v1/1/search.php?s=${value}`;
    fetch(apiURL).then((response) => response.json()).then((datas) => {
        if (datas.meals === null) {
            mostrarComida.innerHTML = "<h2>Receta no encontrada !!</h2>";
        } else {
            data = datas.meals.map((comida) => ({...comida, selected: seleccionarComidas.some((seleccionarComida) => seleccionarComida.idMeal === comida.idMeal),
            }));
        


    const comidaHTML = data.map((comidda) => 
                                            `<div class="comidaa">
                                                <img src="${comidda.strMealThumb}" alt="${comidda.strMeal}">
                                                <div class="wrapper">
                                                    <h3> ${comidda.strMeal.length > 10 ? comidda.strMeal.slice(0,10) +"...": comidda.strMeal } </h3>
                                                    <button class="agregar ${comidda.selected? "selected" : ""}"><i class="fa-solid fa-star fav"></i></button>
                                                    <button class="detalleVer"><i class="fa-solid fa-utensils"></i></button>
                                                </div>
                                             </div>`).join("");

           mostrarComida.innerHTML = comidaHTML;  
           
           const btnAgregarComida = document.querySelectorAll(".agregar");
           btnAgregarComida.forEach( (button, index) => {
            button.addEventListener("click", () => {
                const seleccionarComida = data[index];
                favorito(button, seleccionarComida);
                console.log("Seleccionar comida", seleccionarComidas);
            });
           });


           const btnDetalleVer = document.querySelectorAll(".detalleVer");
           btnDetalleVer.forEach( (button, index) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const seleccionarComida = data[index];
                buscarDetalleComida(seleccionarComida.idMeal);
                searchInput.disabled = true;
            });
            });	
        }
    }).catch((error) => {
        console.log("Error ...", error);
        mostrarComida.innerHTML = "<p>error intenta otra vez</p>";
    });
}


function seleccionarClick(){
    mostrarSeleccionado = !mostrarSeleccionado;

    if (mostrarSeleccionado) {
        mostrarComidaSeleccionada();
        searchInput.disabled = true;
        console.log(searchInput);

    } else {
        buscarComida(searchInput.value.trim());
        searchInput.disabled = false;
        console.log(searchInput);
    }
}


searchInput.addEventListener("input", (event) => {
    const inputVal = event.target.value.trim();
    buscarComida(inputVal);
});

btnFav.addEventListener("click", seleccionarClick );

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("volver")){
        buscarComida(searchInput.value.trim());
        searchInput.disabled = false;
    }
});


buscarComida("");








