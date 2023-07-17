// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Get DOM elements
const buyNowButton = document.getElementById('buy-now');
const deliverySection = document.getElementById('delivery-section');
const deliveryForm = document.getElementById('delivery-form');
const progressSection = document.getElementById('progress-section');
const progressMessage = document.getElementById('progress-message');

// Add event listener to Buy Now button
buyNowButton.addEventListener('click', function() {
  deliverySection.classList.remove('hidden');
});

// Add event listener to Delivery Form
deliveryForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get user input
  const location = document.getElementById('location').value;
  const phone = document.getElementById('phone').value;

  // Simulate delivery progress
  simulateDeliveryProgress(location, phone);
});

// Simulate delivery progress
function simulateDeliveryProgress(location, phone) {
  progressSection.classList.remove('hidden');

  // Simulate progress update every 2 seconds
  let progress = 0;
  const interval = setInterval(function() {
    progress += 20;
    progressMessage.textContent = `Product is ${progress}% on the way to ${location}.`;

    // If progress reaches 100%, delivery is complete
    if (progress >= 100) {
      clearInterval(interval);
      progressMessage.textContent = 'Product has been delivered.';
    }
  }, 2000);
}


// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// cart working js
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// making function
function ready(){
    // Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

// Buy Button
function buyButtonClicked(){
    // alert('Your order is placed')
    // prompt('Enter your location')
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var deliverySection = document.getElementById("delivery-section");
    deliverySection.classList.remove("hidden");
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function simulateDeliveryProgress(location, phone) {
  var progressSection = document.getElementById("progress-section");
  progressSection.classList.remove("hidden");
  var progressMessage = document.getElementById("progress-message");

  // Simulate progress update every 2 seconds
  var progress = 0;
  var interval = setInterval(function() {
    progress += 20;
    progressMessage.textContent = `Product is ${progress}% on the way to ${location}.`;

    // If progress reaches 100%, delivery is complete
    if (progress >= 100) {
      clearInterval(interval);
      progressMessage.textContent = "Product has been delivered.";
    }
  }, 2000);
}


// Remove items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}


// Quantity Changes
function quantityChanged(event){
    var input = event.target;
    if (!isNaN(input.value) || input.value <= 0){
        input.value <= 1;
    }
    updatetotal();
}

function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div")
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to cart");
            return;
        }
    }
var cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove Cart -->
                            <i class='bx bxs-trash-alt cart-remove'></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("Ksh", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // If price contains some cents Value
    // total = Math.round(total * 100) / 100;
    total = Math.round(total * 1000);

    document.getElementsByClassName("total-price")[0].innerText = "Ksh." + total;
}


// Dropdown
document.addEventListener('DOMContentLoaded', function() {
    var dropdownItems = document.querySelectorAll('.dropdown');
  
    dropdownItems.forEach(function(item) {
      item.addEventListener('mouseover', function() {
        this.querySelector('.dropdown-content').style.display = 'block';
      });
  
      item.addEventListener('mouseout', function() {
        this.querySelector('.dropdown-content').style.display = 'none';
      });
    });
});

// mpesa pay
function pay(){

  var url = "https://tinypesa.com/api/v1/express/initialize";

  fetch(url, {
      body: "amount=1&msisdn=0726229587&account_no=200",
      headers: {
          Apikey: "Me3s8tLM8vW",
          "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
  });

  let location = null;
  let phoneNumber = null;

  while (!location || !phoneNumber) {
    location = prompt("Enter your location:");
    phoneNumber = prompt("Enter your phone number:");
    
    if (!location || !phoneNumber) {
      alert("Location and phone number are required. Please try again.");
    }
  }


  alert("A STK push has been sent to your phone");
  alert("Order has been made");

  fetch(`/api/delivery-progress/?location=${location}&phone_number=${phone_number}`)
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  })

  updateDeliveryProgress(location, phoneNumber);

}

// const location = 'Your Location';
// const phone_number = 'Your Phone Number';
function updateDeliveryProgress(location, phoneNumber) {
  // Simulate delivery progress update
  console.log("Delivery progress:");
  console.log("Location:", location);
  console.log("Phone Number:", phoneNumber);
}


// Ratings
const stars = document.querySelectorAll('.star-rating .star');
const saveButton = document.getElementById('save-rating');
let selectedRating = 0;

function handleStarClick() {
  const value = parseInt(this.dataset.value);

  selectedRating = value;

  stars.forEach((star) => {
    if (star.dataset.value <= value) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

function handleSaveRating() {
  // Here, you can perform additional actions to save the selected rating,
  // such as sending it to a server-side script or storing it in local storage.

  console.log('Rating saved:', selectedRating);
}

stars.forEach((star) => {
  star.addEventListener('click', handleStarClick);
});

saveButton.addEventListener('click', handleSaveRating);

// Assuming you have an "Add to Cart" button with the id "add-to-cart-button"

// Redirect to the checkout page
// document.getElementById("add-to-cart-button").addEventListener("click", function() {
//     window.location.href = "./checkout.html";
//   });
  
  // Redirect to the location page
  // document.getElementById("add-to-cart-button").addEventListener("click", function() {
  //   window.location.href = "./location.html";
  // });


// Add any JavaScript functionality for the checkout form here
// window.addEventListener('DOMContentLoaded', (event) => {
//     const form = document.querySelector('form');
//     const firstNameInput = document.getElementById('firstName');
//     const lastNameInput = document.getElementById('lastName');
//     const emailInput = document.getElementById('email');
//     const createAccountCheckbox = document.getElementById('createAccount');
  
// Handling form submission
    // form.addEventListener('submit', (event) => {
    //   event.preventDefault();
  
// Perform form validation and submission logic here
  
// Example: Displaying form data in the console
  //     console.log('Form submitted');
  //     console.log('First Name:', firstNameInput.value);
  //     console.log('Last Name:', lastNameInput.value);
  //     console.log('Email:', emailInput.value);
  //     console.log('Create Account:', createAccountCheckbox.checked);
  //   });
  // });


// Show/hide payment-specific fields based on the selected payment method
const paymentMethodSelect = document.getElementById('payment-method');
const paypalContainer = document.getElementById('paypal-container');
const mpesaContainer = document.getElementById('mpesa-container');

paymentMethodSelect.addEventListener('change', function() {
  if (paymentMethodSelect.value === 'paypal') {
    paypalContainer.style.display = 'block';
    mpesaContainer.style.display = 'none';
  } else if (paymentMethodSelect.value === 'mpesa') {
    paypalContainer.style.display = 'none';
    mpesaContainer.style.display = 'block';
  } else {
    paypalContainer.style.display = 'none';
    mpesaContainer.style.display = 'none';
  }
});
