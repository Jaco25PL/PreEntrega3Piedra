// Mision:
// 1) Pedirle al usuario que ingrese correctamente su peso y altura
// 2) Calcular su IMC. Luego mostrar por alert su peso, altura, IMC, u un mensaje agradable
// 3) Siguiente usuario, es decir, que se repita!

let userWeight = parseFloat(prompt("Cuanto pesa la criatura?"))
    console.log("Peso: "+userWeight+"Kg")

let userHeight = parseFloat(prompt("Y de altitud como andamos?"))
    console.log("Altura: "+((userHeight/100).toFixed(2))+"m")

    if(userHeight<10){
        alert("La altura en centimetros porfa")
    }else{
        alert(`Su peso es: ${userWeight}Kg\nSu altura es: ${(userHeight/100).toFixed(2)}m`)
    }

