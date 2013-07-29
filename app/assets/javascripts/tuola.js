var tuola_product;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  page_name = "ES Tuola";

  function get_tuola_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("Gratis") > -1) {
        tuola_product = products[i];
        break;
      }
    }
  }

  conekta.display.getProducts({}, get_tuola_product);

  setUpTuolaPurchase();
})

function setUpTuolaPurchase() {

  $("a.nexttuola").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'next']);
    checkOutTuola();
  })
}

function checkOutTuola() {
  if (!validateTuolaForm()) {
    return;
  }

  conekta.checkout.new ('order', {company_id: 2757603});

  conekta.checkout.addItem(tuola_product.createItem());

  if (conekta.checkout.getItems().length > 0) {
    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      // for some reason, this file is throwing encoding error in rails
      carrier : 'Envio Nacional',
      service_name : 'Entrega Gratis'
    });

    conekta.checkout.proceedToCheckout();
    //window.location = "es/shipping_mex";

  } else {
    // this case should no longer happen based on flow of page
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'failed']);
  }
}

function validateTuolaForm() {
  var promocode = $('#promocode.tuola').val();
  // obviously will obscure this in the backend one day
  var allcodes = "MCB8O3C3G0D8,MCB3H8O3Q2P5,MCB6W4T6Y2H2,MCB9M9G1F2T2,MCB2U0Z2V0W2,MCB6R5V0Q4Q4,MCB4M4D1W4E9,MCB9H6K0B6H1,MCB6E2R2D6P4,MCB0X6S6H3O6,MCB3O1L2S0N7,MCB6X5H3E9N3,MCB8Q0E8T9Y0,MCB9E2S1D6F9,MCB6J4Y2S1W7,MCB5Z4Q0T1O1,MCB8N8P7O5X9,MCB4M8J2B5T9,MCB7T6R2Q7Z9,MCB9I3N6P5V0";

  var valid = true;
  if (promocode.length < 1 || allcodes.indexOf(promocode) < 1) {
    $("#promocode").addClass("invalid");
    valid = false;
  }
  if (!valid) {
    _gaq.push(['_trackEvent', page_name, 'Data entry', 'failed']);    $('#directions').goTo();
    return false;
  }

  conekta.checkout.setCustomField('Promo Code', promocode);

  return true;
}