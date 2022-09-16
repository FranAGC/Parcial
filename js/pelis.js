let poster = "https://image.tmdb.org/t/p/w500/";
let api_key = "a942d3966a09e081af050ca19fb39e10";
const form  = document.getElementById('fbuscar');


//Obtener peliculas pagina pricipal
async function getPelicP(){
    var pPrincipal = await (await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=es-ES&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&year=2022`)).json();
    console.log("Peliculas pagina principal:",pPrincipal);
    agregarPG(pPrincipal);
}


//Obtener peliculas por busqueda
async function buscarPelis(){
    const lbuscar = document.getElementById('buscar');
    
    var peliBuscar = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=es-ES&query=${lbuscar.value}&page=1&include_adult=true`)).json();
    console.log("Busqueda peliculas:",peliBuscar);
    agregarPG(peliBuscar);
}



form.addEventListener('submit', (event) => {
    buscarPelis();
});



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
    let gen = document.getElementById('generos').value.toString()
    console.log("codigo genro:", gen);
    var pGens = await (await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=es-ES&sort_by=release_date.desc&include_adult=true&include_video=false&page=1&with_genres=${gen}`)).json();
    console.log("Peliculas por Genero",pGens);
    agregarPG(pGens);
}


//Agregar peliculas
function agregarPG(obj){
    let tabla = document.getElementById('pelis');
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
                    <tr><th>${obj.results[i].title}</th></tr>
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

    tabla.innerHTML += `<div class="col-md-3">
                <table class="table">
                    <td>${obj.title}</td>
                    <tr><td><img src="${poster + obj.poster_path}" width="100"></td></tr>
                </table>
            </div>`;
}