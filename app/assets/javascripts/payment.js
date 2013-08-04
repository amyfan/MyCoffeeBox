var success_url_callback;
var failure_url_callback;
var locale;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("/en") > -1) {
    locale = "/en";
    page_name = "EN Payment Option";
  } else {
    locale = "/es";
    page_name = "ES Payment Option";
  }

  if (window.location.pathname.indexOf("payment") > -1) {
    if (conekta.checkout.getItems().length == 0) {
      window.location = locale + "/subscribe";
    } else {
      // will comment this out for production (may crash some IE's)
      //console.log(conekta.checkout.getItems()[0]);
    }
  }

  // var ship_attr = conekta.checkout.getShippingOptions()[0];
  // var week = ship_attr.week;
  // console.log('week' + week);

  success_url_callback = "http://www.mycoffeebox.com" + locale + "/order_success";
  failure_url_callback = "http://www.mycoffeebox.com" + locale + "/order_failure";

  setUpPayment();
})

function setUpPayment() {

  $("#payment ul li").click(function(i) {
    $("#payment ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientepay").show();

    var paymentType = parseInt($("#payment .selected").data("paymenttype"));

    if (paymentType == 1) {
      $("a.nextpaybank").hide();
      $("#pademobile").hide();
      $("a.nextpaypal").show();
    } else if (paymentType == 2) {
      $("a.nextpaypal").hide();
      $("#pademobile").hide();
      $("a.nextpaybank").show();
    } else if (paymentType == 3) {
      $("a.nextpaypal").hide();
      $("a.nextpaybank").hide();
      $("#pademobile").show();
    }
    _gaq.push(['_trackEvent', page_name, 'Method', 'type ' + $(this).data("paymenttype")]);
  });

  $('a.nextpaypal').click(function(event) {
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'paypal']);
    event.preventDefault();
    nextPayPal();
  });

  $('a.nextpaybank').click(function(event) {
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'bank']);
    event.preventDefault();
    nextBank();
  });

  $('a.nextpaypade').click(function(event) {
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'pademobile']);
    event.preventDefault();
    nextPademobile();
  });

}

function nextPayPal() {
  function credit_card_callback(info) {
    var url_location = "https://secure.conekta.mx/checkout/payment_confirmation?reference_id=" + 'paypal';
    document.location.href = url_location;
  }

  conekta.checkout.processPayment({
    payment_method : 'paypal',
    success_callback : credit_card_callback, // this supposedly doesn't matter
    success_url : success_url_callback,
    failure_url : failure_url_callback
  });

  //conekta.checkout.proceedToCheckout();
}

function nextBank() {
  function bank_callback(info) {
    var url_location = "https://secure.conekta.mx/checkout/payment_confirmation?reference_id=" + 'bank';
    document.location.href = url_location;
  }

  conekta.checkout.processPayment({
    payment_method : 'bank_transfer',
    success_callback : bank_callback, // this supposedly doesn't matter
    success_url : success_url_callback,
    failure_url : failure_url_callback
  });

  //conekta.checkout.proceedToCheckout();
}

// NOTE to the next CTO: In Pademobile's current iteration, the URL to Pademobile is coupled with the name & price created in Pademobile's product catalog
// Therefore, if you want to change the name or price, or create a new product, you MUST ensure there's a product of the same name & price in the Pademobile system
function nextPademobile() {
  var order_name = readCookie('pademobile_order_name');
	var price = readCookie('price');
	var firma = readCookie('firma');
  var url_string = "https://www.pademobile.com/comprar/?descripcion=";
  url_string += order_name;
  url_string += "&id_usuario=6804&pais=MX&url=http%3A%2F%2Fwww.mycoffeebox.com%2Fes%2Forder_success&importe=";
  url_string += price;
  url_string += "&firma=" + firma;
  window.location.href = url_string;
}
