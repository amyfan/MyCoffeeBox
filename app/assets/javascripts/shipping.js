$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');
  if (window.location.pathname.indexOf("shipping") > -1) {
    if (conekta.checkout.getItems().length == 0) {
      if (window.location.pathname.indexOf("en") > -1) {
        window.location = "/en/subscribe";
      } else {
        window.location = "/es/subscribe";
      }
    } else {
      // will comment this out for production (may crash some IE's)
      //console.log(conekta.checkout.getItems()[0]);
    }
  }

  setUpShipping();
})
function setUpShipping() {
  $('input[type=text]').addClass("empty");

  $($('input[type=text]')).blur(function() {
    $('input[type=text]').filter(function() {
      return $(this).val() != "";
    }).removeClass("empty");
    $('input[type=text]').filter(function() {
      return $(this).val() == "";
    }).addClass("empty");
  });

  $('input[type=text]').blur(function() {
    var el = $(this);
    if (el.val().length > 0) {
      el.removeClass("invalid");
    }
  });

  $('a.nextship').click(function(event) {
    _gaq.push(['_trackEvent', 'Shipping', 'clicked', 'Next']);
    event.preventDefault();
    nextShip();
  });

}

function nextShip() {
  if (!validateShippingForm()) {
    return;
  }

  function credit_card_callback(info) {
    var url_location = "https://secure.conekta.mx/checkout/payment_confirmation?reference_id=" + 'paypal';
    document.location.href = url_location;
  }

  var success_url_callback;
  var failure_url_callback;
  if (window.location.pathname.indexOf("en") > -1) {
    success_url_callback = "http://www.mycoffeebox.com/en/order_success";
    failure_url_callback = "http://www.mycoffeebox.com/en/order_failure";
  } else {
    success_url_callback = "http://www.mycoffeebox.com/es/order_success";
    failure_url_callback = "http://www.mycoffeebox.com/es/order_failure";
  }

  conekta.checkout.processPayment({
    payment_method : 'paypal',
    success_callback : credit_card_callback, // this supposedly doesn't matter
    success_url : success_url_callback,
    failure_url : failure_url_callback
  });

  //conekta.checkout.proceedToCheckout();

}

function validateShippingForm() {
  var correo = $('#email').val();
  var coffeetype = $('#coffeetype').val();
  var referral = $('#referral').val();
  var promocode = $('#promocode').val();
  var nombre = $("#nombre").val();
  var calle = $("#calle").val();
  var colonia = $("#colonia").val();
  var ciudad = $("#ciudad").val();
  var estado = $("#estado").val();
  var cp = $("#cp").val();
  var pais = $("#pais").val();
  var telefono = $("#telefono").val();

  var valid = true;
  if (nombre.length < 2) {
    $("#nombre").addClass("invalid");
    valid = false;
  }
  if (coffeetype.length < 2) {
    $("#coffeetype").addClass("invalid");
    valid = false;
  }
  if (correo.length < 2) {
    $("#email").addClass("invalid");
    valid = false
  } else {
    var atpos = correo.indexOf("@");
    var dotpos = correo.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= correo.length) {
      $("#email").addClass("invalid");
      valid = false;
    }
    // alternatively can try regex validation: /^[a-zA-Z0-9_.-]+@[a-z0-9][a-z0-9\-]{1,64}(\.[a-z]{2,4}|[a-z]{2,3}\.[a-z]{2})$/i
  }
  if (calle.length < 2) {
    $("#calle").addClass("invalid");
    valid = false;
  }
  if (window.location.pathname.indexOf("mex") > -1) {
    if (colonia.length < 2) {
      $("#colonia").addClass("invalid");
      valid = false;
    }
  }
  if (ciudad.length < 2) {
    $("#ciudad").addClass("invalid");
    valid = false;
  }
  if (estado.length < 2) {
    $("#estado").addClass("invalid");
    valid = false;
  }
  if (cp.length < 4) {
    $("#cp").addClass("invalid");
    valid = false;
  }
  if (pais.length < 2) {
    $("#pais").addClass("invalid");
    valid = false;
  }
  if (telefono.length < 2 || !telefono.match(/^[0-9\s-\(\)]+$/)) {
  	// accept numbers, spaces, -()
    $("#telefono").addClass("invalid");
    valid = false;
  }
  if (!valid) {
    _gaq.push(['_trackEvent', 'Shipping', 'Data entry', 'failed']);
    $('#directions').goTo();
    return false;
  }

  // TODO: temp until conekta removes validation for this field
  if (colonia.length < 2) {
    colonia = 'n/a';
  }

  conekta.checkout.setShippingAddress({
    name : nombre,
    email : correo,
    street : calle,
    colonia : colonia,
    city : ciudad,
    state : estado,
    postal_code : cp,
    country : pais,
    phone : telefono
  });

  conekta.checkout.setCustomField('¿Lo quiere en Grano o Molido Tradicional?', coffeetype);
  conekta.checkout.setCustomField('Si un amigo te recomendó pon su correo electrónico', referral);
  conekta.checkout.setCustomField('Código de Promoción', promocode);

  return true;
}