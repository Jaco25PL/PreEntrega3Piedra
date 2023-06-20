
// storage
function setProducts() {
    localStorage.setItem("allProducts", JSON.stringify(productsList));
}
function getProducts() {
    return JSON.parse(localStorage.getItem("allProducts"))
}

function setProductsBag(item) {
    localStorage.setItem("allBagProducts", JSON.stringify(item));
}
function getProductsBag() {
    return JSON.parse(localStorage.getItem("allBagProducts")) || [];
}

// add to bag
function updateAddBtn(){
    addBtn = document.querySelectorAll(".btn-addBag")

    addBtn.forEach(item => {
        item.addEventListener("click", addProductBag);
    })
}

function addProductBag(e) {

    const getBag = getProductsBag();
    const allProducts = getProducts();

    let id = parseInt(e.currentTarget.id);
    const find = allProducts.find(item => item.id === parseInt(id))

    if(getBag.some(product => product.id === id)){
        const index = getBag.findIndex(product => product.id === id)
        getBag[index].cantidad++;
    }else{
        find.cantidad = 1;
        getBag.push(find);
    }

    bagNumber()
    setProductsBag(getBag)
}



// renderizar categorias y productos 
function catProduct(category) {
    
    if(productsCont){    
        let render = "";
        category.forEach(item => {

            render += `
                <div class="product">
                    <div class="product__img-cont">
                        <img class="product__img" src="${item.img}" alt="Product">
                    </div>
                    <div class="product__description">
                        <p><b>${item.brand}</b> ${item.model}</p>
                        <div class="product__price">
                            <p>$${item.price}</p>
                            <span>USD</span>
                        </div>
                        <button id="${item.id}" type="button" class="btn btn-addBag">Add to Cart</button>
                    </div>
                </div>`
        });

        productsCont.innerHTML = render;
    }
    updateAddBtn();
}


function filterStore(type) {
    return store.filter(item => item.type === type);
}

//  navegar entre categorias
function selectCategory(){
    categoryBtn.forEach(element => {
        element.addEventListener("click", () => {
    
            const selectedtCat = filterStore(element.id);
            catProduct(selectedtCat);

            catTitle.innerHTML = element.id;
        })
    })
}

function bagNumber(){
    const getBag = getProductsBag();

    let bagNum = document.querySelector("#bagNum");
    let newNumber = getBag.reduce((acc, product) => acc + product.cantidad, 1);
    bagNum.innerHTML = newNumber;
}


// CARRITO PAGINA

function renderBagProducts(){

    if(showBag){
        const bag = getProductsBag();
        let render = "";

        bag.forEach(product => {
            render += `
            <div class="bag__element">
                <img class="bag__element-img" src="${product.img}" alt="${product.brand}}">
                <div class="bag__element-name"><p>${product.brand} ${product.model}</p></div>
                <div class="bag__element-name"><p>Cantidad: ${product.cantidad}</p></div>
                <div class="bag__element-price"><p>$${product.price}</p><span>USD</span></div>
                <button class="btn btn-remove" type="button" id="${product.id}">Remover del Carrito</button>
            </div>`
        });

        showBag.innerHTML = render;
    }
    removeBagItem();
}

function removeBagItem(){
    btnRemove = document.querySelectorAll(".btn-remove");
    
    btnRemove.forEach(item => {
        item.addEventListener("click", removeItem);
    })
}

// remove item
function removeItem(e){
    const bagItems = getProductsBag();

    let id = parseInt(e.currentTarget.id);
    const index = bagItems.findIndex(product => product.id == id);
    bagItems.splice(index, 1);

    setProductsBag(bagItems);
    renderBagProducts();
    total();
}

function total() {
    if(bagAmount){
        const bag = getProductsBag();
        let totalAmount = 0;
        bag.forEach(item => {
        totalAmount += item.price;
    });

    bagAmount.innerHTML = `<b>$${totalAmount}</b> `;}
}

function checkOut(){
    const ty = document.querySelector("#ty");
    const bagItems = getProductsBag();
    
    ty.innerHTML = "Gracias por tu compra!"
    
    bagItems.length = 0;
    setProductsBag(bagItems);
    total();
    
    renderBagProducts()

}
// form validation

function valForm() {
    let form = document.querySelector("#form");
    let userName = document.querySelector("#formUserName");
    let alertUserName = document.querySelector("#alertUserName");
    let userTel = document.querySelector("#formUserTel");
    let alertUserTel = document.querySelector("#alertUserTel");
    
    if(userName.value == ""){
        alertUserName.innerHTML = "- Debe completar este campo -"
        return false
    }else{
        alertUserName.innerHTML = ""
    }

    if(userTel.value == ""){
        alertUserTel.innerHTML = "- Completa el campo con tu numero -";
        return false
    }else{
        alertUserTel.innerHTML = "";
    }

    form.submit();
}

