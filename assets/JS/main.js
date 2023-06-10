
var Product = [];

document.getElementById("iphone").checked = true;
document.getElementById("samsung").checked = true;
document.getElementById("xiaomi").checked = true;
document.getElementById("huawei").checked = true;

// Global functions

getData = function () {
  fetch("http://127.0.0.1:3000/phones.json")
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error: " + response.status);
    }
  })
  .then(data => {
    let products = JSON.parse(data);
    Product = products
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
}

refreshSite = function(){
 getData()

 let priceLow = document.getElementById("priceLow");
 let priceHigh = document.getElementById("priceHigh");

 if(priceLow.checked){
   Product = sortTable(Product, "increasing")
 }

 if(priceHigh.checked){
   Product = sortTable(Product, "decreasing")
 }

 for(let i = Product.length - 1; i >= 0; i--){
   if( parseInt(Product[i].cena) * 1000 > parseInt(getPrice())) {
     Product.splice(i, 1);
   }
 }

 let infos = getFIlter()
 let phoneList = [];

 for(let [key, value] of Object.entries(infos)){
   if(value === 1){
     phoneList.push(key.toUpperCase());
   }
 }

 let newTable = Product.filter((elem) => phoneList.includes(elem.marka));
 let output = "";
 for(let item of newTable){
   output += `
     <div id="devicesList">
       <div class="block">
       <img src="${item.slika.putanja}" alt="${item.slika.alt}" />
       <h3>${item.marka} ${item.model}</h3>
       <ul>
         <li>Display:  ${item.specifikacije.ekran}</li>
         <li>RAM: ${item.specifikacije.RAM}</li>
         <li>Memory: ${item.specifikacije.memorija}
         <li>Proccesor: ${item.specifikacije.procesor}</li>
         <li>OS: ${item.specifikacije.operativniSistem}</li>
         <li>Camera:
           <ul>
             <li>Front: ${item.specifikacije.kamera.prednja}</li>
             <li>Rear: ${item.specifikacije.kamera.zadnja}</li>
           </ul>
         </li>
       </ul>
       <h4>${item.cena} <span>RSD</span></h4>
       <a class="chartText" href="#cart" data-id="${item.id}">ADD TO CART</a>
       </div>
     </div> `;
 }
 document.getElementById("devicesList").innerHTML = output;
 phoneList = [];
}

getPrice = function() {
 let price = document.getElementById("rangePrice");
 return price.value;
}

setPrice = function() {
 let price = getPrice();
 let newPrice = document.getElementById("setPrice");
 newPrice.textContent = price + " RSD";
}

sortTable = function(tableX, type) {
 let table = tableX;
 if(type == "decreasing") {
   table.sort(function(a, b) {
     return b.cena - a.cena;
   })
 }else if(type == "increasing"){
   table.sort(function(a, b) {
     return a.cena - b.cena
   })
 }
 return table;
}

//Filltering by brand
getFIlter = function(){
 let iphone = document.getElementById("iphone")
 let samsung = document.getElementById("samsung")
 let xiaomi = document.getElementById("xiaomi")
 let huawei = document.getElementById("huawei") 

 let Table ={
   iphone: 0,
   samsung: 0,
   xiaomi: 0,
   huawei: 0,
 };

 if (iphone.checked) { 
  Table.iphone = 1
 }else { 
  Table.iphone = 0
 }

 // Samsung

 if (samsung.checked) { 
  Table.samsung = 1
 }else { 
  Table.samsung = 0
 }

 // Xaomi 

 if (xiaomi.checked) { 
  Table.xiaomi = 1
 }else { 
  Table.xiaomi = 0
 }

 // Huawei

 if (huawei.checked) { 
  Table.huawei = 1
 }else { 
  Table.huawei = 0
 }

 return Table
}

setInterval(function () {
 setPrice() // price setting
 refreshSite() //site refresh
}, 500);



