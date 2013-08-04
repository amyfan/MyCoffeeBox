var utm_source;
var utm_medium;
var utm_term;
var utm_content;
var utm_campaign;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  utm_source = QueryString.utm_source;
  utm_medium = QueryString.utm_medium;
  utm_term = QueryString.utm_term;
  utm_content = QueryString.utm_content;
  utm_campaign = QueryString.utm_campaign;

  if (utm_source != undefined) {
    createCookie('utm_source', utm_source, 30);
  }
  if (utm_medium != undefined) {
    createCookie('utm_medium', utm_medium, 30);
  }
  if (utm_term != undefined) {
    createCookie('utm_term', utm_term, 30);
  }
  if (utm_content != undefined) {
    createCookie('utm_content', utm_content, 30);
  }
  if (utm_campaign != undefined) {
    createCookie('utm_campaign', utm_campaign, 30);
  }

})

var QueryString = function() {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if ( typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if ( typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], pair[1]];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
}();

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else
    var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ')
    c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}