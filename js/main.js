// INDEX
const store = getProducts();
const productsCont = document.querySelector("#productsCont");
const categoryBtn = document.querySelectorAll(".category__items");
const catTitle = document.querySelector("#categoryTitle");
// CARRITO
const getBag = getProductsBag();
let btnRemove = document.querySelectorAll(".btn-remove");
const showBag = document.querySelector("#showBag");
const bagAmount = document.querySelector("#totalAmount");
const bagAmountCont = document.querySelector("#bagAmountCont");
// FORM
const form = document.querySelector("#form");
const userName = document.querySelector("#formUserName");
const alertUserName = document.querySelector("#alertUserName");
const userTel = document.querySelector("#formUserTel");
const alertUserTel = document.querySelector("#alertUserTel");

setProducts();
catProduct(getProducts());
selectCategory();

total()
renderBagProducts()
