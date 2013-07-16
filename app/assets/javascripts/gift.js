var mex_three_product;
var mex_six_product;
var mex_twelve_product;
var mex_four_product;
var usa_four_product;
var whereValue;
var locale;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("en") > -1) {
    locale = "/en";
    page_name = "EN Gift";
  } else {
    locale = "/es";
    page_name = "ES Gift";
  }

  function get_special_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("Regalo") > -1) {
        if (product_attributes.name.indexOf("Mex") > -1) {
          if (product_attributes.name.indexOf("3") > -1) {
            mex_three_product = products[i];
          } else if (product_attributes.name.indexOf("6") > -1) {
            mex_six_product = products[i];
          } else if (product_attributes.name.indexOf("12") > -1) {
            mex_twelve_product = products[i];
          } else if (product_attributes.name.indexOf("4") > -1) {
            // temporary 4 mes special
            mex_four_product = products[i];
          }
        } else if (product_attributes.name.indexOf("North") > -1) {
          if (product_attributes.name.indexOf("4") > -1) {
            // temporary 4 mes special
            usa_four_product = products[i];
          }
        }
      }
    }
  }


  conekta.display.getProducts({}, get_special_product);

  $("#content.dondegift").show();
  setUpGiftPurchase();
})

function setUpGiftPurchase() {

  $("#giftimage img").click(function(i) {
    _gaq.push(['_trackEvent', page_name, 'Clicked Image', 'next']);
    $("#content.dondegift").show();
    $('#content.dondegift').goToGift();
  });

  $("a.buygift").click(function(e) {
    e.preventDefault();
    $("#content.dondegift").show();
    $('#content.dondegift').goToGift();

    _gaq.push(['_trackEvent', page_name, 'Clicked Regala', 'regala']);
  })

  $("#giftwhere ul li").click(function(i) {
    $("#giftwhere ul li").removeClass("selected");
    $(this).addClass("selected");
    whereValue = parseInt($("#giftwhere .selected").data("where"));
    if (whereValue == 1) {
      $("#giftlengthmex ul li").removeClass("selected");
      $("#giftlengthmex").show();
      $("#giftlengthusa").hide();
      conekta.checkout.setCurrency('MXN');
    } else if (whereValue == 2) {
      $("#giftlengthmex").hide();
      $("#giftlengthusa ul li").removeClass("selected");
      $("#giftlengthusa").show();
      product = surprisemeusa_product;
      conekta.checkout.setCurrency('USD');
    } else if (whereValue == 3) {
      conekta.checkout.setCurrency('USD');
    } else if (whereValue == 4) {
      conekta.checkout.setCurrency('EUR');
    }

    $(".actions.siguientegift").hide();
    $("#content.giftlength").show();
    $('#content.giftlength').goTo();

    _gaq.push(['_trackEvent', page_name, 'Where', 'type ' + $(this).data("where")]);
  });

  $("#giftlengthmex ul li").click(function(i) {
    $("#giftlengthmex ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegift").show();
    _gaq.push(['_trackEvent', page_name, 'Mexico Length', 'type ' + $(this).data("giftlength")]);
  });

  $("#giftlengthusa ul li").click(function(i) {
    $("#giftlengthusa ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegift").show();
    _gaq.push(['_trackEvent', page_name, 'USA/Canada Length', 'type ' + $(this).data("giftlength")]);
  });

  // $("#giftlengtheurope ul li").click(function(i) {
  // $("#giftlengtheurope ul li").removeClass("selected");
  // $(this).addClass("selected");
  // $(".actions.siguientegift").show();
  // _gaq.push(['_trackEvent', 'Gift', 'Europe Length', 'type ' + $(this).data("giftlength")]);
  // });
  //
  // $("#giftlengthlatin ul li").click(function(i) {
  // $("#giftlengthlatin ul li").removeClass("selected");
  // $(this).addClass("selected");
  // $(".actions.siguientegift").show();
  // _gaq.push(['_trackEvent', 'Gift', 'South America Length', 'type ' + $(this).data("giftlength")]);
  // });

  $("a.nextgift").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'next']);
    checkOutGift();
  })
}

(function($) {
  $.fn.goToGift = function() {
    $('html, body').animate({
      scrollTop : $(this).offset().top + 'px'
    }, 250);
    return this;
    // for chaining...
  }
})(jQuery);

function checkOutGift() {
  conekta.checkout.new('order', {company_id: 2757603});

  var selected_product;
  var lengthValue;
  if (whereValue == 1) {
    conekta.checkout.setCurrency('MXN');
    lengthValue = parseInt($("#giftlengthmex .selected").data("giftlengthmex"));
    if (lengthValue == 3) {
      selected_product = mex_three_product;
    } else if (lengthValue == 6) {
      selected_product = mex_six_product;
    } else if (lengthValue == 12) {
      selected_product = mex_twelve_product;
    } else if (lengthValue == 4) {
      selected_product = mex_four_product;
    }
  } else if (whereValue == 2) {
    conekta.checkout.setCurrency('USD');
    lengthValue = parseInt($("#giftlengthusa .selected").data("giftlengthusa"));
    if (lengthValue == 3) {
    } else if (lengthValue == 6) {
    } else if (lengthValue == 12) {
    } else if (lengthValue == 4) {
      selected_product = usa_four_product;
    }
  }
  
  conekta.checkout.addItem(selected_product.createItem());

  if (conekta.checkout.getItems().length > 0) {
    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      carrier : 'Envío Nacional',
      service_name : 'Entrega Gratis'
    });

    conekta.checkout.save();
    if (whereValue == 1) {
      conekta.checkout.proceedToCheckout();
      //window.location = locale + "/shipping_mex";
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
