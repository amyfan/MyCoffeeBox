var three_product;
var six_product;
var twelve_product;
var four_product;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  function get_special_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
    	if (product_attributes.name.indexOf("Regalo") > -1) {
      	if (product_attributes.name.indexOf("3") > -1) {
    	    three_product = products[i];
    	  } else if (product_attributes.name.indexOf("6") > -1) {
    	    six_product = products[i];
    	  } else if (product_attributes.name.indexOf("12") > -1) {
    	    twelve_product = products[i];
    	  } else if (product_attributes.name.indexOf("4") > -1) {
    	  	// temporary 4 mes special
    	    four_product = products[i];
    	  }
      }
    }
  }

  $("#giftimage img").click(function(i) {
    _gaq.push(['_trackEvent', 'Gift', 'Clicked Image', 'next']);
    $("#content.length").show();
    $('#content.length').goToGift();
  });

  conekta.display.getProducts(
  	{},
  get_special_product);

  $("#content.length").show();
  setUpGiftPurchase();
})

function setUpGiftPurchase() {
  $("a.buygift").click(function(e) {
    e.preventDefault();
    $("#content.length").show();
    $('#content.length').goToGift();

    _gaq.push(['_trackEvent', 'Gift', 'Clicked Regala', 'regala']);    
  })

  $("#giftlength ul li").click(function(i) {
    $("#giftlength ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegift").show();
    _gaq.push(['_trackEvent', 'Gift', 'Length', 'type ' + $(this).data("giftlength")]);
  });

  $("a.nextgift").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Gift', 'Clicked Next', 'next']);    
    checkOutGift();
  })
}

(function($) {
    $.fn.goToGift = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 250);
        return this; // for chaining...
    }
})(jQuery);

function checkOutGift() {
  conekta.checkout.new('order', {company_id: 2757603});

  // We get the subscription location
  var lengthValue = parseInt($("#giftlength .selected").data("giftlength"));

  if (lengthValue == 3) {
    conekta.checkout.addItem(three_product.createItem());
  } else if (lengthValue == 6) {
    conekta.checkout.addItem(six_product.createItem());
  } else if (lengthValue == 12) {
    conekta.checkout.addItem(twelve_product.createItem());
  } else if (lengthValue == 4) {
    conekta.checkout.addItem(four_product.createItem());
  }
    
  if (conekta.checkout.getItems().length > 0) {
    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      carrier : 'Envío Nacional',
      service_name : 'Entrega Gratis'
    });

    conekta.checkout.proceedToCheckout();
  }
}
