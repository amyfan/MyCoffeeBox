//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=r.unshift,l=i.toString,c=i.hasOwnProperty,h=r.forEach,p=r.map,d=r.reduce,v=r.reduceRight,m=r.filter,g=r.every,y=r.some,b=r.indexOf,w=r.lastIndexOf,E=Array.isArray,S=Object.keys,x=s.bind,T=function(e){if(e instanceof T)return e;if(!(this instanceof T))return new T(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=T),exports._=T):e._=T,T.VERSION="1.4.2";var N=T.each=T.forEach=function(e,t,r){if(e==null)return;if(h&&e.forEach===h)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(T.has(e,o)&&t.call(r,e[o],o,e)===n)return};T.map=T.collect=function(e,t,n){var r=[];return e==null?r:p&&e.map===p?e.map(t,n):(N(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),r)},T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduce===d)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);N(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),arguments.length>2?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=T.keys(e);s=o.length}N(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.find=T.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},T.filter=T.select=function(e,t,n){var r=[];return e==null?r:m&&e.filter===m?e.filter(t,n):(N(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)}),r)},T.reject=function(e,t,n){var r=[];return e==null?r:(N(e,function(e,i,s){t.call(n,e,i,s)||(r[r.length]=e)}),r)},T.every=T.all=function(e,t,r){t||(t=T.identity);var i=!0;return e==null?i:g&&e.every===g?e.every(t,r):(N(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=T.some=T.any=function(e,t,r){t||(t=T.identity);var i=!1;return e==null?i:y&&e.some===y?e.some(t,r):(N(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};T.contains=T.include=function(e,t){var n=!1;return e==null?n:b&&e.indexOf===b?e.indexOf(t)!=-1:(n=C(e,function(e){return e===t}),n)},T.invoke=function(e,t){var n=u.call(arguments,2);return T.map(e,function(e){return(T.isFunction(t)?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,function(e){return e[t]})},T.where=function(e,t){return T.isEmpty(t)?[]:T.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&T.isEmpty(e))return-Infinity;var r={computed:-Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&T.isEmpty(e))return Infinity;var r={computed:Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},T.shuffle=function(e){var t,n=0,r=[];return N(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r};var k=function(e){return T.isFunction(e)?e:function(t){return t[e]}};T.sortBy=function(e,t,n){var r=k(t);return T.pluck(T.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t);return N(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)}),i};T.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(T.has(e,t)?e[t]:e[t]=[]).push(n)})},T.countBy=function(e,t,n){return L(e,t,n,function(e,t,n){T.has(e,t)||(e[t]=0),e[t]++})},T.sortedIndex=function(e,t,n,r){n=n==null?T.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},T.toArray=function(e){return e?e.length===+e.length?u.call(e):T.values(e):[]},T.size=function(e){return e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return t!=null&&!n?u.call(e,0,t):e[0]},T.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},T.last=function(e,t,n){return t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]},T.rest=T.tail=T.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},T.compact=function(e){return T.filter(e,function(e){return!!e})};var A=function(e,t,n){return N(e,function(e){T.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n};T.flatten=function(e,t){return A(e,t,[])},T.without=function(e){return T.difference(e,u.call(arguments,1))},T.uniq=T.unique=function(e,t,n,r){var i=n?T.map(e,n,r):e,s=[],o=[];return N(i,function(n,r){if(t?!r||o[o.length-1]!==n:!T.contains(o,n))o.push(n),s.push(e[r])}),s},T.union=function(){return T.uniq(a.apply(r,arguments))},T.intersection=function(e){var t=u.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.indexOf(t,e)>=0})})},T.difference=function(e){var t=a.apply(r,u.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){var e=u.call(arguments),t=T.max(T.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=T.pluck(e,""+r);return n},T.object=function(e,t){var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(b&&e.indexOf===b)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(w&&e.lastIndexOf===w)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};T.bind=function(t,n){var r,i;if(t.bind===x&&x)return x.apply(t,u.call(arguments,1));if(!T.isFunction(t))throw new TypeError;return i=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=t.prototype;var e=new O,s=t.apply(e,i.concat(u.call(arguments)));return Object(s)===s?s:e}return t.apply(n,i.concat(u.call(arguments)))}},T.bindAll=function(e){var t=u.call(arguments,1);return t.length==0&&(t=T.functions(e)),N(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(u.call(arguments,1)))},T.throttle=function(e,t){var n,r,i,s,o,u,a=T.debounce(function(){o=s=!1},t);return function(){n=this,r=arguments;var f=function(){i=null,o&&(u=e.apply(n,r)),a()};return i||(i=setTimeout(f,t)),s?o=!0:(s=!0,u=e.apply(n,r)),a(),u}},T.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},T.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},T.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},T.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},T.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)T.has(e,n)&&(t[t.length]=n);return t},T.values=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push(e[n]);return t},T.pairs=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push([n,e[n]]);return t},T.invert=function(e){var t={};for(var n in e)T.has(e,n)&&(t[e[n]]=n);return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return N(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)T.contains(n,i)||(t[i]=e[i]);return t},T.defaults=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]==null&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e),r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length,u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,f=t.constructor;if(a!==f&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(f)&&f instanceof f))return!1;for(var c in e)if(T.has(e,c)){o++;if(!(u=T.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(T.has(t,c)&&!(o--))break;u=!o}}return n.pop(),r.pop(),u};T.isEqual=function(e,t){return M(e,t,[],[])},T.isEmpty=function(e){if(e==null)return!0;if(T.isArray(e)||T.isString(e))return e.length===0;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!!e&&e.nodeType===1},T.isArray=E||function(e){return l.call(e)=="[object Array]"},T.isObject=function(e){return e===Object(e)},N(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!!e&&!!T.has(e,"callee")}),typeof /./!="function"&&(T.isFunction=function(e){return typeof e=="function"}),T.isFinite=function(e){return T.isNumber(e)&&isFinite(e)},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||l.call(e)=="[object Boolean]"},T.isNull=function(e){return e===null},T.isUndefined=function(e){return e===void 0},T.has=function(e,t){return c.call(e,t)},T.noConflict=function(){return e._=t,this},T.identity=function(e){return e},T.times=function(e,t,n){for(var r=0;r<e;r++)t.call(n,r)},T.random=function(e,t){return t==null&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=T.invert(_.escape);var D={escape:new RegExp("["+T.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(_.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),T.result=function(e,t){if(e==null)return null;var n=e[t];return T.isFunction(n)?n.call(e):n},T.mixin=function(e){N(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(T,e))}})};var P=0;T.uniqueId=function(e){var t=P++;return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){n=T.defaults({},n,T.templateSettings);var r=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,n,r,o,u){s+=e.slice(i,u).replace(j,function(e){return"\\"+B[e]}),s+=n?"'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?"'+\n((__t=("+r+"))==null?'':__t)+\n'":o?"';\n"+o+"\n__p+='":"",i=u+t.length}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(n.variable||"obj","_",s)}catch(u){throw u.source=s,u}if(t)return o(t,T);var a=function(e){return o.call(this,e,T)};return a.source="function("+(n.variable||"obj")+"){\n"+s+"}",a},T.chain=function(e){return T(e).chain()};var F=function(e){return this._chain?T(e).chain():e};T.mixin(T),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),N(["concat","join","slice"],function(e){var t=r[e];T.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);

//     Backbone.js 0.9.2

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `global`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to slice/splice.
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.2';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  var $ = root.jQuery || root.Zepto || root.ender;

  // Set the JavaScript library that will be used for DOM manipulation and
  // Ajax calls (a.k.a. the `$` variable). By default Backbone will use: jQuery,
  // Zepto, or Ender; but the `setDomLibrary()` method lets you inject an
  // alternate JavaScript library (or a mock library for testing your views
  // outside of a browser).
  Backbone.setDomLibrary = function(lib) {
    $ = lib;
  };

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // Regular expression used to split event strings
  var eventSplitter = /\s+/;

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback functions
  // to an event; trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, `events`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.
    on: function(events, callback, context) {

      var calls, event, node, tail, list;
      if (!callback) return this;
      events = events.split(eventSplitter);
      calls = this._callbacks || (this._callbacks = {});

      // Create an immutable callback list, allowing traversal during
      // modification.  The tail is an empty object that will always be used
      // as the next node.
      while (event = events.shift()) {
        list = calls[event];
        node = list ? list.tail : {};
        node.next = tail = {};
        node.context = context;
        node.callback = callback;
        calls[event] = {tail: tail, next: list ? list.next : node};
      }

      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `events` is null, removes all bound callbacks for all events.
    off: function(events, callback, context) {
      var event, calls, node, tail, cb, ctx;

      // No events, or removing *all* events.
      if (!(calls = this._callbacks)) return;
      if (!(events || callback || context)) {
        delete this._callbacks;
        return this;
      }

      // Loop through the listed events and contexts, splicing them out of the
      // linked list of callbacks if appropriate.
      events = events ? events.split(eventSplitter) : _.keys(calls);
      while (event = events.shift()) {
        node = calls[event];
        delete calls[event];
        if (!node || !(callback || context)) continue;
        // Create a new list, omitting the indicated callbacks.
        tail = node.tail;
        while ((node = node.next) !== tail) {
          cb = node.callback;
          ctx = node.context;
          if ((callback && cb !== callback) || (context && ctx !== context)) {
            this.on(event, cb, ctx);
          }
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls.all;
      events = events.split(eventSplitter);
      rest = slice.call(arguments, 1);

      // For each event, walk through the linked list of callbacks twice,
      // first to trigger the event, then to trigger any `"all"` callbacks.
      while (event = events.shift()) {
        if (node = calls[event]) {
          tail = node.tail;
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, rest);
          }
        }
        if (node = all) {
          tail = node.tail;
          args = [event].concat(rest);
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, args);
          }
        }
      }

      return this;
    }

  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (options && options.parse) attributes = this.parse(attributes);
    if (defaults = getValue(this, 'defaults')) {
      attributes = _.extend({}, defaults, attributes);
    }
    if (options && options.collection) this.collection = options.collection;
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    this.changed = {};
    this._silent = {};
    this._pending = {};
    this.set(attributes, {silent: true});
    // Reset change tracking.
    this.changed = {};
    this._silent = {};
    this._pending = {};
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // A hash of attributes that have silently changed since the last time
    // `change` was called.  Will become pending attributes on the next call.
    _silent: null,

    // A hash of attributes that have changed since the last `'change'` event
    // began.
    _pending: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.get(attr);
      return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, value, options) {
      var attrs, attr, val;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs instanceof Model) attrs = attrs.attributes;
      if (options.unset) for (attr in attrs) attrs[attr] = void 0;

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var changes = options.changes = {};
      var now = this.attributes;
      var escaped = this._escapedAttributes;
      var prev = this._previousAttributes || {};

      // For each `set` attribute...
      for (attr in attrs) {
        val = attrs[attr];

        // If the new and current value differ, record the change.
        if (!_.isEqual(now[attr], val) || (options.unset && _.has(now, attr))) {
          delete escaped[attr];
          (options.silent ? this._silent : changes)[attr] = true;
        }

        // Update or delete the current value.
        options.unset ? delete now[attr] : now[attr] = val;

        // If the new and previous value differ, record the change.  If not,
        // then remove changes for this attribute.
        if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
          this.changed[attr] = val;
          if (!options.silent) this._pending[attr] = true;
        } else {
          delete this.changed[attr];
          delete this._pending[attr];
        }
      }

      // Fire the `"change"` events.
      if (!options.silent) this.change(options);
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      (options || (options = {})).unset = true;
      return this.set(attr, null, options);
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = Backbone.wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, value, options) {
      var attrs, current;

      // Handle both `("key", value)` and `({key: value})` -style calls.
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }
      options = options ? _.clone(options) : {};

      // If we're "wait"-ing to set changed attributes, validate early.
      if (options.wait) {
        if (!this._validate(attrs, options)) return false;
        current = _.clone(this.attributes);
      }

      // Regular saves `set` attributes before persisting to the server.
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var serverAttrs = model.parse(resp, xhr);
        if (options.wait) {
          delete options.wait;
          serverAttrs = _.extend(attrs || {}, serverAttrs);
        }
        if (!model.set(serverAttrs, options)) return false;
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };

      // Finish configuring and sending the Ajax request.
      options.error = Backbone.wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
      if (options.wait) this.set(current, silentOptions);
      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var triggerDestroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      if (this.isNew()) {
        triggerDestroy();
        return false;
      }

      options.success = function(resp) {
        if (options.wait) triggerDestroy();
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };

      options.error = Backbone.wrapError(options.error, model, options);
      var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
      if (!options.wait) triggerDestroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = getValue(this, 'urlRoot') || getValue(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      options || (options = {});
      var changing = this._changing;
      this._changing = true;

      // Silent changes become pending changes.
      for (var attr in this._silent) this._pending[attr] = true;

      // Silent changes are triggered.
      var changes = _.extend({}, options.changes, this._silent);
      this._silent = {};
      for (var attr in changes) {
        this.trigger('change:' + attr, this, this.get(attr), options);
      }
      if (changing) return this;

      // Continue firing `"change"` events while there are pending changes.
      while (!_.isEmpty(this._pending)) {
        this._pending = {};
        this.trigger('change', this, options);
        // Pending and silent changes still remain.
        for (var attr in this.changed) {
          if (this._pending[attr] || this._silent[attr]) continue;
          delete this.changed[attr];
        }
        this._previousAttributes = _.clone(this.attributes);
      }

      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (!arguments.length) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (!arguments.length || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Check if the model is currently in a valid state. It's only possible to
    // get into an *invalid* state if you're using silent changes.
    isValid: function() {
      return !this.validate(this.attributes);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. If a specific `error` callback has
    // been passed, call that instead of firing the general `"error"` event.
    _validate: function(attrs, options) {
      if (options.silent || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) {
        options.error(this, error, options);
      } else {
        this.trigger('error', this, error, options);
      }
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, index, length, model, cid, id, cids = {}, ids = {}, dups = [];
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];

      // Begin by turning bare objects into model references, and preventing
      // invalid models or duplicate models from being added.
      for (i = 0, length = models.length; i < length; i++) {
        if (!(model = models[i] = this._prepareModel(models[i], options))) {
          throw new Error("Can't add an invalid model to a collection");
        }
        cid = model.cid;
        id = model.id;
        if (cids[cid] || this._byCid[cid] || ((id != null) && (ids[id] || this._byId[id]))) {
          dups.push(i);
          continue;
        }
        cids[cid] = ids[id] = model;
      }

      // Remove duplicates.
      i = dups.length;
      while (i--) {
        models.splice(dups[i], 1);
      }

      // Listen to added models' events, and index models for lookup by
      // `id` and by `cid`.
      for (i = 0, length = models.length; i < length; i++) {
        (model = models[i]).on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // Insert models into the collection, re-sorting if needed, and triggering
      // `add` events unless silenced.
      this.length += length;
      index = options.at != null ? options.at : this.models.length;
      splice.apply(this.models, [index, 0].concat(models));
      if (this.comparator) this.sort({silent: true});
      if (options.silent) return this;
      for (i = 0, length = this.models.length; i < length; i++) {
        if (!cids[(model = this.models[i]).cid]) continue;
        options.index = i;
        model.trigger('add', model, this, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.getByCid(models[i]) || this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, options);
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Get a model from the set by id.
    get: function(id) {
      if (id == null) return void 0;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid: function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      var boundComparator = _.bind(this.comparator, this);
      if (this.comparator.length == 1) {
        this.models = this.sortBy(boundComparator);
      } else {
        this.models.sort(boundComparator);
      }
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      models  || (models = []);
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      this._reset();
      this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === undefined) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = Backbone.wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var coll = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) coll.add(model, options);
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        if (options.wait) coll.add(nextModel, options);
        if (success) {
          success(nextModel, resp);
        } else {
          nextModel.trigger('sync', model, resp, options);
        }
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(model, options) {
      options || (options = {});
      if (!(model instanceof Model)) {
        var attrs = model;
        options.collection = this;
        model = new this.model(attrs, options);
        if (!model._validate(model.attributes, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event == 'add' || event == 'remove') && collection != this) return;
      if (event == 'destroy') {
        this.remove(model, options);
      }
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning leading hashes and slashes .
  var routeStripper = /^[#\/]/;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(windowOverride) {
      var loc = windowOverride ? windowOverride.location : window.location;
      var match = loc.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
        } else {
          fragment = this.getHash();
        }
      }
      if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.getHash(this.iframe));
      if (current == this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      var frag = (fragment || '').replace(routeStripper, '');
      if (this.fragment == frag) return;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this.fragment = frag;
        this._updateHash(window.location, frag, options.replace);
        if (this.iframe && (frag != this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
          // When replace is true, we don't want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, frag, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        window.location.assign(this.options.root + fragment);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
      } else {
        location.hash = fragment;
      }
    }
  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.
    remove: function() {
      this.$el.remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = (element instanceof $) ? element : $(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = getValue(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = getValue(this, 'attributes') || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.setElement(this.make(this.tagName, attrs), false);
      } else {
        this.setElement(this.el, false);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.
  Model.extend = Collection.extend = Router.extend = View.extend = extend;

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    options || (options = {});

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = getValue(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      if (!options.dataType || options.dataType !== 'jsonp'){
          params.data = JSON.stringify(model.toJSON());
      }else{
          params.data = model.toJSON();
          options.processData = true;
          params.url = params.url + '/' + method
      }
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    return $.ajax(_.extend(params, options));
  };

  // Wrap an optional error callback with a fallback error event.
  Backbone.wrapError = function(onError, originalModel, options) {
    return function(model, resp) {
      resp = model === originalModel ? resp : model;
      if (onError) {
        onError(originalModel, resp, options);
      } else {
        originalModel.trigger('error', originalModel, resp, options);
      }
    };
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a value from a Backbone object as a property
  // or as a function.
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);

/*
    json2.js
    2012-10-08

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

(function() {
  'use strict';
  var S4, dualsync, localsync, onlineSync, parseRemoteResponse, result;

  Backbone.Collection.prototype.syncDirty = function() {
    var id, ids, model, store, _i, _len, _results;
    this.namespace = this.namespace || jQuery('#company_id').val() || 'conekta';
    store = localStorage.getItem("" + this.namespace + ":" + this.url + "_dirty");
    ids = (store && store.split(',')) || [];
    _results = [];
    for (_i = 0, _len = ids.length; _i < _len; _i++) {
      id = ids[_i];
      model = id.length === 36 ? this.where({
        id: id
      })[0] : this.get(parseInt(id));
      _results.push(model.save());
    }
    return _results;
  };

  Backbone.Collection.prototype.syncDestroyed = function() {
    var id, ids, model, store, _i, _len, _results;
    this.namespace = this.namespace || jQuery('#company_id').val() || 'conekta';
    store = localStorage.getItem("" + this.namespace + ":" + this.url + "_destroyed");
    ids = (store && store.split(',')) || [];
    _results = [];
    for (_i = 0, _len = ids.length; _i < _len; _i++) {
      id = ids[_i];
      model = new this.model({
        id: id
      });
      model.collection = this;
      _results.push(model.destroy());
    }
    return _results;
  };

  Backbone.Collection.prototype.syncDirtyAndDestroyed = function() {
    this.syncDirty();
    return this.syncDestroyed();
  };

  S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  window.Store = (function() {

    Store.prototype.sep = '';

    function Store(name) {
      this.namespace = jQuery('#company_id').val() || 'conekta';
      this.name = this.namespace + ':' + name;
      this.records = this.recordsOn(this.name);
    }

    Store.prototype.generateId = function() {
      return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
    };

    Store.prototype.save = function() {
      return localStorage.setItem(this.name, this.records.join(','));
    };

    Store.prototype.recordsOn = function(key) {
      var store;
      store = localStorage.getItem(key);
      return (store && store.split(',')) || [];
    };

    Store.prototype.dirty = function(model) {
      var dirtyRecords;
      dirtyRecords = this.recordsOn(this.name + '_dirty');
      if (!_.include(dirtyRecords, model.id.toString())) {
        dirtyRecords.push(model.id);
        localStorage.setItem(this.name + '_dirty', dirtyRecords.join(','));
      }
      return model;
    };

    Store.prototype.clean = function(model, from) {
      var dirtyRecords, store;
      store = "" + this.name + "_" + from;
      dirtyRecords = this.recordsOn(store);
      if (_.include(dirtyRecords, model.id.toString())) {
        localStorage.setItem(store, _.without(dirtyRecords, model.id.toString()).join(','));
      }
      return model;
    };

    Store.prototype.destroyed = function(model) {
      var destroyedRecords;
      destroyedRecords = this.recordsOn(this.name + '_destroyed');
      if (!_.include(destroyedRecords, model.id.toString())) {
        destroyedRecords.push(model.id);
        localStorage.setItem(this.name + '_destroyed', destroyedRecords.join(','));
      }
      return model;
    };

    Store.prototype.create = function(model) {
      if (!_.isObject(model)) {
        return model;
      }
      if (!model.id) {
        model.id = this.generateId();
        model.set(model.idAttribute, model.id);
      }
      localStorage.setItem(this.name + this.sep + model.id, JSON.stringify(model));
      this.records.push(model.id.toString());
      this.save();
      return model;
    };

    Store.prototype.update = function(model) {
      localStorage.setItem(this.name + this.sep + model.id, JSON.stringify(model));
      if (!_.include(this.records, model.id.toString())) {
        this.records.push(model.id.toString());
      }
      this.save();
      return model;
    };

    Store.prototype.clear = function() {
      var id, _i, _len, _ref;
      _ref = this.records;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        localStorage.removeItem(this.name + this.sep + id);
      }
      this.records = [];
      return this.save();
    };

    Store.prototype.hasDirtyOrDestroyed = function() {
      return !_.isEmpty(localStorage.getItem(this.name + '_dirty')) || !_.isEmpty(localStorage.getItem(this.name + '_destroyed'));
    };

    Store.prototype.find = function(model) {
      return JSON.parse(localStorage.getItem(this.name + this.sep + model.id));
    };

    Store.prototype.findAll = function() {
      var id, _i, _len, _ref, _results;
      _ref = this.records;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        _results.push(JSON.parse(localStorage.getItem(this.name + this.sep + id)));
      }
      return _results;
    };

    Store.prototype.destroy = function(model) {
      localStorage.removeItem(this.name + this.sep + model.id);
      this.records = _.reject(this.records, function(record_id) {
        return record_id === model.id.toString();
      });
      this.save();
      return model;
    };

    return Store;

  })();

  localsync = function(method, model, options) {
    var response, store;
    store = new Store(options.storeName);
    response = (function() {
      switch (method) {
        case 'read':
          if (model.id) {
            return store.find(model);
          } else {
            return store.findAll();
          }
          break;
        case 'hasDirtyOrDestroyed':
          return store.hasDirtyOrDestroyed();
        case 'clear':
          return store.clear();
        case 'create':
          if (!(options.add && !options.merge && store.find(model))) {
            model = store.create(model);
            if (options.dirty) {
              return store.dirty(model);
            } else {
              return store.clean(model, 'dirty');
            }
          }
          break;
        case 'update':
          store.update(model);
          if (options.dirty) {
            return store.dirty(model);
          } else {
            return store.clean(model, 'dirty');
          }
          break;
        case 'delete':
          store.destroy(model);
          if (options.dirty) {
            return store.destroyed(model);
          } else {
            if (model.id.toString().length === 36) {
              return store.clean(model, 'dirty');
            } else {
              return store.clean(model, 'destroyed');
            }
          }
      }
    })();
    if (!options.ignoreCallbacks) {
      if (response) {
        options.success(response);
      } else {
        options.error('Record not found');
      }
    }
    return response;
  };

  result = function(object, property) {
    var value;
    if (!object) {
      return null;
    }
    value = object[property];
    if (_.isFunction(value)) {
      return value.call(object);
    } else {
      return value;
    }
  };

  parseRemoteResponse = function(object, response) {
    if (!(object && object.parseBeforeLocalSave)) {
      return response;
    }
    if (_.isFunction(object.parseBeforeLocalSave)) {
      return object.parseBeforeLocalSave(response);
    }
  };

  onlineSync = Backbone.sync;

  dualsync = function(method, model, options) {
    var error, local, originalModel, success;
    options.storeName = result(model.collection, 'modelName') || result(model, 'modelName');
    if (result(model, 'remote') || result(model.collection, 'remote')) {
      return onlineSync(method, model, options);
    }
    local = result(model, 'local') || result(model.collection, 'local');
    if (options.local_override) {
      options.dirty = false;
    } else {
      options.dirty = options.remote === false && !local;
    }
    if (options.remote === false || local) {
      return localsync(method, model, options);
    }
    options.ignoreCallbacks = true;
    success = options.success;
    error = options.error;
    switch (method) {
      case 'read':
        if (localsync('hasDirtyOrDestroyed', model, options)) {
          return success(localsync(method, model, options));
        } else {
          options.success = function(resp, status, xhr) {
            var i, _i, _len;
            resp = parseRemoteResponse(model, resp);
            if (!options.add) {
              localsync('clear', model, options);
            }
            if (_.isArray(resp)) {
              for (_i = 0, _len = resp.length; _i < _len; _i++) {
                i = resp[_i];
                localsync('create', i, options);
              }
            } else {
              localsync('create', resp, options);
            }
            return success(resp, status, xhr);
          };
          options.error = function(resp) {
            return success(localsync(method, model, options));
          };
          return onlineSync(method, model, options);
        }
        break;
      case 'create':
        options.success = function(resp, status, xhr) {
          localsync(method, resp, options);
          return success(resp, status, xhr);
        };
        options.error = options.error || function(resp) {
          options.dirty = true;
          return success(localsync(method, model, options));
        };
        return onlineSync(method, model, options);
      case 'update':
        if (_.isString(model.id) && model.id.length === 36) {
          originalModel = model.clone();
          originalModel.set({
            'id': model.id
          }, {
            silent: true
          });
          options.success = function(resp, status, xhr) {
            localsync('delete', originalModel, options);
            localsync('create', resp, options);
            return success(resp, status, xhr);
          };
          options.error = function(resp) {
            options.dirty = true;
            return success(localsync(method, originalModel, options));
          };
          model.set({
            id: null
          });
          return onlineSync('create', model, options);
        } else {
          options.success = function(resp, status, xhr) {
            model.set(resp);
            return success(localsync(method, model, options));
          };
          options.error = function(resp) {
            options.dirty = true;
            return success(localsync(method, model, options));
          };
          return onlineSync(method, model, options);
        }
        break;
      case 'delete':
        if (_.isString(model.id) && model.id.length === 36) {
          return localsync(method, model, options);
        } else {
          options.success = function(resp, status, xhr) {
            localsync(method, model, options);
            return success(resp, status, xhr);
          };
          options.error = function(resp) {
            options.dirty = true;
            return success(localsync(method, model, options));
          };
          return onlineSync(method, model, options);
        }
    }
  };

  Backbone.sync = dualsync;

}).call(this);

// Backbone.Validation v0.6.2
//
// Copyright (c) 2011-2012 Thomas Pedersen
// Distributed under MIT License
//
// Documentation and full license available at:
// http://thedersen.com/projects/backbone-validation
Backbone.Validation=function(a){"use strict";var b={forceUpdate:!1,selector:"name",labelFormatter:"sentenceCase",valid:Function.prototype,invalid:Function.prototype},c=function(){var c=function(b){return a.reduce(a.keys(b.validation||{}),function(a,b){return a[b]=void 0,a},{})},e=function(b,c){var d=b.validation?b.validation[c]||{}:{};if(a.isFunction(d)||a.isString(d))d={fn:d};return a.isArray(d)||(d=[d]),a.reduce(d,function(b,c){return a.each(a.without(a.keys(c),"msg"),function(a){b.push({fn:h[a],val:c[a],msg:c.msg})}),b},[])},f=function(b,c,d,f){return a.reduce(e(b,c),function(a,e){var g=e.fn.call(h,d,c,e.val,b,f);return g===!1||a===!1?!1:g&&!a?e.msg||g:a},"")},g=function(b,c){var d,e,g={},h=!0,i=a.clone(c);for(e in c)d=f(b,e,c[e],i),d&&(g[e]=d,h=!1);return{invalidAttrs:g,isValid:h}},i=function(b,d){return{preValidate:function(b,c){return f(this,b,c,a.extend({},this.attributes))},isValid:function(b){if(a.isString(b))return!f(this,b,this.get(b),a.extend({},this.attributes));if(a.isArray(b)){for(var c=0;c<b.length;c++)if(f(this,b[c],this.get(b[c]),a.extend({},this.attributes)))return!1;return!0}return b===!0&&this.validate(),this.validation?this._isValid:!0},validate:function(e,f){var h=this,i=!e,j=a.extend({},d,f),k=a.extend(c(h),h.attributes,e),l=e||k,m=g(h,k);h._isValid=m.isValid;for(var n in k){var o=m.invalidAttrs.hasOwnProperty(n),p=l.hasOwnProperty(n);o&&(p||i)&&j.invalid(b,n,m.invalidAttrs[n],j.selector),o||j.valid(b,n,j.selector)}a.defer(function(){h.trigger("validated",h._isValid,h,m.invalidAttrs),h.trigger("validated:"+(h._isValid?"valid":"invalid"),h,m.invalidAttrs)});if(!j.forceUpdate&&a.intersection(a.keys(m.invalidAttrs),a.keys(l)).length>0)return m.invalidAttrs}}},j=function(b,c,d){a.extend(c,i(b,d))},k=function(a){delete a.validate,delete a.preValidate,delete a.isValid},l=function(a){j(this.view,a,this.options)},m=function(a){k(a)};return{version:"0.6.2",configure:function(c){a.extend(b,c)},bind:function(c,e){var f=c.model,g=c.collection;e=a.extend({},b,d,e);if(typeof f=="undefined"&&typeof g=="undefined")throw"Before you execute the binding your view must have a model or a collection.\nSee http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.";f&&j(c,f,e),g&&(g.each(function(a){j(c,a,e)}),g.bind("add",l,{view:c,options:e}),g.bind("remove",m))},unbind:function(a){var b=a.model,c=a.collection;b&&k(a.model),c&&(c.each(function(a){k(a)}),c.unbind("add",l),c.unbind("remove",m))},mixin:i(null,b)}}(),d=c.callbacks={valid:function(a,b,c){a.$("["+c+"~="+b+"]").removeClass("invalid").removeAttr("data-error")},invalid:function(a,b,c,d){a.$("["+d+"~="+b+"]").addClass("invalid").attr("data-error",c)}},e=c.patterns={digits:/^\d+$/,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},f=c.messages={required:"{0} is required",acceptance:"{0} must be accepted",min:"{0} must be greater than or equal to {1}",max:"{0} must be less than or equal to {1}",range:"{0} must be between {1} and {2}",length:"{0} must be {1} characters",minLength:"{0} must be at least {1} characters",maxLength:"{0} must be at most {1} characters",rangeLength:"{0} must be between {1} and {2} characters",oneOf:"{0} must be one of: {1}",equalTo:"{0} must be the same as {1}",pattern:"{0} must be a valid {1}"},g=c.labelFormatters={none:function(a){return a},sentenceCase:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w)/g,function(a,b){return b===0?a.toUpperCase():" "+a.toLowerCase()}).replace("_"," ")},label:function(a,b){return b.labels[a]||g.sentenceCase(a,b)}},h=c.validators=function(){var c=String.prototype.trim?function(a){return a===null?"":String.prototype.trim.call(a)}:function(a){var b=/^\s+/,c=/\s+$/;return a===null?"":a.toString().replace(b,"").replace(c,"")},d=function(a,c){return g[b.labelFormatter](a,c)},h=function(){var a=Array.prototype.slice.call(arguments),b=a.shift();return b.replace(/\{(\d+)\}/g,function(b,c){return typeof a[c]!="undefined"?a[c]:b})},i=function(b){return a.isNumber(b)||a.isString(b)&&b.match(e.number)},j=function(b){return!(a.isNull(b)||a.isUndefined(b)||a.isString(b)&&c(b)==="")};return{fn:function(b,c,d,e,f){return a.isString(d)&&(d=e[d]),d.call(e,b,c,f)},required:function(b,c,e,g,i){var k=a.isFunction(e)?e.call(g,b,c,i):e;if(!k&&!j(b))return!1;if(k&&!j(b))return h(f.required,d(c,g))},acceptance:function(b,c,e,g){if(b!=="true"&&(!a.isBoolean(b)||b===!1))return h(f.acceptance,d(c,g))},min:function(a,b,c,e){if(!i(a)||a<c)return h(f.min,d(b,e),c)},max:function(a,b,c,e){if(!i(a)||a>c)return h(f.max,d(b,e),c)},range:function(a,b,c,e){if(!i(a)||a<c[0]||a>c[1])return h(f.range,d(b,e),c[0],c[1])},length:function(a,b,e,g){if(!j(a)||c(a).length!==e)return h(f.length,d(b,g),e)},minLength:function(a,b,e,g){if(!j(a)||c(a).length<e)return h(f.minLength,d(b,g),e)},maxLength:function(a,b,e,g){if(!j(a)||c(a).length>e)return h(f.maxLength,d(b,g),e)},rangeLength:function(a,b,e,g){if(!j(a)||c(a).length<e[0]||c(a).length>e[1])return h(f.rangeLength,d(b,g),e[0],e[1])},oneOf:function(b,c,e,g){if(!a.include(e,b))return h(f.oneOf,d(c,g),e.join(", "))},equalTo:function(a,b,c,e,g){if(a!==g[c])return h(f.equalTo,d(b,e),d(c,e))},pattern:function(a,b,c,g){if(!j(a)||!a.toString().match(e[c]||c))return h(f.pattern,d(b,g),c)}}}();return c}(_);

(function() {
  var getOrPostRegEx, httpRegEx, jsonRegEx, sameSchemeRegEx, xmlRegEx;

  window.parseUri = function(str) {
    var i, m, o, uri;
    o = parseUri.options;
    m = o.parser[(o.strictMode ? "strict" : "loose")].exec(str);
    uri = {};
    i = 14;
    while (i--) {
      uri[o.key[i]] = m[i] || "";
    }
    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
      if ($1) {
        return uri[o.q.name][$1] = $2;
      }
    });
    return uri;
  };

  window.parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
      name: "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  /*
  #localStorage extensions to automatically parse/unparse objects
  */


  Storage.prototype.set = function(key, value) {
    this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.get = function(key) {
    return JSON.parse(this.getItem(key));
  };

  /*
  #Backbone Model presets and helpers
  */


  /*
  Backbone.RelationalModel.prototype.to_json = Backbone.RelationalModel.prototype.toJSON
  
  Backbone.RelationalModel.prototype.toJSON = ()->
    json = Backbone.RelationalModel.prototype.to_json.call(@)
    if json['parent']
      delete json['parent']
    json
  */


  /*
  Backbone.Model = Backbone.Model.extend(
    {
      toJSON:()->
        json = to_json()
        if json['parent']
          delete json['parent']
        json
    }
  )
  */


  Backbone.Model = Backbone.Model.extend({
    localStorageNamespace: function() {
      return jQuery('#company_id').val() || 'conekta';
    },
    urlBase: function() {
      var base;
      base = 'https://api.conekta.mx';
      if ((typeof company_json !== 'undefined' || typeof user_json !== 'undefined') && !document.location.host.match(/conekta/)) {
        if (!jQuery.support.cors && jQuery.ajaxTransport && window.XDomainRequest) {
          base = '/api';
        } else {
          base = '/api/v1';
        }
      }
      return base;
    },
    url: function() {
      var base, path;
      base = this.urlRoot || this.modelName;
      if (base.charAt(0) === '/') {
        base = this.urlBase() + base;
      } else {
        base = this.urlBase() + '/' + base;
      }
      if (this instanceof Backbone.Model) {
        if (this.isNew()) {
          return base;
        } else {
          path = base.charAt(base.length - 1) === '/' ? '' : '/';
          return base + path + encodeURIComponent(this.id);
        }
      } else {
        return base;
      }
    }
  });

  Backbone.Collection = Backbone.Collection.extend({
    localStorageNamespace: function() {
      return jQuery('#company_id').val() || 'conekta';
    },
    urlBase: function() {
      var base;
      base = 'https://api.conekta.mx';
      if ((typeof company_json !== 'undefined' || typeof user_json !== 'undefined') && !document.location.host.match(/conekta/)) {
        if (!jQuery.support.cors && jQuery.ajaxTransport && window.XDomainRequest) {
          base = '/api';
        } else {
          base = '/api/v1';
        }
      }
      return base;
    },
    url: function() {
      var base, path;
      base = this.urlRoot || this.modelName;
      if (base.charAt(0) === '/') {
        base = this.urlBase() + base;
      } else {
        base = this.urlBase() + '/' + base;
      }
      if (this instanceof Backbone.Model) {
        if (this.isNew()) {
          return base;
        } else {
          path = base.charAt(base.length - 1) === '/' ? '' : '/';
          return base + path + encodeURIComponent(this.id);
        }
      } else {
        return base;
      }
    }
  });

  if (!jQuery.support.cors && jQuery.ajaxTransport && window.XDomainRequest) {
    httpRegEx = /^https?:\/\//i;
    getOrPostRegEx = /^get|post|put|delete$/i;
    sameSchemeRegEx = new RegExp("^" + location.protocol, "i");
    jsonRegEx = /\/json/i;
    xmlRegEx = /\/xml/i;
    jQuery.ajaxTransport("text html xml json", function(options, userOptions, jqXHR) {
      var userType, xdr;
      if (location.protocol.match(/^http:$/)) {
        options.url = options.url.replace(/^https/, 'http');
      }
      if (options.crossDomain && options.async && getOrPostRegEx.test(options.type) && httpRegEx.test(options.url) && sameSchemeRegEx.test(options.url)) {
        xdr = null;
        userType = (userOptions.dataType || "").toLowerCase();
        return {
          send: function(headers, complete) {
            var data_hash, first_part, last_index_of, last_part, postData;
            xdr = new XDomainRequest();
            if (/^\d+$/.test(userOptions.timeout)) {
              xdr.timeout = userOptions.timeout;
            }
            xdr.ontimeout = function() {
              return complete(500, "timeout");
            };
            xdr.onload = function() {
              var allResponseHeaders, doc, responses, status;
              allResponseHeaders = "Content-Length: " + xdr.responseText.length + "\r\nContent-Type: " + xdr.contentType;
              status = {
                code: 200,
                message: "success"
              };
              responses = {
                text: xdr.responseText
              };
              try {
                if ((userType === "json") || ((userType !== "text") && jsonRegEx.test(xdr.contentType))) {
                  try {
                    return responses.json = jQuery.parseJSON(xdr.responseText);
                  } catch (e) {
                    status.code = 500;
                    return status.message = "parseerror";
                  }
                } else if ((userType === "xml") || ((userType !== "text") && xmlRegEx.test(xdr.contentType))) {
                  doc = new ActiveXObject("Microsoft.XMLDOM");
                  doc.async = false;
                  try {
                    doc.loadXML(xdr.responseText);
                  } catch (e) {
                    doc = undefined;
                  }
                  if (!doc || !doc.documentElement || doc.getElementsByTagName("parsererror").length) {
                    status.code = 500;
                    status.message = "parseerror";
                    throw "Invalid XML: " + xdr.responseText;
                  }
                  return responses.xml = doc;
                }
              } catch (parseMessage) {
                throw parseMessage;
              } finally {
                complete(status.code, status.message, responses, allResponseHeaders);
              }
            };
            xdr.onprogress = function() {};
            xdr.onerror = function() {
              return complete(500, "error", {
                text: xdr.responseText
              });
            };
            if (options.type.toLowerCase() === 'put') {
              options.type = 'post';
              last_index_of = options.url.lastIndexOf('/');
              if (last_index_of > 0) {
                first_part = options.url.substring(0, last_index_of + 1);
                last_part = options.url.substring(last_index_of + 1, options.url.length - 1);
                options.url = first_part + 'update/' + last_part;
              }
            }
            if (options.type.toLowerCase() === 'delete') {
              options.type = 'post';
              last_index_of = options.url.lastIndexOf('/');
              if (last_index_of > 0) {
                first_part = options.url.substring(0, last_index_of + 1);
                last_part = options.url.substring(last_index_of + 1, options.url.length - 1);
                options.url = first_part + 'destroy/' + last_part;
              }
            }
            options.url = options.url.replace(/api\.conekta\.mx\//, 'api.conekta.mx/v1/');
            if (options['headers']['Authorization']) {
              if (options.url.match(/\?/)) {
                options.url = options.url + '&auth_token=' + options['headers']['Authorization'].replace(/Token token\=\"/, '').replace(/"/, '');
              } else {
                options.url = options.url + '?auth_token=' + options['headers']['Authorization'].replace(/Token token\=\"/, '').replace(/"/, '');
              }
            }
            data_hash = userOptions.data;
            if (typeof userOptions.data === 'string') {
              data_hash = JSON.parse(userOptions.data);
            }
            postData = (userOptions.data && jQuery.param(data_hash)) || "";
            xdr.open(options.type, options.url);
            return xdr.send(postData);
          },
          abort: function() {
            if (xdr) {
              return xdr.abort();
            }
          }
        };
      }
    });
  }

  /*
  #Custom Form to hash serialization
  */


  window.serialize_array_form = function($target_form_original) {
    var $child_forms, $clean_form, $target_form, child_forms, parent_form_name, return_hash;
    $target_form = $target_form_original.clone();
    return_hash = {};
    $target_form.find(".template").remove();
    parent_form_name = $target_form.attr("name");
    child_forms = null;
    if ($target_form.length === 1) {
      $clean_form = $target_form.clone();
      $clean_form.find(".sh-form").remove();
      if ($clean_form.get(0).tagName !== "FORM") {
        $clean_form = jQuery("<form></form>").append($clean_form);
      }
      jQuery.each($clean_form.serializeArray(), function(i, val) {
        return return_hash[val["name"]] = val["value"];
      });
      jQuery.each($clean_form.find("input[type=checkbox]:not(:checked)[name]"), function(i, elem) {
        var $elem;
        $elem = jQuery(elem);
        return return_hash[$elem.attr("name")] = "0";
      });
      jQuery.each($clean_form.find("select"), function(i, elem) {
        var $elem, $selected_elem, temp_row_id;
        $elem = jQuery(elem);
        $selected_elem = $elem.find(":selected");
        if ($elem.attr("name").match(/\[(\d+)\]/) != null) {
          temp_row_id = $elem.attr("name").match(/\[(\d+)\]/)[1];
          if ($selected_elem.data() != null) {
            jQuery.each($selected_elem.data(), function(k, v) {
              return return_hash[k + "[" + temp_row_id + "]"] = v;
            });
          }
        }
        if ($selected_elem.length > 0) {
          return return_hash[$elem.attr("name")] = $selected_elem.val();
        } else {
          return return_hash[$elem.attr("name")] = "";
        }
      });
      $child_forms = $target_form.find(".sh-form");
      jQuery.each($child_forms, function(i, child_form) {
        var $child_form;
        $child_form = jQuery(child_form);
        if ($child_form.parents(".sh-form").length === 0 || $child_form.parents(".sh-form").eq(0)[0] === $target_form[0]) {
          return return_hash[$child_form.attr("name")] = serialize_array_form($child_form);
        }
      });
    } else {
      jQuery.each($target_form, function(i, child_form) {
        var $child_form;
        $child_form = jQuery(child_form);
        return return_hash[$child_form.attr("name")] = serialize_array_form($child_form);
      });
    }
    return return_hash;
  };

}).call(this);

/**
 * Backbone-relational.js 0.6.0
 * (c) 2011 Paul Uithol
 * 
 * Backbone-relational may be freely distributed under the MIT license; see the accompanying LICENSE.txt.
 * For details and documentation: https://github.com/PaulUithol/Backbone-relational.
 * Depends on Backbone (and thus on Underscore as well): https://github.com/documentcloud/backbone.
 */
( function( undefined ) {
	"use strict";
	
	/**
	 * CommonJS shim
	 **/
	var _, Backbone, exports;
	if ( typeof window === 'undefined' ) {
		_ = require( 'underscore' );
		Backbone = require( 'backbone' );
		exports = module.exports = Backbone;
	}
	else {
		_ = window._;
		Backbone = window.Backbone;
		exports = window;
	}

	Backbone.Relational = {
		showWarnings: true
	};

	/**
	 * Semaphore mixin; can be used as both binary and counting.
	 **/
	Backbone.Semaphore = {
		_permitsAvailable: null,
		_permitsUsed: 0,
		
		acquire: function() {
			if ( this._permitsAvailable && this._permitsUsed >= this._permitsAvailable ) {
				throw new Error( 'Max permits acquired' );
			}
			else {
				this._permitsUsed++;
			}
		},
		
		release: function() {
			if ( this._permitsUsed === 0 ) {
				throw new Error( 'All permits released' );
			}
			else {
				this._permitsUsed--;
			}
		},
		
		isLocked: function() {
			return this._permitsUsed > 0;
		},
		
		setAvailablePermits: function( amount ) {
			if ( this._permitsUsed > amount ) {
				throw new Error( 'Available permits cannot be less than used permits' );
			}
			this._permitsAvailable = amount;
		}
	};
	
	/**
	 * A BlockingQueue that accumulates items while blocked (via 'block'),
	 * and processes them when unblocked (via 'unblock').
	 * Process can also be called manually (via 'process').
	 */
	Backbone.BlockingQueue = function() {
		this._queue = [];
	};
	_.extend( Backbone.BlockingQueue.prototype, Backbone.Semaphore, {
		_queue: null,
		
		add: function( func ) {
			if ( this.isBlocked() ) {
				this._queue.push( func );
			}
			else {
				func();
			}
		},
		
		process: function() {
			while ( this._queue && this._queue.length ) {
				this._queue.shift()();
			}
		},
		
		block: function() {
			this.acquire();
		},
		
		unblock: function() {
			this.release();
			if ( !this.isBlocked() ) {
				this.process();
			}
		},
		
		isBlocked: function() {
			return this.isLocked();
		}
	});
	/**
	 * Global event queue. Accumulates external events ('add:<key>', 'remove:<key>' and 'update:<key>')
	 * until the top-level object is fully initialized (see 'Backbone.RelationalModel').
	 */
	Backbone.Relational.eventQueue = new Backbone.BlockingQueue();
	
	/**
	 * Backbone.Store keeps track of all created (and destruction of) Backbone.RelationalModel.
	 * Handles lookup for relations.
	 */
	Backbone.Store = function() {
		this._collections = [];
		this._reverseRelations = [];
		this._subModels = [];
		this._modelScopes = [ exports ];
	};
	_.extend( Backbone.Store.prototype, Backbone.Events, {
		addModelScope: function( scope ) {
			this._modelScopes.push( scope );
		},

		/**
		 * Add a set of subModelTypes to the store, that can be used to resolve the '_superModel'
		 * for a model later in 'setupSuperModel'.
		 *
		 * @param {Backbone.RelationalModel} subModelTypes
		 * @param {Backbone.RelationalModel} superModelType
		 */
		addSubModels: function( subModelTypes, superModelType ) {
			this._subModels.push({
				'superModelType': superModelType,
				'subModels': subModelTypes
			});
		},

		/**
		 * Check if the given modelType is registered as another model's subModel. If so, add it to the super model's
		 * '_subModels', and set the modelType's '_superModel', '_subModelTypeName', and '_subModelTypeAttribute'.
		 *
		 * @param {Backbone.RelationalModel} modelType
		 */
		setupSuperModel: function( modelType ) {
			_.find( this._subModels || [], function( subModelDef ) {
				return _.find( subModelDef.subModels || [], function( subModelTypeName, typeValue ) {
					var subModelType = this.getObjectByName( subModelTypeName );

					if ( modelType === subModelType ) {
						// Set 'modelType' as a child of the found superModel
						subModelDef.superModelType._subModels[ typeValue ] = modelType;

						// Set '_superModel', '_subModelTypeValue', and '_subModelTypeAttribute' on 'modelType'.
						modelType._superModel = subModelDef.superModelType;
						modelType._subModelTypeValue = typeValue;
						modelType._subModelTypeAttribute = subModelDef.superModelType.prototype.subModelTypeAttribute;
						return true;
					}
				}, this );
			}, this );
		},
		
		/**
		 * Add a reverse relation. Is added to the 'relations' property on model's prototype, and to
		 * existing instances of 'model' in the store as well.
		 * @param {Object} relation
		 * @param {Backbone.RelationalModel} relation.model
		 * @param {String} relation.type
		 * @param {String} relation.key
		 * @param {String|Object} relation.relatedModel
		 */
		addReverseRelation: function( relation ) {
			var exists = _.any( this._reverseRelations || [], function( rel ) {
					return _.all( relation || [], function( val, key ) {
							return val === rel[ key ];
						});
				});
			
			if ( !exists && relation.model && relation.type ) {
				this._reverseRelations.push( relation );
				
				var addRelation = function( model, relation ) {
					if ( !model.prototype.relations ) {
						model.prototype.relations = [];
					}
					model.prototype.relations.push( relation );
					
					_.each( model._subModels || [], function( subModel ) {
							addRelation( subModel, relation );
						}, this );
				};
				
				addRelation( relation.model, relation );
				
				this.retroFitRelation( relation );
			}
		},
		
		/**
		 * Add a 'relation' to all existing instances of 'relation.model' in the store
		 * @param {Object} relation
		 */
		retroFitRelation: function( relation ) {
			var coll = this.getCollection( relation.model );
			coll.each( function( model ) {
				if ( !( model instanceof relation.model ) ) {
					return;
				}

				new relation.type( model, relation );
			}, this);
		},
		
		/**
		 * Find the Store's collection for a certain type of model.
		 * @param {Backbone.RelationalModel} model
		 * @return {Backbone.Collection} A collection if found (or applicable for 'model'), or null
		 */
		getCollection: function( model ) {
			if ( model instanceof Backbone.RelationalModel ) {
				model = model.constructor;
			}
			
			var rootModel = model;
			while ( rootModel._superModel ) {
				rootModel = rootModel._superModel;
			}
			
			var coll = _.detect( this._collections, function( c ) {
					return c.model === rootModel;
				});
			
			if ( !coll ) {
				coll = this._createCollection( rootModel );
			}
			
			return coll;
		},
		
		/**
		 * Find a type on the global object by name. Splits name on dots.
		 * @param {String} name
		 * @return {Object}
		 */
		getObjectByName: function( name ) {
			var parts = name.split( '.' ),
				type = null;

			_.find( this._modelScopes || [], function( scope ) {
				type = _.reduce( parts || [], function( memo, val ) {
					return memo[ val ];
				}, scope );

				if ( type && type !== scope ) {
					return true;
				}
			}, this );

			return type;
		},
		
		_createCollection: function( type ) {
			var coll;
			
			// If 'type' is an instance, take its constructor
			if ( type instanceof Backbone.RelationalModel ) {
				type = type.constructor;
			}
			
			// Type should inherit from Backbone.RelationalModel.
			if ( type.prototype instanceof Backbone.RelationalModel ) {
				coll = new Backbone.Collection();
				coll.model = type;
				
				this._collections.push( coll );
			}
			
			return coll;
		},

		/**
		 * Find the attribute that is to be used as the `id` on a given object
		 * @param type
		 * @param {String|Number|Object|Backbone.RelationalModel} item
		 * @return {String|Number}
		 */
		resolveIdForItem: function( type, item ) {
			var id = _.isString( item ) || _.isNumber( item ) ? item : null;

			if ( id === null ) {
				if ( item instanceof Backbone.RelationalModel ) {
					id = item.id;
				}
				else if ( _.isObject( item ) ) {
					id = item[ type.prototype.idAttribute ];
				}
			}

			// Make all falsy values `null` (except for 0, which could be an id.. see '/issues/179')
			if ( !id && id !== 0 ) {
				id = null;
			}

			return id;
		},

		/**
		 *
		 * @param type
		 * @param {String|Number|Object|Backbone.RelationalModel} item
		 */
		find: function( type, item ) {
			var id = this.resolveIdForItem( type, item );
			var coll = this.getCollection( type );
			
			// Because the found object could be of any of the type's superModel
			// types, only return it if it's actually of the type asked for.
			if ( coll ) {
				var obj = coll.get( id );

				if ( obj instanceof type ) {
					return obj;
				}
			}

			return null;
		},
		
		/**
		 * Add a 'model' to it's appropriate collection. Retain the original contents of 'model.collection'.
		 * @param {Backbone.RelationalModel} model
		 */
		register: function( model ) {
			var coll = this.getCollection( model );

			if ( coll ) {
				if ( coll.get( model ) ) {
					throw new Error( "Cannot instantiate more than one Backbone.RelationalModel with the same id per type!" );
				}

				var modelColl = model.collection;
				coll.add( model );
				model.bind( 'destroy', this.unregister, this );
				model.collection = modelColl;
			}
		},
		
		/**
		 * Explicitly update a model's id in it's store collection
		 * @param {Backbone.RelationalModel} model
		 */
		update: function( model ) {
			var coll = this.getCollection( model );
			coll._onModelEvent( 'change:' + model.idAttribute, model, coll );
		},
		
		/**
		 * Remove a 'model' from the store.
		 * @param {Backbone.RelationalModel} model
		 */
		unregister: function( model ) {
			model.unbind( 'destroy', this.unregister );
			var coll = this.getCollection( model );
			coll && coll.remove( model );
		}
	});
	Backbone.Relational.store = new Backbone.Store();
	
	/**
	 * The main Relation class, from which 'HasOne' and 'HasMany' inherit. Internally, 'relational:<key>' events
	 * are used to regulate addition and removal of models from relations.
	 *
	 * @param {Backbone.RelationalModel} instance
	 * @param {Object} options
	 * @param {string} options.key
	 * @param {Backbone.RelationalModel.constructor} options.relatedModel
	 * @param {Boolean|String} [options.includeInJSON=true] Serialize the given attribute for related model(s)' in toJSON, or just their ids.
	 * @param {Boolean} [options.createModels=true] Create objects from the contents of keys if the object is not found in Backbone.store.
	 * @param {Object} [options.reverseRelation] Specify a bi-directional relation. If provided, Relation will reciprocate
	 *    the relation to the 'relatedModel'. Required and optional properties match 'options', except that it also needs
	 *    {Backbone.Relation|String} type ('HasOne' or 'HasMany').
	 */
	Backbone.Relation = function( instance, options ) {
		this.instance = instance;
		// Make sure 'options' is sane, and fill with defaults from subclasses and this object's prototype
		options = _.isObject( options ) ? options : {};
		this.reverseRelation = _.defaults( options.reverseRelation || {}, this.options.reverseRelation );
		this.reverseRelation.type = !_.isString( this.reverseRelation.type ) ? this.reverseRelation.type :
			Backbone[ this.reverseRelation.type ] || Backbone.Relational.store.getObjectByName( this.reverseRelation.type );
		this.model = options.model || this.instance.constructor;
		this.options = _.defaults( options, this.options, Backbone.Relation.prototype.options );
		
		this.key = this.options.key;
		this.keySource = this.options.keySource || this.key;
		this.keyDestination = this.options.keyDestination || this.keySource || this.key;

		// 'exports' should be the global object where 'relatedModel' can be found on if given as a string.
		this.relatedModel = this.options.relatedModel;
		if ( _.isString( this.relatedModel ) ) {
			this.relatedModel = Backbone.Relational.store.getObjectByName( this.relatedModel );
		}

		if ( !this.checkPreconditions() ) {
			return false;
		}

		if ( instance ) {
			this.keyContents = this.instance.get( this.keySource );

			// Explicitly clear 'keySource', to prevent a leaky abstraction if 'keySource' differs from 'key'.
			if ( this.key !== this.keySource ) {
				this.instance.unset( this.keySource, { silent: true } );
			}

			// Add this Relation to instance._relations
			this.instance._relations.push( this );
		}

		// Add the reverse relation on 'relatedModel' to the store's reverseRelations
		if ( !this.options.isAutoRelation && this.reverseRelation.type && this.reverseRelation.key ) {
			Backbone.Relational.store.addReverseRelation( _.defaults( {
					isAutoRelation: true,
					model: this.relatedModel,
					relatedModel: this.model,
					reverseRelation: this.options // current relation is the 'reverseRelation' for it's own reverseRelation
				},
				this.reverseRelation // Take further properties from this.reverseRelation (type, key, etc.)
			) );
		}

		_.bindAll( this, '_modelRemovedFromCollection', '_relatedModelAdded', '_relatedModelRemoved' );

		if ( instance ) {
			this.initialize();

			// When a model in the store is destroyed, check if it is 'this.instance'.
			Backbone.Relational.store.getCollection( this.instance )
				.bind( 'relational:remove', this._modelRemovedFromCollection );

			// When 'relatedModel' are created or destroyed, check if it affects this relation.
			Backbone.Relational.store.getCollection( this.relatedModel )
				.bind( 'relational:add', this._relatedModelAdded )
				.bind( 'relational:remove', this._relatedModelRemoved );
		}
	};
	// Fix inheritance :\
	Backbone.Relation.extend = Backbone.Model.extend;
	// Set up all inheritable **Backbone.Relation** properties and methods.
	_.extend( Backbone.Relation.prototype, Backbone.Events, Backbone.Semaphore, {
		options: {
			createModels: true,
			includeInJSON: true,
			isAutoRelation: false
		},
		
		instance: null,
		key: null,
		keyContents: null,
		relatedModel: null,
		reverseRelation: null,
		related: null,
		
		_relatedModelAdded: function( model, coll, options ) {
			// Allow 'model' to set up it's relations, before calling 'tryAddRelated'
			// (which can result in a call to 'addRelated' on a relation of 'model')
			var dit = this;
			model.queue( function() {
				dit.tryAddRelated( model, options );
			});
		},
		
		_relatedModelRemoved: function( model, coll, options ) {
			this.removeRelated( model, options );
		},
		
		_modelRemovedFromCollection: function( model ) {
			if ( model === this.instance ) {
				this.destroy();
			}
		},
		
		/**
		 * Check several pre-conditions.
		 * @return {Boolean} True if pre-conditions are satisfied, false if they're not.
		 */
		checkPreconditions: function() {
			var i = this.instance,
				k = this.key,
				m = this.model,
				rm = this.relatedModel,
				warn = Backbone.Relational.showWarnings && typeof console !== 'undefined';

			if ( !m || !k || !rm ) {
				warn && console.warn( 'Relation=%o; no model, key or relatedModel (%o, %o, %o)', this, m, k, rm );
				return false;
			}
			// Check if the type in 'model' inherits from Backbone.RelationalModel
			if ( !( m.prototype instanceof Backbone.RelationalModel ) ) {
				warn && console.warn( 'Relation=%o; model does not inherit from Backbone.RelationalModel (%o)', this, i );
				return false;
			}
			// Check if the type in 'relatedModel' inherits from Backbone.RelationalModel
			if ( !( rm.prototype instanceof Backbone.RelationalModel ) ) {
				warn && console.warn( 'Relation=%o; relatedModel does not inherit from Backbone.RelationalModel (%o)', this, rm );
				return false;
			}
			// Check if this is not a HasMany, and the reverse relation is HasMany as well
			if ( this instanceof Backbone.HasMany && this.reverseRelation.type === Backbone.HasMany ) {
				warn && console.warn( 'Relation=%o; relation is a HasMany, and the reverseRelation is HasMany as well.', this );
				return false;
			}

			// Check if we're not attempting to create a duplicate relationship
			if ( i && i._relations.length ) {
				var exists = _.any( i._relations || [], function( rel ) {
						var hasReverseRelation = this.reverseRelation.key && rel.reverseRelation.key;
						return rel.relatedModel === rm && rel.key === k &&
							( !hasReverseRelation || this.reverseRelation.key === rel.reverseRelation.key );
					}, this );

				if ( exists ) {
					warn && console.warn( 'Relation=%o between instance=%o.%s and relatedModel=%o.%s already exists',
						this, i, k, rm, this.reverseRelation.key );
					return false;
				}
			}

			return true;
		},

		/**
		 * Set the related model(s) for this relation
		 * @param {Backbone.Mode|Backbone.Collection} related
		 * @param {Object} [options]
		 */
		setRelated: function( related, options ) {
			this.related = related;

			this.instance.acquire();
			this.instance.set( this.key, related, _.defaults( options || {}, { silent: true } ) );
			this.instance.release();
		},
		
		/**
		 * Determine if a relation (on a different RelationalModel) is the reverse
		 * relation of the current one.
		 * @param {Backbone.Relation} relation
		 * @return {Boolean}
		 */
		_isReverseRelation: function( relation ) {
			if ( relation.instance instanceof this.relatedModel && this.reverseRelation.key === relation.key &&
					this.key === relation.reverseRelation.key ) {
				return true;
			}
			return false;
		},
		
		/**
		 * Get the reverse relations (pointing back to 'this.key' on 'this.instance') for the currently related model(s).
		 * @param {Backbone.RelationalModel} [model] Get the reverse relations for a specific model.
		 *    If not specified, 'this.related' is used.
		 * @return {Backbone.Relation[]}
		 */
		getReverseRelations: function( model ) {
			var reverseRelations = [];
			// Iterate over 'model', 'this.related.models' (if this.related is a Backbone.Collection), or wrap 'this.related' in an array.
			var models = !_.isUndefined( model ) ? [ model ] : this.related && ( this.related.models || [ this.related ] );
			_.each( models || [], function( related ) {
					_.each( related.getRelations() || [], function( relation ) {
							if ( this._isReverseRelation( relation ) ) {
								reverseRelations.push( relation );
							}
						}, this );
				}, this );
			
			return reverseRelations;
		},
		
		/**
		 * Rename options.silent to options.silentChange, so events propagate properly.
		 * (for example in HasMany, from 'addRelated'->'handleAddition')
		 * @param {Object} [options]
		 * @return {Object}
		 */
		sanitizeOptions: function( options ) {
			options = options ? _.clone( options ) : {};
			if ( options.silent ) {
				options.silentChange = true;
				delete options.silent;
			}
			return options;
		},

		/**
		 * Rename options.silentChange to options.silent, so events are silenced as intended in Backbone's
		 * original functions.
		 * @param {Object} [options]
		 * @return {Object}
		 */
		unsanitizeOptions: function( options ) {
			options = options ? _.clone( options ) : {};
			if ( options.silentChange ) {
				options.silent = true;
				delete options.silentChange;
			}
			return options;
		},
		
		// Cleanup. Get reverse relation, call removeRelated on each.
		destroy: function() {
			Backbone.Relational.store.getCollection( this.instance )
				.unbind( 'relational:remove', this._modelRemovedFromCollection );
			
			Backbone.Relational.store.getCollection( this.relatedModel )
				.unbind( 'relational:add', this._relatedModelAdded )
				.unbind( 'relational:remove', this._relatedModelRemoved );
			
			_.each( this.getReverseRelations() || [], function( relation ) {
					relation.removeRelated( this.instance );
				}, this );
		}
	});
	
	Backbone.HasOne = Backbone.Relation.extend({
		options: {
			reverseRelation: { type: 'HasMany' }
		},
		
		initialize: function() {
			_.bindAll( this, 'onChange' );

			this.instance.bind( 'relational:change:' + this.key, this.onChange );

			var model = this.findRelated( { silent: true } );
			this.setRelated( model );

			// Notify new 'related' object of the new relation.
			_.each( this.getReverseRelations() || [], function( relation ) {
					relation.addRelated( this.instance );
				}, this );
		},
		
		findRelated: function( options ) {
			var item = this.keyContents;
			var model = null;
			
			if ( item instanceof this.relatedModel ) {
				model = item;
			}
			else if ( item || item === 0 ) { // since 0 can be a valid `id` as well
				model = this.relatedModel.findOrCreate( item, { create: this.options.createModels } );
			}
			
			return model;
		},
		
		/**
		 * If the key is changed, notify old & new reverse relations and initialize the new relation
		 */
		onChange: function( model, attr, options ) {
			// Don't accept recursive calls to onChange (like onChange->findRelated->findOrCreate->initializeRelations->addRelated->onChange)
			if ( this.isLocked() ) {
				return;
			}
			this.acquire();
			options = this.sanitizeOptions( options );
			
			// 'options._related' is set by 'addRelated'/'removeRelated'. If it is set, the change
			// is the result of a call from a relation. If it's not, the change is the result of 
			// a 'set' call on this.instance.
			var changed = _.isUndefined( options._related );
			var oldRelated = changed ? this.related : options._related;
			
			if ( changed ) {	
				this.keyContents = attr;
				
				// Set new 'related'
				if ( attr instanceof this.relatedModel ) {
					this.related = attr;
				}
				else if ( attr ) {
					var related = this.findRelated( options );
					this.setRelated( related );
				}
				else {
					this.setRelated( null );
				}
			}
			
			// Notify old 'related' object of the terminated relation
			if ( oldRelated && this.related !== oldRelated ) {
				_.each( this.getReverseRelations( oldRelated ) || [], function( relation ) {
						relation.removeRelated( this.instance, options );
					}, this );
			}
			
			// Notify new 'related' object of the new relation. Note we do re-apply even if this.related is oldRelated;
			// that can be necessary for bi-directional relations if 'this.instance' was created after 'this.related'.
			// In that case, 'this.instance' will already know 'this.related', but the reverse might not exist yet.
			_.each( this.getReverseRelations() || [], function( relation ) {
					relation.addRelated( this.instance, options );
				}, this);
			
			// Fire the 'update:<key>' event if 'related' was updated
			if ( !options.silentChange && this.related !== oldRelated ) {
				var dit = this;
				Backbone.Relational.eventQueue.add( function() {
					dit.instance.trigger( 'update:' + dit.key, dit.instance, dit.related, options );
				});
			}
			this.release();
		},
		
		/**
		 * If a new 'this.relatedModel' appears in the 'store', try to match it to the last set 'keyContents'
		 */
		tryAddRelated: function( model, options ) {
			if ( this.related ) {
				return;
			}
			options = this.sanitizeOptions( options );
			
			var item = this.keyContents;
			if ( item || item === 0 ) { // since 0 can be a valid `id` as well
				var id = Backbone.Relational.store.resolveIdForItem( this.relatedModel, item );
				if ( !_.isNull( id ) && model.id === id ) {
					this.addRelated( model, options );
				}
			}
		},
		
		addRelated: function( model, options ) {
			if ( model !== this.related ) {
				var oldRelated = this.related || null;
				this.setRelated( model );
				this.onChange( this.instance, model, { _related: oldRelated } );
			}
		},
		
		removeRelated: function( model, options ) {
			if ( !this.related ) {
				return;
			}
			
			if ( model === this.related ) {
				var oldRelated = this.related || null;
				this.setRelated( null );
				this.onChange( this.instance, model, { _related: oldRelated } );
			}
		}
	});
	
	Backbone.HasMany = Backbone.Relation.extend({
		collectionType: null,
		
		options: {
			reverseRelation: { type: 'HasOne' },
			collectionType: Backbone.Collection,
			collectionKey: true,
			collectionOptions: {}
		},
		
		initialize: function() {
			_.bindAll( this, 'onChange', 'handleAddition', 'handleRemoval', 'handleReset' );
			this.instance.bind( 'relational:change:' + this.key, this.onChange );
			
			// Handle a custom 'collectionType'
			this.collectionType = this.options.collectionType;
			if ( _.isString( this.collectionType ) ) {
				this.collectionType = Backbone.Relational.store.getObjectByName( this.collectionType );
			}
			if ( !this.collectionType.prototype instanceof Backbone.Collection ){
				throw new Error( 'collectionType must inherit from Backbone.Collection' );
			}

			// Handle cases where a model/relation is created with a collection passed straight into 'attributes'
			if ( this.keyContents instanceof Backbone.Collection ) {
				this.setRelated( this._prepareCollection( this.keyContents ) );
			}
			else {
				this.setRelated( this._prepareCollection() );
			}

			this.findRelated( { silent: true } );
		},
		
		_getCollectionOptions: function() {
			return _.isFunction( this.options.collectionOptions ) ?
				this.options.collectionOptions( this.instance ) :
				this.options.collectionOptions;
		},

		/**
		 * Bind events and setup collectionKeys for a collection that is to be used as the backing store for a HasMany.
		 * If no 'collection' is supplied, a new collection will be created of the specified 'collectionType' option.
		 * @param {Backbone.Collection} [collection]
		 */
		_prepareCollection: function( collection ) {
			if ( this.related ) {
				this.related
					.unbind( 'relational:add', this.handleAddition )
					.unbind( 'relational:remove', this.handleRemoval )
					.unbind( 'relational:reset', this.handleReset )
			}

			if ( !collection || !( collection instanceof Backbone.Collection ) ) {
				collection = new this.collectionType( [], this._getCollectionOptions() );
			}

			collection.model = this.relatedModel;
			
			if ( this.options.collectionKey ) {
				var key = this.options.collectionKey === true ? this.options.reverseRelation.key : this.options.collectionKey;
				
				if ( collection[ key ] && collection[ key ] !== this.instance ) {
					if ( Backbone.Relational.showWarnings && typeof console !== 'undefined' ) {
						console.warn( 'Relation=%o; collectionKey=%s already exists on collection=%o', this, key, this.options.collectionKey );
					}
				}
				else if ( key ) {
					collection[ key ] = this.instance;
				}
			}
			
			collection
				.bind( 'relational:add', this.handleAddition )
				.bind( 'relational:remove', this.handleRemoval )
				.bind( 'relational:reset', this.handleReset );
			
			return collection;
		},
		
		findRelated: function( options ) {
			if ( this.keyContents ) {
				var models = [];

				if ( this.keyContents instanceof Backbone.Collection ) {
					models = this.keyContents.models;
				}
				else {
					// Handle cases the an API/user supplies just an Object/id instead of an Array
					this.keyContents = _.isArray( this.keyContents ) ? this.keyContents : [ this.keyContents ];

					// Try to find instances of the appropriate 'relatedModel' in the store
					_.each( this.keyContents || [], function( item ) {
							var model = null;
							if ( item instanceof this.relatedModel ) {
								model = item;
							}
							else if ( item || item === 0 ) { // since 0 can be a valid `id` as well
								model = this.relatedModel.findOrCreate( item, { create: this.options.createModels } );
							}

							if ( model && !this.related.getByCid( model ) && !this.related.get( model ) ) {
								models.push( model );
							}
						}, this );
				}

				// Add all found 'models' in on go, so 'add' will only be called once (and thus 'sort', etc.)
				if ( models.length ) {
					options = this.unsanitizeOptions( options );
					this.related.add( models, options );
				}
			}
		},
		
		/**
		 * If the key is changed, notify old & new reverse relations and initialize the new relation
		 */
		onChange: function( model, attr, options ) {
			options = this.sanitizeOptions( options );
			this.keyContents = attr;
			
			// Notify old 'related' object of the terminated relation
			_.each( this.getReverseRelations() || [], function( relation ) {
					relation.removeRelated( this.instance, options );
				}, this );
			
			// Replace 'this.related' by 'attr' if it is a Backbone.Collection
			if ( attr instanceof Backbone.Collection ) {
				this._prepareCollection( attr );
				this.related = attr;
			}
			// Otherwise, 'attr' should be an array of related object ids.
			// Re-use the current 'this.related' if it is a Backbone.Collection, and remove any current entries.
			// Otherwise, create a new collection.
			else {
				var coll;

				if ( this.related instanceof Backbone.Collection ) {
					coll = this.related;
					coll.remove( coll.models );
				}
				else {
					coll = this._prepareCollection();
				}

				this.setRelated( coll );
				this.findRelated( options );
			}
			
			// Notify new 'related' object of the new relation
			_.each( this.getReverseRelations() || [], function( relation ) {
					relation.addRelated( this.instance, options );
				}, this );
			
			var dit = this;
			Backbone.Relational.eventQueue.add( function() {
				!options.silentChange && dit.instance.trigger( 'update:' + dit.key, dit.instance, dit.related, options );
			});
		},
		
		tryAddRelated: function( model, options ) {
			options = this.sanitizeOptions( options );
			if ( !this.related.getByCid( model ) && !this.related.get( model ) ) {
				// Check if this new model was specified in 'this.keyContents'
				var item = _.any( this.keyContents || [], function( item ) {
						var id = Backbone.Relational.store.resolveIdForItem( this.relatedModel, item );
						return !_.isNull( id ) && id === model.id;
					}, this );
				
				if ( item ) {
					this.related.add( model, options );
				}
			}
		},
		
		/**
		 * When a model is added to a 'HasMany', trigger 'add' on 'this.instance' and notify reverse relations.
		 * (should be 'HasOne', must set 'this.instance' as their related).
		 */
		handleAddition: function( model, coll, options ) {
			//console.debug('handleAddition called; args=%o', arguments);
			// Make sure the model is in fact a valid model before continuing.
			// (it can be invalid as a result of failing validation in Backbone.Collection._prepareModel)
			if ( !( model instanceof Backbone.Model ) ) {
				return;
			}
			
			options = this.sanitizeOptions( options );
			
			_.each( this.getReverseRelations( model ) || [], function( relation ) {
					relation.addRelated( this.instance, options );
				}, this );

			// Only trigger 'add' once the newly added model is initialized (so, has it's relations set up)
			var dit = this;
			Backbone.Relational.eventQueue.add( function() {
				!options.silentChange && dit.instance.trigger( 'add:' + dit.key, model, dit.related, options );
			});
		},
		
		/**
		 * When a model is removed from a 'HasMany', trigger 'remove' on 'this.instance' and notify reverse relations.
		 * (should be 'HasOne', which should be nullified)
		 */
		handleRemoval: function( model, coll, options ) {
			//console.debug('handleRemoval called; args=%o', arguments);
			if ( !( model instanceof Backbone.Model ) ) {
				return;
			}

			options = this.sanitizeOptions( options );
			
			_.each( this.getReverseRelations( model ) || [], function( relation ) {
					relation.removeRelated( this.instance, options );
				}, this );
			
			var dit = this;
			Backbone.Relational.eventQueue.add( function() {
				!options.silentChange && dit.instance.trigger( 'remove:' + dit.key, model, dit.related, options );
			});
		},

		handleReset: function( coll, options ) {
			options = this.sanitizeOptions( options );

			var dit = this;
			Backbone.Relational.eventQueue.add( function() {
				!options.silentChange && dit.instance.trigger( 'reset:' + dit.key, dit.related, options );
			});
		},
		
		addRelated: function( model, options ) {
			var dit = this;
			options = this.unsanitizeOptions( options );
			model.queue( function() { // Queued to avoid errors for adding 'model' to the 'this.related' set twice
				if ( dit.related && !dit.related.getByCid( model ) && !dit.related.get( model ) ) {
					dit.related.add( model, options );
				}
			});
		},
		
		removeRelated: function( model, options ) {
			options = this.unsanitizeOptions( options );
			if ( this.related.getByCid( model ) || this.related.get( model ) ) {
				this.related.remove( model, options );
			}
		}
	});
	
	/**
	 * A type of Backbone.Model that also maintains relations to other models and collections.
	 * New events when compared to the original:
	 *  - 'add:<key>' (model, related collection, options)
	 *  - 'remove:<key>' (model, related collection, options)
	 *  - 'update:<key>' (model, related model or collection, options)
	 */
	Backbone.RelationalModel = Backbone.Model.extend({
		relations: null, // Relation descriptions on the prototype
		_relations: null, // Relation instances
		_isInitialized: false,
		_deferProcessing: false,
		_queue: null,
		
		subModelTypeAttribute: 'type',
		subModelTypes: null,
		
		constructor: function( attributes, options ) {
			// Nasty hack, for cases like 'model.get( <HasMany key> ).add( item )'.
			// Defer 'processQueue', so that when 'Relation.createModels' is used we:
			// a) Survive 'Backbone.Collection.add'; this takes care we won't error on "can't add model to a set twice"
			//    (by creating a model from properties, having the model add itself to the collection via one of
			//    it's relations, then trying to add it to the collection).
			// b) Trigger 'HasMany' collection events only after the model is really fully set up.
			// Example that triggers both a and b: "p.get('jobs').add( { company: c, person: p } )".
			var dit = this;
			if ( options && options.collection ) {
				this._deferProcessing = true;
				
				var processQueue = function( model ) {
					if ( model === dit ) {
						dit._deferProcessing = false;
						dit.processQueue();
						options.collection.unbind( 'relational:add', processQueue );
					}
				};
				options.collection.bind( 'relational:add', processQueue );
				
				// So we do process the queue eventually, regardless of whether this model really gets added to 'options.collection'.
				_.defer( function() {
					processQueue( dit );
				});
			}
			
			this._queue = new Backbone.BlockingQueue();
			this._queue.block();
			Backbone.Relational.eventQueue.block();
			
			Backbone.Model.apply( this, arguments );
			
			// Try to run the global queue holding external events
			Backbone.Relational.eventQueue.unblock();
		},
		
		/**
		 * Override 'trigger' to queue 'change' and 'change:*' events
		 */
		trigger: function( eventName ) {
			if ( eventName.length > 5 && 'change' === eventName.substr( 0, 6 ) ) {
				var dit = this, args = arguments;
				Backbone.Relational.eventQueue.add( function() {
						Backbone.Model.prototype.trigger.apply( dit, args );
					});
			}
			else {
				Backbone.Model.prototype.trigger.apply( this, arguments );
			}
			
			return this;
		},
		
		/**
		 * Initialize Relations present in this.relations; determine the type (HasOne/HasMany), then creates a new instance.
		 * Invoked in the first call so 'set' (which is made from the Backbone.Model constructor).
		 */
		initializeRelations: function() {
			this.acquire(); // Setting up relations often also involve calls to 'set', and we only want to enter this function once
			this._relations = [];
			
			_.each( this.relations || [], function( rel ) {
					var type = !_.isString( rel.type ) ? rel.type :	Backbone[ rel.type ] || Backbone.Relational.store.getObjectByName( rel.type );
					if ( type && type.prototype instanceof Backbone.Relation ) {
						new type( this, rel ); // Also pushes the new Relation into _relations
					}
					else {
						Backbone.Relational.showWarnings && typeof console !== 'undefined' && console.warn( 'Relation=%o; missing or invalid type!', rel );
					}
				}, this );
			
			this._isInitialized = true;
			this.release();
			this.processQueue();
		},

		/**
		 * When new values are set, notify this model's relations (also if options.silent is set).
		 * (Relation.setRelated locks this model before calling 'set' on it to prevent loops)
		 */
		updateRelations: function( options ) {
			if ( this._isInitialized && !this.isLocked() ) {
				_.each( this._relations || [], function( rel ) {
					// Update from data in `rel.keySource` if set, or `rel.key` otherwise
					var val = this.attributes[ rel.keySource ] || this.attributes[ rel.key ];
					if ( rel.related !== val ) {
						this.trigger( 'relational:change:' + rel.key, this, val, options || {} );
					}
				}, this );
			}
		},
		
		/**
		 * Either add to the queue (if we're not initialized yet), or execute right away.
		 */
		queue: function( func ) {
			this._queue.add( func );
		},
		
		/**
		 * Process _queue
		 */
		processQueue: function() {
			if ( this._isInitialized && !this._deferProcessing && this._queue.isBlocked() ) {
				this._queue.unblock();
			}
		},
		
		/**
		 * Get a specific relation.
		 * @param key {string} The relation key to look for.
		 * @return {Backbone.Relation} An instance of 'Backbone.Relation', if a relation was found for 'key', or null.
		 */
		getRelation: function( key ) {
			return _.detect( this._relations, function( rel ) {
				if ( rel.key === key ) {
					return true;
				}
			}, this );
		},
		
		/**
		 * Get all of the created relations.
		 * @return {Backbone.Relation[]}
		 */
		getRelations: function() {
			return this._relations;
		},
		
		/**
		 * Retrieve related objects.
		 * @param key {string} The relation key to fetch models for.
		 * @param [options] {Object} Options for 'Backbone.Model.fetch' and 'Backbone.sync'.
		 * @param [update=false] {boolean} Whether to force a fetch from the server (updating existing models).
		 * @return {jQuery.when[]} An array of request objects
		 */
		fetchRelated: function( key, options, update ) {
			options || ( options = {} );
			var setUrl,
				requests = [],
				rel = this.getRelation( key ),
				keyContents = rel && rel.keyContents,
				toFetch = keyContents && _.select( _.isArray( keyContents ) ? keyContents : [ keyContents ], function( item ) {
					var id = Backbone.Relational.store.resolveIdForItem( rel.relatedModel, item );
					return !_.isNull( id ) && ( update || !Backbone.Relational.store.find( rel.relatedModel, id ) );
				}, this );
			
			if ( toFetch && toFetch.length ) {
				// Create a model for each entry in 'keyContents' that is to be fetched
				var models = _.map( toFetch, function( item ) {
					var model;

					if ( _.isObject( item ) ) {
						model = rel.relatedModel.build( item );
					}
					else {
						var attrs = {};
						attrs[ rel.relatedModel.prototype.idAttribute ] = item;
						model = rel.relatedModel.build( attrs );
					}

					return model;
				}, this );
				
				// Try if the 'collection' can provide a url to fetch a set of models in one request.
				if ( rel.related instanceof Backbone.Collection && _.isFunction( rel.related.url ) ) {
					setUrl = rel.related.url( models );
				}
				
				// An assumption is that when 'Backbone.Collection.url' is a function, it can handle building of set urls.
				// To make sure it can, test if the url we got by supplying a list of models to fetch is different from
				// the one supplied for the default fetch action (without args to 'url').
				if ( setUrl && setUrl !== rel.related.url() ) {
					var opts = _.defaults(
						{
							error: function() {
								var args = arguments;
								_.each( models || [], function( model ) {
										model.trigger( 'destroy', model, model.collection, options );
										options.error && options.error.apply( model, args );
									});
							},
							url: setUrl
						},
						options,
						{ add: true }
					);

					requests = [ rel.related.fetch( opts ) ];
				}
				else {
					requests = _.map( models || [], function( model ) {
						var opts = _.defaults(
							{
								error: function() {
									model.trigger( 'destroy', model, model.collection, options );
									options.error && options.error.apply( model, arguments );
								}
							},
							options
						);
						return model.fetch( opts );
					}, this );
				}
			}
			
			return requests;
		},
		
		set: function( key, value, options ) {
			Backbone.Relational.eventQueue.block();
			
			// Duplicate backbone's behavior to allow separate key/value parameters, instead of a single 'attributes' object
			var attributes;
			if ( _.isObject( key ) || key == null ) {
				attributes = key;
				options = value;
			}
			else {
				attributes = {};
				attributes[ key ] = value;
			}
			
			var result = Backbone.Model.prototype.set.apply( this, arguments );
			
			// Ideal place to set up relations :)
			if ( !this._isInitialized && !this.isLocked() ) {
				this.constructor.initializeModelHierarchy();

				Backbone.Relational.store.register( this );

				this.initializeRelations();
			}
			// Update the 'idAttribute' in Backbone.store if; we don't want it to miss an 'id' update due to {silent:true}
			else if ( attributes && this.idAttribute in attributes ) {
				Backbone.Relational.store.update( this );
			}
			
			if ( attributes ) {
				this.updateRelations( options );
			}
			
			// Try to run the global queue holding external events
			Backbone.Relational.eventQueue.unblock();
			
			return result;
		},
		
		unset: function( attribute, options ) {
			Backbone.Relational.eventQueue.block();
			
			var result = Backbone.Model.prototype.unset.apply( this, arguments );
			this.updateRelations( options );
			
			// Try to run the global queue holding external events
			Backbone.Relational.eventQueue.unblock();
			
			return result;
		},
		
		clear: function( options ) {
			Backbone.Relational.eventQueue.block();
			
			var result = Backbone.Model.prototype.clear.apply( this, arguments );
			this.updateRelations( options );
			
			// Try to run the global queue holding external events
			Backbone.Relational.eventQueue.unblock();
			
			return result;
		},
		
		/**
		 * Override 'change', so the change will only execute after 'set' has finised (relations are updated),
		 * and 'previousAttributes' will be available when the event is fired.
		 */
		change: function( options ) {
			var dit = this, args = arguments;
			Backbone.Relational.eventQueue.add( function() {
					Backbone.Model.prototype.change.apply( dit, args );
				});
		},

		clone: function() {
			var attributes = _.clone( this.attributes );
			if ( !_.isUndefined( attributes[ this.idAttribute ] ) ) {
				attributes[ this.idAttribute ] = null;
			}

			_.each( this.getRelations() || [], function( rel ) {
					delete attributes[ rel.key ];
				});

			return new this.constructor( attributes );
		},
		
		/**
		 * Convert relations to JSON, omits them when required
		 */
		toJSON: function() {
			// If this Model has already been fully serialized in this branch once, return to avoid loops
			if ( this.isLocked() ) {
				return this.id;
			}
			
			this.acquire();
			var json = Backbone.Model.prototype.toJSON.call( this );
			
			if ( this.constructor._superModel && !( this.constructor._subModelTypeAttribute in json ) ) {
				json[ this.constructor._subModelTypeAttribute ] = this.constructor._subModelTypeValue;
			}
			
			_.each( this._relations || [], function( rel ) {
					var value = json[ rel.key ];

					if ( rel.options.includeInJSON === true) {
						if ( value && _.isFunction( value.toJSON ) ) {
							json[ rel.keyDestination ] = value.toJSON();
						}
						else {
							json[ rel.keyDestination ] = null;
						}
					}
					else if ( _.isString( rel.options.includeInJSON ) ) {
						if ( value instanceof Backbone.Collection ) {
							json[ rel.keyDestination ] = value.pluck( rel.options.includeInJSON );
						}
						else if ( value instanceof Backbone.Model ) {
							json[ rel.keyDestination ] = value.get( rel.options.includeInJSON );
						}	
						else {
							json[ rel.keyDestination ] = null;
						}
					}
					else if ( _.isArray( rel.options.includeInJSON ) ) {
						if ( value instanceof Backbone.Collection ) {
							var valueSub = [];
							value.each( function( model ) {
								var curJson = {};
								_.each( rel.options.includeInJSON, function( key ) {
									curJson[ key ] = model.get( key );
								});
								valueSub.push( curJson );
							});
							json[ rel.keyDestination ] = valueSub;
						}
						else if ( value instanceof Backbone.Model ) {
							var valueSub = {};
							_.each( rel.options.includeInJSON, function( key ) {
								valueSub[ key ] = value.get( key );
							});
							json[ rel.keyDestination ] = valueSub;
						}
						else {
							json[ rel.keyDestination ] = null;
						}
					}
					else {
						delete json[ rel.key ];
					}

					if ( rel.keyDestination !== rel.key ) {
						delete json[ rel.key ];
					}
				});
			
			this.release();
			return json;
		}
	},
	{
		setup: function( superModel ) {
			// We don't want to share a relations array with a parent, as this will cause problems with
			// reverse relations.
			this.prototype.relations = ( this.prototype.relations || [] ).slice( 0 );

			this._subModels = {};
			this._superModel = null;

			// If this model has 'subModelTypes' itself, remember them in the store
			if ( this.prototype.hasOwnProperty( 'subModelTypes' ) ) {
				Backbone.Relational.store.addSubModels( this.prototype.subModelTypes, this );
			}
			// The 'subModelTypes' property should not be inherited, so reset it.
			else {
				this.prototype.subModelTypes = null;
			}

			// Initialize all reverseRelations that belong to this new model.
			_.each( this.prototype.relations || [], function( rel ) {
					if ( !rel.model ) {
						rel.model = this;
					}

					if ( rel.reverseRelation && rel.model === this ) {				
						var preInitialize = true;
						if ( _.isString( rel.relatedModel ) ) {
							/**
							 * The related model might not be defined for two reasons
							 *  1. it never gets defined, e.g. a typo
							 *  2. it is related to itself
							 * In neither of these cases do we need to pre-initialize reverse relations.
							 */
							var relatedModel = Backbone.Relational.store.getObjectByName( rel.relatedModel );
							preInitialize = relatedModel && ( relatedModel.prototype instanceof Backbone.RelationalModel );
						}

						var type = !_.isString( rel.type ) ? rel.type : Backbone[ rel.type ] || Backbone.Relational.store.getObjectByName( rel.type );
						if ( preInitialize && type && type.prototype instanceof Backbone.Relation ) {
							new type( null, rel );
						}
					}
				}, this );
			
			return this;
		},

		/**
		 * Create a 'Backbone.Model' instance based on 'attributes'.
		 * @param {Object} attributes
		 * @param {Object} [options]
		 * @return {Backbone.Model}
		 */
		build: function( attributes, options ) {
			var model = this;

			// 'build' is a possible entrypoint; it's possible no model hierarchy has been determined yet.
			this.initializeModelHierarchy();

			// Determine what type of (sub)model should be built if applicable.
			// Lookup the proper subModelType in 'this._subModels'.
			if ( this._subModels && this.prototype.subModelTypeAttribute in attributes ) {
				var subModelTypeAttribute = attributes[ this.prototype.subModelTypeAttribute ];
				var subModelType = this._subModels[ subModelTypeAttribute ];
				if ( subModelType ) {
					model = subModelType;
				}
			}
			
			return new model( attributes, options );
		},

		initializeModelHierarchy: function() {
			// If we're here for the first time, try to determine if this modelType has a 'superModel'.
			if ( _.isUndefined( this._superModel ) || _.isNull( this._superModel ) ) {
				Backbone.Relational.store.setupSuperModel( this );

				// If a superModel has been found, copy relations from the _superModel if they haven't been
				// inherited automatically (due to a redefinition of 'relations').
				// Otherwise, make sure we don't get here again for this type by making '_superModel' false so we fail
				// the isUndefined/isNull check next time.
				if ( this._superModel ) {
					//
					if ( this._superModel.prototype.relations ) {
						var supermodelRelationsExist = _.any( this.prototype.relations || [], function( rel ) {
							return rel.model && rel.model !== this;
						}, this );

						if ( !supermodelRelationsExist ) {
							this.prototype.relations = this._superModel.prototype.relations.concat( this.prototype.relations );
						}
					}
				}
				else {
					this._superModel = false;
				}
			}

			// If we came here through 'build' for a model that has 'subModelTypes', and not all of them have been resolved yet, try to resolve each.
			if ( this.prototype.subModelTypes && _.keys( this.prototype.subModelTypes ).length !== _.keys( this._subModels ).length ) {
				_.each( this.prototype.subModelTypes || [], function( subModelTypeName ) {
					var subModelType = Backbone.Relational.store.getObjectByName( subModelTypeName );
					subModelType && subModelType.initializeModelHierarchy();
				});
			}
		},

		/**
		 * Find an instance of `this` type in 'Backbone.Relational.store'.
		 * - If `attributes` is a string or a number, `findOrCreate` will just query the `store` and return a model if found.
		 * - If `attributes` is an object, the model will be updated with `attributes` if found.
		 *   Otherwise, a new model is created with `attributes` (unless `options.create` is explicitly set to `false`).
		 * @param {Object|String|Number} attributes Either a model's id, or the attributes used to create or update a model.
		 * @param {Object} [options]
		 * @param {Boolean} [options.create=true]
		 * @return {Backbone.RelationalModel}
		 */
		findOrCreate: function( attributes, options ) {
			// Try to find an instance of 'this' model type in the store
			var model = Backbone.Relational.store.find( this, attributes );

			// If we found an instance, update it with the data in 'item'; if not, create an instance
			// (unless 'options.create' is false).
			if ( _.isObject( attributes ) ) {
				if ( model ) {
					model.set( model.parse ? model.parse( attributes ) : attributes, options );
				}
				else if ( !options || ( options && options.create !== false ) ) {
					model = this.build( attributes, options );
				}
			}

			return model;
		}
	});
	_.extend( Backbone.RelationalModel.prototype, Backbone.Semaphore );
	
	/**
	 * Override Backbone.Collection._prepareModel, so objects will be built using the correct type
	 * if the collection.model has subModels.
	 */
	Backbone.Collection.prototype.__prepareModel = Backbone.Collection.prototype._prepareModel;
	Backbone.Collection.prototype._prepareModel = function ( model, options ) {
		options || (options = {});
		if ( !( model instanceof Backbone.Model ) ) {
			var attrs = model;
			options.collection = this;

			if ( typeof this.model.findOrCreate !== 'undefined' ) {
				model = this.model.findOrCreate( attrs, options );
			}
			else {
				model = new this.model( attrs, options );
			}
			
			if ( !model._validate( model.attributes, options ) ) {
				model = false;
			}
		}
		else if ( !model.collection ) {
			model.collection = this;
		}
		
		return model;
	}
	
	/**
	 * Override Backbone.Collection.add, so objects fetched from the server multiple times will
	 * update the existing Model. Also, trigger 'relational:add'.
	 */
	var add = Backbone.Collection.prototype.__add = Backbone.Collection.prototype.add;
	Backbone.Collection.prototype.add = function( models, options ) {
		options || (options = {});
		if ( !_.isArray( models ) ) {
			models = [ models ];
		}

		var modelsToAdd = [];

		//console.debug( 'calling add on coll=%o; model=%o, options=%o', this, models, options );
		_.each( models || [], function( model ) {
			if ( !( model instanceof Backbone.Model ) ) {
				// `_prepareModel` attempts to find `model` in Backbone.store through `findOrCreate`,
				// and sets the new properties on it if is found. Otherwise, a new model is instantiated.
				model = Backbone.Collection.prototype._prepareModel.call( this, model, options );
			}

			if ( model instanceof Backbone.Model && !this.get( model ) && !this.getByCid( model ) ) {
				modelsToAdd.push( model );
			}
		}, this );


		// Add 'models' in a single batch, so the original add will only be called once (and thus 'sort', etc).
		if ( modelsToAdd.length ) {
			add.call( this, modelsToAdd, options );

			_.each( modelsToAdd || [], function( model ) {
				this.trigger( 'relational:add', model, this, options );
			}, this );
		}
		
		return this;
	};
	
	/**
	 * Override 'Backbone.Collection.remove' to trigger 'relational:remove'.
	 */
	var remove = Backbone.Collection.prototype.__remove = Backbone.Collection.prototype.remove;
	Backbone.Collection.prototype.remove = function( models, options ) {
		options || (options = {});
		if ( !_.isArray( models ) ) {
			models = [ models ];
		}
		else {
			models = models.slice( 0 );
		}

		//console.debug('calling remove on coll=%o; models=%o, options=%o', this, models, options );
		_.each( models || [], function( model ) {
				model = this.getByCid( model ) || this.get( model );

				if ( model instanceof Backbone.Model ) {
					remove.call( this, model, options );
					this.trigger('relational:remove', model, this, options);
				}
			}, this );
		
		return this;
	};

	/**
	 * Override 'Backbone.Collection.reset' to trigger 'relational:reset'.
	 */
	var reset = Backbone.Collection.prototype.__reset = Backbone.Collection.prototype.reset;
	Backbone.Collection.prototype.reset = function( models, options ) {
		reset.call( this, models, options );
		this.trigger( 'relational:reset', this, options );

		return this;
	};

	/**
	 * Override 'Backbone.Collection.sort' to trigger 'relational:reset'.
	 */
	var sort = Backbone.Collection.prototype.__sort = Backbone.Collection.prototype.sort;
	Backbone.Collection.prototype.sort = function( options ) {
		sort.call( this, options );
		this.trigger( 'relational:reset', this, options );

		return this;
	};
	
	/**
	 * Override 'Backbone.Collection.trigger' so 'add', 'remove' and 'reset' events are queued until relations
	 * are ready.
	 */
	var trigger = Backbone.Collection.prototype.__trigger = Backbone.Collection.prototype.trigger;
	Backbone.Collection.prototype.trigger = function( eventName ) {
		if ( eventName === 'add' || eventName === 'remove' || eventName === 'reset' ) {
			var dit = this, args = arguments;
			
			if (eventName === 'add') {
				args = _.toArray(args);
				// the fourth argument in case of a regular add is the option object.
				// we need to clone it, as it could be modified while we wait on the eventQueue to be unblocked
				if (_.isObject(args[3])) {
					args[3] = _.clone(args[3]);
				}
			}
			
			Backbone.Relational.eventQueue.add( function() {
					trigger.apply( dit, args );
				});
		}
		else {
			trigger.apply( this, arguments );
		}
		
		return this;
	};

	// Override .extend() to automatically call .setup()
	Backbone.RelationalModel.extend = function( protoProps, classProps ) {
		var child = Backbone.Model.extend.apply( this, arguments );
		
		child.setup( this );

		return child;
	};
})();

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	Copyright (c) 2012 Brett Wejrowski

	wojodesign.com
	simplecartjs.com
	http://github.com/wojodesign/simplecart-js

	VERSION 3.0.3

	Dual licensed under the MIT or GPL licenses.
~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~*/
/*jslint browser: true, unparam: true, white: true, nomen: true, regexp: true, maxerr: 50, indent: 4 */

(function (window, document) {
	//"use strict";
	/*global HTMLElement */

	var typeof_string			= typeof "",
		typeof_undefined		= typeof undefined,
		typeof_function			= typeof function () {},
		typeof_object			= typeof {},
		isTypeOf				= function (item, type) { return typeof item === type; },
		isString				= function (item) { return isTypeOf(item, typeof_string); },
		isUndefined				= function (item) { return isTypeOf(item, typeof_undefined); },
		isFunction				= function (item) { return isTypeOf(item, typeof_function); },

		isObject				= function (item) { return isTypeOf(item, typeof_object); },
		//Returns true if it is a DOM element
		isElement				= function (o) {
			return typeof HTMLElement === "object" ? o instanceof HTMLElement : typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string";
		},



		generateSimpleCart = function (space) {

			// stealing this from selectivizr
			var selectorEngines = {
				"jQuery"							: "*"
			},


				// local variables for internal use
				item_id					= 0,
				item_id_namespace		= "SCI-",
				sc_items				= {},
				namespace				= space || "simpleCart",
				selectorFunctions		= {},
				eventFunctions			= {},
				baseEvents				= {},

				// local references
				localStorage			= window.localStorage,
				console					= window.console || { msgs: [], log: function (msg) { console.msgs.push(msg); } },

				// used in views 
				_VALUE_		= 'value',
				_TEXT_		= 'text',
				_HTML_		= 'html',
				_CLICK_		= 'click',

				// Currencies
				currencies = {
					"USD": { code: "USD", symbol: "&#36;", name: "US Dollar" },
					"AUD": { code: "AUD", symbol: "&#36;", name: "Australian Dollar" },
					"BRL": { code: "BRL", symbol: "R&#36;", name: "Brazilian Real" },
					"CAD": { code: "CAD", symbol: "&#36;", name: "Canadian Dollar" },
					"CZK": { code: "CZK", symbol: "&nbsp;&#75;&#269;", name: "Czech Koruna", after: true },
					"DKK": { code: "DKK", symbol: "DKK&nbsp;", name: "Danish Krone" },
					"EUR": { code: "EUR", symbol: "&euro;", name: "Euro" },
					"HKD": { code: "HKD", symbol: "&#36;", name: "Hong Kong Dollar" },
					"HUF": { code: "HUF", symbol: "&#70;&#116;", name: "Hungarian Forint" },
					"ILS": { code: "ILS", symbol: "&#8362;", name: "Israeli New Sheqel" },
					"JPY": { code: "JPY", symbol: "&yen;", name: "Japanese Yen" },
					"MXN": { code: "MXN", symbol: "&#36;", name: "Mexican Peso" },
					"NOK": { code: "NOK", symbol: "NOK&nbsp;", name: "Norwegian Krone" },
					"NZD": { code: "NZD", symbol: "&#36;", name: "New Zealand Dollar" },
					"PLN": { code: "PLN", symbol: "PLN&nbsp;", name: "Polish Zloty" },
					"GBP": { code: "GBP", symbol: "&pound;", name: "Pound Sterling" },
					"SGD": { code: "SGD", symbol: "&#36;", name: "Singapore Dollar" },
					"SEK": { code: "SEK", symbol: "SEK&nbsp;", name: "Swedish Krona" },
					"CHF": { code: "CHF", symbol: "CHF&nbsp;", name: "Swiss Franc" },
					"THB": { code: "THB", symbol: "&#3647;", name: "Thai Baht" },
					"BTC": { code: "BTC", symbol: " BTC", name: "Bitcoin", accuracy: 4, after: true	}
				},

				// default options
				settings = {
					checkout				: { type: "PayPal", email: "danger_1329273096_biz_api1.gmail.com" },
					currency				: "MXN",
					language				: "spanish",

					cartStyle				: "div",
					cartColumns			: [
						{ attr: "name", label: "Nombre" },
						{ attr: "price", label: "Precio", view: 'currency' },
						{ view: "decrement", label: false },
						{ attr: "quantity", label: "Unidades" },
						{ view: "increment", label: false },
						{ attr: "total", label: "Importe", view: 'currency' },
						{ view: "remove", text: "Remover", label: false }
					],

					excludeFromCheckout	: ['thumb', 'inventory', 'tax_rate'],

					shippingFlatRate		: 0,
					shippingQuantityRate	: 0,
					shippingTotalRate		: 0,
					shippingCustom		: null,

					taxRate				: 0.16,
					
					taxShipping			: true,

					data				: {}

				},


				// main simpleCart object, function call is used for setting options
				simpleCart = function (options) {
					// shortcut for simpleCart.ready
					if (isFunction(options)) {
						return simpleCart.ready(options);
					}

					// set options
					if (isObject(options)) {
						return simpleCart.extend(settings, options);
					}
				},

				// selector engine
				$engine,

				// built in cart views for item cells
				cartColumnViews;

			// function for extending objects
			simpleCart.extend = function (target, opts) {
				var next;

				if (isUndefined(opts)) {
					opts = target;
					target = simpleCart;
				}

				for (next in opts) {
					if (Object.prototype.hasOwnProperty.call(opts, next)) {
						target[next] = opts[next];
					}
				}
				return target;
			};

			// create copy function
			simpleCart.extend({
				copy: function (n) {
					var cp = generateSimpleCart(n);
					cp.init();
					return cp;
				}
			});

			// add in the core functionality
			simpleCart.extend({

				isReady: false,

				// this is where the magic happens, the add function
				add: function (values, opt_quiet) {
					var info		= values || {},
						newItem		= new simpleCart.Item(info),
						addItem 	= true,
						// optionally supress event triggers
						quiet 		= opt_quiet === true ? opt_quiet : false,
						oldItem;

					// trigger before add event
					if (!quiet) {
					  	addItem = simpleCart.trigger('beforeAdd', [newItem]);
					
						if (addItem === false) {
							return false;
						}
					}
					
					// if the new item already exists, increment the value
					oldItem = simpleCart.has(newItem);
					if (oldItem) {
						oldItem.increment(newItem.quantity());
						newItem = oldItem;
					// otherwise add the item
					} else {
					        var allow_addition = true;	
						if (typeof newItem.get("inventory") != "undefined"){
							if (!isNaN(parseInt(newItem.get("inventory")))){
								if (parseInt(newItem.get("inventory"))  < newItem.quantity()){
									if (parseInt(newItem.get("inventory")) < 1){
										alert('Perdón, éste producto esta agotado.');
									}else{
										alert('Perdón, solo ' + newItem.get("inventory")  + ' unidades están disponibles.');
									}
									allow_addition = false;
								}
							}
						}
						if (allow_addition){
							sc_items[newItem.id()] = newItem;
						}
					}

					// update the cart
					simpleCart.update();

					if (!quiet) {
						// trigger after add event
						simpleCart.trigger('afterAdd', [newItem, isUndefined(oldItem)]);
					}

					// return a reference to the added item
					return newItem;
				},


				// iteration function
				each: function (array, callback) {
					var next,
						x = 0,
						result,
						cb,
						items;

					if (isFunction(array)) {
						cb = array;
						items = sc_items;
					} else if (isFunction(callback)) {
						cb = callback;
						items = array;
					} else {
						return;
					}

					for (next in items) {
						if (Object.prototype.hasOwnProperty.call(items, next)) {
							result = cb.call(simpleCart, items[next], x, next);
							if (result === false) {
								return;
							}
							x += 1;
						}
					}
				},

				find: function (id) {
					var items = [];

					// return object for id if it exists
					if (isObject(sc_items[id])) {
						return sc_items[id];
					}
					// search through items with the given criteria
					if (isObject(id)) {
						simpleCart.each(function (item) {
							var match = true;
							simpleCart.each(id, function (val, x, attr) {

								if (isString(val)) {
									// less than or equal to
									if (val.match(/<=.*/)) {
										val = parseFloat(val.replace('<=', ''));
										if (!(item.get(attr) && parseFloat(item.get(attr)) <= val)) {
											match = false;
										}

									// less than
									} else if (val.match(/</)) {
										val = parseFloat(val.replace('<', ''));
										if (!(item.get(attr) && parseFloat(item.get(attr)) < val)) {
											match = false;
										}

									// greater than or equal to
									} else if (val.match(/>=/)) {
										val = parseFloat(val.replace('>=', ''));
										if (!(item.get(attr) && parseFloat(item.get(attr)) >= val)) {
											match = false;
										}

									// greater than
									} else if (val.match(/>/)) {
										val = parseFloat(val.replace('>', ''));
										if (!(item.get(attr) && parseFloat(item.get(attr)) > val)) {
											match = false;
										}

									// equal to
									} else if (!(item.get(attr) && item.get(attr) === val)) {
										match = false;
									}

								// equal to non string
								} else if (!(item.get(attr) && item.get(attr) === val)) {
									match = false;
								}

								return match;
							});

							// add the item if it matches
							if (match) {
								items.push(item);
							}
						});
						return items;
					}

					// if no criteria is given we return all items
					if (isUndefined(id)) {

						// use a new array so we don't give a reference to the
						// cart's item array
						simpleCart.each(function (item) {
							items.push(item);
						});
						return items;
					}

					// return empty array as default
					return items;
				},

				// return all items
				items: function () {
					return this.find();
				},

				// check to see if item is in the cart already
				has: function (item) {
					var match = false;

					simpleCart.each(function (testItem) {
                        if (testItem.id() == item.id()){
                            match = testItem;
                        }
/*						if (testItem.equals(item)) {
							match = testItem;
						}*/
					});
					return match;
				},

				// empty the cart
				empty: function () {
					// remove each item individually so we see the remove events
					var newItems = {};
					simpleCart.each(function (item) {
						// send a param of true to make sure it doesn't
						// update after every removal
						// keep the item if the function returns false,
						// because we know it has been prevented 
						// from being removed
						if (item.remove(true) === false) {
							newItems[item.id()] = item
						}
					});
					sc_items = newItems;
					simpleCart.update();
				},


				// functions for accessing cart info
				quantity: function () {
					var quantity = 0;
					simpleCart.each(function (item) {
						quantity += item.quantity();
					});
					return quantity;
				},

				total: function () {
					var total = 0;
					simpleCart.each(function (item) {
						total += item.total();
					});
					return total;
				},

				grandTotal: function () {
					return simpleCart.total() + simpleCart.tax() + simpleCart.shipping();
				},


				// updating functions
				update: function () {
					simpleCart.save();
					simpleCart.trigger("update");
				},

				init: function () {
					simpleCart.load();
					simpleCart.update();
					simpleCart.ready();
				},

				// view management
				$: function (selector) {
					return new simpleCart.ELEMENT(selector);
				},

				$create: function (tag) {
					return simpleCart.$(document.createElement(tag));
				},

				setupViewTool: function () {
					var members, member, context = window, engine;

					// Determine the "best fit" selector engine
					for (engine in selectorEngines) {
						if (Object.prototype.hasOwnProperty.call(selectorEngines, engine) && window[engine]) {
							members = selectorEngines[engine].replace("*", engine).split(".");
							member = members.shift();
							if (member) {
								context = context[member];
							}
							if (typeof context === "function") {
								// set the selector engine and extend the prototype of our
								// element wrapper class
								$engine = context;
								simpleCart.extend(simpleCart.ELEMENT._, selectorFunctions[engine]);
								return;
							}
						}
					}
				},

				// return a list of id's in the cart
				ids: function () {
					var ids = [];
					simpleCart.each(function (item) {
						ids.push(item.id());
					});
					return ids;

				},


				// storage
				save: function () {
					simpleCart.trigger('beforeSave');

					var items = {};

					// save all the items
					simpleCart.each(function (item) {
						items[item.id()] = simpleCart.extend(item.fields(), item.options());
					});

					localStorage.setItem(namespace + "_items", JSON.stringify(items));

					simpleCart.trigger('afterSave');
				},

				load: function () {

					// empty without the update
					sc_items = {};

					var items = localStorage.getItem(namespace + "_items");

					if (!items) {
						return;
					}
					
					// we wrap this in a try statement so we can catch 
					// any json parsing errors. no more stick and we
					// have a playing card pluckin the spokes now...
					// soundin like a harley.
					try {
						simpleCart.each(JSON.parse(items), function (item) {
							simpleCart.add(item, true);
						});
					} catch (e){
						simpleCart.error( "Error Loading data: " + e );
					}


					simpleCart.trigger('load');
				},

				// ready function used as a shortcut for bind('ready',fn)
				ready: function (fn) {

					if (isFunction(fn)) {
						// call function if already ready already
						if (simpleCart.isReady) {
							fn.call(simpleCart);

						// bind if not ready
						} else {
							simpleCart.bind('ready', fn);
						}

					// trigger ready event
					} else if (isUndefined(fn) && !simpleCart.isReady) {
						simpleCart.trigger('ready');
						simpleCart.isReady = true;
					}

				},


				error: function (message) {
					var msg = "";
					if (isString(message)) {
						msg = message;
					} else if (isObject(message) && isString(message.message)) {
						msg = message.message;
					}
					try { console.log("simpleCart(js) Error: " + msg); } catch (e) {}
					simpleCart.trigger('error', message);
				}
			});


			/*******************************************************************
			 *	TAX AND SHIPPING
			 *******************************************************************/
			simpleCart.extend({

				// TODO: tax and shipping
				tax: function () {
					//var totalToTax = settings.taxShipping ? simpleCart.total() + simpleCart.shipping() : simpleCart.total(),
                    cost = settings.taxShipping ? simpleCart.taxRate() * simpleCart.shipping() : 0;
					
					simpleCart.each(function (item) {
						if (item.get('tax')) {
							cost += parseFloat(item.get('tax'));
						} else if (item.get('taxRate')) {
							cost += parseFloat(item.get('taxRate')) * item.total();
                        }else if (item.get('tax_rate')){
							cost += parseFloat(item.get('tax_rate')) * item.total();
                        } else{
                            cost += simpleCart.taxRate() * item.total()
                        }
					});
					return parseFloat(cost);
				},
				
				taxRate: function () {
					return settings.taxRate || 0;
				},

				shipping: function (opt_custom_function) {

					// shortcut to extend options with custom shipping
					if (isFunction(opt_custom_function)) {
						simpleCart({
							shippingCustom: opt_custom_function
						});
						return;
					}

					var cost = settings.shippingQuantityRate * simpleCart.quantity() +
							settings.shippingTotalRate * simpleCart.total() +
							settings.shippingFlatRate;

					if (isFunction(settings.shippingCustom)) {
						cost += settings.shippingCustom.call(simpleCart);
					}

					simpleCart.each(function (item) {
						cost += parseFloat(item.get('shipping') || 0);
					});
					return parseFloat(cost);
				}

			});

			/*******************************************************************
			 *	CART VIEWS
			 *******************************************************************/

			// built in cart views for item cells
			cartColumnViews = {
				attr: function (item, column) {
					return item.get(column.attr) || "";
				},

				currency: function (item, column) {
					return simpleCart.toCurrency(item.get(column.attr) || 0);
				},

				link: function (item, column) {
					return "<a href='" + item.get(column.attr) + "'>" + column.text + "</a>";
				},

				decrement: function (item, column) {
					return "<a href='javascript:;' class='simpleCart_decrement'>" + (column.text || "-") + "</a>";
				},

				increment: function (item, column) {
					return "<a href='javascript:;' class='simpleCart_increment'>" + (column.text || "+") + "</a>";
				},

				image: function (item, column) {
					return "<img src='" + item.get(column.attr) + "'/>";
				},

				input: function (item, column) {
					return "<input type='text' value='" + item.get(column.attr) + "' class='simpleCart_input'/>";
				},

				remove: function (item, column) {
					return "<a href='javascript:;' class='simpleCart_remove'>" + (column.text || "X") + "</a>";
				}
			};

			// cart column wrapper class and functions
			function cartColumn(opts) {
				var options = opts || {};
				return simpleCart.extend({
					attr			: "",
					label			: "",
					view			: "attr",
					text			: "",
					className		: "",
					hide			: false
				}, options);
			}

			function cartCellView(item, column) {
				var viewFunc = isFunction(column.view) ? column.view : isString(column.view) && isFunction(cartColumnViews[column.view]) ? cartColumnViews[column.view] : cartColumnViews.attr;

				return viewFunc.call(simpleCart, item, column);
			}


			simpleCart.extend({

				// write out cart
				writeCart: function (selector) {
					var TABLE = settings.cartStyle.toLowerCase(),
						isTable = TABLE === 'table',
						TR = isTable ? "tr" : "div",
						TH = isTable ? 'th' : 'div',
						TD = isTable ? 'td' : 'div',
						cart_container = simpleCart.$create(TABLE),
						header_container = simpleCart.$create(TR).addClass('headerRow'),
						container = simpleCart.$(selector),
						column,
						klass,
						label,
						x,
						xlen;

					container.html(' ').append(cart_container);

					cart_container.append(header_container);


					// create header
					for (x = 0, xlen = settings.cartColumns.length; x < xlen; x += 1) {
						column	= cartColumn(settings.cartColumns[x]);
						klass	=  "item-" + (column.attr || column.view || column.label || column.text || "cell") + " " + column.className;
						label	= column.label || "";

						// append the header cell
						header_container.append(
							simpleCart.$create(TH).addClass(klass).html(label)
						);
					}

					// cycle through the items
					simpleCart.each(function (item, y) {
						simpleCart.createCartRow(item, y, TR, TD, cart_container);
					});

					return cart_container;
				},

				// generate a cart row from an item
				createCartRow: function (item, y, TR, TD, container) {
					var row = simpleCart.$create(TR)
										.addClass('itemRow row-' + y + " " + (y % 2 ? "even" : "odd"))
										.attr('id', "cartItem_" + item.id()),
						j,
						jlen,
						column,
						klass,
						content,
						cell;

					container.append(row);

					// cycle through the columns to create each cell for the item
					for (j = 0, jlen = settings.cartColumns.length; j < jlen; j += 1) {
						column	= cartColumn(settings.cartColumns[j]);
						klass	= "item-" + (column.attr || (isString(column.view) ? column.view : column.label || column.text || "cell")) + " " + column.className;
						content = cartCellView(item, column);
						cell	= simpleCart.$create(TD).addClass(klass).html(content);

						row.append(cell);
					}
					return row;
				}

			});

			/*******************************************************************
			 *	CART ITEM CLASS MANAGEMENT
			 *******************************************************************/

			simpleCart.Item = function (info) {

				// we use the data object to track values for the item
				var _data = {},
					me = this;

				// cycle through given attributes and set them to the data object
				if (isObject(info)) {
					simpleCart.extend(_data, info);
				}

                if (!info['id']){
                    // set the item id
                    item_id += 1;
                    _data.id = _data.id || item_id_namespace + item_id;
                    while (!isUndefined(sc_items[_data.id])) {
                        item_id += 1;
                        _data.id = item_id_namespace + item_id;
                    }
                }

				function checkQuantityAndPrice() {

					// check to make sure price is valid
					if (isString(_data.price)) {
					   // trying to remove all chars that aren't numbers or '.'
						_data.price = parseFloat(_data.price.replace(simpleCart.currency().decimal, ".").replace(/[^0-9\.]+/ig, ""));

					}
					if (isNaN(_data.price)) {
						_data.price = 0;
					}
					if (_data.price < 0) {
						_data.price = 0;
					}

					// check to make sure quantity is valid
					if (isString(_data.quantity)) {
						_data.quantity = parseInt(_data.quantity.replace(simpleCart.currency().delimiter, ""), 10);
					}
					if (isNaN(_data.quantity)) {
						_data.quantity = 1;
					}
					if (_data.quantity <= 0) {
						me.remove();
					}

				}

				// getter and setter methods to access private variables
				me.get = function (name, skipPrototypes) {

					var usePrototypes = !skipPrototypes;

					if (isUndefined(name)) {
						return name;
					}

					// return the value in order of the data object and then the prototype
					return isFunction(_data[name])	? _data[name].call(me) :
							!isUndefined(_data[name]) ? _data[name] :

							isFunction(me[name]) && usePrototypes		? me[name].call(me) :
							!isUndefined(me[name]) && usePrototypes	? me[name] :
							_data[name];
				};
				me.set = function (name, value) {
					if (!isUndefined(name)) {
						_data[name.toLowerCase()] = value;
						if (name.toLowerCase() === 'price' || name.toLowerCase() === 'quantity') {
							checkQuantityAndPrice();
						}
					}
					return me;
				};
				me.equals = function (item) {
					for( var label in _data ){
						if (Object.prototype.hasOwnProperty.call(_data, label)) {
							if (label !== 'quantity' && label !== 'id') {
								if (item.get(label) !== _data[label]) {
									return false;
								}
							}
						}
					}
					return true;
				};
				me.options = function () {
					var data = {};
					simpleCart.each(_data,function (val, x, label) {
						var add = true;
						simpleCart.each(me.reservedFields(), function (field) {
							if (field === label) {
								add = false;
							}
							return add;
						});

						if (add) {
							data[label] = me.get(label);
						}
					});
					return data;
				};


				checkQuantityAndPrice();
			};

			simpleCart.Item._ = simpleCart.Item.prototype = {

				// editing the item quantity
				increment: function (amount) {
					var diff = amount || 1;
					diff = parseInt(diff, 10);
					var allow_addition = true;
					if (typeof this.get("inventory") != "undefined"){
						if (!isNaN(parseInt(this.get("inventory")))){
							if (parseInt(this.get("inventory")) < this.quantity() + diff){
								if (parseInt(this.get("inventory")) < 1){
									alert('Perdón, éste producto esta agotado.');
								}else{
									alert('Perdón, solo ' + this.get("inventory")  + ' unidades están disponibles.');
								}
								allow_addition = false;
							}
						}
					}

					if (allow_addition){
						this.quantity(this.quantity() + diff);
						if (this.quantity() < 1) {
							this.remove();
							return null;
						}
					}
					return this;

				},
				decrement: function (amount) {
					var diff = amount || 1;
					return this.increment(-parseInt(diff, 10));
				},
				remove: function (skipUpdate) {
					var removeItemBool = simpleCart.trigger("beforeRemove", [sc_items[this.id()]]);
					if (removeItemBool === false ) {
						return false;
					}
					delete sc_items[this.id()];
					if (!skipUpdate) { 
						simpleCart.update();
					}
					return null;
				},

				// special fields for items
				reservedFields: function () {
					return ['quantity', 'id', 'item_number', 'price', 'name', 'shipping', 'tax', 'taxRate'];
				},

				// return values for all reserved fields if they exist
				fields: function () {
					var data = {},
						me = this;
					simpleCart.each(me.reservedFields(), function (field) {
						if (me.get(field)) {
							data[field] = me.get(field);
						}
					});
					return data;
				},


				// shortcuts for getter/setters. can
				// be overwritten for customization
				// btw, we are hiring at wojo design, and could
				// use a great web designer. if thats you, you can
				// get more info at http://wojodesign.com/now-hiring/
				// or email me directly: brett@wojodesign.com
				quantity: function (val) {
					return isUndefined(val) ? parseInt(this.get("quantity", true) || 1, 10) : this.set("quantity", val);
				},
				price: function (val) {
					return isUndefined(val) ?
							parseFloat((this.get("price",true).toString()).replace(simpleCart.currency().symbol,"").replace(simpleCart.currency().delimiter,"") || 1) :
							this.set("price", parseFloat((val).toString().replace(simpleCart.currency().symbol,"").replace(simpleCart.currency().delimiter,"")));
				},
				id: function () {
					return this.get('id',false);
				},
				total:function () {
					return this.quantity()*this.price();
				}

			};




			/*******************************************************************
			 *	CHECKOUT MANAGEMENT
			 *******************************************************************/

			simpleCart.extend({
				checkout: function () {
					if (settings.checkout.type.toLowerCase() === 'custom' && isFunction(settings.checkout.fn)) {
						settings.checkout.fn.call(simpleCart,settings.checkout);
					} else if (isFunction(simpleCart.checkout[settings.checkout.type])) {
						simpleCart.checkout[settings.checkout.type].call(simpleCart,settings.checkout);
					} else {
						simpleCart.error("No Valid Checkout Method Specified");
					}
				},
				extendCheckout: function (methods) {
					return simpleCart.extend(simpleCart.checkout, methods);
				},
				generateAndSendForm: function (opts) {
					var form = simpleCart.$create("form");
                    //var form = $('#dummyform');
                    //form.html='';
					form.attr('style', 'display:none;');
					form.attr('action', opts.action);
					form.attr('method', opts.method);
					simpleCart.each(opts.data, function (val, x, name) {
						form.append(
							simpleCart.$create("input").attr("type","hidden").attr("name",name).val(val)
						);
					});

                    if (!opts.target || (opts.target && opts.target != 'self')){
                        form.attr('target','_top');
                    }

                    simpleCart.$("body").append(form);
					form.el.submit();
					form.remove();
                    //form.submit();
				}
			});

			simpleCart.extendCheckout({
				PayPal: function (opts) {
					// account email is required
					/*if (!opts.email) {
						return simpleCart.error("No email provided for PayPal checkout");
					}*/

					// build basic form options
                    if (opts.cmd == null){
                        var data = {
                                  cmd			: "_cart"
                                , upload		: "1"
                                , currency_code : simpleCart.currency().code
                                , business		: opts.email
                                , rm			: opts.method === "GET" ? "0" : "2"
                                , tax_cart		: simpleCart.tax().toFixed(2)
                                , handling_cart : simpleCart.shipping().toFixed(2)
                                , charset		: "utf-8"
                                , lc            : "MX"
                            }
                    }else{
                        var data = {
                                  cmd			: opts.cmd
                                , useraction    : 'commit'
                                , currency_code : simpleCart.currency().code
                                , charset		: "utf-8"
                                , lc            : "MX"
                                , business		: opts.email
                                , tax_cart		: simpleCart.tax().toFixed(2)
                                , handling_cart : simpleCart.shipping().toFixed(2)
                                , rm			: opts.method === "GET" ? "0" : "2"
                                , token         : opts.token
                            }
                    }

                    var action = opts.sandbox ? "https://www.sandbox.paypal.com/cgi-bin/webscr" : "https://www.paypal.com/mx/cgi-bin/webscr",
                        method = opts.method === "GET" ? "GET" : "POST";

                    // check for return and success URLs in the options
                    if (opts.success) {
                        data['return'] = opts.success;
                    }
                    if (opts.cancel) {
                        data.cancel_return = opts.cancel;
                    }

                    if (opts.notify) {
                        data.notify_url = opts.notify;
                    }

                    if (opts.invoice){
                        data.invoice = opts.invoice;
                    }

                    if (opts['billing_period_length']){
                        var item = simpleCart.items()[0];
                        data.item_name = opts.payment_description;
                        data.a3 = simpleCart.grandTotal().toFixed(2);
                        data.p3 = opts['billing_period_length']
                        if (opts['billing_period_unit'] == 'week'){
                            data.t3 = "W";
                        }else{
                            data.t3 = "M";
                        }
//                        data.srt = 12;
                        data.src = 1;
                        data.sra = 1;
                        if ((conekta.checkout._model.get('company_id') == 2757603 || conekta.checkout._model.get('company_id') == '2757603') && conekta.checkout._model.get('custom_fields').find(function(custom_field,i){return custom_field.get('name') == 'Código de Promoción'}).get('value').match(/PROMOTAURUS/i)){
                            data.a1 = 0;
                            data.t1 = "M";
                            data.p1= 1;
                        }
                    }else{
                        if (simpleCart.items().length < 10){
                            // add all the items to the form data
                            simpleCart.each(function (item,x) {
                                var counter = x+1,
                                    item_options = item.options(),
                                    optionCount = 0,
                                    send;

                                // basic item data
                                data["item_name_" + counter] = item.get("name");
                                data["quantity_" + counter] = item.quantity();
                                data["amount_" + counter] = item.price().toFixed(2);
                                data["item_number_" + counter] = item.get("item_number") || counter;


                                // add the options
                                simpleCart.each(item_options, function (val,k,attr) {
                                    // paypal limits us to 10 options
                                    if (k < 10) {
                                        // check to see if we need to exclude this from checkout
                                        send = true;
                                        simpleCart.each(settings.excludeFromCheckout, function (field_name) {
                                            if (field_name === attr) { send = false; }
                                        });
                                        if (send) {
                                                optionCount += 1;
                                                data["on" + k + "_" + counter] = attr;
                                                data["os" + k + "_" + counter] = val;
                                        }
                                    }
                                });

                                // options count
                                data["option_index_"+ x] = Math.min(10, optionCount);
                            });
                        }else{
                            var counter = 1;
                            data["tax_cart"] = 0;
                            data["item_name_" + counter] = 'Pedido Completo';
                            data["quantity_" + counter] = 1;
                            data["amount_" + counter] = simpleCart.total();
                            data["item_number_" + counter] = counter;
                        }
                    }

                    simpleCart.empty();
					simpleCart.trigger('beforeCheckout', [data]);

					simpleCart.generateAndSendForm({
						  action	: action
						, method	: method
						, data		: data
					});
                },

                Dineromail: function (opts) {

					// build basic form options
					var data = {
							  currency      : 'mxn'//simpleCart.currency().code
							//, merchant		: "1076019"//"EDU15KTWRZ"//"1466897"//opts.email
                            , payment_method_available : "mx_oxxo;mx_7eleven"//"all"//"mx_amex;mx_ixe"//"ar_amex;ar_master,1,3;ar_pagofacil;ar_dm;"//mx_amex;mx_ixe; 
                            , country_id    : 4//1
							, language      : "es-mx"
                            , change_quantity : 0
						},
						action = opts.sandbox ? "https://checkout.dineromail.com/CheckOut" : "https://checkout.dineromail.com/CheckOut",
						method = opts.method === "GET" ? "GET" : "POST";
/*                    if (simpleCart.shipping() > 0){
                        data.shipping_type_x = 1;
                        data.shipping_cost_1_1=simpleCart.shipping().toFixed(2);
                        data.shipping_currency='mxn';
                    }*/

					// check for return and success URLs in the options
					if (opts.success) {
						data.ok_url = opts.success;
					}
					if (opts.cancel) {
						data.error_url = opts.cancel;
					}
                    if (opts.merchant_id){
                        data.merchant = opts.merchant_id;
                    }

					/*if (opts.notify) {
						data.notify_url = opts.notify;
					}

                    if (opts.invoice){
                        data.transaction_id = opts.invoice;
                    }*/

					// add all the items to the form data
                    var counter=0;
					simpleCart.each(function (item,x) {
						var	item_options = item.options(),
							optionCount = 0,
							send;
                        counter = x+1; 	
						// basic item data
						data["item_name_" + counter] = item.get("name") + " (con IVA)";
						data["item_quantity_" + counter] = item.quantity();
                        data["item_ammount_" + counter] = (item.price()*(1+simpleCart.taxRate())).toFixed(2).replace(/\./,'');//.toFixed(2);
                        data["item_currency_" + counter] = 'mxn';
                    //data["item_number_" + counter] = item.get("item_number") || counter;
                    });
                    //shipping
                    if (simpleCart.shipping() > 0){
                        counter = counter+1;
                        data["item_name_" + counter] = "Costo de Envió (con IVA)";
                        data["item_quantity_" + counter] = 1;
                        data["item_ammount_" + counter] = (simpleCart.shipping()*(1+simpleCart.taxRate())).toFixed(2).replace(/\./,'');//.toFixed(2);
                        data["item_currency_" + counter] = 'mxn';
                    }

                    simpleCart.empty();
					simpleCart.trigger('beforeCheckout', [data]);

					simpleCart.generateAndSendForm({
						  action	: action
						, method	: method
						, data		: data
					});
				},


				GoogleCheckout: function (opts) {
					// account id is required
					if (!opts.merchantID) {
						return simpleCart.error("No merchant id provided for GoogleCheckout");
					}

					// google only accepts USD and GBP
					if (simpleCart.currency().code !== "USD" && simpleCart.currency().code !== "GBP") {
						return simpleCart.error("Google Checkout only accepts USD and GBP");
					}

					// build basic form options
					var data = {
							// TODO: better shipping support for this google
							  ship_method_name_1	: "Shipping"
							, ship_method_price_1	: simpleCart.shipping()
							, ship_method_currency_1: simpleCart.currency().code
							, _charset_				: ''
						},
						action = "https://checkout.google.com/api/checkout/v2/checkoutForm/Merchant/" + opts.merchantID,
						method = opts.method === "GET" ? "GET" : "POST";


					// add items to data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							options_list = [],
							send;
						data['item_name_' + counter]		= item.get('name');
						data['item_quantity_' + counter]	= item.quantity();
						data['item_price_' + counter]		= item.price();
						data['item_currency_ ' + counter]	= simpleCart.currency().code;
						data['item_tax_rate' + counter]		= item.get('taxRate') || simpleCart.taxRate();

						// create array of extra options
						simpleCart.each(item.options(), function (val,x,attr) {
							// check to see if we need to exclude this from checkout
							send = true;
							simpleCart.each(settings.excludeFromCheckout, function (field_name) {
								if (field_name === attr) { send = false; }
							});
							if (send) {
								options_list.push(attr + ": " + val);
							}
						});

						// add the options to the description
						data['item_description_' + counter] = options_list.join(", ");
					});

					simpleCart.trigger('beforeCheckout', [data]);

					simpleCart.generateAndSendForm({
						  action	: action
						, method	: method
						, data		: data
					});

				},


				AmazonPayments: function (opts) {
					// required options
					if (!opts.merchant_signature) {
						return simpleCart.error("No merchant signature provided for Amazon Payments");
					}
					if (!opts.merchant_id) {
						return simpleCart.error("No merchant id provided for Amazon Payments");
					}
					if (!opts.aws_access_key_id) {
						return simpleCart.error("No AWS access key id provided for Amazon Payments");
					}


					// build basic form options
					var data = {
							  aws_access_key_id:	opts.aws_access_key_id
							, merchant_signature:	opts.merchant_signature
							, currency_code:		simpleCart.currency().code
							, tax_rate:				simpleCart.taxRate()
							, weight_unit:			opts.weight_unit || 'lb'
						},
						action = (opts.sandbox ? "https://sandbox.google.com/checkout/" : "https://checkout.google.com/") + "cws/v2/Merchant/" + opts.merchant_id + "/checkoutForm",
						method = opts.method === "GET" ? "GET" : "POST";


					// add items to data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							options_list = [];
						data['item_title_' + counter]			= item.get('name');
						data['item_quantity_' + counter]		= item.quantity();
						data['item_price_' + counter]			= item.price();
						data['item_sku_ ' + counter]			= item.get('sku') || item.id();
						data['item_merchant_id_' + counter]	= opts.merchant_id;
						if (item.get('weight')) {
							data['item_weight_' + counter]		= item.get('weight');
						}
						if (settings.shippingQuantityRate) {
							data['shipping_method_price_per_unit_rate_' + counter] = settings.shippingQuantityRate;
						}


						// create array of extra options
						simpleCart.each(item.options(), function (val,x,attr) {
							// check to see if we need to exclude this from checkout
							var send = true;
							simpleCart.each(settings.excludeFromCheckout, function (field_name) {
								if (field_name === attr) { send = false; }
							});
							if (send && attr !== 'weight' && attr !== 'tax') {
								options_list.push(attr + ": " + val);
							}
						});

						// add the options to the description
						data['item_description_' + counter] = options_list.join(", ");
					});

					simpleCart.trigger('beforeCheckout', [data]);

					simpleCart.generateAndSendForm({
						  action	: action
						, method	: method
						, data		: data
					});


				},

                GenerateForm: function(opts) {
					var data = {
							  currency	: simpleCart.shipping()
							, shipping	: simpleCart.currency().code
                            , shipping_cost : simpleCart.shipping()
							, tax		: simpleCart.tax()
                            , subtotal  : simpleCart.total()
                            , total     : simpleCart.grandTotal()
							, taxRate	: simpleCart.taxRate()
							, itemCount : simpleCart.find({}).length
						}

					// add items to data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							options_list = [],
							send;
						data['item_name_' + counter]		= item.get('name');
						data['item_quantity_' + counter]	= item.quantity();
						data['item_price_' + counter]		= item.price();

						// create array of extra options
						simpleCart.each(item.options(), function (val,x,attr) {
							// check to see if we need to exclude this from checkout
							send = true;
							simpleCart.each(settings.excludeFromCheckout, function (field_name) {
								if (field_name === attr) { send = false; }
							});
							if (send) {
								options_list.push(attr + ": " + val);
							}
                        });

						// add the options to the description
						data['item_options_' + counter] = options_list.join(", ");
					});

                    return data;
                },
                
				SendForm: function (opts) {
					// url required
					if (!opts.url) {
						return simpleCart.error('URL required for SendForm Checkout');
					}

					// build basic form options
					var data = {
							  currency	: simpleCart.shipping()
							, shipping	: simpleCart.currency().code
                            , shipping_cost : simpleCart.shipping().toFixed(2)
							, tax		: simpleCart.tax().toFixed(2)
                            , subtotal  : simpleCart.total().toFixed(2)
                            , total     : simpleCart.grandTotal().toFixed(2)
							, taxRate	: simpleCart.taxRate().toFixed(2)
							, itemCount : simpleCart.find({}).length
						},
						action = opts.url + "?order_id=" + $("#order_id").attr("value") + "&company_id=" + company_config.company_id,
						method = opts.method === "GET" ? "GET" : "POST";


					// add items to data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							options_list = [],
							send;
						data['item_name_' + counter]		= item.get('name');
						data['item_quantity_' + counter]	= item.quantity();
						data['item_price_' + counter]		= item.price();

						// create array of extra options
						simpleCart.each(item.options(), function (val,x,attr) {
							// check to see if we need to exclude this from checkout
							send = true;
							simpleCart.each(settings.excludeFromCheckout, function (field_name) {
								if (field_name === attr) { send = false; }
							});
							if (send) {
								options_list.push(attr + ": " + val);
							}
						});

						// add the options to the description
						data['item_options_' + counter] = options_list.join(", ");
					});


					// check for return and success URLs in the options
					if (opts.success) {
						data['return'] = opts.success;
					}
					if (opts.cancel) {
						data.cancel_return = opts.cancel;
					}

					if (opts.extra_data) {
						data = simpleCart.extend(data,opts.extra_data);
					}

					simpleCart.trigger('beforeCheckout', [data]);

					simpleCart.generateAndSendForm({
						  action	: action
						, method	: method
						, data		: data
					});

				}

				,GenerateJSON: function (opts) {
					// build basic form options
					var data = {
							  currency	: simpleCart.shipping()
							, shipping	: simpleCart.currency().code
                            , shipping_cost : simpleCart.shipping().toFixed(2)
							, tax		: simpleCart.tax().toFixed(2)
                            , subtotal  : simpleCart.total().toFixed(2)
                            , total     : simpleCart.grandTotal().toFixed(2)
							, taxRate	: simpleCart.taxRate().toFixed(2)
							, itemCount : simpleCart.find({}).length
						};

					// add items to data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							options_list = [],
							send;
						data['item_name_' + counter]		= item.get('name');
						data['item_quantity_' + counter]	= item.quantity();
						data['item_price_' + counter]		= item.price();

                        var exclude = settings.excludeFromCheckout.slice(0);
                        exclude.push('product');
						// create array of extra options
						simpleCart.each(item.options(), function (val,x,attr) {
							// check to see if we need to exclude this from checkout
							send = true;
							simpleCart.each(exclude, function (field_name) {
								if (field_name === attr) { send = false; }
							});
							if (send) {
								options_list.push(attr + ": " + val);
							}
						});

						// add the options to the description
                        options_list.push('product: ' + item.id())
						data['item_options_' + counter] = options_list.join(", ");
					});


					// check for return and success URLs in the options

					simpleCart.trigger('beforeCheckout', [data]);
                    return data;
				}


			});


			/*******************************************************************
			 *	EVENT MANAGEMENT
			 *******************************************************************/
			eventFunctions = {

				// bind a callback to an event
				bind: function (name, callback) {
					if (!isFunction(callback)) {
						return this;
					}

					if (!this._events) {
						this._events = {};
					}

					if (this._events[name] === true) {
						callback.apply(this);
					} else if (!isUndefined(this._events[name])) {
						this._events[name].push(callback);
					} else {
						this._events[name] = [callback];
					}
					return this;
				},

				// trigger event
				trigger: function (name, options) {
					var returnval = true,
						x,
						xlen;

					if (!this._events) {
						this._events = {};
					}
					if (!isUndefined(this._events[name]) && isFunction(this._events[name][0])) {
						for (x = 0, xlen = this._events[name].length; x < xlen; x += 1) {
							returnval = this._events[name][x].apply(this, (options || []));
						}
					}
					if (returnval === false) {
						return false;
					}
					return true;
				}
			};
			simpleCart.extend(eventFunctions);
			simpleCart.extend(simpleCart.Item._, eventFunctions);


			// base simpleCart events in options
			baseEvents = {
				  beforeAdd				: null
				, afterAdd				: null
				, load					: null
				, beforeSave			: null
				, afterSave				: null
				, update				: null
				, ready					: null
				, checkoutSuccess		: null
				, checkoutFail			: null
				, beforeCheckout		: null
				, beforeRemove			: null
			};
			
			// extend with base events
			simpleCart(baseEvents);

			// bind settings to events
			simpleCart.each(baseEvents, function (val, x, name) {
				simpleCart.bind(name, function () {
					if (isFunction(settings[name])) {
						settings[name].apply(this, arguments);
					}
				});
			});

			/*******************************************************************
			 *	FORMATTING FUNCTIONS
			 *******************************************************************/
			simpleCart.extend({
				toCurrency: function (number,opts) {
					var num = parseFloat(number),
						opt_input = opts || {},
						_opts = simpleCart.extend(simpleCart.extend({
							  symbol:		"$"
							, decimal:		"."
							, delimiter:	","
							, accuracy:		2
							, after: false
						}, simpleCart.currency()), opt_input),

						numParts = num.toFixed(_opts.accuracy).split("."),
						dec = numParts[1],
						ints = numParts[0];
			
					ints = simpleCart.chunk(ints.reverse(), 3).join(_opts.delimiter.reverse()).reverse();

					return	(!_opts.after ? _opts.symbol : "") +
							ints +
							(dec ? _opts.decimal + dec : "") +
							(_opts.after ? _opts.symbol : "");
	
				},


				// break a string in blocks of size n
				chunk: function (str, n) {
					if (typeof n==='undefined') {
						n=2;
					}
					var result = str.match(new RegExp('.{1,' + n + '}','g'));
					return result || [];
				}

			});


			// reverse string function
			String.prototype.reverse = function () {
				return this.split("").reverse().join("");
			};


			// currency functions
			simpleCart.extend({
				currency: function (currency) {
					if (isString(currency) && !isUndefined(currencies[currency])) {
						settings.currency = currency;
					} else if (isObject(currency)) {
						currencies[currency.code] = currency;
						settings.currency = currency.code;
					} else {
						return currencies[settings.currency];
					}
				}
			});


			/*******************************************************************
			 *	VIEW MANAGEMENT
			 *******************************************************************/

			simpleCart.extend({
				// bind outlets to function
				bindOutlets: function (outlets) {
					simpleCart.each(outlets, function (callback, x, selector) {
						
						simpleCart.bind('update', function () {
							simpleCart.setOutlet(".simpleCart_" + selector, callback);
						});
					});
				},

				// set function return to outlet
				setOutlet: function (selector, func) {
					var val = func.call(simpleCart, selector);
					if (isObject(val) && val.el) {
						simpleCart.$(selector).html(' ').append(val);
					} else if (!isUndefined(val)) {
						simpleCart.$(selector).html(val);
					}
				},

				// bind click events on inputs
				bindInputs: function (inputs) {
					simpleCart.each(inputs, function (info) {
						simpleCart.setInput(".simpleCart_" + info.selector, info.event, info.callback);
					});
				},

				// attach events to inputs	
				setInput: function (selector, event, func) {
					simpleCart.$(selector).live(event, func);
				}
			});		


			// class for wrapping DOM selector shit
			simpleCart.ELEMENT = function (selector) {

				this.create(selector);
				this.selector = selector || null; // "#" + this.attr('id'); TODO: test length?
			};

			simpleCart.extend(selectorFunctions, {
				"jQuery"		: {
					passthrough: function (action, val) {
						if (isUndefined(val)) {
							return this.el[action]();
						}
						
						this.el[action](val);
						return this;
					},
					text: function (text) {
						return this.passthrough(_TEXT_, text);
					},
					html: function (html) {
						return this.passthrough(_HTML_, html);
					},
					val: function (val) {
						return this.passthrough("val", val);
					},
					append: function (item) {
						var target = item.el || item;
						this.el.append(target);
						return this;
					},
					attr: function (attr, val) {
						if (isUndefined(val)) {
							return this.el.attr(attr);
						}
						this.el.attr(attr, val);
						return this;
					},
					remove: function () {
						this.el.remove();
						return this;
					},
					addClass: function (klass) {
						this.el.addClass(klass);
						return this;
					},
					removeClass: function (klass) {
						this.el.removeClass(klass);
						return this;
					},
					each: function (callback) {
						return this.passthrough('each', callback);
					},
					click: function (callback) {
						return this.passthrough(_CLICK_, callback);
					},
					live: function (event, callback) {
						$engine(document).delegate(this.selector, event, callback);
						return this;
					},
					parent: function () {
						return simpleCart.$(this.el.parent());
					},
					find: function (selector) {
						return simpleCart.$(this.el.find(selector));
					},
					closest: function (selector) {
						return simpleCart.$(this.el.closest(selector));
					},
					tag: function () {
						return this.el[0].tagName;
					},
					descendants: function () {
						return simpleCart.$(this.el.find("*"));
					},


					create: function (selector) {
						this.el = $engine(selector);
					}
				}
			});
			simpleCart.ELEMENT._ = simpleCart.ELEMENT.prototype;

			// bind the DOM setup to the ready event
			simpleCart.ready(simpleCart.setupViewTool);

			// bind the input and output events
			simpleCart.ready(function () {
				simpleCart.bindOutlets({
					total: function () {
						return simpleCart.toCurrency(simpleCart.total());
					}
					, quantity: function () {
						return simpleCart.quantity();
					}
					, items: function (selector) {
						simpleCart.writeCart(selector);
					}
					, tax: function () {
						return simpleCart.toCurrency(simpleCart.tax());
					}
					, taxRate: function () {
						return simpleCart.taxRate().toFixed();
					}
					, shipping: function () {
						return simpleCart.toCurrency(simpleCart.shipping());
					}
					, grandTotal: function () {
						return simpleCart.toCurrency(simpleCart.grandTotal());
					}
				});
				simpleCart.bindInputs([
					{	  selector: 'checkout'
						, event: 'click'
						, callback: function () {
							simpleCart.checkout();
						}
					}
					, {	  selector: 'empty'
						, event: 'click'
						, callback: function () {
							simpleCart.empty();
						}
					}
					, {	  selector: 'increment'
						, event: 'click'
						, callback: function () {
							simpleCart.find(simpleCart.$(this).closest('.itemRow').attr('id').replace(/cartItem_/,'')).increment();//.split("_")[1] 
							simpleCart.update();
						}
					}
					, {	  selector: 'decrement'
						, event: 'click'
						, callback: function () {
							simpleCart.find(simpleCart.$(this).closest('.itemRow').attr('id').replace(/cartItem_/,'')).decrement();//.split("_")[1] 
							simpleCart.update();
						}
					}
					/* remove from cart */
					, {	  selector: 'remove'
						, event: 'click'
						, callback: function () {
							simpleCart.find(simpleCart.$(this).closest('.itemRow').attr('id').replace(/cartItem_/,'')).remove();//.split("_")[1] 
						}
					}

					/* cart inputs */
					, {	  selector: 'input'
						, event: 'change'
						, callback: function () {
							var $input = simpleCart.$(this),
								$parent = $input.parent(),
								classList = $parent.attr('class').split(" ");
							simpleCart.each(classList, function (klass) {
								if (klass.match(/item-.+/i)) {
									var field = klass.split("-")[1];
									simpleCart.find($parent.closest('.itemRow').attr('id').replace(/cartItem_/,'')).set(field,$input.val());//.split("_")[1] 
									simpleCart.update();
									return;
								}
							});
						}
					}

					/* here is our shelfItem add to cart button listener */
					, { selector: 'shelfItem .item_straight_add'
						, event: 'click'
						, callback: function () {
                                if (! location.hostname.match(/localhost/) && ! location.hostname.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) && ! location.hostname.match(/conekta-dev/)){
                                     if ( typeof mixpanel !== 'undefined' && company_config.company_id){
                                      if (simpleCart.items().length == 0){
                                          mixpanel.track("Add To Cart", {"company_id": company_config.company_id});
                                      }
                                    } 
                                }
							var $button = simpleCart.$(this),
								fields = {};

							$button.closest(".simpleCart_shelfItem").descendants().each(function (x,item) {
								var $item = simpleCart.$(item);

								// check to see if the class matches the item_[fieldname] pattern
								if ($item.attr("class") &&
									$item.attr("class").match(/item_.+/) &&
									!$item.attr('class').match(/item_straight_add/)) {

									// find the class name
									simpleCart.each($item.attr('class').split(' '), function (klass) {
										var attr,
											val,
											type;

										// get the value or text depending on the tagName
										if (klass.match(/item_.+/)) {
											attr = klass.split("_").slice(1).join('_');
											val = "";
											switch($item.tag().toLowerCase()) {
												case "input":
												case "textarea":
												case "select":
													type = $item.attr("type");
													if (!type || ((type.toLowerCase() === "checkbox" || type.toLowerCase() === "radio") && $item.attr("checked")) || type.toLowerCase() === "text") {
														val = $item.val();
													}				
													break;
												case "img":
													val = $item.attr('src');
													break;
												default:
													val = $item.text();
													break;
											}
                                                
											if (val !== null && val !== "") {
                                                if (typeof jQuery !== "undefined"){
                                                    val = $.trim(val);
                                                }
                                                fields[attr.toLowerCase()] = fields[attr.toLowerCase()] ? fields[attr.toLowerCase()] + ", " +  val : val;
											}
										}
									});
								}
							});

							// add the item
							simpleCart.add(fields);
						}
					}
				]);
			});


			/*******************************************************************
			 *	DOM READY
			 *******************************************************************/
			// Cleanup functions for the document ready method
			// used from jQuery
			/*global DOMContentLoaded */
			if (document.addEventListener) {
				window.DOMContentLoaded = function () {
					document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
					simpleCart.init();
				};

			} else if (document.attachEvent) {
				window.DOMContentLoaded = function () {
					// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
					if (document.readyState === "complete") {
						document.detachEvent("onreadystatechange", DOMContentLoaded);
						simpleCart.init();
					}
				};
			}
			// The DOM ready check for Internet Explorer
			// used from jQuery
			function doScrollCheck() {
				if (simpleCart.isReady) {
					return;
				}

				try {
					// If IE is used, use the trick by Diego Perini
					// http://javascript.nwbox.com/IEContentLoaded/
					document.documentElement.doScroll("left");
				} catch (e) {
					setTimeout(doScrollCheck, 1);
					return;
				}

				// and execute any waiting functions
				simpleCart.init();
			}
			
			// bind ready event used from jquery
			function sc_BindReady () {

				// Catch cases where $(document).ready() is called after the
				// browser event has already occurred.
				if (document.readyState === "complete") {
					// Handle it asynchronously to allow scripts the opportunity to delay ready
					return setTimeout(simpleCart.init, 1);
				}

				// Mozilla, Opera and webkit nightlies currently support this event
				if (document.addEventListener) {
					// Use the handy event callback
					document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

					// A fallback to window.onload, that will always work
					window.addEventListener("load", simpleCart.init, false);

				// If IE event model is used
				} else if (document.attachEvent) {
					// ensure firing before onload,
					// maybe late but safe also for iframes
					document.attachEvent("onreadystatechange", DOMContentLoaded);

					// A fallback to window.onload, that will always work
					window.attachEvent("onload", simpleCart.init);

					// If IE and not a frame
					// continually check to see if the document is ready
					var toplevel = false;

					try {
						toplevel = window.frameElement === null;
					} catch (e) {}

					if (document.documentElement.doScroll && toplevel) {
						doScrollCheck();
					}
				}
			}

			// bind the ready event
			sc_BindReady();

			return simpleCart;
		};

    if (typeof company_config != 'undefined' && typeof company_config.company_id != 'undefined'){
        space = 'simpleCart_' + company_config.company_id;
    }else{
        space = 'simpleCart';
    }
    window.simpleCart = generateSimpleCart(space);


}(window, document));

/************ JSON *************/
var JSON;JSON||(JSON={});
(function () {function k(a) {return a<10?"0"+a:a}function o(a) {p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function (a) {var c=r[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function l(a,j) {var c,d,h,m,g=e,f,b=j[a];b&&typeof b==="object"&&typeof b.toJSON==="function"&&(b=b.toJSON(a));typeof i==="function"&&(b=i.call(j,a,b));switch(typeof b) {case "string":return o(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if (!b)return"null";
e += n;f=[];if (Object.prototype.toString.apply(b)==="[object Array]") {m=b.length;for (c=0;c<m;c += 1)f[c]=l(c,b)||"null";h=f.length===0?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if (i&&typeof i==="object") {m=i.length;for (c=0;c<m;c += 1)typeof i[c]==="string"&&(d=i[c],(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h))}else for (d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h);h=f.length===0?"{}":e?"{\n"+e+f.join(",\n"+e)+"\n"+g+"}":"{"+f.join(",")+
"}";e=g;return h}}if (typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function () {return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+k(this.getUTCMonth()+1)+"-"+k(this.getUTCDate())+"T"+k(this.getUTCHours())+":"+k(this.getUTCMinutes())+":"+k(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function () {return this.valueOf()};var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if (typeof JSON.stringify!=="function")JSON.stringify=function (a,j,c) {var d;n=e="";if (typeof c==="number")for (d=0;d<c;d += 1)n += " ";else typeof c==="string"&&(n=c);if ((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return l("",
{"":a})};if (typeof JSON.parse!=="function")JSON.parse=function (a,e) {function c(a,d) {var g,f,b=a[d];if (b&&typeof b==="object")for (g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),f!==void 0?b[g]=f:delete b[g]);return e.call(a,d,b)}var d,a=String(a);q.lastIndex=0;q.test(a)&&(a=a.replace(q,function (a) {return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),typeof e==="function"?c({"":d},""):d;throw new SyntaxError("JSON.parse");}})();


/************ HTML5 Local Storage Support *************/
(function () {if (!this.localStorage)if (this.globalStorage)try {this.localStorage=this.globalStorage}catch(e) {}else{var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);if (a.addBehavior) {a.addBehavior("#default#userdata");var d=this.localStorage={length:0,setItem:function (b,d) {a.load("localStorage");b=c(b);a.getAttribute(b)||this.length++;a.setAttribute(b,d);a.save("localStorage")},getItem:function (b) {a.load("localStorage");b=c(b);return a.getAttribute(b)},
removeItem:function (b) {a.load("localStorage");b=c(b);a.removeAttribute(b);a.save("localStorage");this.length=0},clear:function () {a.load("localStorage");for (var b=0;attr=a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);a.save("localStorage");this.length=0},key:function (b) {a.load("localStorage");return a.XMLDocument.documentElement.attributes[b]}},c=function (a) {return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
"-")};a.load("localStorage");d.length=a.XMLDocument.documentElement.attributes.length}}})();

(function() {
  var accepted_cards, card_types, get_card_type, is_valid_length, is_valid_luhn, new_sync, original_sync,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  card_types = [
    {
      name: 'amex',
      pattern: /^3[47]/,
      valid_length: [15]
    }, {
      name: 'diners_club_carte_blanche',
      pattern: /^30[0-5]/,
      valid_length: [14]
    }, {
      name: 'diners_club_international',
      pattern: /^36/,
      valid_length: [14]
    }, {
      name: 'jcb',
      pattern: /^35(2[89]|[3-8][0-9])/,
      valid_length: [16]
    }, {
      name: 'laser',
      pattern: /^(6304|670[69]|6771)/,
      valid_length: [16, 17, 18, 19]
    }, {
      name: 'visa_electron',
      pattern: /^(4026|417500|4508|4844|491(3|7))/,
      valid_length: [16]
    }, {
      name: 'visa',
      pattern: /^4/,
      valid_length: [16]
    }, {
      name: 'mastercard',
      pattern: /^5[1-5]/,
      valid_length: [16]
    }, {
      name: 'maestro',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
    }, {
      name: 'discover',
      pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
      valid_length: [16]
    }
  ];

  is_valid_luhn = function(number) {
    var digit, n, sum, _i, _len, _ref;
    sum = 0;
    _ref = number.split('').reverse();
    for (n = _i = 0, _len = _ref.length; _i < _len; n = ++_i) {
      digit = _ref[n];
      digit = +digit;
      if (n % 2) {
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += digit - 9;
        }
      } else {
        sum += digit;
      }
    }
    return sum % 10 === 0;
  };

  is_valid_length = function(number, card_type) {
    var _ref;
    return _ref = number.length, __indexOf.call(card_type.valid_length, _ref) >= 0;
  };

  accepted_cards = ['visa', 'mastercard'];

  get_card_type = function(number) {
    var card, card_type, _i, _len, _ref;
    _ref = (function() {
      var _j, _len, _ref, _results;
      _results = [];
      for (_j = 0, _len = card_types.length; _j < _len; _j++) {
        card = card_types[_j];
        if (_ref = card.name, __indexOf.call(accepted_cards, _ref) >= 0) {
          _results.push(card);
        }
      }
      return _results;
    })();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card_type = _ref[_i];
      if (number.match(card_type.pattern)) {
        return card_type;
      }
    }
    return null;
  };

  window.conekta = {
    _helpers: {},
    _models: {},
    _store: null,
    _accessors: {
      getCompany: function() {
        var company;
        company = conekta._store.get('company');
        if (!company.id) {
          company.id = 'temp';
        }
        return company;
      },
      getProducts: function() {
        return conekta._store.get('products');
      },
      setProducts: function(products) {
        return conekta._store.set('products', products);
      }
    },
    checkout: {},
    lib: {
      getCreditCardBrand: function(number) {
        var brand;
        number = number + "";
        number = number.replace(/[ -]/g, '');
        brand = get_card_type(number);
        if (brand && brand.name) {
          return brand.name;
        }
        return null;
      },
      validateCreditCard: function(number) {
        var card_type, length_valid, luhn_valid;
        number = number + "";
        number = number.replace(/[ -]/g, '');
        card_type = get_card_type(number);
        luhn_valid = false;
        length_valid = false;
        if (card_type != null) {
          luhn_valid = is_valid_luhn(number);
          length_valid = is_valid_length(number, card_type);
        }
        return {
          card_type: card_type,
          luhn_valid: luhn_valid,
          length_valid: length_valid
        };
      }
    },
    display: {
      getProducts: function(query_options, after_fetch_callback) {
        var company, params, products;
        company = conekta._accessors.getCompany();
        params = {};
        params['query'] = _.extend({
          visible: true,
          company_id: company.get('id')
        }, query_options);
        products = conekta._store.get('products');
        if (products) {
          products.fetch({
            data: params,
            dataType: 'json',
            remote: true,
            local_override: true,
            success: function(collection, resp) {
              return after_fetch_callback(collection.map(function(temp_product) {
                return temp_product.getApi();
              }));
            }
          });
        } else {
          products = new conekta._models.ProductsCollection({
            data: product_fetch_parameters,
            dataType: 'json',
            remote: true,
            local_override: true,
            success: function(collection, resp) {
              return after_fetch_callback(collection.toJSON());
            }
          });
          conekta._store.set('products', products);
        }
      }
    },
    setToken: function(token) {
      var company_collection;
      if (this._store) {
        this._store.set('token', token);
        company_collection = new conekta._models.CompanyCollection();
        company_collection.fetch({
          token: token,
          success: function(collection) {
            var model;
            model = collection.at(0);
            conekta._store.set('company', model);
            return conekta.checkout._model.set('company_id', model.id);
          }
        });
      }
    },
    getToken: function() {
      if (this._store) {
        return this._store.get('token');
      }
    }
  };

  original_sync = Backbone.sync;

  new_sync = function(model, method, options) {
    var new_options;
    new_options = options || {};
    if (new_options['headers']) {
      if (conekta.getToken()) {
        new_options['headers']['Authorization'] = 'Token token="' + conekta.getToken() + '"';
      }
      new_options['headers']['Accept'] = 'application/vnd.example.v1';
    } else {
      if (typeof company_config === 'undefined') {
        new_options['headers'] = {
          'Accept': 'application/vnd.example.v1'
        };
      } else {
        new_options['headers'] = {};
      }
      if (conekta.getToken()) {
        new_options['headers']['Authorization'] = 'Token token="' + conekta.getToken() + '"';
      }
    }
    return original_sync(model, method, new_options);
  };

  Backbone.sync = new_sync;

}).call(this);


/*
OrderItem Models, Collection and Views and for the cart
*/


(function() {

  conekta._models.Item = Backbone.RelationalModel.extend({
    defaults: {
      quantity: 0,
      total: 0
    },
    tax_rate: function() {
      var company;
      company = this.get('parent').getCompany();
      if (typeof this.get('tax_rate') === 'number') {
        return this.get('tax_rate');
      } else {
        return company.get('tax_rate');
      }
    },
    _discount_price: function() {
      var discount_price, discounted_price, discounts, i, price, quantity, volume_discounted_price;
      price = this.get('price');
      quantity = this.get('quantity');
      volume_discounted_price = null;
      discounted_price = null;
      if (this.get('discount')) {
        discounted_price = price * (1.0 - parseFloat(this.get('discount')) / 100.0);
      }
      if (this.get('volume_discounts') && this.get('volume_discounts').length > 0) {
        discount_price = price;
        discounts = this.get('volume_discounts');
        i = 0;
        while (i < discounts.length && quantity >= discounts[i]['quantity']) {
          volume_discounted_price = price * (100.0 - discounts[i]['discount']) / 100.0;
          i = i + 1;
        }
      }
      if (this.get('preventa_amount_outstanding')) {
        discounted_price = this.get('preventa_amount_outstanding');
      }
      if (this.get('preventa')) {
        discounted_price = price * (parseFloat(this.get('preventa')) / 100.0);
      }
      if (volume_discounted_price !== null) {
        return Math.round(volume_discounted_price * 100.0) / 100.0;
      } else if (discounted_price !== null) {
        return Math.round(discounted_price * 100.0) / 100.0;
      } else {
        return Math.round(price * 100.0) / 100.0;
      }
    },
    unit_price_with_tax: function() {
      var company, tax_included_in_price, tax_rate;
      company = this.get('parent').getCompany();
      tax_included_in_price = company.get('tax_included_in_price');
      if (tax_included_in_price) {
        return this._discount_price();
      } else {
        tax_rate = 1 + this.tax_rate();
        return Math.round(this._discount_price() * tax_rate * 100.0) / 100.0;
      }
    },
    unit_price_without_tax: function() {
      var company, tax_included_in_price, tax_rate;
      company = this.get('parent').getCompany();
      tax_included_in_price = company.get('tax_included_in_price');
      if (tax_included_in_price) {
        tax_rate = 1 + this.tax_rate();
        return Math.round(this._discount_price() * 100.0 / tax_rate) / 100.0;
      } else {
        return this._discount_price();
      }
    },
    unit_price: function() {
      var company;
      company = this.get('parent').getCompany();
      if (company.get('show_tax_in_price')) {
        return this.unit_price_with_tax();
      } else {
        return this.unit_price_without_tax();
      }
    },
    total_price_with_tax: function() {
      return this.unit_price_with_tax() * this.get('quantity');
    },
    total_price_without_tax: function() {
      return this.unit_price_without_tax() * this.get('quantity');
    },
    total_price: function() {
      return this.unit_price() * this.get('quantity');
    },
    change_product_option_id: function(product_option_id) {
      var product, product_option;
      if (conekta._store) {
        product = Backbone.Relational.store.find(conekta._models.Product, {
          id: this.get('product_id')
        });
        if (product_option_id) {
          product_option = Backbone.Relational.store.find(conekta._models.ProductOption, {
            id: product_option_id
          });
        }
        if (product_option && typeof product_option.id !== 'undefined') {
          if (typeof product_option.get('inventory') !== 'undefined' && product_option.get('inventory') !== null) {
            if (product_option.get('inventory') < this.get('quantity')) {
              this.set('quantity', product_option.get('inventory'));
            }
            if (product_option.get('inventory') < 1) {
              this.set('soldout', true);
            } else {
              this.set('soldout', false);
            }
          } else {
            this.set('soldout', false);
          }
          return this.set({
            'product_option_id': product_option.get('id'),
            'name': product.get('name'),
            'product_option_value': product_option.get('value'),
            'sku': product.get('sku') + (product_option.get('sku') || ""),
            'price': product.get('price') + (product_option.get('price') || 0),
            'discount': product.get('discount'),
            'volume_discounts': product.get('volume_discounts') || [],
            'weight': product.get('weight') + (product_option.get('weight') || 0),
            'image': product.get('image'),
            'length': product.get('length') + (product_option.get('length') || 0),
            'width': product.get('width') + (product_option.get('width') || 0),
            'height': product.get('height') + (product_option.get('height') || 0),
            'inventory': product_option.get('inventory'),
            'product_type': product.get('product_type'),
            'tax_rate': product.get('tax_rate')
          }, {
            error: function(model, resp) {
              var error_message;
              error_message = "";
              _.each(resp, function(value, key) {
                if (error_message === "") {
                  return error_message = value;
                } else {
                  return error_message = error_message + '\n' + value;
                }
              });
              return alert(error_message);
            }
          });
        } else if (product) {
          if (typeof product.get('inventory') !== 'undefined' && product.get('inventory') !== null) {
            if (product.get('inventory') < this.get('quantity')) {
              this.set('quantity', product.get('inventory'));
            }
            if (product.get('inventory') < 1) {
              this.set('soldout', true);
            } else {
              this.set('soldout', false);
            }
          } else {
            this.set('soldout', false);
          }
          return this.set({
            'product_option_id': null,
            'name': product.get('name'),
            'product_option_value': "",
            'sku': product.get('sku'),
            'price': product.get('price'),
            'discount': product.get('discount'),
            'volume_discounts': product.get('volume_discounts') || [],
            'weight': product.get('weight'),
            'image': product.get('image'),
            'length': product.get('length'),
            'width': product.get('width'),
            'height': product.get('height'),
            'inventory': product.get('inventory'),
            'product_type': product.get('product_type'),
            'tax_rate': product.get('tax_rate')
          }, {
            error: function(model, resp) {
              var error_message;
              error_message = "";
              _.each(resp, function(value, key) {
                if (error_message === "") {
                  return error_message = value;
                } else {
                  return error_message = error_message + '\n' + value;
                }
              });
              return alert(error_message);
            }
          });
        }
      }
    },
    recalculate_total: function() {
      if (conekta._store && this.get('parent')) {
        /*
        quantity = @get('quantity') || 0
        price = @get('price') || 0
        total = quantity*price
        if @get('volume_discounts') and @get('volume_discounts').length > 0
          discount_price = price
          discounts = @get('volume_discounts')
          i = 0 
          while i < discounts.length and quantity >= discounts[i]['quantity']
            discount_price = price * (100.0-discounts[i]['discount'])/100.0
            i = i + 1
          total = quantity * discount_price
        
        @set('total',total)
        */

        this.set({
          unit_price: this.unit_price(),
          total_price: this.total_price()
        });
      }
    },
    validate: function(attr) {
      var error;
      error = null;
      if (typeof attr.inventory !== 'undefined' && attr.inventory !== null) {
        if (attr.inventory === 0 && attr.quantity > 0) {
          error = $('#error-out_of_inventory').html();
        } else if (attr.quantity > attr.inventory) {
          error = $('#error-insufficient_inventory').html();
        } else if (isNaN(Number(attr.quantity))) {
          error = "La cantidad no es valida.";
        }
      }
      if (error === null) {

      } else {
        return {
          quantity: error
        };
      }
    }
  });

  conekta._models.OrderItem = conekta._models.Item.extend({
    modelName: 'order_item'
  });

  conekta._models.SubscriptionItem = conekta._models.Item.extend({
    modelName: 'subscription_item'
  });

  conekta._models.SubscriptionItemCollection = Backbone.Collection.extend({
    model: conekta._models.SubscriptionItem,
    modelName: 'subscription_item'
  });

  conekta._models.OrderItemCollection = Backbone.Collection.extend({
    model: conekta._models.OrderItem,
    modelName: 'order_item'
  });

}).call(this);

(function() {

  conekta._models.ShippingOption = Backbone.RelationalModel.extend({
    modelName: 'shipping_option',
    initialize: function() {
      return this.on('change', function() {
        if (!this.isNew()) {
          return this.save({}, {
            remote: false
          });
        }
      });
    }
  });

  conekta._models.ShippingOptionCollection = Backbone.Collection.extend({
    modelName: 'shipping_option',
    urlRoot: '/shipping_options',
    model: conekta._models.ShippingOption
  });

}).call(this);

(function() {

  conekta._models.PaymentMethod = Backbone.RelationalModel.extend({
    modelName: 'payment_option',
    initialize: function() {
      return this.on('change', function() {
        if (!this.isNew()) {
          return this.save({}, {
            remote: false,
            local_override: true
          });
        }
      });
    }
  });

  conekta._models.PaymentMethodCollection = Backbone.Collection.extend({
    modelName: 'payment_option',
    urlRoot: 'payment_options',
    model: conekta._models.PaymentMethod
  });

}).call(this);


/*
Company Model, Collections and Views for the cart
*/


(function() {

  conekta._models.Company = Backbone.RelationalModel.extend({
    urlRoot: '/companies',
    modelName: 'company'
  });

  conekta._models.CompanyCollection = Backbone.Collection.extend({
    urlRoot: '/companies',
    modelName: 'company',
    model: conekta._models.Company
  });

}).call(this);


/*
ProductOption Models, Collection Base
*/


(function() {

  conekta._models.ProductOption = Backbone.RelationalModel.extend({
    modelName: 'product_option',
    defaults: {
      name: '',
      value: '',
      price: 0,
      inventory: null,
      weight: 0,
      length: 0,
      height: 0
    }
  });

  conekta._models.ProductOptionCollection = Backbone.Collection.extend({
    model: conekta._models.ProductOption
  });

}).call(this);


/*
Order Model, Collections and Views for the cart
*/


(function() {

  conekta._models.Product = Backbone.RelationalModel.extend({
    urlRoot: '/products',
    modelName: 'product',
    relations: [
      {
        type: Backbone.HasMany,
        key: 'product_options',
        relatedModel: 'conekta._models.ProductOption',
        collectionType: 'conekta._models.ProductOptionCollection',
        reverseRelation: {
          key: 'product',
          includeInJSON: 'id'
        }
      }
    ]
  });

  conekta._models.ProductCollection = Backbone.Collection.extend({
    model: conekta._models.Product,
    modelName: 'product',
    urlRoot: '/products'
  });

}).call(this);


/*
Shipment Models and Collections
*/


(function() {

  conekta._models.Shipment = Backbone.RelationalModel.extend({
    modelName: 'shipment'
  });

  conekta._models.ShipmentCollection = Backbone.Collection.extend({
    model: conekta._models.Shipment
  });

  conekta._models.OrderShipment = conekta._models.Shipment.extend({
    modelName: 'order_shipment',
    urlRoot: 'order_shipments',
    relations: [
      {
        type: Backbone.HasOne,
        key: 'address',
        relatedModel: 'conekta._models.OrderShipmentAddress',
        collectionType: 'conekta._models.OrderShipmentAddressCollection',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent'
        }
      }
    ]
  });

  conekta._models.OrderShipmentCollection = conekta._models.ShipmentCollection.extend({
    model: conekta._models.OrderShipment
  });

  conekta._models.SubscriptionShipment = conekta._models.Shipment.extend({
    modelName: 'subscription_shipment',
    relations: [
      {
        type: Backbone.HasOne,
        key: 'address',
        relatedModel: 'conekta._models.SubscriptionShipmentAddress',
        collectionType: 'conekta._models.SubscriptionShipmentAddressCollection',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent'
        }
      }, {
        type: Backbone.HasOne,
        key: 'period',
        relatedModel: 'conekta._models.ShipmentPeriod',
        collectionType: 'conekta._models.ShipmentPeriodCollection',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent'
        }
      }
    ]
  });

  conekta._models.SubscriptionShipmentCollection = conekta._models.ShipmentCollection.extend({
    model: conekta._models.SubscriptionShipment
  });

}).call(this);


/*
OrderItem Models, Collection and Views and for the cart
*/


(function() {

  conekta._models.ShippingAddress = Backbone.RelationalModel.extend({
    modelName: 'shipping_address',
    passwordRequired: function(value, attr, computedState) {
      var login_attributes, order, required, signed_in, user_session;
      order = this.get('parent').get('parent');
      if (order) {
        required = order.getCompany().get('prompt_for_signup');
        signed_in = order.get('purchaser_user_id');
        if (required && !signed_in) {
          if (!value) {
            return "Una contraseña está requierida.";
          } else {
            if (user && !user.id) {
              user_session = user.get('session');
              login_attributes = {
                name: computedState['name'],
                email: computedState['email'],
                password: value
              };
              user_session.login(login_attributes);
              user.unset('password');
            }
          }
        } else {

        }
      } else {

      }
    },
    validation: {
      email: {
        required: true,
        pattern: 'email',
        msg: "El correo electrónico de entrega no es valido."
      },
      password: {
        fn: 'passwordRequired'
      },
      name: [
        {
          minLength: 2,
          msg: "El destinario no es valido."
        }, {
          maxLength: 30,
          msg: "El destinario tiene que ser menos a 30 caracteres."
        }
      ],
      colonia: [
        {
          minLength: 2,
          msg: "La colonia de entrega no es valido."
        }, {
          maxLength: 30,
          msg: "La colonia de entrega tiene que ser menos a 30 caracteres."
        }
      ],
      city: {
        minLength: 2,
        msg: "La ciudad de entrega no es valido."
      },
      state: {
        minLength: 2,
        msg: "El Estado de entrega no es valido."
      },
      country: {
        minLength: 2,
        msg: "El país de entrega no es valido."
      },
      postal_code: {
        minLength: 5,
        msg: "El código postal de entrega no es valido."
      },
      line_1: [
        {
          minLength: 2,
          msg: "La calle de entrega no es valido."
        }, {
          maxLength: 30,
          msg: "La calle de entrega tiene que ser menos a 30 caracteres."
        }
      ],
      line_2: {
        maxLength: 30,
        msg: "El calle de entrega tiene que ser menos a 30 caracteres."
      },
      phone: {
        minLength: 8,
        pattern: /^[\(\)\-\d ]+$/,
        msg: "El número de teléfono no es valido."
      }
    }
  });

  conekta._models.ShippingAddressCollection = Backbone.Collection.extend({
    model: conekta._models.ShipmentAddress
  });

  conekta._models.UserShippingAddress = conekta._models.ShippingAddress.extend({
    modelName: 'user_shipping_address',
    urlRoot: 'user_shipping_addresses'
  });

  conekta._models.UserShippingAddressCollection = conekta._models.ShippingAddressCollection.extend({
    model: conekta._models.UserShippingAddress
  });

  conekta._models.OrderShipmentAddress = conekta._models.ShippingAddress.extend({
    modelName: 'order_shipment_address'
  });

  conekta._models.OrderShipmentAddressCollection = conekta._models.ShippingAddressCollection.extend({
    model: conekta._models.OrderShipmentAddress
  });

  conekta._models.SubscriptionShipmentAddress = conekta._models.ShippingAddress.extend({
    modelName: 'subscription_shipment_address'
  });

  conekta._models.SubscriptionShipmentAddressCollection = conekta._models.ShippingAddressCollection.extend({
    model: conekta._models.SubscriptionShipmentAddress
  });

}).call(this);


/*
Payment Models and Collections
*/


(function() {

  conekta._models.Payment = Backbone.RelationalModel.extend({
    modelName: 'payment'
  });

  conekta._models.PaymentCollection = Backbone.Collection.extend({
    model: conekta._models.Payment
  });

  conekta._models.OrderPayment = conekta._models.Payment.extend({
    modelName: 'order_payment',
    relations: [
      {
        type: Backbone.HasOne,
        key: 'billing_info',
        relatedModel: 'conekta._models.OrderBillingInfo',
        collectionType: 'conekta._models.OrderBillingInfoCollection',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent',
          includeInJSON: false
        }
      }
    ]
  });

  conekta._models.OrderPaymentCollection = conekta._models.PaymentCollection.extend({
    model: conekta._models.OrderPayment
  });

  conekta._models.SubscriptionPayment = conekta._models.Payment.extend({
    modelName: 'subscription_payment',
    relations: [
      {
        type: Backbone.HasOne,
        key: 'billing_info',
        relatedModel: 'conekta._models.SubscriptionBillingInfo',
        collectionType: 'conekta._models.SubscriptionBillingInfoCollection',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent',
          includeInJSON: false
        }
      }, {
        type: Backbone.HasOne,
        key: 'period',
        relatedModel: 'conekta._models.PaymentPeriod',
        collectionType: 'conekta._models.PaymentPeriodCollection',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent',
          includeInJSON: false
        }
      }
    ]
  });

  conekta._models.SubscriptionPaymentCollection = conekta._models.PaymentCollection.extend({
    model: conekta._models.SubscriptionPayment
  });

}).call(this);


/*
OrderItem Models, Collection and Views and for the cart
*/


(function() {

  conekta._models.Period = Backbone.RelationalModel.extend({
    modelName: 'period'
  });

  conekta._models.PeriodCollection = Backbone.Collection.extend({
    model: conekta._models.Period
  });

  conekta._models.ShipmentPeriod = conekta._models.Period.extend({
    modelName: 'shipment_period'
  });

  conekta._models.ShipmentPeriodCollection = conekta._models.PeriodCollection.extend({
    model: conekta._models.OrderPeriod
  });

  conekta._models.PaymentPeriod = conekta._models.Period.extend({
    modelName: 'payment_period'
  });

  conekta._models.PaymentPeriodCollection = conekta._models.PeriodCollection.extend({
    model: conekta._models.SubscriptionPeriod
  });

}).call(this);


/*
OrderItem Models, Collection and Views and for the cart
*/


(function() {

  conekta._models.BillingInfo = Backbone.RelationalModel.extend({
    modelName: 'billing_info',
    validation: {
      email: {
        pattern: 'email',
        msg: "El correo electrónico de facturación no es valido."
      },
      rfc: {
        minLength: 2,
        msg: "El RFC no es valido."
      },
      colonia: {
        minLength: 2,
        msg: "La Colonia de facturación ne es valido."
      },
      city: {
        minLength: 2,
        msg: "La ciudad de facturación no es valido."
      },
      state: {
        minLength: 2,
        msg: "El Estado de facturación no es valido."
      },
      postal_code: {
        minLength: 5,
        msg: "El código postal de facturación no es valido."
      },
      street: {
        minLength: 2,
        msg: "La calle de facturación no es valido."
      },
      external_number: {
        minLength: 1,
        msg: "El número exterior de facturación no es valido."
      },
      phone: {
        minLength: 8,
        pattern: /^[\(\)\-\d ]+$/,
        msg: "El número de teléfono no es valido."
      }
    }
  });

  conekta._models.BillingInfoCollection = Backbone.Collection.extend({
    model: conekta._models.BillingInfo
  });

  conekta._models.UserBillingInfo = conekta._models.BillingInfo.extend({
    modelName: 'user_billing_info',
    urlRoot: 'user_billing_infos'
  });

  conekta._models.UserBillingInfoCollection = conekta._models.BillingInfoCollection.extend({
    model: conekta._models.UserBillingInfo,
    urlRoot: 'user_billing_infos'
  });

  conekta._models.OrderBillingInfo = conekta._models.BillingInfo.extend({
    modelName: 'order_billing_info'
  });

  conekta._models.OrderBillingInfoCollection = conekta._models.BillingInfoCollection.extend({
    model: conekta._models.OrderBillingInfo
  });

  conekta._models.SubscriptionBillingInfo = conekta._models.BillingInfo.extend({
    modelName: 'subscription_billing_info'
  });

  conekta._models.SubscriptionBillingInfoCollection = conekta._models.BillingInfoCollection.extend({
    model: conekta._models.SubscriptionBillingInfo
  });

}).call(this);


/*
User Model, Collections Base
*/


(function() {

  conekta._models.User = Backbone.RelationalModel.extend({
    modelName: 'user',
    urlBase: function() {
      var base;
      base = '';
      if (typeof company_json === 'undefined' && typeof user_json === "undefined") {
        base = 'https://api.conekta.mx';
      } else {
        base = '';
      }
      return base;
    },
    urlRoot: '/users',
    relations: [
      {
        type: Backbone.HasMany,
        key: 'billing_infos',
        relatedModel: 'conekta._models.UserBillingInfo',
        collectionType: 'conekta._models.UserBillingInfoCollection',
        reverseRelations: {
          key: 'user',
          includeInJSON: 'id'
        }
      }, {
        type: Backbone.HasMany,
        key: 'shipping_addresses',
        relatedModel: 'conekta._models.UserShippingAddress',
        collectionType: 'conekta._models.UserShippingAddressCollection',
        reverseRelations: {
          key: 'user',
          includeInJSON: 'id'
        }
      }, {
        type: Backbone.HasOne,
        key: 'session',
        relatedModel: 'conekta._models.UserSession',
        collectionType: 'conekta._models.UserSessionCollection',
        reverseRelation: {
          key: 'user',
          type: Backbone.HasOne,
          includeInJSON: false
        }
      }
    ],
    login: function(user_session) {
      this.set({
        id: user_session.get('user_id')
      }, {
        silent: true
      });
      return this.fetch({
        remote: true,
        success: function(model) {
          return model.signin_callback();
        }
      });
    },
    logout: function() {
      var my_session;
      my_session = this.get('session');
      this.unset('email');
      this.unset('screen_name');
      this.unset('shipping_addresses');
      this.unset('billing_infos');
      this.destroy({
        remote: false,
        local_override: true
      });
      this.unset('id', {
        silent: true
      });
      return this.set('session', my_session, {
        silent: true
      });
    },
    signin_callback: function() {}
  });

  conekta._models.UserCollection = Backbone.Collection.extend({
    model: conekta._models.User,
    modelName: 'user'
  });

  if (typeof company_json === 'undefined' && typeof user_json === "undefined") {
    _.extend(conekta._models.User.prototype, {
      urlRoot: '/customers'
    });
    _.extend(conekta._models.UserCollection.prototype, {
      urlRoot: '/customers'
    });
  }

}).call(this);


/*
UserSession Model, Collections Base
*/


(function() {

  conekta._models.UserSession = Backbone.RelationalModel.extend({
    modelName: 'user_session',
    urlBase: function() {
      var base;
      base = '';
      if (typeof company_json === 'undefined' && typeof user_json === "undefined") {
        base = 'https://api.conekta.mx';
      }
      return base;
    },
    urlRoot: '/user_sessions',
    validation: {
      email: {
        pattern: 'email',
        msg: "El correo electrónico no es valido."
      },
      password: {
        minLength: 1,
        msg: "La contraseña no es valido."
      },
      name: {
        minLength: 1,
        msg: "El nombre del usuario no es valido."
      }
    },
    logout_callback: function() {},
    login_callback: function() {},
    initialize: function(attributes, options) {
      this.on('change', function() {
        if (this.get('id')) {
          this.save({}, {
            remote: false,
            local_override: true
          });
        }
      });
      if (options['login_callback']) {
        this.login_callback = options['login_callback'];
      }
      if (options['logout_callback']) {
        return this.logout_callback = options['logout_callback'];
      }
    },
    logout: function(user_session) {
      var my_user, self;
      if (this.get('status') === 'signed_in') {
        self = this;
        my_user = this.get('user');
        return this.destroy({
          success: function(model, data) {
            self.unset('perishable_token', {
              silent: true
            });
            self.unset('email', {
              silent: true
            });
            self.unset('user_id', {
              silent: true
            });
            self.set('status', 'signed_out');
            self.unset('id', {
              silent: true
            });
            self.set('user', my_user);
            self.get('user').logout();
            model.logout_callback();
          },
          error: function(model, data) {}
        });
      }
    },
    login: function(credentials, options) {
      options = options || {};
      this.save(credentials, {
        success: function(model, response) {
          model.set('status', 'signed_in');
          if (options.success) {
            options.success(model, null, null);
          }
          model.get('user').login(model);
          model.login_callback();
          if (conekta.checkout) {
            conekta.checkout._model.set('purchaser_user_id', model.get('user_id'));
          }
        },
        error: function(model, response) {
          if (options.error) {
            options.error();
          }
        }
      });
      this.unset('password', {
        silent: true
      });
    },
    request_password_reset: function(options) {
      return $.ajax({
        data: options,
        dataType: 'json',
        url: '/consumer_admin/send_password_reset',
        success: function(data, textStatus, jqXHR) {
          return alert('Reciberas un correo para reiniciar tu contraseña.');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          return alert(textStatus);
        }
      });
    },
    defaults: {
      status: 'signed_in'
    }
  });

  conekta._models.UserSessionCollection = Backbone.Collection.extend({
    model: conekta._models.UserSession,
    modelName: 'user_sessions',
    urlRoot: '/user_sessions'
  });

  if (typeof company_json === 'undefined' && typeof user_json === "undefined") {
    _.extend(conekta._models.UserSession.prototype, {
      urlRoot: '/customer_sessions'
    });
    _.extend(conekta._models.UserSessionCollection.prototype, {
      urlRoot: '/customer_sessions'
    });
  }

}).call(this);


/*
OrderCustomField Models, Collection and Views and for the cart
*/


(function() {

  conekta._models.CustomField = Backbone.RelationalModel.extend({
    modelName: 'custom_field'
  });

  conekta._models.OrderCustomField = conekta._models.CustomField.extend({
    modelName: 'custom_field'
  });

  conekta._models.SubscriptionCustomField = conekta._models.CustomField.extend({
    modelName: 'custom_field'
  });

  conekta._models.SubscriptionCustomFieldCollection = Backbone.Collection.extend({
    model: conekta._models.SubscriptionCustomField
  });

  conekta._models.OrderCustomFieldCollection = Backbone.Collection.extend({
    model: conekta._models.OrderCustomField
  });

}).call(this);


/*
Order Model, Collections and Views for the cart
*/


(function() {

  conekta._models.Order = Backbone.RelationalModel.extend({
    urlRoot: '/orders',
    modelName: 'order',
    relations: [
      {
        type: Backbone.HasMany,
        key: 'shipping_options',
        relatedModel: 'conekta._models.ShippingOption',
        collectionType: 'conekta._models.ShippingOptionCollection',
        includeInJSON: false,
        reverseRelation: {
          key: 'parent',
          type: Backbone.HasOne,
          includeInJSON: false
        }
      }, {
        type: Backbone.HasMany,
        key: 'items',
        relatedModel: 'conekta._models.OrderItem',
        collectionType: 'conekta._models.OrderItemCollection',
        reverseRelation: {
          key: 'parent',
          type: Backbone.HasOne,
          includeInJSON: false
        }
      }, {
        type: Backbone.HasMany,
        key: 'custom_fields',
        relatedModel: 'conekta._models.OrderCustomField',
        collectionType: 'conekta._models.OrderCustomFieldCollection',
        reverseRelation: {
          key: 'parent',
          type: Backbone.HasOne,
          includeInJSON: false
        }
      }, {
        type: Backbone.HasOne,
        key: 'shipment',
        relatedModel: 'conekta._models.OrderShipment',
        collectionType: 'conekta._models.OrderShipment',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent'
        }
      }, {
        type: Backbone.HasOne,
        key: 'payment',
        relatedModel: 'conekta._models.OrderPayment',
        collectionType: 'conekta._models.OrderPayment',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent',
          includeInJSON: false
        }
      }
    ]
  });

  conekta._models.OrderCollection = Backbone.Collection.extend({
    model: conekta._models.Order,
    modelName: 'order'
  });

}).call(this);


/*
Subscription Model, Collections and Views for the cart
*/


(function() {

  conekta._models.Subscription = Backbone.RelationalModel.extend({
    urlRoot: '/subscriptions',
    modelName: 'subscription',
    initialize: function() {
      return this.on('error', this.error, this);
    },
    relations: [
      {
        type: Backbone.HasMany,
        key: 'shipping_options',
        relatedModel: 'conekta._models.ShippingOption',
        collectionType: 'conekta._models.ShippingOptionCollection',
        includeInJSON: false,
        reverseRelation: {
          key: 'parent',
          type: Backbone.HasOne,
          includeInJSON: false
        }
      }, {
        type: Backbone.HasMany,
        key: 'orders',
        relatedModel: 'conekta._models.Subscription',
        collectionType: 'conekta._models.SubscriptionCollection',
        reverseRelation: {
          key: 'subscription',
          type: Backbone.HasOne,
          includeInJSON: false
        }
      }, {
        type: Backbone.HasMany,
        key: 'items',
        relatedModel: 'conekta._models.SubscriptionItem',
        collectionType: 'conekta._models.SubscriptionCollection',
        reverseRelation: {
          key: 'parent',
          type: Backbone.HasOne,
          includeInJSON: false
        }
      }, {
        type: Backbone.HasMany,
        key: 'custom_fields',
        relatedModel: 'conekta._models.SubscriptionCustomField',
        collectionType: 'conekta._models.SubscriptionCustomFieldCollection',
        reverseRelation: {
          key: 'parent',
          type: Backbone.HasOne,
          includeInJSON: false
        }
      }, {
        type: Backbone.HasOne,
        key: 'shipment',
        relatedModel: 'conekta._models.SubscriptionShipment',
        collectionType: 'conekta._models.SubscriptionShipment',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent'
        }
      }, {
        type: Backbone.HasOne,
        key: 'payment',
        relatedModel: 'conekta._models.SubscriptionPayment',
        collectionType: 'conekta._models.SubscriptionPayment',
        reverseRelation: {
          type: Backbone.HasOne,
          key: 'parent',
          includeInJSON: false
        }
      }
    ]
  });

  conekta._models.SubscriptionCollection = Backbone.Collection.extend({
    model: conekta._models.Subscription,
    modelName: 'subscription'
  });

}).call(this);


/*
OrderItem cart extensions
*/


(function() {

  _.extend(conekta._models.Item.prototype, {
    initialize: function() {
      this.on('error', this.error, this);
      this.on('change:quantity', this.recalculate_total, this);
      this.on('change:product_option_id', this.recalculate_total, this);
      this.change_product_option_id(this.get('product_option_id'));
      this.on('change', function() {
        if (!this.isNew()) {
          return this.save({}, {
            remote: false,
            locale_override: true
          });
        }
      });
    },
    relations: [
      {
        type: Backbone.HasOne,
        key: 'product',
        relatedModel: 'conekta._models.Product',
        collectionType: 'conekta._models.ProductCollection',
        reverseRelation: {
          key: 'item',
          type: Backbone.HasOne
        }
      }
    ],
    getApi: function() {
      return {
        setProductOption: function(id) {
          this._model.change_product_option_id(id);
        },
        getAttributes: function() {
          return this._model.toJSON();
        },
        remove: function() {
          return this._model.destroy({}, {
            remote: false
          });
        },
        setQuantity: function(quantity) {
          return this._model.set('quantity', quantity);
        },
        _model: this
      };
    }
  });

}).call(this);


/*
Company cart extensions
*/


(function() {

  _.extend(conekta._models.Company.prototype, {
    relations: [
      {
        type: Backbone.HasMany,
        key: 'payment_options',
        relatedModel: 'conekta._models.PaymentMethod',
        collectionType: 'conekta._models.PaymentMethodCollection',
        reverseRelations: {
          type: Backbone.HasOne,
          key: 'company',
          includeInJSON: false
        }
      }
    ]
  });

}).call(this);


/*
ShippingAddress cart extensions
*/


(function() {

  _.extend(conekta._models.ShippingAddress.prototype, {
    initialize: function() {
      return this.on('change', function() {
        if (this.get('parent')) {
          this.get('parent').change();
        }
        if (!this.isNew()) {
          return this.save({}, {
            remote: false
          });
        }
      });
    }
  });

}).call(this);

(function() {

  _.extend(conekta._models.ShippingOption.prototype, {
    getApi: function() {
      return {
        getAttributes: function() {
          return this._model.toJSON();
        },
        _model: this
      };
    }
  });

}).call(this);


/*
BillingInfo cart extensions
*/


(function() {

  _.extend(conekta._models.Payment.prototype, {
    initialize: function() {
      return this.on('change', function() {
        if (this.get('parent')) {
          this.get('parent').change();
        }
        if (!this.isNew()) {
          return this.save({}, {
            remote: false
          });
        }
      });
    }
  });

}).call(this);


/*
BillingInfo cart extensions
*/


(function() {

  _.extend(conekta._models.Period.prototype, {
    initialize: function() {
      return this.on('change', function() {
        if (this.get('parent')) {
          this.get('parent').change();
        }
        if (!this.isNew()) {
          return this.save({}, {
            remote: false
          });
        }
      });
    }
  });

}).call(this);


/*
BillingInfo cart extensions
*/


(function() {

  _.extend(conekta._models.BillingInfo.prototype, {
    initialize: function() {
      return this.on('change', function() {
        if (this.get('parent')) {
          this.get('parent').change();
        }
        if (!this.isNew()) {
          return this.save({}, {
            remote: false
          });
        }
      });
    }
  });

}).call(this);

(function() {

  _.extend(conekta._models.Product.prototype, {
    getApi: function() {
      return {
        createItem: function() {
          return {
            quantity: 1,
            product_id: this._model.id,
            product: this._model
          };
        },
        getAttributes: function() {
          return this._model.toJSON();
        },
        _model: this
      };
    }
  });

}).call(this);


/*
Order/Subscription/Quote shared methods
*/


(function() {
  var order_subscription_shared_methods;

  order_subscription_shared_methods = {
    getCompany: function() {
      var company;
      company = conekta._accessors.getCompany();
      if (this.get('company')) {
        company = this.get('company');
      }
      return company;
    },
    initialize: function() {
      this.on('error', this.error, this);
      this.get('items').each(function(order_item) {
        order_item.bind('change', this.update_items, this);
        order_item.bind('remove', this.update_items, this);
        order_item.recalculate_total();
      }, this);
      return this.on('change', function() {
        if (!this.isNew()) {
          this.save({}, {
            remote: false,
            local_override: true
          });
        }
        conekta._store.persist();
      });
    },
    subtotal: function() {
      var company, company_tax_rate, items_by_tax_rate, subtotal, tax_included_in_price, tax_rates, tax_total;
      company = this.getCompany();
      tax_included_in_price = company.get('tax_included_in_price');
      company_tax_rate = company.get('tax_rate') || 0.16;
      subtotal = 0;
      if (tax_included_in_price) {
        items_by_tax_rate = this.get('items').groupBy(function(item) {
          return item.tax_rate();
        });
        tax_rates = _.keys(items_by_tax_rate);
        _.each(tax_rates, function(key) {
          var tax_rate;
          tax_rate = company_tax_rate;
          if (typeof key !== 'undefined' && key !== null && !isNaN(key) && !key === 'undefined') {
            tax_rate = parseFloat(key);
          }
          return subtotal = subtotal + _.reduce(items_by_tax_rate[key], function(sum, item) {
            return sum = sum + item.total_price_with_tax() / (1 + tax_rate);
          }, 0);
        });
      } else {
        items_by_tax_rate = this.get('items').groupBy(function(item) {
          return item.tax_rate();
        });
        tax_rates = _.keys(items_by_tax_rate);
        tax_total = 0;
        _.each(tax_rates, function(tax_rate) {
          var subtotal_by_tax_rate;
          subtotal_by_tax_rate = _.reduce(items_by_tax_rate[tax_rate], function(sum, item) {
            return sum = sum + item.total_price_without_tax();
          }, 0);
          return subtotal = subtotal + subtotal_by_tax_rate;
        });
      }
      if (this.get('billing_cycles') && this.get('billing_cycles') !== -1) {
        subtotal = subtotal * this.get('billing_cycles');
      }
      return Math.round(subtotal * 100.0) / 100.0;
    },
    display_subtotal: function() {
      var company, company_tax_rate, display_subtotal, items_by_tax_rate, pequeno_contribuyente, show_tax_in_price, tax_included_in_price, tax_rates, tax_total;
      company = this.getCompany();
      company_tax_rate = company.get('tax_rate') || 0.16;
      pequeno_contribuyente = company.get('pequeno_contribuyente');
      tax_included_in_price = company.get('tax_included_in_price');
      show_tax_in_price = company.get('show_tax_in_price');
      display_subtotal = 0;
      if (show_tax_in_price) {
        if (tax_included_in_price) {
          display_subtotal = this.get('items').reduce(function(sum, item) {
            return sum = sum + item.total_price_with_tax();
          }, 0);
        } else {
          items_by_tax_rate = this.get('items').groupBy(function(item) {
            return item.tax_rate();
          });
          tax_rates = _.keys(items_by_tax_rate);
          tax_total = 0;
          _.each(tax_rates, function(tax_rate) {
            var subtotal_by_tax_rate;
            subtotal_by_tax_rate = _.reduce(items_by_tax_rate[tax_rate], function(sum, item) {
              return sum = sum + item.total_price_without_tax();
            }, 0);
            return display_subtotal = display_subtotal + subtotal_by_tax_rate * (1 + parseFloat(tax_rate));
          });
        }
      } else {
        display_subtotal = this.subtotal();
      }
      return Math.round(display_subtotal * 100.0) / 100.0;
    },
    shipping_total: function() {
      var shipping_total;
      shipping_total = this.get('shipment').get('price') || 0;
      if (this.get('billing_cycles') && this.get('billing_cycles') !== -1) {
        shipping_total = shipping_total * this.get('billing_cycles');
      }
      return parseFloat(shipping_total);
    },
    display_shipping: function() {
      var company, company_tax_rate, display_shipping_total, show_tax_in_price;
      company = this.getCompany();
      company_tax_rate = company.get('tax_rate') || 0.16;
      show_tax_in_price = company.get('show_tax_in_price');
      display_shipping_total = null;
      if (show_tax_in_price && this.get('shipment').get('carrier')) {
        display_shipping_total = this.shipping_total() * (1 + company_tax_rate);
      } else {
        display_shipping_total = this.shipping_total();
      }
      return display_shipping_total;
    },
    tax: function() {
      var company, company_tax_rate, items_by_tax_rate, tax_included_in_price, tax_rates, tax_total;
      company = this.getCompany();
      tax_included_in_price = company.get('tax_included_in_price');
      company_tax_rate = company.get('tax_rate') || 0.16;
      tax_total = 0;
      if (tax_included_in_price) {
        tax_total = this.total() - this.total() / (1 + company_tax_rate);
      } else {
        items_by_tax_rate = this.get('items').groupBy(function(item) {
          return item.tax_rate();
        });
        tax_rates = _.keys(items_by_tax_rate);
        tax_total = 0;
        _.each(tax_rates, function(key) {
          var subtotal_by_tax_rate, tax_rate;
          tax_rate = company_tax_rate;
          if (typeof key !== 'undefined' && key !== null && !isNaN(key) && key !== 'undefined') {
            tax_rate = parseFloat(key);
          }
          subtotal_by_tax_rate = _.reduce(items_by_tax_rate[key], function(sum, item) {
            return sum = sum + item.total_price_without_tax();
          }, 0);
          if (tax_rate === company_tax_rate && this.get('shipment').get('carrier')) {
            subtotal_by_tax_rate = subtotal_by_tax_rate + this.shipping_total();
          }
          return tax_total = subtotal_by_tax_rate * tax_rate;
        }, this);
        if (_.indexOf(tax_rates, company_tax_rate.toString()) === -1 && this.get('shipment').get('carrier')) {
          tax_total = tax_total + this.shipping_total() * company_tax_rate;
        }
      }
      return Math.round(tax_total * 100.0) / 100.0;
    },
    total: function() {
      var company, company_tax_rate, tax_included_in_price, total;
      company = this.getCompany();
      tax_included_in_price = company.get('tax_included_in_price');
      company_tax_rate = company.get('tax_rate') || 0.16;
      total = 0;
      if (tax_included_in_price) {
        total = this.get('items').reduce(function(sum, item) {
          return sum = sum + item.total_price_with_tax();
        }, 0);
        if (this.get('payment').get('period') && this.get('payment').get('period').get('total_number') > 0) {
          total = total * this.get('payment').get('period').get('total_number');
        }
        if (this.get('shipment').get('carrier')) {
          total = total + this.shipping_total() * (1 + company_tax_rate);
        } else {
          total = total + this.shipping_total();
        }
      } else {
        total = this.subtotal() + this.tax() + this.shipping_total();
      }
      return Math.round(total * 100.0) / 100.0;
    },
    preventa_total: function() {
      var preventa_total;
      preventa_total = 0;
      this.get('items').each(function(item) {
        if (item.get('preventa') || item.get('preventa_outstanding_amount')) {
          return preventa_total = preventa_total + item.get('price') * item.get('quantity');
        }
      });
      if (preventa_total > 0) {
        preventa_total = preventa_total + (this.get('shipping_total') || 0);
      }
      return preventa_total;
    },
    getShippingOptions: function(callback) {
      var address;
      address = _.clone(this.get('shipment').get('address').toJSON());
      delete address['parent'];
      return this.get('shipping_options').fetch({
        data: {
          reference_id: this.get('reference_id'),
          total: this.get('total'),
          address: address,
          company_id: this.get('company_id'),
          items: this.get('items').map(function(order_item) {
            return {
              product_id: order_item.get('product_id'),
              product_option_id: order_item.get('product_option_id'),
              quantity: order_item.get('quantity') || 0
            };
          })
        },
        remote: true,
        dataType: 'json',
        local_override: false,
        success: function(collection) {
          var shipping_options;
          shipping_options = collection.map(function(shipping_option) {
            return shipping_option.getApi();
          });
          return callback(shipping_options);
        }
      });
    },
    postalCodeLookup: function(success_callback, error_callback) {
      var _this = this;
      return jQuery.ajax({
        url: this.urlBase() + '/shipping_options/postal_code_lookup?country_code=' + this.get('shipment').get('address').get('country_code') + '&postal_code=' + this.get('shipment').get('address').get('postal_code') + '&company_id=' + this.get('company_id'),
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
          if (typeof success_callback !== 'undefined') {
            return success_callback(data);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          if (error_callback && jqXHR.status === 416) {
            return error_callback(jqXHR.responseText);
          }
        },
        beforeSend: function(xhr) {}
      });
    },
    setPaymentMethod: function(payment_option) {
      var payment_method_name;
      payment_method_name = payment_option;
      if (payment_option instanceof conekta._models.PaymentMethod) {
        payment_method_name = payment_option.get('name');
      } else {
        payment_option = this.getCompany().get('payment_options').filter(function(payment_option) {
          return payment_option.get('name') === payment_method_name;
        })[0];
      }
      if (this instanceof conekta._models.Subscription) {
        if (payment_option.get('installment_types').indexOf('recurring') !== -1) {
          this.get('shipment').get('period').set('total_number', this.get('shipment').get('period').get('recurring_total_number'));
          this.get('payment').get('period').set('total_number', this.get('payment').get('period').get('recurring_total_number'));
        } else {
          this.get('shipment').get('period').set('total_number', this.get('shipment').get('period').get('one_time_total_number'));
          this.get('payment').get('period').set('total_number', this.get('payment').get('period').get('one_time_total_number'));
        }
      }
      this.set('payment_method', payment_method_name);
      this.update_items();
    },
    setShippingOption: function(shipping_option) {
      var attributes, shipment;
      shipment = this.get('shipment');
      if (shipping_option instanceof conekta._models.ShippingOption) {
        shipment.set({
          price: shipping_option.get('price'),
          carrier: shipping_option.get('carrier'),
          service_name: shipping_option.get('service_name'),
          service_code: shipping_option.get('service_code')
        });
        this.update_items();
      } else if (typeof shipping_option.getAttributes === 'function') {
        attributes = shipping_option.getAttributes();
        shipment.set({
          price: attributes['price'],
          carrier: attributes['carrier'],
          service_name: attributes['service_name'],
          service_code: attributes['service_code']
        });
        this.update_items();
      } else {
        shipment.set({
          price: shipping_option['price'],
          carrier: shipping_option['carrier'],
          service_name: shipping_option['service_name'],
          service_code: shipping_option['service_code']
        });
      }
    },
    update_items: function() {
      var company, company_tax_rate, shipment_price, shipment_price_sanitized, shipment_required, subtotal, tax_total, total;
      if (conekta._store && this.get('items') && this.get('items') instanceof Backbone.Collection) {
        company = this.getCompany();
        company_tax_rate = company.get('tax_rate') || 0.16;
        total = 0;
        subtotal = 0;
        tax_total = 0;
        shipment_price = parseFloat(this.get('shipment').get('price'));
        shipment_price_sanitized = shipment_price || 0.00;
        if (!this.get('shipment').get('tax_included')) {
          tax_total = shipment_price_sanitized * company_tax_rate;
        } else {
          tax_total = shipment_price_sanitized - shipment_price_sanitized / (1 + company_tax_rate);
        }
        shipment_required = false;
        this.get('items').each(function(order_item) {
          if (order_item.get('product_type') !== 'digital' && order_item.get('product_type') !== 'event' && (!order_item.get('preventa') || (order_item.get('preventa') && order_item.get('preventa') >= 100))) {
            return shipment_required = true;
          }
        });
        this.set({
          'preventa_total': this.preventa_total(),
          'total': this.total(),
          'subtotal': this.subtotal(),
          'tax': this.tax(),
          'display_shipping': this.display_shipping(),
          'display_subtotal': this.display_subtotal(),
          'shipment_required': shipment_required,
          'shipment_price': shipment_price
        });
        if (this.get('shipment').get('address')) {
          this.get('shipment').get('address').set({
            'shipment_required': shipment_required
          });
        }
        simpleCart.empty();
        if (this.get('shipment').get('price')) {
          if (company.get('show_tax_in_price')) {
            if (this.get('shipment').get('carrier')) {
              simpleCart({
                shippingFlatRate: this.shipping_total() * (1 + (company.get('tax_rate') || 0.16)),
                tax_shipping: true
              });
            } else {
              simpleCart({
                shippingFlatRate: this.shipping_total(),
                tax_shipping: true
              });
            }
          } else {
            simpleCart({
              shippingFlatRate: this.shipping_total(),
              tax_shipping: true
            });
          }
        } else {
          simpleCart({
            shippingFlatRate: 0.0,
            tax_shipping: true
          });
        }
        this.get('items').each(function(order_item) {
          var inventory, quantity;
          inventory = order_item.get('inventory');
          if (typeof inventory === 'undefined' || inventory === null) {
            inventory = 'infinite';
          }
          quantity = order_item.get('quantity');
          if (quantity && (inventory === 'infinite' || quantity <= inventory)) {
            return simpleCart.add({
              id: order_item.get('product_id') + (order_item.get('product_option_id') !== null ? '_' + order_item.get('product_option_id') : ''),
              name: order_item.get('name'),
              price: order_item.get('unit_price'),
              weight: (order_item.get('weight') || "").toString(),
              tax_rate: order_item.get('tax_rate'),
              preventa: order_item.get('preventa'),
              quantity: order_item.get('quantity') || 0,
              inventory: inventory.toString()
            });
          }
        });
      }
    },
    checkoutPaypal: function() {
      return this.save({}, {
        remote: true,
        success: function(model) {
          return jQuery.ajax({
            data: {
              reference_id: model.get('reference_id')
            },
            dataType: 'JSON',
            url: model.urlRoot + '/paypal_express_checkout_prepare',
            success: function(data) {
              if (data['mode'] === 'test') {
                return document.location.href = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&useraction=commit&token=" + data.token;
              } else {
                return document.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&useraction=commit&token=" + data.token;
              }
            },
            type: 'POST'
          });
        }
      });
    },
    processPayment: function(parameter_hash) {
      var billing_cycles, billing_period_length, billing_period_unit, company, error_callback, installment_types, payment, payment_method, provider, simpleCart_items, success_callback, tax;
      provider = parameter_hash;
      success_callback = null;
      error_callback = null;
      if (typeof parameter_hash === 'object') {
        provider = parameter_hash['payment_method'];
        success_callback = parameter_hash['success_callback'];
        error_callback = parameter_hash['error_callback'];
        payment = this.get('payment');
        this.set('payment_method', provider);
        payment.set('type', provider);
        if (parameter_hash['credit_card']) {
          payment.set('credit_card', parameter_hash['credit_card']);
          payment.set('success_url', parameter_hash['success_url']);
          payment.set('failure_url', parameter_hash['failure_url']);
        }
      }
      company = this.getCompany();
      this.update_items();
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track("Cart Click to Pay", {
          "company_id": company.id,
          "provider": provider
        });
      }
      if (provider === 'paypal' && company.get('paypal_full_checkout')) {
        this.checkoutPaypal();
      } else if (provider === 'bank_transfer' || provider === 'Transferencia Bancaria') {
        this.save({}, {
          remote: true,
          success: function(model) {
            simpleCart.empty();
            return window.location.href = "/checkout/bank_transfer_printout?reference_id=" + model.get('reference_id');
          },
          error: function(model, resp) {}
        });
      } else if (provider === 'referenced_bank_transfer' || provider === 'Transferencia Bancaria Referenciada') {
        this.save({}, {
          remote: true,
          success: function(model) {
            var response;
            simpleCart.empty();
            if (typeof success_callback === 'function') {
              payment = model.get('payment');
              response = {
                conekta_reference_id: model.get('reference_id'),
                total: model.get('total'),
                bank_name: payment.get('bank_name'),
                bank_service_number: payment.get('bank_service_number'),
                bank_service_name: payment.get('bank_service_name'),
                bank_deposit_reference: payment.get('bank_deposit_reference')
              };
              return success_callback(response);
            }
          },
          error: function(model, resp) {
            var response;
            if (typeof error_callback === 'function') {
              response = {};
              return error_callback(response);
            }
          }
        });
      } else if (provider === 'oxxo' || provider === 'Pago en Efectivo por Oxxo') {
        this.save({}, {
          remote: true,
          success: function(model) {
            var response;
            simpleCart.empty();
            if (typeof success_callback === 'function') {
              payment = model.get('payment');
              response = {
                conekta_reference_id: payment.get('reference_id'),
                total: payment.get('total'),
                barcode: payment.get('barcode'),
                barcode_url: payment.get('barcode_url')
              };
              return success_callback(response);
            }
          },
          error: function(model, resp) {
            var response;
            if (typeof error_callback === 'function') {
              response = {};
              return error_callback(response);
            }
          }
        });
      } else if (provider === 'credit_card' || provider === 'Tarjeta de Credito') {
        this.save({}, {
          remote: true,
          success: function(model) {
            var form, response;
            simpleCart.empty();
            if (model.get('error')) {
              response = {
                error_message: model.get('error')
              };
              return error_callback(response);
            } else {
              if (model.get('payment').get('fraud_response') === 'Rejected') {
                form = jQuery("<form></form>");
                form.attr('style', 'display:none;');
                form.attr('action', 'https://eps.banorte.com/secure3d/Solucion3DSecure.htm');
                form.attr('method', 'POST');
                _.each(model.get('payment').get('redirect_form_attributes'), function(value, key) {
                  return form.append(jQuery("<input/>").attr("type", "hidden").attr("name", key).val(value));
                });
                jQuery("body").append(form);
                form.submit();
                return form.remove();
              } else {
                if (typeof success_callback === 'function') {
                  response = {};
                  return success_callback(response);
                }
              }
            }
          },
          error: function(model, resp) {
            var response;
            if (typeof error_callback === 'function') {
              response = {};
              return error_callback(response);
            }
          }
        });
      } else {
        billing_period_length = this.get('billing_period_length');
        billing_period_unit = this.get('billing_period_unit');
        if (company.get('show_tax_in_price')) {
          simpleCart.tax = function() {
            return 0;
          };
          simpleCart.taxRate = function() {
            return 0;
          };
        } else {
          tax = this.tax();
          simpleCart.tax = function() {
            return tax;
          };
        }
        if (this instanceof conekta._models.Subscription) {
          payment_method = company.get('payment_options').filter(function(payment_method) {
            return payment_method.get('name') === provider;
          })[0];
          installment_types = payment_method.get('installment_types');
          if (_.indexOf(installment_types, 'recurring') === -1 && this.get('billing_cycles')) {
            billing_cycles = this.get('billing_cycles');
            simpleCart_items = simpleCart.items();
            _.each(simpleCart_items, function(item) {
              return item.quantity(item.quantity() * billing_cycles);
            });
          }
        }
        this.save({}, {
          remote: true,
          success: function(model) {
            var description, descriptions, page_id, parameters, parsed_referer, payment_method_name, referer, return_location, success_location;
            company = model.getCompany();
            referer = model.get('refering_url');
            if (referer === null || referer === '') {
              referer = document.location.host + '/catalogo/' + model.get('company_id');
            }
            parsed_referer = parseUri(referer);
            success_location = "";
            return_location = "";
            if (document.location.search.match(/page_id\=(\d+)/) && company.get('facebook')) {
              page_id = document.location.search.match(/page_id\=(\d+)/)[1];
              return_location = company.get('facebook') + "/app_" + page_id;
              success_location = return_location;
            } else {
              success_location = 'https://secure.conekta.mx/checkout/payment_confirmation/' + model.get('reference_id');
              return_location = document.location.protocol + '//' + document.location.host + document.location.pathname + '?company_id=' + company.get('id');
            }
            if (model.get('payment_succeeded_url')) {
              success_location = model.get('payment_succeeded_url');
            }
            if (model.get('payment_failed_url')) {
              return_location = model.get('payment_failed_url');
            }
            payment_method_name = model.get('payment_method');
            payment_method = {};
            payment_method = company.get('payment_options').filter(function(payment_method) {
              return payment_method.get('name') === payment_method_name;
            })[0];
            parameters = {
              method: 'GET',
              invoice: model.get('order_id') || model.get('reference_id'),
              notify: 'https://secure.conekta.mx/' + provider + '_ipn_listener',
              success: success_location,
              cancel: return_location
            };
            if (model instanceof conekta._models.Subscription && provider === 'paypal') {
              billing_period_length = model.get('billing_period_length') || model.get('payment').get('period').get('length');
              billing_period_unit = model.get('billing_period_unit') || model.get('payment').get('period').get('unit');
              parameters['recurring_monthly_payment'] = true;
              parameters['cmd'] = '_xclick-subscriptions';
              parameters['billing_period_unit'] = billing_period_unit;
              parameters['billing_period_length'] = billing_period_length;
              description = 'Subscripción  de ';
              descriptions = model.get('items').map(function(item) {
                return ' ' + item.get('name') + (item.get('product_option_text') || '');
              });
              description += descriptions.join(', ') + ' por ' + company.get('name') + '.';
              parameters['payment_description'] = description;
            }
            if (provider === 'paypal') {
              parameters['email'] = payment_method.get('paypal_email');
              simpleCart.checkout.PayPal(parameters);
            } else if (provider === 'dineromail') {
              parameters['merchant_id'] = payment_method.get('dineromail_merchant');
              simpleCart.checkout.Dineromail(parameters);
            }
            return simpleCart.empty();
          },
          error: function(model, resp) {}
        });
      }
    },
    proceedToCheckout: function(step) {
      var checkout_hash, form, i, params, proceed_to_step;
      checkout_hash = this.toJSON();
      params = '';
      proceed_to_step = 'cart';
      if (step && (step.match(/address/) || step.match(/payments/))) {
        proceed_to_step = step;
      }
      if (true) {
        form = jQuery("<form></form>");
        form.attr('style', 'display:none;');
        if (document.location.hostname.match(/^127\.0\.0\.1$/) && typeof company_config !== 'undefined') {
          form.attr('action', 'http://127.0.0.1:3000/checkout?company_id=' + checkout_hash['company_id'] + '#' + proceed_to_step + '-bustcache');
        } else {
          form.attr('action', 'https://secure.conekta.mx/checkout?company_id=' + checkout_hash['company_id'] + '#' + proceed_to_step + '-bustcache');
        }
        form.attr('method', 'GET');
        if (checkout_hash['id']) {
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'id').val(checkout_hash['id']));
        }
        if (checkout_hash['reference_id']) {
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'reference_id').val(checkout_hash['reference_id']));
        }
        if (checkout_hash['external_reference_id']) {
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'external_reference_id').val(checkout_hash['external_reference_id']));
        }
        if (checkout_hash['order_id']) {
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'order_id').val(checkout_hash['order_id']));
        }
        form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'company_id').val(checkout_hash['company_id']));
        if (checkout_hash['payment'] && checkout_hash['payment']['period'] && checkout_hash['payment']['period']['length'] && checkout_hash['payment']['period']['unit']) {
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'billing_period_length').val(checkout_hash['payment']['period']['length']));
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'billing_period_unit').val(checkout_hash['payment']['period']['unit']));
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'billing_cycles').val(checkout_hash['payment']['period']['total_number']));
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'billing_period_recurring_total_number').val(checkout_hash['payment']['period']['recurring_total_number']));
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'billing_period_one_time_total_number').val(checkout_hash['payment']['period']['one_time_total_number']));
        }
        if (checkout_hash['payment_succeeded_url']) {
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'payment_succeeded_url').val(checkout_hash['payment_succeeded_url']));
        }
        if (checkout_hash['payment_failed_url']) {
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'payment_failed_url').val(checkout_hash['payment_failed_url']));
        }
        if (checkout_hash['shipment']) {
          if (checkout_hash['shipment']['period'] && checkout_hash['shipment']['period']['length'] && checkout_hash['shipment']['period']['unit']) {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_period_length').val(checkout_hash['shipment']['period']['length']));
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_period_unit').val(checkout_hash['shipment']['period']['unit']));
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_cycles').val(checkout_hash['shipment']['period']['total_number']));
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_period_recurring_total_number').val(checkout_hash['shipment']['period']['recurring_total_number']));
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_period_one_time_total_number').val(checkout_hash['shipment']['period']['one_time_total_number']));
          }
          if (checkout_hash['shipment']['id']) {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_id').val(checkout_hash['shipment']['id']));
          }
          if (typeof checkout_hash['shipment']['price'] !== 'undefined') {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipment_price').val(checkout_hash['shipment']['price']));
          }
          if (checkout_hash['shipment']['carrier']) {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_carrier').val(checkout_hash['shipment']['carrier']));
          }
          if (checkout_hash['shipment']['service_name']) {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_service_name').val(checkout_hash['shipment']['service_name']));
          }
          if (checkout_hash['shipment']['address']) {
            _.each(checkout_hash['shipment']['address'], function(val, key) {
              return form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'shipping_address[' + key + ']').val(val));
            });
          }
        }
        i = 0;
        _.each(checkout_hash['custom_fields'], function(custom_field, i) {
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'custom_fields[' + i + '][id]').val(custom_field['id']));
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'custom_fields[' + i + '][name]').val(custom_field['name']));
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'custom_fields[' + i + '][value]').val(custom_field['value']));
          return i = i + 1;
        });
        _.each(checkout_hash['items'], function(val, i) {
          var id, image, name, price, product_id, product_option_id, product_quantity, sku;
          id = val['id'];
          product_id = val['product_id'];
          product_option_id = val['product_option_id'];
          product_quantity = val['quantity'];
          sku = val['sku'];
          price = val['price'];
          name = val['name'];
          image = val['image'];
          if (id && id !== "") {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][id]').val(id));
          }
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][product_id]').val(product_id));
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][product_option_id]').val(product_option_id));
          form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][quantity]').val(product_quantity));
          if (sku && sku !== "" && price && price !== "") {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][name]').val(name));
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][sku]').val(sku));
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][price]').val(price));
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][image]').val(image));
          }
        });
        jQuery("body").append(form);
        form.submit();
        form.remove();
      } else {
        if (document.location.host.match(/^127\.0\.0\.1$/)) {
          document.location.href = 'http://127.0.0.1:3000/checkout?' + params + '#' + proceed_to_step + '-bustcache';
        } else {
          document.location.href = 'https://secure.conekta.mx/checkout?' + params + '#' + proceed_to_step + '-bustcache';
        }
      }
    },
    getApi: function() {
      var api;
      api = {
        save: function(callback) {
          var model;
          model = this._model;
          model.get('items').each(function(item) {
            return item.change_product_option_id(item.get('product_option_id'));
          });
          model.update_items();
          return model.save({}, {
            success: _.bind(function() {
              /*
              model.get('items').each((item)->
                product_id = item.get('product_id')
                product = conekta._store.get('products').find((product)->
                  if product.id == product_id
                    return true
                  else
                    return false
                )
                if product
                  item.set('product', product)
              )
              */
              if (callback) {
                return callback.call(this);
              }
            }, this)
          });
        },
        processPayment: function(parameter_hash) {
          return this._model.processPayment(parameter_hash);
        },
        proceedToCheckout: function(step) {
          return this._model.proceedToCheckout(step);
        },
        setPaymentMethod: function(payment_method) {
          return this._model.setPaymentMethod(payment_method);
        },
        getShippingOptions: function(callback) {
          return this._model.getShippingOptions(callback);
        },
        getItems: function() {
          return this._model.get('items').map(function(item) {
            return item.getApi();
          });
        },
        setShippingOption: function(shipping_option) {
          return this._model.setShippingOption(shipping_option);
        },
        setBillingInfo: function(info) {
          var billing_info;
          billing_info = this._model.get('payment').get('billing_info');
          if (billing_info) {
            billing_info.set(info);
          } else {
            this._model.get('payment').set('billing_info', info);
          }
        },
        setShippingAddress: function(address) {
          var address_model;
          address_model = this._model.get('shipment').get('address');
          if (address_model) {
            address_model.set(address);
          } else {
            this._model.get('shipment').set('address', address);
          }
        },
        setCustomField: function(name, value) {
          var custom_fields, model, modified;
          model = this._model;
          if (!model.get('custom_fields')) {
            model.set('custom_fields', []);
          }
          custom_fields = model.get('custom_fields');
          modified = false;
          custom_fields.each(function(field) {
            if (field.get('name') === name) {
              field.set('value', value);
              return modified = true;
            }
          });
          if (!modified) {
            custom_fields.push({
              name: name,
              value: value
            });
          }
        },
        setReturnUrls: function(payment_succeeded_url, payment_failed_url) {
          return this._model.set({
            'payment_succeeded_url': payment_succeeded_url,
            'payment_failed_url': payment_failed_url
          });
        },
        addItem: function(item) {
          var backbone_item, constructor_params, items, model, product;
          model = this._model;
          items = model.get('items');
          backbone_item = null;
          if (item instanceof conekta._models.Item) {
            backbone_item = item._model;
          } else {
            if (item['product_id']) {
              constructor_params = {
                product_option_id: item['product_option_id'],
                product_id: item['product_id'],
                quantity: item['quantity'] || 1
              };
              if (this._model instanceof conekta._models.Order) {
                backbone_item = new conekta._models.OrderItem(constructor_params);
              } else if (this._model instanceof conekta._models.Subscription) {
                backbone_item = new conekta._models.SubscriptionItem(constructor_params);
              }
            } else if (item['sku']) {
              item['id'] = item['sku'];
              product = Backbone.Relational.store.find(conekta._models.Product, {
                sku: item['sku']
              });
              if (!product) {
                product = new conekta._models.Product(item);
              }
              constructor_params = {
                product_option_id: item['product_option_id'],
                product_id: product.id,
                quantity: item['quantity'] || 1
              };
              if (this._model instanceof conekta._models.Order) {
                backbone_item = new conekta._models.OrderItem(constructor_params);
              } else if (this._model instanceof conekta._models.Subscription) {
                backbone_item = new conekta._models.SubscriptionItem(constructor_params);
              }
            }
          }
          if (backbone_item) {
            items.add(backbone_item);
            backbone_item.bind('change', this._model.update_items, this._model);
            backbone_item.bind('remove', this._model.update_items, this._model);
            backbone_item.trigger('change');
            this._model.trigger('change');
            return backbone_item.getApi();
          } else {
            return backbone_item;
          }
        },
        _model: this,
        getAttributes: function() {
          return this._model.toJSON();
        }
      };
      if (this instanceof conekta._models.Subscription) {
        _.extend(api, {
          setBillingPeriod: function(period_unit, period_length, recurring_number_cycles, one_time_number_cycles) {
            var model;
            model = this._model.get('payment').get('period');
            model.set('unit', period_unit);
            model.set('length', period_length);
            model.set('recurring_total_number', recurring_number_cycles);
            model.set('one_time_number_cycles', one_time_number_cycles);
          },
          setShippingPeriod: function(period_unit, period_length, recurring_number_cycles, one_time_number_cycles) {
            var model;
            model = this._model.get('shipment').get('period');
            model.set('unit', period_unit);
            model.set('length', period_length);
            model.set('recurring_total_number', recurring_number_cycles);
            model.set('one_time_number_cycles', one_time_number_cycles);
          }
        });
      }
      return api;
    }
  };

  _.extend(conekta._models.Order.prototype, order_subscription_shared_methods);

  _.extend(conekta._models.Subscription.prototype, order_subscription_shared_methods);

}).call(this);


/*
Order Model, Collections and Views for the cart
*/


(function() {
  var checkout_model, conekta_store, conekta_store_collection, i, new_checkout, old_conekta_store, prefix, purged_keys, _i, _ref;

  conekta._models.PagaloStore = Backbone.RelationalModel.extend({
    modelName: 'conekta_store',
    initialize: function() {
      return this.on('error', this.error, this);
    },
    persist: function() {
      return this.save({}, {
        remote: false,
        local_override: true
      });
    },
    relations: [
      {
        type: Backbone.HasOne,
        key: 'company',
        relatedModel: 'conekta._models.Company',
        collectionType: 'conekta._models.CompanyCollection'
      }, {
        type: Backbone.HasMany,
        key: 'products',
        relatedModel: 'conekta._models.Product',
        collectionType: 'conekta._models.ProductCollection'
      }, {
        type: Backbone.HasOne,
        key: 'checkout_order',
        relatedModel: 'conekta._models.Order',
        collectionType: 'conekta._models.OrderCollection'
      }, {
        type: Backbone.HasOne,
        key: 'checkout_subscription',
        relatedModel: 'conekta._models.Subscription',
        collectionType: 'conekta._models.SubscriptionCollection'
      }
    ]
  });

  conekta._models.PagaloStoreCollection = Backbone.Collection.extend({
    model: conekta._models.PagaloStore,
    modelName: 'conekta_store'
  });

  old_conekta_store = new Store('conekta_store');

  conekta_store = null;

  if (old_conekta_store.findAll().length === 0) {
    prefix = 'conekta:';
    purged_keys = [];
    if (localStorage.length > 0) {
      for (i = _i = 0, _ref = localStorage.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (localStorage.key(i) !== null && localStorage.key(i).match(prefix)) {
          purged_keys.push(localStorage.key(i));
        }
      }
      _.each(purged_keys, function(key, index) {
        return localStorage.removeItem(key);
      });
    }
    conekta_store = new conekta._models.PagaloStore({
      company: {},
      checkout_order: {},
      checkout_subscription: {},
      products: []
    }, {
      remote: false,
      local_override: true
    });
  } else {
    conekta_store_collection = new conekta._models.PagaloStoreCollection();
    conekta_store_collection.fetch({
      remote: false,
      local_override: true
    });
    conekta_store = conekta_store_collection.at(0);
  }

  conekta['_store'] = conekta_store;

  checkout_model = null;

  if (conekta._store.get('checkout_subscription') && conekta._store.get('checkout_subscription').get('items').length > 0) {
    conekta._store.get('checkout_order').get('items').each(function(item) {
      if (item && item.clear) {
        return item.clear({
          silent: true
        });
      }
    });
    conekta._store.get('checkout_order').clear({
      silent: true
    });
    checkout_model = conekta._store.get('checkout_subscription');
  } else if (conekta._store.get('checkout_order') && conekta._store.get('checkout_order').get('items').length > 0) {
    conekta._store.get('checkout_subscription').get('items').each(function(item) {
      if (item && item.clear) {
        return item.clear({
          silent: true
        });
      }
    });
    conekta._store.get('checkout_subscription').clear({
      silent: true
    });
    checkout_model = conekta._store.get('checkout_order');
  } else {
    checkout_model = new conekta._models.Order();
  }

  checkout_model = checkout_model.getApi();

  new_checkout = function(type, data) {
    var checkout;
    if (typeof data === 'undefined') {
      data = {};
      if (conekta._accessors.getCompany()) {
        data['company_id'] = conekta._accessors.getCompany().id;
      }
    }
    if (!data['payment']) {
      data['payment'] = {};
    }
    if (!data['shipment']) {
      data['shipment'] = {};
    }
    checkout_model = null;
    if (conekta._store.get('checkout_order')) {
      conekta._store.get('checkout_order').get('items').each(function(item) {
        if (item && item.clear) {
          return item.clear({
            silent: true
          });
        }
      });
      conekta._store.get('checkout_order').clear({
        silent: true
      });
    }
    if (conekta._store.get('checkout_subscription')) {
      conekta._store.get('checkout_subscription').get('items').each(function(item) {
        if (item && item.clear) {
          return item.clear({
            silent: true
          });
        }
      });
      conekta._store.get('checkout_subscription').clear({
        silent: true
      });
    }
    if (type === 'subscription') {
      if (!data['payment']['period']) {
        data['payment']['period'] = {};
      }
      if (!data['shipment']['period']) {
        data['shipment']['period'] = {};
      }
      checkout_model = new conekta._models.Subscription(data);
      conekta._store.set('checkout_subscription', checkout_model);
    } else if (type === 'order') {
      checkout_model = new conekta._models.Order(data);
      conekta._store.set('checkout_order', checkout_model);
    }
    checkout = checkout_model.getApi();
    checkout["new"] = new_checkout;
    return conekta.checkout = checkout;
  };

  checkout_model["new"] = new_checkout;

  conekta.checkout = checkout_model;

  conekta._store.persist();

}).call(this);
