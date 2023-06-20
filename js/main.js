const store = getProducts();

const productsCont = document.querySelector("#productsCont");
const categoryBtn = document.querySelectorAll(".category__items");
const catTitle = document.querySelector("#categoryTitle");

let btnRemove = document.querySelectorAll(".btn-remove");
const showBag = document.querySelector("#showBag");
const bagAmount = document.querySelector("#totalAmount");

setProducts();
catProduct(getProducts());
selectCategory();

total()
renderBagProducts()
