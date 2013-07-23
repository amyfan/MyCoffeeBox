var locale;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("en") > -1) {
    locale = "/en";
    page_name = "EN Shipping";
  } else {
    locale = "/es";
    page_name = "ES Shipping";
  }

  if (window.location.pathname.indexOf("shipping") > -1) {
    if (conekta.checkout.getItems().length == 0) {
      window.location = locale + "/subscribe";
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
    _gaq.push(['_trackEvent', page_name, 'clicked', 'Next']);
    event.preventDefault();
    nextShip();
  });

}

function nextShip() {
  if (!validateShippingForm()) {
    return;
  }

  conekta.checkout.save();
  if (window.location.pathname.indexOf("mex") > -1) {
    // go to payment option page for mexico customers
    window.location = locale + "/payment";
  } else {
    // paypal only option for international customers
    function credit_card_callback(info) {
      var url_location = "https://secure.conekta.mx/checkout/payment_confirmation?reference_id=" + 'paypal';
      document.location.href = url_location;
    }

    var success_url_callback;
    var failure_url_callback;
    success_url_callback = "http://www.mycoffeebox.com" + locale + "/order_success";
    failure_url_callback = "http://www.mycoffeebox.com" + locale + "/order_failure";

    conekta.checkout.processPayment({
      payment_method : 'paypal',
      success_callback : credit_card_callback, // this supposedly doesn't matter
      success_url : success_url_callback,
      failure_url : failure_url_callback
    });

    //conekta.checkout.proceedToCheckout();
  }
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
  if (nombre.length < 2 || nombre.length > 30) {
    $("#nombre").addClass("invalid");
    valid = false;
  }
  if (coffeetype.length < 2 || coffeetype.length > 30) {
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
  if (calle.length < 2 || calle.length > 30) {
    $("#calle").addClass("invalid");
    valid = false;
  }
  if (window.location.pathname.indexOf("mex") > -1) {
    if (colonia.length < 2 || colonia.length > 30) {
      $("#colonia").addClass("invalid");
      valid = false;
    }
  }
  if (ciudad.length < 2 || ciudad.length > 30) {
    $("#ciudad").addClass("invalid");
    valid = false;
  }
  if (estado.length < 2 || estado.length > 30) {
    $("#estado").addClass("invalid");
    valid = false;
  }
  if (cp.length < 4 || cp.length > 30) {
    $("#cp").addClass("invalid");
    valid = false;
  }
  if (pais.length < 2 || pais.length > 30) {
    $("#pais").addClass("invalid");
    valid = false;
  }
  if (telefono.length < 8 || !telefono.match(/^[0-9\s-\(\)]+$/)) {
    // accept numbers, spaces, -()
    $("#telefono").addClass("invalid");
    valid = false;
  }
  if (!valid) {
    _gaq.push(['_trackEvent', page_name, 'Data entry', 'failed']);
    $('#directions').goTo();
    return false;
  }

  // TODO: temp until conekta removes validation for this field
  if (colonia.length < 2) {
    colonia = 'n/a';
  }

  conekta.checkout.setShippingAddress({
    name : nombre,
    street : calle,
    colonia : colonia,
    city : ciudad,
    state : estado,
    postal_code : cp,
    country : pais,
    email : correo,
    phone : telefono
  });

  conekta.checkout.setCustomField('¿Lo quiere en Grano o Molido Tradicional?', coffeetype);
  conekta.checkout.setCustomField('Si un amigo te recomendó pon su correo electrónico', referral);
  conekta.checkout.setCustomField('Código de Promoción', promocode);

  // track referral URL if applicable
  if (readCookie('utm_source') != undefined) {
    conekta.checkout.setCustomField('utm_source', readCookie('utm_source'));
  }
  if (readCookie('utm_medium') != undefined) {
    conekta.checkout.setCustomField('utm_medium', readCookie('utm_medium'));
  }
  if (readCookie('utm_term') != undefined) {
    conekta.checkout.setCustomField('utm_term', readCookie('utm_term'));
  }
  if (readCookie('utm_content') != undefined) {
    conekta.checkout.setCustomField('utm_content', readCookie('utm_content'));
  }
  if (readCookie('utm_campaign') != undefined) {
    conekta.checkout.setCustomField('utm_campaign', readCookie('utm_campaign'));
  }

  return true;
}