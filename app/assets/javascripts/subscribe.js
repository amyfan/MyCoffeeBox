$(function() {
  //pagalo.setToken(2757603);
  //conekta.setToken(2757603);
  conekta.setToken('YE138iSl1KAFfZxRS3f');
  
  //var num_products = 0;

  function render_products(products) {
    for (var i = 0; i < products.length; i++) {
      $("#content > ul").append(getTemplateForProduct(products[i], i));
      //num_products++;
    }
  }

  //pagalo.getCatalog(render_products);
  conekta.display.getProducts(
  	{},
  render_products);
  
  setUpSubscription();
})

function getTemplateForProduct(product, id_num) {
  var template = $("#template").clone();
  template.attr('id', 'template'+(id_num));
  template.show();
  // The template is usually hidden
  
  product_attributes = product.getAttributes();
  
  // MAY HAVE TO COMMENT OUT BEFORE PRODUCTION (crashes older IE's)
  //console.log(product_attributes);

  $("#product", template).html("<img src='" + product_attributes.image + "'/>")
  $("#name", template).html(product_attributes.name);
  $("#brand", template).html(product_attributes.name);
  $("#shortdescription", template).html(product_attributes.short_description);
  $("#description", template).html(product_attributes.description);
  $("#price", template).html(product_attributes.price + " MXN");
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
    var slider = $('#modalslider');
    $("#product", slider).html("<img src='" + product_attributes.image + "'/>")
    $("#name", slider).html(product_attributes.name);
    $("#description", slider).html(product_attributes.description);
  
    // slider in
    $('#modalslider').animate({right: '0'}, 300);
    $('#content').addClass("no-scroll");
    
    _gaq.push(['_trackEvent', 'Catalog', 'Product Hover', product.getAttributes().name]);
  }, function() {
    var el = $(this);
    el.children(".rollover").hide();
    el.children("#product").css("opacity", "1")
    el.children("h3").show();
    
    // slider out
    $('#content').removeClass("no-scroll");
    $('#modalslider').animate({right: '-400px'}, 300,"swing",
      function(){
    })
  })

  // product selected
  element.click(function() {
    //suscription = pagalo.createSubscription();
    //suscription.addItem(product.createItem());
    
    unselectProductTemplates();
    $(this).addClass("selected");
    $("#alert").hide()

    conekta.checkout.new('subscription', {company_id: 2757603});
    conekta.checkout.addItem(product.createItem());
    
    console.log(conekta.checkout.getItems());
    
    //window.location = "/static_pages/subscription"
    _gaq.push(['_trackEvent', 'Catalog', 'Product Selected', product.getAttributes().name]);
  })
}

function unselectProductTemplates() {
  var i = 0;
  var template = $("#template"+i);
  
//  while (template != 'undefined' && template != null) {
	while (i < 7) { // HARDCODING for now
  	template.removeClass("selected");
  	i++;
    template = $("#template"+i);
  }
}

function setUpSubscription() {
  $("#frequency ul li").click(function(i) {
    $("#frequency ul li").removeClass("selected");
    $(this).addClass("selected");
    $("#alert").hide()
    _gaq.push(['_trackEvent', 'Subscription', 'Frequency', 'type ' + $(this).data("frequency")]);
  });

  // siguiente button click
  $(".next").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Subscription', 'Clicked Next', 'next']);
    
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

      // var suscription = pagalo.getSubscription()
      // suscription.setShippingOption({

      // free shipping
      conekta.checkout.setShippingOption({
        id : 891,
        cost : 0.0,
        carrier : 'Envío Nacional',
        service_name : 'Entrega Gratis'
      });

      conekta.checkout.proceedToCheckout();
    } else {
      _gaq.push(['_trackEvent', 'Subscription', 'Clicked Next', 'failed']);
      $('html, body').animate({
        scrollTop : 0
      }, 500);
      $("#alert").show(500)
    }
  })
}