var mex_three_product;
var mex_six_product;
var mex_twelve_product;
var mex_four_product;
var usa_four_product;
var whereValue;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

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

  setUpGiftPurchase();
})

function setUpGiftPurchase() {

  $("#giftimage img").click(function(i) {
    _gaq.push(['_trackEvent', 'Gift', 'Clicked Image', 'next']);
    $("#content.dondegift").show();
    $('#content.dondegift').goToGift();
  });

  $("a.buygift").click(function(e) {
    e.preventDefault();
    $("#content.dondegift").show();
    $('#content.dondegift').goToGift();

    _gaq.push(['_trackEvent', 'Gift', 'Clicked Regala', 'regala']);
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

    _gaq.push(['_trackEvent', 'Gift', 'Where', 'type ' + $(this).data("where")]);
  });

  $("#giftlengthmex ul li").click(function(i) {
    $("#giftlengthmex ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegift").show();
    _gaq.push(['_trackEvent', 'Gift', 'Mexico Length', 'type ' + $(this).data("giftlength")]);
  });

  $("#giftlengthusa ul li").click(function(i) {
    $("#giftlengthusa ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegift").show();
    _gaq.push(['_trackEvent', 'Gift', 'USA/Canada Length', 'type ' + $(this).data("giftlength")]);
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
    _gaq.push(['_trackEvent', 'Gift', 'Clicked Next', 'next']);
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

  var four_product;
  var lengthValue;
  if (whereValue == 1) {
    conekta.checkout.setCurrency('MXN');
    four_product = mex_four_product;
    lengthValue = parseInt($("#giftlengthmex .selected").data("giftlengthmex"));
  } else if (whereValue == 2) {
    conekta.checkout.setCurrency('USD');
    four_product = usa_four_product;
    lengthValue = parseInt($("#giftlengthusa .selected").data("giftlengthusa"));
  }

  // if (lengthValue == 3) {
  // conekta.checkout.addItem(mex_three_product.createItem());
  // } else if (lengthValue == 6) {
  // conekta.checkout.addItem(mex_six_product.createItem());
  // } else if (lengthValue == 12) {
  // conekta.checkout.addItem(mex_twelve_product.createItem());
  // } else
  if (lengthValue == 4) {
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

    conekta.checkout.save();
    if (whereValue == 1) {
      window.location = locale + "/shipping_mex";
    } else {
      window.location = locale + "/shipping";
    }
  } else {
    // this case should no longer happen based on flow of page
    _gaq.push(['_trackEvent', 'Gift', 'Clicked Next', 'failed']);
    $('html, body').animate({
      scrollTop : 0
    }, 500);
    // $("#alert").show(500)
  }
}
