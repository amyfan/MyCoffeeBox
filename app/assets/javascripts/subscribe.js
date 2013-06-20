var sorprendememex_product;
var surprisemeusa_product;
var surprisemeeuro_product;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');
  
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
    	if (product_attributes.name.indexOf("México") > -1) {
  	    sorprendememex_product = products[i];
  	  } else if (product_attributes.name.indexOf("America") > -1) {
  	    surprisemeusa_product = products[i];
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
  
  conekta.display.getProducts(
  	{},
  render_products);

  setUpSubscription();
})

function getStaticPhotoForProduct(image_name, id_num) {
  var template = $("#template").clone();
  template.attr('id', 'template'+(id_num));
  template.show();

  $("#product", template).html("<img src='" + image_name + "'/>");
  //addInteractionsToProductTemplate(template, product);
  return template;
}

function getTemplateForProduct(product, id_num) {
  var template = $("#template").clone();
  template.attr('id', 'template'+(id_num));
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
  var template = $("#template"+i);
  
//  while (template != 'undefined' && template != null) {
	while (i < num_products) { // HARDCODING for now
  	template.removeClass("selected");
  	i++;
    template = $("#template"+i);
  }
}

(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 250);
        return this; // for chaining...
    }
})(jQuery);

function setUpSubscription() {
  // subscribe/join button click
  $("a.surpriseme").click(function(e) {
    e.preventDefault();
    $("#content.donde").show();
    $('#content.donde').goTo();

    _gaq.push(['_trackEvent', 'Catalog', 'Clicked Join', 'join']);
  })

  $("#where ul li").click(function(i) {
    $("#where ul li").removeClass("selected");
    $(this).addClass("selected");
    $("#content.cuanto").show();
    $('#content.cuanto').goTo();

    _gaq.push(['_trackEvent', 'Subscription', 'Where',  'type ' + $(this).data("where")]);
  });

  $("#frequency ul li").click(function(i) {
    $("#frequency ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguiente").show();
    _gaq.push(['_trackEvent', 'Subscription', 'Frequency', 'type ' + $(this).data("frequency")]);
  });

  // siguiente button click
  $("a.next").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Subscription', 'Clicked Next', 'next']);
    
    conekta.checkout.new('subscription', {company_id: 2757603});
    
    // We get the subscription location
    var whereValue = parseInt($("#where .selected").data("where"));

    if (whereValue == 1) {
      conekta.checkout.addItem(sorprendememex_product.createItem());
    } else if (whereValue == 2) {
    	// TODO TEMP!
    	surprisemeusa_product = sorprendememex_product;
      conekta.checkout.addItem(surprisemeusa_product.createItem());
    } else if (whereValue == 3) {
      conekta.checkout.addItem(surprisemeeuro_product.createItem());
    }
    
    // We get the frequency
    var periodFrequencyValue = parseInt($("#frequency .selected").data("frequency"));

    if (conekta.checkout.getItems().length > 0 && periodFrequencyValue > 0) {
      //configure a 4 month subscription default
      if (periodFrequencyValue == 2) {
        conekta.checkout.setBillingPeriod('week', 2, {
          recurring : -1,
          lump_sum : 8
        });
        conekta.checkout.setShippingPeriod('week', 2, {
          recurring : -1,
          lump_sum : 8
        });
      } else if (periodFrequencyValue == 4) {
        conekta.checkout.setBillingPeriod('week', 4, {
          recurring : -1,
          lump_sum : 4
        });
        conekta.checkout.setShippingPeriod('week', 4, {
          recurring : -1,
          lump_sum : 4
        });
      } else {
        conekta.checkout.setBillingPeriod('week', 6, {
          recurring : -1,
          lump_sum : 3
        });
        conekta.checkout.setShippingPeriod('week', 6, {
          recurring : -1,
          lump_sum : 3
        });
      }

      // free shipping
      conekta.checkout.setShippingOption({
        id : 891,
        cost : 0.0,
        carrier : 'Envío Nacional',
        service_name : 'Entrega Gratis'
      });

      if (whereValue == 1) {
        conekta.checkout.proceedToCheckout();
      } else {
      	window.location = "/shipping";
      }
    } else {
    	// this case should no longer happen based on flow of page
      _gaq.push(['_trackEvent', 'Subscription', 'Clicked Next', 'failed']);
      $('html, body').animate({
        scrollTop : 0
      }, 500);
      // $("#alert").show(500)
    }
  })
}