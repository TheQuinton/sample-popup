/** Context: At (Company) we often execute complex problems using entirely front-end JavaScript.
* For this challenge your solution should work if it is pasted directly into the JavaScript console of the browser after the page has fully loaded.
* Feel free to use jQuery. Also, our (Company) products must work across all browsers, but we will be testing your challenge in Chrome.
*
* Go to www.marmot.com and add at least 2 products to your cart. Then return to the home page.
*
* Write a JavaScript snippet that can be run in the console of the browser that does the following:
*
* Extracts the number of items in the cart, the cart total, and the item images from the page. Store them in variables.
*
* Create a trigger that activates when the user scrolls into the bottom 10% of the page.
*
* The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons.
* One button should close the overlay and the other should take the user to the cart page.
* It should have a style consistent with the website. Design matters.
*
* Behind the overlay add a semi­transparent black background that obscures the site. The overlay should be able to trigger multiple times if dismissed.
*
* BONUS
*
* 1. Explain potential problems that could arise if this snippet had more or less than the 2 items in the cart. How would you address those problems?
*
* For empty carts, I added an extra clause to check for an empty cart before calling the modal, so for an empty cart, the modal won't called.
* For carts with large numbers of different items, one option would be to change the current cart item display to be more of an accordion dropdown.
* The accordion would display only text related to the item when closed, and would show all the information when expanded.
* Another option would be to set a limit on displayed items, say 5, and then have the remaining items hidden while showing some representative text.
*
*/
// CSS
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: none;
    overflow: auto;
    background-color: #000000;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
  }
  .modal-window {
    position: relative;
    background-color: #fff;
    width:fit-content;
    margin: 10% auto;
    padding: 20px;
  }
  .modal-close {
    position: absolute;
    top: 0;
    right: 0;
    color: rgba(0,0,0,0.3);
    height: 30px;
    width: 30px;
    font-size: 30px;
    line-height: 30px;
    text-align: center;
  }
  .modal-close:hover,
  .modal-close:focus {
    color: #000000;
    cursor: pointer;
  }
  .open {
    display: block;
  }
  .modal-btn{
    color: #fff;
    background-color: #ca2027;
    padding: 10px;
    display:inline-block;
  }
  .modal-title{
    font-family: ars_maquette_problack,sans-serif;
    font-size:1.17em;
  }
  .modal-cart{
    padding:10px 0;
  }
  .modal-cart-item{
    display:grid;
    grid-template-columns:1fr 3fr 50px 50px;
    gap:10px;
    margin:10px 0;
    align-items: center;
    border-bottom:1px solid #4c4c4c;
  }
  .modal-cart-item > img{
    margin:10px 0;
  }
  .modal-cart-item > h4{
    font:14px/1 ars_maquette_problack,sans-serif;
  }
  .modal-cart-item > p{
    color:#4c4c4c;
  }
  .modal-cart-item > p:last-child{
    justify-self: right;
  }
  .modal-cart-total{
    border-bottom:none;
  }
  .modal-cart-total h4{
    justify-self: right;
  }
`);
document.adoptedStyleSheets = [sheet];
// Close Modal
document.addEventListener('click', e => {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        document.body.style.overflow = 'initial';
        document.body.style.marginRight = 'initial';
        setTimeout(()=>{called = false},5000);
    }
}, false);
// Pull cart data
const cartData = () => {
  const items = document.getElementsByClassName("mini-cart-product");
  const data = [];
  for (let i=0; i < items.length; i++){
    let image = items[i].getElementsByTagName("IMG")[0].currentSrc;
    let name = items[i].getElementsByClassName("mini-cart-name")[0].innerText.trim();
    let quantity = items[i].getElementsByClassName("mini-cart-pricing")[0].getElementsByClassName("value")[0].innerText;
    let price = items[i].getElementsByClassName("mini-cart-pricing")[0].getElementsByClassName("mini-cart-price")[0].lastElementChild.innerText;
    data[i] = {image:image,name:name,quantity:parseInt(quantity),price:parseFloat(price.replace(/[^0-9\.]+/g,"")).toFixed(2)};
  }
  return data;
}
// create and open modal
const callModal = data => {
  const fragment = document.createDocumentFragment();
  const cart = document.createElement("ul");
  cart.classList.add("modal-cart");
  let quantity = 0;
  let total = 0;
  for (let i =0; i< data.length; i++){
    cart.innerHTML += `<li class="modal-cart-item">
      <img src=`+ data[i].image +` />
      <h4>`+ data[i].name +`</h4>
      <p>Qty: `+ data[i].quantity +`</p>
      <p>$`+ data[i].price +`</p>
      </li>`
    quantity += data[i].quantity;
    total += data[i].price*data[i].quantity;
    if (i === data.length-1){
      cart.innerHTML += `<li class="modal-cart-item modal-cart-total">
        <div></div>
        <h4>Total:</h4>
        <p>Qty: `+ quantity +`</p>
        <p>$`+ total.toFixed(2) +`</p>
        </li>`
    }
  }

  const content = `
    <div id="modal" class="modal open">
      <div class="modal-window">
        <span class="modal-close" data-dismiss="modal">x</span>
        <h3 class="modal-title">Your Cart</h3>
        `+ cart.outerHTML +`
        <a class="modal-btn" data-dismiss="modal">Close</a>
        <a class="modal-btn float-right" href="https://www.marmot.com/cart">Go to Cart</a>
      </div>
    </div>`;

  const div = document.createElement("div");
  div.innerHTML = content;
  while (div.firstChild) {
      fragment.appendChild(div.firstChild);
  }
  document.body.appendChild(fragment);
  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = '17px';
};
// scroll to bottom 10% of page trigger
var called = false;
const handleScroll = evt => {
  if(document.documentElement.clientHeight - window.scrollY < (document.documentElement.scrollHeight-document.documentElement.clientHeight)/10 && !called){
    if(document.querySelector(".mini-cart-container").dataset.quantity !== "0"){
      called = true;
      callModal(cartData());
    }
  }
};

document.defaultView.onscroll = evt => handleScroll(evt);
