//'use strict';


var stripe = Stripe('pk_test_51IliFGD4UjytsrtrXDzIS8a3UCQFdlCLfw8ZseRfOO8JcxovPa8jF21qxuY8C2FPM5o2dmBi0x3e5QMbiIVTihIc00PohrAY5U');

var elem = document.getElementById('submit');
clientsecret = elem.getAttribute('data-secret');

// Set up Stripe.js and Elements to use in checkout form
var elements = stripe.elements();
var style = {
  base: {
    color: "#000",
    lineHeight: '2.4',
    fontSize: '16px'
}
};


var card = elements.create("card", { style: style });
card.mount("#card-element");

card.on('change', function(event) {
var displayError = document.getElementById('card-errors')
if (event.error) {
  displayError.textContent = event.error.message;
  $('#card-errors').addClass('alert alert-info');
} else {
  displayError.textContent = '';
  $('#card-errors').removeClass('alert alert-info');
}
});

var form = document.getElementById('payment-form');

form.addEventListener('submit', function(ev) {
  ev.preventDefault();

var custName = document.getElementById("custName").value;
var custAdd = document.getElementById("custAdd").value;
var custAdd2 = document.getElementById("custAdd2").value;
var postCode = document.getElementById("postCode").value;

  stripe.confirmCardPayment(clientsecret, {
    payment_method: {
      card: card,
      billing_details: {
        address:{
          line1:custAdd,
          line2:custAdd2
        },
        name: custName
      },
    }

  })
}).then(function(result) {
  if (result.error) {
    console.log('payment error')
    console.log(result.error.message);
  } else {
    if (result.paymentIntent.status === 'succeeded') {
      console.log('payment processed')
      window.location.replace("https://8000-coffee-earthworm-aqdalkin.ws-eu04.gitpod.io/payment/orderplaced/");
    }
  }
});
