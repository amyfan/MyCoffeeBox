$(function() {
  if (conekta.checkout.getItems().length == 0) {
  	// FOR SOME REASON THIS LINE MAKES ROUTING BUGGY
    //window.location = "/static_pages/catalog";
  }
  
  console.log(conekta.checkout.getItems());

  setUpSubscription();
});

function setUpSubscription() {
  $("#frequency ul li").click(function(i) {
    $("#frequency ul li").removeClass("selected");
    $(this).addClass("selected");
    $("#alert").hide()
    _gaq.push(['_trackEvent', 'Subscription', 'Frequency', 'type ' + $(this).data("frequency")]);
  });

  var item = conekta.checkout.getItems()[0];
  var attributes = item.getAttributes();
  var product = attributes.product;
  var product_options = product.product_options;

  $("#packages ul li #price").each(function(i) {
    var price = product.price + product_options[i].price;
    $(this).html("$" + price);
    $(this).parent().attr("data-product_option", product_options[i].id);
  });

  $(".next").click(function(e) {
    //console.log("here");
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Subscription', 'Clicked Next', 'next']);

    // We get the frequency
    var periodFrequencyValue = parseInt($("#frequency .selected").data("frequency"));

    if (periodFrequencyValue > 0) {
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
      } else {
        conekta.checkout.setBillingPeriod('week', 4, {
          recurring : -1,
          lump_sum : 4
        });
        conekta.checkout.setShippingPeriod('week', 4, {
          recurring : -1,
          lump_sum : 4
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