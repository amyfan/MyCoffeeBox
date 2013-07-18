var product_especial;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  page_name = "ES Subscribe 149";

  function get_special_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("149") > -1) {
        product_especial = products[i];
        break;
      }
    }
  }

  conekta.display.getProducts({}, get_special_product);

  setUpSubscription149();
})

function setUpSubscription149() {
  $("#subscribefrequency149 ul li").click(function(i) {
    $("#subscribefrequency149 ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientesubscribe149").show();
    _gaq.push(['_trackEvent', page_name, 'Frequency', 'type ' + $(this).data("frequency")]);
  });

  // siguiente button click
  $("a.nextsubscribe149").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'next']);
    nextSubscribe149();
  })
}

function nextSubscribe149() {
  conekta.checkout.new('subscription', {company_id: 2757603});
  conekta.checkout.setCurrency('MXN');
  conekta.checkout.addItem(product_especial.createItem());

  // We get the frequency
  var periodFrequencyValue = parseInt($("#subscribefrequency149 .selected").data("frequency"));

  if (conekta.checkout.getItems().length > 0 && periodFrequencyValue > 0) {
    //configure a 3 month subscription default
    if (periodFrequencyValue == 2) {
      // new syntax, and also changing from 4->3 months
      conekta.checkout.setBillingPeriod('week', 2, -1, 6);
      conekta.checkout.setShippingPeriod('week', 2, -1, 6);
    } else if (periodFrequencyValue == 4) {
      conekta.checkout.setBillingPeriod('week', 4, -1, 3);
      conekta.checkout.setShippingPeriod('week', 4, -1, 3);
    } else {
      conekta.checkout.setBillingPeriod('week', 6, -1, 2);
      conekta.checkout.setShippingPeriod('week', 6, -1, 2);
    }

    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      carrier : 'Envío Nacional',
      service_name : 'Entrega Gratis'
    });

    conekta.checkout.save();
    if (whereValue == 1) {
      //conekta.checkout.proceedToCheckout();
      window.location = locale + "/shipping_mex";
    } else {
      window.location = locale + "/shipping";
    }
  } else {
    // this case should no longer happen based on flow of page
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'failed']);
    $('html, body').animate({
      scrollTop : 0
    }, 500);
    // $("#alert").show(500)
  }
}