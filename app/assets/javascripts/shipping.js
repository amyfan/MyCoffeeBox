$(function(){
  conekta.setToken('YE138iSl1KAFfZxRS3f');
  if (window.location.pathname.indexOf("shipping") > -1) {
    if (conekta.checkout.getItems().length == 0) {
    	window.location = "/subscribe";
    } else {
    	console.log(conekta.checkout.getItems()[0]);
    }
  }

  setUpShipping();
})

function setUpShipping(){
  $('input[type=text]').addClass("empty");

  $($('input[type=text]')).blur(function(){
    $('input[type=text]').filter(function() { return $(this).val() != ""; }).removeClass("empty");
    $('input[type=text]').filter(function() { return $(this).val() == ""; }).addClass("empty");
  });

  $('a.nextusa').click(function(event){
    _gaq.push(['_trackEvent', 'Shipping', 'clicked', 'Next']);
    event.preventDefault();
    var correo = $('#email').val();
    var coffeetype = $('#coffeetype').val();
    var referral = $('#referral').val();
    var promocode = $('#promocode').val();
    var nombre = $("#nombre").val();
    var calle = $("#calle").val();
    var colonia = $("#colonia").val();
    var ciudad = $("#ciudad").val();
    var estado = $("#estado").val();
    var cp = $("#cp").val();
    var pais = $("#pais").val();
    var telefono = $("#telefono").val();

    var valid = true;
    if (nombre.length == 0) {$("#nombre").addClass("invalid"); valid = false};
    if (coffeetype.length == 0) {$("#coffeetype").addClass("invalid"); valid = false};
    if (correo.length == 0) {$("#email").addClass("invalid"); valid = false};
    if (calle.length == 0) {$("#calle").addClass("invalid"); valid = false};
    //if (colonia.length == 0) {$("#colonia").addClass("invalid"); valid = false};
    if (ciudad.length == 0) {$("#ciudad").addClass("invalid"); valid = false};
    if (estado.length == 0) {$("#estado").addClass("invalid"); valid = false};
    if (cp.length == 0) {$("#cp").addClass("invalid"); valid = false};
    if (pais.length == 0) {$("#pais").addClass("invalid"); valid = false};
    if (telefono.length == 0) {$("#telefono").addClass("invalid"); valid = false};
    if (!valid) {
      _gaq.push(['_trackEvent', 'Shipping', 'Data entry', 'failed']);
      $('#directions').goTo();
      return;
    };
    
    // TODO: temp until conekta removes validation for this field
    if (colonia.length == 0) {
    	colonia = 'n/a';
    }

    conekta.checkout.setShippingAddress({
      name: nombre,
      email: correo,
      street: calle,
      colonia: colonia,
      city: ciudad,
      state: estado,
      postal_code: cp,
      country: pais,
      phone: telefono
    });
    
    conekta.checkout.setCustomField('¿Lo quiere en Grano o Molido Tradicional?', coffeetype);
    conekta.checkout.setCustomField('Si un amigo te recomendó pon su correo electrónico', referral);
    conekta.checkout.setCustomField('Código de Promoción', promocode);

    function credit_card_callback(info){
      var url_location = "https://secure.conekta.mx/checkout/payment_confirmation?reference_id=" + 'paypal';
      document.location.href=url_location;
    }

    conekta.checkout.processPayment({
      payment_method: 'paypal',
      success_callback: credit_card_callback
    });

    //conekta.checkout.proceedToCheckout();

  });
  
  $('input[type=text]').blur(function(){
    var el = $(this);
    if(el.val().length > 0){
      el.removeClass("invalid");
    }
  });

}
