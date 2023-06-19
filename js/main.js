const store = getProducts();
const productsCont = document.querySelector("#productsCont");
const categoryBtn = document.querySelectorAll(".category__items");
const catTitle = document.querySelector("#categoryTitle");
const showBagBtn = document.querySelector("#showBag");
const showBagCont = document.querySelector("#showBagCont");

setProducts();
catProduct(getProducts());
selectCategory();

