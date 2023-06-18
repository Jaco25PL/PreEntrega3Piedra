

// storage
function setProducts() {
    localStorage.setItem("allProducts", JSON.stringify(productsList));
}
function getProducts() {
    return JSON.parse(localStorage.getItem("allProducts"))
}


// renderizar categorias y productos 
function catProduct(category) {
    
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
                    <button id="btnAddCart" type="button" class="btn">Add to Cart</button>
                </div>
            </div>`
    });

     productsCont.innerHTML = render;
}


// filtrar por categoria
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

