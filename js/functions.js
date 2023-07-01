
// storage
function setProducts() {
    localStorage.setItem("allProducts", JSON.stringify(productsList));
}
function getProducts() {
    return JSON.parse(localStorage.getItem("allProducts"));
}

function setProductsBag(item) {
    localStorage.setItem("allBagProducts", JSON.stringify(item));
}
function getProductsBag() {
    return JSON.parse(localStorage.getItem("allBagProducts")) || [];
}

// add to bag
function updateAddBtn(){
    addBtn = document.querySelectorAll(".btn-addBag");

    addBtn.forEach(item => {
        item.addEventListener("click", addProductBag);
    })
}

function addProductBag(e) {

    let id = parseInt(e.currentTarget.id);
    const find = store.find(item => item.id === id);

    if(getBag.some(product => product.id === id)){
        const index = getBag.findIndex(product => product.id === id);
        getBag[index].cantidad++;
    }else{
        find.cantidad = 1;
        getBag.push(find);
    }
    bagNumber();
    setProductsBag(getBag);
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
        if(getBag.length > 0){
            bagNumber();
        }
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
    let bagNum = document.querySelector("#bagNum");
    let newNumber = getBag.reduce((acc, product) => acc + product.cantidad, 0);
    bagNum.innerHTML = newNumber;
}

// SEARCH PRODUCTS
function searchProducts(){

    if(findInput){
        findInput.addEventListener("input", () => {
            let value = findInput.value.toUpperCase();
            const filter = store.includes()
        })
    }
}



// CARRITO PAGINA

function renderBagProducts(){
    let render = "";

    if((showBag) && (getBag.length > 0)){

        getBag.forEach(product => {
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
    }else if(showBag){
        showBag.className = "bag__element-name bag__element-empty";
        showBag.innerText = "Tu carrito está vacio :(";
        bagAmountCont.className = "none";   
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
    let id = parseInt(e.currentTarget.id);
    const index = getBag.findIndex(product => product.id == id);
    getBag.splice(index, 1);

    setProductsBag(getBag);
    renderBagProducts();
    total();
}


function total() {
    if(bagAmount){
        let totalAmount = 0;
        
        getBag.forEach(item => {
        totalAmount += item.price * item.cantidad;
    });

    bagAmount.innerHTML = `<b>$${totalAmount}</b> `;}
}

function checkOut(){
    let userInfo = getUserInfo();
    
    if(userInfo){
        getBag.length = 0;
        setProductsBag(getBag);
        total();
        renderBagProducts();
        showBag.innerText = "Gracias por tu compra! :)";
        
    }else{
        console.log("meter un coso de esos como sweet alert");
    }
}

// form validation
function setUserInfo(info) {
    sessionStorage.setItem("userRegist", info);
}
function getUserInfo() {
    return sessionStorage.getItem("userRegist");
}

sendForm.addEventListener("click", valForm);
function valForm() {

    if(userName.value == ""){
        alertUserName.innerText = "- Debe completar este campo -"
        return false
    }else{
        alertUserName.innerText = ""
    }

    if(userTel.value == ""){
        alertUserTel.innerText = "- Completa el campo con tu numero -";
        return false
    }else{
        alertUserTel.innerText = "";
    }
    
    setUserInfo(userName.value);    
    form.submit();  
}

function userChange(){  
    const info = getUserInfo();

    if(info){
        userLogBtn.innerHTML = info;
        userLogBtn.classList.add("log-btn-user");

        sendForm.innerText = "Nuevo Usuario";
    }else{
        userLogBtn.innerHTML = "Registrarme";
    }

    if(info){
        logOut.classList.remove("none");
    }else{
        logOut.className = "none";
    }
}


logOutBtn.addEventListener("click", userLogOut);
function userLogOut() {
    sessionStorage.clear();
    location.reload();
}

function scrollBottom() {
    userLogBtn.addEventListener("click", scrollToBottom);
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }