var surprisememex_product;
var surprisemeusa_product;
var surprisemelatin_product;
var surprisemeeuro_product;
var locale;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("en") > -1) {
    locale = "/en";
    page_name = "EN Subscribe";
  } else {
    locale = "/es";
    page_name = "ES Subscribe";
  }

  function render_products(products) {
    // TODO statically displaying bags
    $("#content > ul").append(getStaticPhotoForProduct("/images/triunfo.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/vinic.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/metik.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/biocafe.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/majomut.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/biomaya.png", 0));

    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("Suscripción") > -1 || product_attributes.name.indexOf("Subscription") > -1) {
        if (product_attributes.name.indexOf("México") > -1 && product_attributes.name.indexOf("149") < 0) {
          surprisememex_product = products[i];
        } else if (product_attributes.name.indexOf("North") > -1) {
          surprisemeusa_product = products[i];
        } else if (product_attributes.name.indexOf("South") > -1) {
          surprisemelatin_product = products[i];
        } else if (product_attributes.name.indexOf("Europe") > -1) {
          surprisemeeuro_product = products[i];
        } else if (product_attributes.name.indexOf("Especial") > -1) {
          // filter out special promos (father's day for now)
        } else if (product_attributes.name.indexOf("Regalo") > -1) {
          // filter out special gifts for now
        } else {
          // TODO going to statically display coffee bags for now
          //$("#content > ul").append(getTemplateForProduct(products[i], i));
        }
      }
    }
  }


  conekta.display.getProducts({}, render_products);

  setUpSubscription();
})
function getStaticPhotoForProduct(image_name, id_num) {
  var template = $("#template").clone();
  template.attr('id', 'template' + (id_num));
  template.show();

  $("#product", template).html("<img src='" + image_name + "'/>");
  //addInteractionsToProductTemplate(template, product);
  return template;
}

function getTemplateForProduct(product, id_num) {
  var template = $("#template").clone();
  template.attr('id', 'template' + (id_num));
  template.show();
  // The template is usually hidden

  product_attributes = product.getAttributes();

  // comment out logs before production (crashes older IE's)
  //console.log(product_attributes);

  $("#product", template).html("<img src='" + product_attributes.image + "'/>");
  $("#name", template).html(product_attributes.name);
  $("#brand", template).html(product_attributes.name);
  $("#shortdescription", template).html(product_attributes.short_description);
  $("#description", template).html(product_attributes.description);
  $("#price", template).html("$" + product_attributes.price + " MXN");
  addInteractionsToProductTemplate(template, product);
  return template;
}

function addInteractionsToProductTemplate(element, product) {
  element.hover(function() {
    var el = $(this);
    el.children(".rollover").show()
    el.children("#product").css("opacity", "0.1")
    el.children("h3").hide();

    product_attributes = product.getAttributes();

    _gaq.push(['_trackEvent', 'Catalog', 'Product Hover', product.getAttributes().name]);
  }, function() {
    var el = $(this);
    el.children(".rollover").hide();
    el.children("#product").css("opacity", "1")
    el.children("h3").show();
  })
}

function unselectProductTemplates() {
  var i = 0;
  var template = $("#template" + i);

  //  while (template != 'undefined' && template != null) {
  while (i < num_products) {// HARDCODING for now
    template.removeClass("selected");
    i++;
    template = $("#template" + i);
  }
}

(function($) {
  $.fn.goTo = function() {
    $('html, body').animate({
      scrollTop : $(this).offset().top + 'px'
    }, 250);
    return this;
    // for chaining...
  }
})(jQuery);

function setUpSubscription() {
  // subscribe/join button click
  $("a.surpriseme").click(function(e) {
    e.preventDefault();
    $("#content.dondesubscribe").show();
    $('#content.dondesubscribe').goTo();

    _gaq.push(['_trackEvent', page_name, 'Clicked Personaliza', 'personaliza']);
  })

  $("#subscribewhere ul li").click(function(i) {
    $("#subscribewhere ul li").removeClass("selected");
    $(this).addClass("selected");
    $("#content.cuantosubscribe").show();
    $('#content.cuantosubscribe').goTo();

    _gaq.push(['_trackEvent', page_name, 'Where', 'type ' + $(this).data("where")]);
  });

  $("#subscribefrequency ul li").click(function(i) {
    $("#subscribefrequency ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientesubscribe").show();
    _gaq.push(['_trackEvent', page_name, 'Frequency', 'type ' + $(this).data("frequency")]);
  });

  // siguiente button click
  $("a.nextsubscribe").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'next']);
    nextSubscribe();
  })
}

function nextSubscribe() {
  conekta.checkout.new('subscription', {company_id: 2757603});

  // We get the subscription location
  var whereValue = parseInt($("#subscribewhere .selected").data("where"));

  var product;
  var currency;
  if (whereValue == 1) {
    product = surprisememex_product;
    currency = 'MXN';
  } else if (whereValue == 2) {
    product = surprisemeusa_product;
    currency = 'USD';
  } else if (whereValue == 3) {
    product = surprisemelatin_product;
    currency = 'USD';
  } else if (whereValue == 4) {
    product = surprisemeeuro_product;
    currency = 'EUR';
  }
  conekta.checkout.setCurrency(currency);

  conekta.checkout.addItem(product.createItem());
  // TODO get following lines to work
  //var product_attributes = product.getAttributes();
  //conekta.checkout.setCurrency(product_attributes.currency);

  // We get the frequency
  var periodFrequencyValue = parseInt($("#subscribefrequency .selected").data("frequency"));

  var one_time_price;
  var firma;
  if (conekta.checkout.getItems().length > 0 && periodFrequencyValue > 0) {
    //configure a 3 month subscription default
    if (periodFrequencyValue == 2) {
      conekta.checkout.setBillingPeriod('week', 2, -1, 6);
      conekta.checkout.setShippingPeriod('week', 2, -1, 6);
      one_time_price = '1074';
      firma = 'daf784aa0ba9ff3db8c04a14acc1f4118bd0bc06';
    } else if (periodFrequencyValue == 4) {
      conekta.checkout.setBillingPeriod('week', 4, -1, 3);
      conekta.checkout.setShippingPeriod('week', 4, -1, 3);
      one_time_price = '537';
      firma = '4910d14984f53d7133bd283ada8744b8b5323f8b';
    } else {
      conekta.checkout.setBillingPeriod('week', 6, -1, 2);
      conekta.checkout.setShippingPeriod('week', 6, -1, 2);
      one_time_price = '358';
      firma = '44f3ff596a02a06bf5b103a1a40330c65a89cc51';
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
      // now save shopping cart data in cookies (independent of conekta storing our info in js)
      // at the moment, primarily to store info to determine pademobile product item
      createCookie('pademobile_order_name', 'Sorpr%C3%A9ndeme+M%C3%A9xico+' + periodFrequencyValue + '+Semanas', 30);
      createCookie('price', one_time_price, 30);
      createCookie('firma', firma, 1);
      // createCookie('order_type', 'subscription', 30);
      // createCookie('currency', currency, 30);

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