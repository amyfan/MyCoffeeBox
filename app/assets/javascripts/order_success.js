$(function() {
  id = QueryString.id;
  type = QueryString.type;

  if (id != undefined && type != undefined) {
    $.post("/subscriptions/confirm_payment", {
      "id" : id,
      "payment_type" : type
    });
  }
})
