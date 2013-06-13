var especial_product;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  function get_special_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
    	if (product_attributes.name.indexOf("Especial") > -1) {
  	    especial_product = products[i];
  	    break;
      }
    }
  }

  conekta.display.getProducts(
  	{},
  get_special_product);

  setUpSpecialPurchase();
})

function setUpSpecialPurchase() {
  $("a.buy").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Especial Padre', 'Clicked Buy', 'next']);
    
    conekta.checkout.new('order', {company_id: 2757603});
    conekta.checkout.addItem(especial_product.createItem());

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
  })
}