$(function() {
  //pagalo.setToken(2757603);
  conekta.setToken(2757603);

  function render_products(products) {
    for (var i = 0; i < products.length; i++) {
      $("#content > ul").append(getTemplateForProduct(products[i]));
    }
  }

  //pagalo.getCatalog(render_products);
  conekta.display.getProducts(
  	{},
  render_products);
  
  //setUpSubscription();
})

function getTemplateForProduct(product) {
  var template = $("#template").clone();
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
    _gaq.push(['_trackEvent', 'Catalog', 'Product Hover', product.getAttributes().name]);
  }, function() {
    var el = $(this);
    el.children(".rollover").hide();
    el.children("#product").css("opacity", "1")
    el.children("h3").show();
  })

  element.click(function() {
    //suscription = pagalo.createSubscription();
    //suscription.addItem(product.createItem());
    
    $("#template").removeClass("selected");
    $(this).addClass("selected");
    $("#alert").hide()

    conekta.checkout.new('subscription', {company_id: 2757603});
    conekta.checkout.addItem(product.createItem());
    
    console.log(conekta.checkout.getItems());
    
    window.location = "/static_pages/subscription"
    _gaq.push(['_trackEvent', 'Catalog', 'Product Selected', product.getAttributes().name]);
  })
}

// function setUpSubscription() {
  // $("#frequency ul li").click(function(i) {
    // $("#frequency ul li").removeClass("selected");
    // $(this).addClass("selected");
    // $("#alert").hide()
    // _gaq.push(['_trackEvent', 'Subscription', 'Frequency', 'type ' + $(this).data("frequency")]);
  // });
// 
  // $(".next").click(function(e) {
    // e.preventDefault();
    // _gaq.push(['_trackEvent', 'Subscription', 'Clicked Next', 'next']);
//     
    // var item = conekta.checkout.getItems()[0];
    // var attributes = item.getAttributes();
    // var product = attributes.product;
    // var product_options = product.product_options;
// 
    // $("#packages ul li #price").each(function(i) {
      // var price = product.price + product_options[i].price;
      // $(this).html("$" + price);
      // $(this).parent().attr("data-product_option", product_options[i].id);
    // });
// 
    // // We get the frequency
    // var periodFrequencyValue = parseInt($("#frequency .selected").data("frequency"));
// 
    // if (conekta.checkout.getItems().length > 0 && periodFrequencyValue > 0) {
      // //configure a 4 month subscription default
      // if (periodFrequencyValue == 2) {
        // conekta.checkout.setBillingPeriod('week', 2, {
          // recurring : -1,
          // lump_sum : 8
        // });
        // conekta.checkout.setShippingPeriod('week', 2, {
          // recurring : -1,
          // lump_sum : 8
        // });
      // } else {
        // conekta.checkout.setBillingPeriod('week', 4, {
          // recurring : -1,
          // lump_sum : 4
        // });
        // conekta.checkout.setShippingPeriod('week', 4, {
          // recurring : -1,
          // lump_sum : 4
        // });
      // }
// 
      // // var suscription = pagalo.getSubscription()
      // // suscription.setShippingOption({
// 
      // // free shipping
      // conekta.checkout.setShippingOption({
        // id : 891,
        // cost : 0.0,
        // carrier : 'Envío Nacional',
        // service_name : 'Entrega Gratis'
      // });
// 
      // conekta.checkout.proceedToCheckout();
    // } else {
      // _gaq.push(['_trackEvent', 'Subscription', 'Clicked Next', 'failed']);
      // $('html, body').animate({
        // scrollTop : 0
      // }, 500);
      // $("#alert").show(500)
    // }
  // })
// }