$(function(){
  pagalo.setToken(2757603);

  function render_products(products){
      for(var i = 0; i < products.length; i++){
        $("#content > ul").append(getTemplateForProduct(products[i]));   
      }
  }

  pagalo.getCatalog(render_products);
})

function addInteractions(element, product){
  element.hover(function(){
    var el = $(this);
    el.children(".rollover").show()
    el.children("#product").css("opacity", "0.1")
    el.children("h3").hide();
    _gaq.push(['_trackEvent', 'Catalog', 'Product Hover', product.getAttributes().name]);
  }, function(){
    var el = $(this);
    el.children(".rollover").hide();
    el.children("#product").css("opacity", "1")
    el.children("h3").show();
  })

  element.click(function(){
    suscription = pagalo.createSubscription();
    suscription.addItem(product.createItem());
    window.location = "/shipping"
    _gaq.push(['_trackEvent', 'Catalog', 'Product Selected', product.getAttributes().name]);
  })
}

function getTemplateForProduct(product){
  var template = $("#template").clone();
  template.show(); // The template is usually hidden
  product_attributes = product.getAttributes();
  $("#product", template).html("<img src='"+product_attributes.image+"'/>")
  $("#name", template).html(product_attributes.name);
  $("#brand", template).html(product_attributes.name);
  $("#description", template).html(product_attributes.description);
  $("#price", template).html(product_attributes.price + " MXN");
  addInteractions(template, product);
  return template;
}
