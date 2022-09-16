//NULL
let prueba = 0;
let nulo = null;
console.log(prueba, nulo);

prueba = null;
console.log(prueba, nulo);


//UNDEFINED
//Cuando no se le asigna un valor a una variable
let indefinido;
console.log(indefinido)

function potencia(nombre){
    console.log("Hola:", nombre);
}
potencia(indefinido);

//Cuando no se asigna un valor a un arreglo u objeto
let numArreglo = [1,2,,4];
console.log(numArreglo[2]);

//Cuando una funcion no tiene declarado un return y se utiliza para asignar un valor a una variable
let add = (a,b) => {
    let c = a+b;
  }
  let sum = add(2,3);
  console.log(sum); 


