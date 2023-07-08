// HOME
let store;
let currency;
const productsCont = document.querySelector("#productsCont");
const categoryBtn = document.querySelectorAll(".category__items");
const catTitle = document.querySelector("#categoryTitle");
const logOut = document.querySelector(".log-out-cont");
const logOutBtn = document.querySelector(".log-out-btn");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

const usdBtn = document.querySelector("#toUsd");
const uyuBtn = document.querySelector("#toUyu");
// BAG
const getBag = getProductsBag();
const showBag = document.querySelector("#showBag");
const bagAmount = document.querySelector("#totalAmount");
const bagAmountCont = document.querySelector("#bagAmountCont");
// FORM
const form = document.querySelector("#form");
const sendForm = document.querySelector("#sendForm");
const userName = document.querySelector("#formUserName");
const alertUserName = document.querySelector("#alertUserName");
const userTel = document.querySelector("#formUserTel");
const alertUserTel = document.querySelector("#alertUserTel");
const userLogBtn = document.querySelector(".log-btn");

fetchData();
selectCategory();
searchProducts();
userLogOut();

total();
renderBagProducts();

userChange();
scrollBottom();


