
const showBag = document.querySelector("#showBag");
const bagAmount = document.querySelector("#totalAmount");


// setProducts();
// getProducts(); 

getProductsBag();   
renderBagProducts()
total()

function getProductsBag() {
    return JSON.parse(localStorage.getItem("allBagProducts")) || [];
}

console.log(getProductsBag());


// // function getProductsBag() {
//     // return JSON.parse(localStorage.getItem("allBagProducts")) || [];
// // }


function renderBagProducts(){
    const bag = getProductsBag();
    let render = "";

    bag.forEach(product => {
        render += `
        <div class="bag__element">
            <img class="bag__element-img" src="${product.img}" alt="${product.brand}}">
            <div class="bag__element-name"><p>${product.brand} ${product.model}</p></div>
            <div class="bag__element-price"><p>$${product.price}</p><span>USD</span></div>
            <button class="btn btn-remove" type="button" >Remover del Carrito</button>
        </div>`
    });

    showBag.innerHTML = render;
}

function total() {
    const bag = getProductsBag();
    let totalAmount = 0;

    bag.forEach(item => {
        totalAmount += item.price;
    });

    bagAmount.innerHTML = `<b>$${totalAmount}</b> `;
}


