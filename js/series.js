let posterS = "https://image.tmdb.org/t/p/w500/";
let api_key = "a942d3966a09e081af050ca19fb39e10";
//const form  = document.getElementById('fbuscar');


//Obtener peliculas pagina pricipal
async function getSeriesP(){
    var pPrincipal = await (await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=a942d3966a09e081af050ca19fb39e10&language=es-ES&sort_by=popularity.desc&page=1`)).json();
    console.log("Series pagina principal:",pPrincipal);
    agregarSerie(pPrincipal, "Series del momento");
}


/*
//Obtener peliculas por busqueda
async function buscarSeries(){
    const lbuscar  = document.getElementById('buscar');
    
    var peliBuscar = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=es-ES&query=${lbuscar.value}&page=1&include_adult=true`)).json();
    console.log("Busqueda peliculas:",peliBuscar);
    agregarPG(peliBuscar);
}
form.addEventListener('submit', (event) => {
    buscarSeries();
});
*/



//Agregar Series
function agregarSerie(obj, titulo){
    let tabla = document.getElementById('series');
    document.getElementById('titulo').innerHTML = titulo;
    tabla.innerHTML = "";
    let img, nombre;

    for (var i = 0; i < 20; i++) {
        if(!obj.results[i].poster_path){
            img = "img/notfound.gif";
        }else{
            img = posterS + obj.results[i].poster_path;
        }
        
        if(!obj.results[i].belongs_to_collection){
            nombre = obj.results[i].name;
        }else{
            nombre = obj.results[i].name
        }

        tabla.innerHTML += `<div class="col-md-3">
                <table class="table">
                    <tr><th>${obj.results[i].name} ${obj.results[i].vote_average}</th></tr>
                    <tr><td>${obj.results[i].first_air_date}</td></tr>
                    <tr><td><a href="serie.html"><img src="${img}" width="100" onclick="setSerieId(${obj.results[i].id})")"></a></td></tr>
                </table>
            </div>`;
     }
}


function setSerieId(id){
    // Almacena la información en sessionStorage
    sessionStorage.setItem("pId", id);
}


//Obtener peliculas por id
async function serieId() {
    
    // Obtiene la información almacenada desde sessionStorage
    var id = sessionStorage.getItem('pId');
    console.log(id);
    var obj = await (await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=es-ES`)).json();
    console.log(obj);

    agregarSerieId(obj);
}


//Agregar Peliculas por ID
function agregarSerieId(obj){
    let art = document.getElementById('serie');

    art.innerHTML = `
                        <h1 id="titulo">${obj.name}</h1>
                        <h4>Estreno: ${obj.first_air_date}</h4>
                        <img src="${posterS + obj.poster_path}" width="200">
                        <p>${obj.overview}</p>`;
}