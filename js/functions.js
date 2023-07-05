async function fetchData() {
    try {
        const response = await fetch("./js/store.json");
        const data = await response.json();

        store = data;
        setProducts(store);
        catProduct(getProducts());

    } catch (error) {
        console.log("This is an error", error);
    }
}


// storage
function setProducts(products) {
    localStorage.setItem("allProducts", JSON.stringify(products));
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
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "cart.html",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right,#8a2be2, #ae51b8)",
            borderRadius: "1rem",
        },
        offset: {
            x: "26%",
            y: "1.5rem"
        },
    }).showToast();

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

//  navegar entre categorias
function selectCategory(){
    categoryBtn.forEach(element => {
        element.addEventListener("click", () => {
    
            const selectedtCat = store.filter(item => item.type === element.id);

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
        let value;
        findInput.addEventListener("input", () => {
            value = findInput.value.toLowerCase();
        })
        searchBtn.addEventListener("click", () => {
            const result = store.filter(item => item.brand.toLowerCase().startsWith(value));
            if(result.length > 0){
                catProduct(result);
            }else{
                Toastify({
                    text: "Producto no encontrado",
                    duration: 2000,
                    newWindow: false,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right,#8a2be2, #ae51b8)",
                        borderRadius: "1rem",
                    },
                    offset: {
                        x: "26%",
                        y: "1.5rem"
                    },
                }).showToast();
            }
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

// remove item
function removeBagItem(){
    btnRemove = document.querySelectorAll(".btn-remove");
    btnRemove.forEach(item => {
        item.addEventListener("click", removeItem);
})                                                  
}

function removeItem(e){
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right,#ca2d4f, #ae51b8)",
            borderRadius: "1rem",
        },
        offset: {
            x: "26%",
            y: "1.5rem"
        },
    }).showToast();

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
        Swal.fire({
            title: "Gracias por elegirnos!",
            icon: "success",
        })
    }else{
        Swal.fire({
            title: "<strong>Nuevo Aquí?</u></strong>",
            icon: "info",
            html:"Para ir a pagar debes registrarte",
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:"Ok!"
        }).then(value => {
            if (value) {
                window.scrollTo(0, document.body.scrollHeight);
            }})
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
        logOut.classList.remove("none");

        sendForm.innerText = "Nuevo Usuario";
    }else{
        userLogBtn.innerHTML = "Registrarme";
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
    userName.focus();
  }






