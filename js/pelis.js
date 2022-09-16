let poster = "https://image.tmdb.org/t/p/w500/";
let api_key = "a942d3966a09e081af050ca19fb39e10";
const fecha = new Date();
const form  = document.getElementById('fbuscar');


//Obtener peliculas pagina pricipal
async function getPelicP(){
    var pPrincipal = await (await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=es-ES&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&year=2022`)).json();
    console.log("Peliculas pagina principal:",pPrincipal);

    agregarPG(pPrincipal, "Lo más popular del 2022");
}


//Obtener peliculas por busqueda
async function buscarPelis(){
    const lbuscar = document.getElementById('buscar');
    
    var peliBuscar = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=es-ES&query=${lbuscar.value}&page=1&include_adult=true`)).json();
    console.log("Busqueda peliculas:",peliBuscar);
    agregarPG(peliBuscar);
}



//Obtener generos
async function cargarGeneros(){
    var generos = await (await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=es-ES`)).json();
    console.log("Generos:",generos);
    agregarGens(generos);
}


//Agregar generos al select
function agregarGens(obj){
    let optGens = document.getElementById('generos').options;
    
    for (var i = 0; i < obj.genres.length; i++) {
        optGens.add(new Option(obj.genres[i].name, obj.genres[i].id))
     }
}


//Obtener peliculas por genero
async function pelisGeners(){
    let gen = document.getElementById('generos');
    mesA = fecha.getFullYear().toString()+"-0"+(fecha.getMonth()+1);
    console.log("fecha:", mesA);
    var pGens = await (await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=es-ES&sort_by=release_date.desc&release_date.lte=${mesA}&include_adult=true&include_video=false&page=1&with_genres=${gen.value.toString()}&vote_average.gte=6`)).json();
    console.log("Peliculas por Genero",pGens);
    agregarPG(pGens, `Lo mas reciente en el genero de ${gen.options[gen.selectedIndex].text}`);
}


//Agregar peliculas
function agregarPG(obj, titulo){
    let tabla = document.getElementById('pelis');
    document.getElementById('titulo').innerHTML = titulo;
    tabla.innerHTML = "";
    let img, nombre;

    for (var i = 0; i < 20; i++) {
        if(!obj.results[i].poster_path){
            img = "img/notfound.gif";
        }else{
            img = poster + obj.results[i].poster_path;
        }
        
        if(!obj.results[i].belongs_to_collection){
            nombre = obj.results[i].original_title;
        }else{
            nombre = obj.results[i].belongs_to_collection.name
        }

        tabla.innerHTML += `<div class="col-md-3">
                <table class="table">
                    <tr><th>${obj.results[i].title} ${obj.results[i].vote_average}</th></tr>
                    <tr><td>${obj.results[i].release_date}</td></tr>
                    <tr><td><a href="peli.html"><img src="${img}" width="100" onclick="setPeliId(${obj.results[i].id})")"></a></td></tr>
                </table>
            </div>`;
     }
}


function setPeliId(id){
    // Almacena la información en sessionStorage
    sessionStorage.setItem("pId", id);
}


//Obtener peliculas por id
async function peliId() {
    
    // Obtiene la información almacenada desde sessionStorage
    var id = sessionStorage.getItem('pId');
    console.log(id);
    var obj = await (await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es-ES`)).json();
    console.log(obj);

    agregarPeliId(obj);
}


//Agregar Peliculas por ID
function agregarPeliId(obj){
    let tabla = document.getElementById('pelis');

    tabla.innerHTML += `
                        <h1 id="titulo">${obj.title}</h1>
                        <h4>${obj.release_date}</h4>
                        <img src="${poster + obj.poster_path}" width="200">
                        <p>${obj.overview}</p>`;
}