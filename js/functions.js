
async function fetchData() {
    try {
        const respStore = await fetch("./js/store.json");
        const dataStore = await respStore.json();
        store = dataStore;
        if (!getProducts()) {
            setProducts(store);
        }else{
            if(usdBtn && uyuBtn){
                const currencyBtnStats = getProducts().some(code => code.currencyCode === "USD")
                usdBtn.disabled = currencyBtnStats ? true : false;
                uyuBtn.disabled = currencyBtnStats ? false : true;
            }
        }
        catProduct(getProducts());

        const respCurrency = await fetch("https://currency-exchange.p.rapidapi.com/exchange?to=UYU&from=USD&q=1.0",
        {headers: {
            "X-RapidAPI-Key": "9652870f74mshb8eaa011e895897p16ecc7jsn4a254c9aaf4c",
            "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com"
        }})
        const resultCurrency = await respCurrency.json();
        currency = resultCurrency;

        convertCurrency(currency);

    } catch (error) {
        console.error(error)
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Parece que algo anda mal...",
            footer: `<span>${error}</span>`
        })
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


function convertCurrency(currency){

    if(usdBtn && uyuBtn){
        usdBtn.addEventListener("click", () => {
            handleCurrencyCode(currency, "USD", usdBtn, uyuBtn);
            // handleBagCode("USD");
        });

        uyuBtn.addEventListener("click", () => {
            handleCurrencyCode(currency, "UYU", uyuBtn, usdBtn);
            // handleBagCode("UYU");
        });

        function handleCurrencyCode(currency, targetCurrencyCode, fromBtn, targetBtn) {
            const convert = getProducts().map(product => {
                const price = targetCurrencyCode === "USD" ?
                    Math.round(product.price / currency) :
                    Math.round(product.price * currency);
            
                return {
                    ...product,
                    price,
                    currencyCode: targetCurrencyCode
                };
            });
            fromBtn.disabled = true;
            targetBtn.disabled = false;

            setProducts(convert);
            catProduct(getProducts());
        }

        // function handleBagCode(targetCurrencyCode) {
        //     const convert = getProductsBag().map(product => {
        //         const price = targetCurrencyCode === "USD" ?
        //             Math.round(product.price / currency) :
        //             Math.round(product.price * currency);
            
        //         return {
        //             ...product,
        //             price,
        //             currencyCode: targetCurrencyCode
        //         };
        //     });

        //     setProductsBag(convert);
        //     renderBagProducts();
        // }
    }
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
        text: "Producto agregado",duration: 3000,newWindow: false,close: true,gravity: "top",position: "right",stopOnFocus: true,
        style: {background: "linear-gradient(to right,#8a2be2, #ae51b8)",borderRadius: "1rem",},
        offset: {x: "26%",y: "1.5rem"},
    }).showToast();

    let id = parseInt(e.currentTarget.id);
    const find = getProducts().find(item => item.id === id);

    if(getBag.some(product => product.id === id)){
        const index = getBag.findIndex(product => product.id === id);
        getBag[index].cantidad++;
    }else{
        find.cantidad = 1;
        if(find.currencyCode === "UYU"){
            find.currencyCode = "USD";
            find.price = (Math.round(find.price / currency));
        }
        getBag.push(find);
    }

    bagNumber();
    setProductsBag(getBag);
}

// render products
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
                            <span>${item.currencyCode}</span>
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
    
            const selectedtCat = getProducts().filter(item => item.type === element.id);
            catProduct(selectedtCat);
            catTitle.innerHTML = element.id;
        })
    })
}

function bagNumber(){
    const bagNum = document.querySelector("#bagNum");
    let newNumber = getBag.reduce((acc, product) => acc + product.cantidad, 0);
    bagNum.innerHTML = newNumber;
}

// SEARCH PRODUCTS
function searchProducts(){

    if(searchInput){
        let value;
        searchInput.addEventListener("input", () => {
            value = searchInput.value.toLowerCase();
        })
        searchBtn.addEventListener("click", () => {
            const result = getProducts().filter((item) => {
                return (
                    item.brand.toLowerCase().includes(value) ||
                    item.model.toLowerCase().includes(value)
                );
                
            })
            if(result.length > 0){
                catProduct(result);
            }else{
                Toastify({text: "Producto no encontrado",duration: 2000,newWindow: false,gravity: "top",position: "right",stopOnFocus: true,
                    style: {background: "linear-gradient(to right,#ca2d4f, #ae51b8)",borderRadius: "1rem",},
                    offset: {x: "26%",y: "1.5rem"},
                }).showToast();
            }
        })
    }
}


// CARRITO 
function renderBagProducts(){
    let render = "";
    if((showBag) && (getBag.length > 0)){

        getBag.forEach(product => {
            render += `
            <div class="bag__element">
                <img class="bag__element-img" src="${product.img}" alt="${product.brand}}">
                <div class="bag__element-name"><p>${product.brand} ${product.model}</p></div>
                <div class="bag__element-name"><p>Cantidad: ${product.cantidad}</p></div>
                <div class="bag__element-price"><p>$${product.price}</p><span>${product.currencyCode}</span></div>
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
    checkOutBtn();
}

// remove item
function removeBagItem(){
    const btnRemove = document.querySelectorAll(".btn-remove");
    btnRemove.forEach(item => {
        item.addEventListener("click", removeItem);
    })                                                  
}

function removeItem(e){
    Toastify({text: "Producto eliminado",duration: 3000,close: true,gravity: "top",position: "right",stopOnFocus: true,
    style: {background: "linear-gradient(to right,#ca2d4f, #ae51b8)",borderRadius: "1rem",},
        offset: {x: "26%",y: "1.5rem"},
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
        bagAmount.innerHTML = `<b>$${totalAmount}</b> `;
    }
}

function checkOutBtn(){
    const checkBtn = document.querySelector("#checkBtn");
    if(checkBtn){
        checkBtn.addEventListener("click", checkOut);
    }
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
        Swal.fire({title: "<strong>Nuevo Aquí?</u></strong>",icon: "info",html:"Para ir a pagar debes registrarte",showCloseButton: true,focusConfirm: false,confirmButtonText:"Ok!"})
        .then(value => {
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

function userLogOut(){
    logOutBtn.addEventListener("click", () => {
        sessionStorage.clear();
        location.reload();
    });
}

function scrollBottom() {
    userLogBtn.addEventListener("click", () => {
        window.scrollTo(0, document.body.scrollHeight);
        userName.focus();
    });
}


function goToCart() {
    if(goCart){
        goCart.addEventListener("click", () => {

            const productCode = getProducts().some(item => item.currencyCode === "UYU");
            if(productCode){

                    getBag.forEach(item => {

                        if(item.currencyCode === "USD"){
                            item.price = Math.round(item.price * currency);
                            item.currencyCode = "UYU";
                        }else{
                            console.log(`${item.brnad} is alrady in UYU`);
                        }
                    });
                    setProductsBag(getBag);
            }else{
                    getBag.forEach(item => {

                        if(item.currencyCode === "UYU"){
                            item.price = Math.round(item.price / currency);
                            item.currencyCode = "USD";
                        }else{
                            console.log(`${item.brnad} is alrady in USD`);
                        }
                    });
                    setProductsBag(getBag);
            }
            window.location.href = "cart.html";
        })
    }
}
    
