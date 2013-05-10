$(function(){
  $('#subscribe').click(function(event){
    var email = $('#email_address').val();
    $.ajax({
      type: "post",
      url: "/subscribe",
      data: { email_address: email },
      success: function(data){
        console.log(data);
        if(data == 'true'){
          $('#response').text('Gracias por suscribirte').addClass('valid').removeClass('invalid');
        }
        else{
          $('#response').text('Algo salió mal').addClass('invalid').removeClass('valid');
        }
      }
    })
    event.preventDefault();
  })
  
  $('#email_address').keyup(function(key){
    if(key.which == 13){
      $('#subscribe').trigger('click');
    }
    key.preventDefault();
  })
})