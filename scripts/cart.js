document.addEventListener('DOMContentLoaded', () => {
  load_cart_items();
  load_cart_quantity();
  load_cart_price_total();
});

function load_cart_price_total(){
  const cp=JSON.parse(localStorage.getItem('cartProducts'))||[];
  let totalcartprice=0;
  cp.forEach((pro)=>{
    totalcartprice+=Number(pro.productPrice)*Number(pro.productQuantity);
  })
  document.querySelector('.js-total-price-products').innerHTML=`$ ${totalcartprice}`;
}

const queryParams = new URLSearchParams(window.location.search);
const productId = queryParams.get('id');
const productName = queryParams.get('name');
const productImage = queryParams.get('image');
const productPrice = queryParams.get('price');
const productQuantity = Number(queryParams.get('quantity'));

const singleProductContainer = document.querySelector('.js-product-single');
singleProductContainer.innerHTML = `
  <div class="product-single-cont">
    <div class="singlebadaimg">
      <img src="${productImage}" width="100%" id="mainimg" alt="">
    </div>
    <div class="singlebadadetails">
      <h6>Home / Cakes</h6>
      <h4>${productName}</h4>
      <h2>₹ ${productPrice}</h2>
      <select name="" id="">
        <option>Select Size</option>
        <option>500 gm</option>
        <option>1 kg</option>
        <option>1.5 kg</option>
        <option>2 kg</option>
      </select>
      <input type="number" value="1" class="js-single-cart-quantity">
      <button class="shopbtntrans js-add-to-cart" data-product-id="${productId}" data-product-name="${productName}" data-product-img="${productImage}" data-product-price="${productPrice}" data-product-quantity="${productQuantity}">
          Add To Cart
        </button>

      <h4>Cake Details</h4>
      <div class="descrip">
        <ul>
          <li>Cake Name: Cherry Cake</li>
          <li>Type of Cake: Cream</li>
          <li>Frosting: Buttercream</li>
          <li>Serving Suggestions: Serves 8-10 people</li>
          <li>Available Sizes: Small, Medium, Large, Customizable</li>
        </ul>
      </div>
    </div>
  </div>
`;

function load_cart_quantity(){
  const cp=JSON.parse(localStorage.getItem('cartProducts')) || [];

  let cartTotalQuantity=0;
  cp.forEach((item) =>{
    cartTotalQuantity+=Number(item.productQuantity);
  });
  document.querySelectorAll('.js-shop-quantity').forEach((shopicon)=>{
    shopicon.innerHTML=`(${cartTotalQuantity})`;
  });
}

function load_cart_items(){
  const cp=JSON.parse(localStorage.getItem('cartProducts')) || [];

  let cartProductsHTML='';
  cp.forEach((item) => {
    cartProductsHTML+=`
    <div class="cart-single-product">
                <div class="cart-single-img">
                    <img src="${item.productImg}" alt="">
                </div>
                <div class="cart-single-desc">
                    <h4>${item.productName}</h4>
                    <p>Quantity : ${item.productQuantity}</p>
                    <p>Price : $ ${item.productPrice}</p>
                    <button class="js-cart-single-remove cart-single-buttons" onclick="removeCartProduct('${item.productId}')">Delete</button>
                </div>
            </div>
    `;
  });
  const cartProductContainer = document.querySelector('.cart-product-container');
  if (cartProductContainer) {
    cartProductContainer.innerHTML = cartProductsHTML;
  }
}

function removeCartProduct(productId) {
  const cp = JSON.parse(localStorage.getItem('cartProducts')) || [];

  cp.forEach((item) => {
    if (item.productId === productId) {
      if (Number(item.productQuantity) === 1) { 
        localStorage.setItem('cartProducts', JSON.stringify(cp));
        console.log(cp);
        deleteCartProduct(`${item.productId}`);
      } else {
        item.productQuantity--;
        localStorage.setItem('cartProducts', JSON.stringify(cp));
      }
    }
  });
  load_cart_items();
  load_cart_quantity();
  load_cart_price_total();
}

function deleteCartProduct(productId){
  console.log(productId);
  const cp = JSON.parse(localStorage.getItem('cartProducts')) || [];
  for (let i = 0; i < cp.length; i++) {
    if (cp[i].productId === productId) {
      cp.splice(i, 1);
      localStorage.setItem('cartProducts', JSON.stringify(cp));
      load_cart_items();
      load_cart_quantity();
      load_cart_price_total();
      break;
    }
  }
}

function clearCartProduct() {
  localStorage.clear() || console.log("no products");
  load_cart_items();
  load_cart_quantity();
  load_cart_price_total();
}

document.querySelector('.js-clear-cart').addEventListener('click', 
  clearCartProduct()
);

