'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

//------------------------------------------------------------------------------

const cartCounterEl = document.querySelector('.cartCounter');
const cartModal = document.querySelector(".modal");
const cartItemsEl = document.querySelector('#cart-items');
const cartTotalEl = document.querySelector('#cart-total');
const cartCloseBtn = document.querySelector('#cart-close');

const itemsInCart = [];

function addToCart(item){    
    itemsInCart.push(item);
    cartCounterEl.innerHTML = itemsInCart.length;
}

document.querySelector('.cartIconWrap').addEventListener('click', event => { 
    if (itemsInCart.length > 0) {

        const groupedItems = groupItems(itemsInCart);
        const summedItems = sumItems(groupedItems);
        const total = getTotal(summedItems);

        summedItems.forEach(item => {
            const name = document.createElement('td');
            name.innerText = item.name;
            const quantity = document.createElement('td');
            quantity.innerText = item.quantity;
            const price = document.createElement('td');
            price.innerText = `$${item.price}`; 
            const sum = document.createElement('td');
            sum.innerText =  `$${item.sum}`;
            const tr = document.createElement('tr');
            tr.append(name, quantity, price, sum);
            cartItemsEl.append(tr);
        });
        
        cartTotalEl.innerText = `$${total}`;
        cartModal.style.display = "block";
    }    
});

function groupItems(items){
    const grouped = items.reduce((prev, item) => {
        prev[item.id] = [...prev[item.id] || [], item];
        return prev;
       }, {})    
    return Object.values(grouped);
}

function sumItems(items){     
    let result = [];
    items.forEach(item => {
        item[0].sum = 0;        
        const sum = item.reduce( (prev, item) =>{
            prev.sum += +item.price;
            prev.sum  = +prev.sum.toFixed(2);
            return prev;
        }, item[0]);  
        sum.quantity = item.length;
        result.push(sum); 
    })
    return result;
}

function getTotal(items){
    const total = items.reduce((prev, item) => {
        return prev + item.sum;
    }, 0)
    return +total.toFixed(2);
}

cartCloseBtn.addEventListener('click', closeCart);

function closeCart(){
    cartModal.style.display = "none";
    removeAllChildNodes(cartItemsEl);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//------------------------------------------------------------------------------

const itemsOnServer = [{
        id: 1,
        src: "images/featured/1.jpg",
        name: 'Product 1',
        price: 35.99,
        text: `Known for her sculptural takes on traditional tailoring,
        Australian arbiter of cool Kym Ellery teams up with Moda Operandi.`
    },{
        id: 2,
        src: "images/featured/2.jpg",
        name: 'Product 2',
        price: 55.17,
        text: `Known for her sculptural takes on traditional tailoring,
        Australian arbiter of cool Kym Ellery teams up with Moda Operandi.`
    },{
        id: 3,
        src: "images/featured/3.jpg",
        name: 'Product 3',
        price: 42.42,
        text: `Known for her sculptural takes on traditional tailoring,
        Australian arbiter of cool Kym Ellery teams up with Moda Operandi.`
    },{
        id: 4,
        src: "images/featured/4.jpg",
        name: 'Product 4',
        price: 65.00,
        text: `Known for her sculptural takes on traditional tailoring,
        Australian arbiter of cool Kym Ellery teams up with Moda Operandi.`
    },{
        id: 5,
        src: "images/featured/5.jpg",
        name: 'Product 5',
        price: 99.99,
        text: `Known for her sculptural takes on traditional tailoring,
        Australian arbiter of cool Kym Ellery teams up with Moda Operandi.`
    },{
        id: 6,
        src: "images/featured/6.jpg",
        name: 'Product 6',
        price: 77.77,
        text: `Known for her sculptural takes on traditional tailoring,
        Australian arbiter of cool Kym Ellery teams up with Moda Operandi.`
    },
];
window.addEventListener('load', (event) => {
    itemsOnServer.forEach(item => {
        const featuredItemEl = document.createElement('div');
        featuredItemEl.classList.add('featuredItem');
        featuredItemEl.dataset.id = item.id;
        featuredItemEl.dataset.name = item.name;
        featuredItemEl.dataset.price = item.price;  

        const img = document.createElement('img');
        img.setAttribute('src', item.src);
        img.setAttribute('alt', '');    

        const featuredImgDarkEl = document.createElement('div');
        featuredImgDarkEl.classList.add('featuredImgDark');
        const button = document.createElement('button');
        button.insertAdjacentHTML('beforeend', '<img src="images/cart.svg" alt="">');
        button.insertAdjacentHTML('beforeend', 'Add to Cart');    
        featuredImgDarkEl.append(button);

        const featuredImgWrapEl = document.createElement('div');
        featuredImgWrapEl.classList.add('featuredImgWrap');
        featuredImgWrapEl.append(img, featuredImgDarkEl)

        const featuredNameEl = document.createElement('div');
        featuredItemEl.classList.add('featuredName');
        featuredNameEl.innerText = item.name;

        const featuredTextEl = document.createElement('div');
        featuredTextEl.classList.add('featuredText');
        featuredTextEl.innerText = item.text;

        const featuredPriceEl = document.createElement('div');
        featuredPriceEl.classList.add('featuredPrice');
        featuredPriceEl.innerText = `$${item.price}`;

        const featuredDataEl = document.createElement('div');
        featuredDataEl.classList.add('featuredData');
        featuredDataEl.append(featuredNameEl, featuredTextEl, featuredPriceEl);

        featuredItemEl.append(featuredImgWrapEl, featuredDataEl);

        const featuredItemsEl = document.querySelector('.featuredItems');  
        featuredItemsEl.append(featuredItemEl);
    });      
    
    document.querySelector('.featuredItems').addEventListener('click', event => {    
        if (event.target.nodeName === 'BUTTON') {
    
            let currentNode = event.target;
            while(!currentNode.classList.contains('featuredItem')){
                currentNode = currentNode.parentNode;            
            }
            
            const item = {
                id: currentNode.dataset.id,
                name: currentNode.dataset.name, 
                price: currentNode.dataset.price
            }
            addToCart(item);        
        }
    })
});
