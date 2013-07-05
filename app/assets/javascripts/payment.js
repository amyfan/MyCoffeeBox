var locale;
var success_url_callback;
var failure_url_callback;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("en") > -1) {
    locale = "/en";
  } else {
    locale = "/es";
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
      $("a.nextpay").hide();
      $("a.nextpaypal").show();
    } else if (paymentType == 2) {
      $("a.nextpaypal").hide();
      $("a.nextpay").show();
    }
    _gaq.push(['_trackEvent', 'Payment', 'Method', 'type ' + $(this).data("paymenttype")]);
  });

  $('a.nextpaypal').click(function(event) {
    _gaq.push(['_trackEvent', 'Payment', 'Clicked Next', 'paypal']);
    event.preventDefault();
    nextPayPal();
  });

  $('a.nextpay').click(function(event) {
    _gaq.push(['_trackEvent', 'Payment', 'Clicked Next', 'bank']);
    event.preventDefault();
    nextBank();
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