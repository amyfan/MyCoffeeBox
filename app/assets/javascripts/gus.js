var sorprendememex_product;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  function get_mex_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("México") > -1) {
        sorprendememex_product = products[i];
        break;
      }
    }
  }


  $("#gusimage img").click(function(i) {
    _gaq.push(['_trackEvent', 'Gus', 'Clicked Image', 'image']);
    $("#content.cuantogus").show();
    $('#content.cuantogus').goToPurchaseGus();
  });

  conekta.display.getProducts({}, get_mex_product);

  setUpGusPurchase();
})
function setUpGusPurchase() {
  $("a.subscribegus").click(function(e) {
    e.preventDefault();
    $("#content.cuantogus").show();
    $('#content.cuantogus').goToPurchaseGus();

    _gaq.push(['_trackEvent', 'Gus', 'Clicked Subscribe', 'subscribe']);
  })

  $("#frequencygus ul li").click(function(i) {
    $("#frequencygus ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegus").show();
    _gaq.push(['_trackEvent', 'Gus', 'Length', 'type ' + $(this).data("frequency")]);
  });

  $("a.nextgus").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Gus', 'Clicked Next', 'next']);
    checkOutGus();
  })
}

(function($) {
  $.fn.goToPurchaseGus = function() {
    $('html, body').animate({
      scrollTop : $(this).offset().top + 'px'
    }, 250);
    return this;
    // for chaining...
  }
})(jQuery);

function checkOutGus() {
  conekta.checkout.new('subscription', {company_id: 2757603});
  conekta.checkout.addItem(sorprendememex_product.createItem());

  // We get the frequency
  var periodFrequencyValue = parseInt($("#frequencygus .selected").data("frequency"));

  if (conekta.checkout.getItems().length > 0 && periodFrequencyValue > 0) {
    //configure a 3 month subscription default
    if (periodFrequencyValue == 2) {
      conekta.checkout.setBillingPeriod('week', 2, -1, 6);
      conekta.checkout.setShippingPeriod('week', 2, -1, 6);
    } else if (periodFrequencyValue == 4) {
      conekta.checkout.setBillingPeriod('week', 4, -1, 3);
      conekta.checkout.setShippingPeriod('week', 4, -1, 3);
    } else {
      conekta.checkout.setBillingPeriod('week', 6, -1, 2);
      conekta.checkout.setShippingPeriod('week', 6, -1, 2);
    }
  }

  if (conekta.checkout.getItems().length > 0) {
    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      carrier : 'Envío Nacional',
      service_name : 'Entrega Gratis'
    });

		var referral = 'email';
    conekta.checkout.setCustomField('Si un amigo te recomendó pon su correo electrónico', referral);

    conekta.checkout.proceedToCheckout();
  }
}
