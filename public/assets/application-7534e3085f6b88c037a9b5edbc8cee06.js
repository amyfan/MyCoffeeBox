/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */

(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<9
	// For `typeof node.method` instead of `node.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.1",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a,
		input, select, fragment,
		opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var i, l, thisCache,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, notxml, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== core_strundefined ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /^[^{]+\{\s*\[native code/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( preferredDoc.documentElement.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		while ( (elem = this[i++]) ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( !documentIsXML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( documentIsXML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && ( ~b.sourceIndex || MAX_NEGATIVE ) - ( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifider
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsXML ?
						elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
						elem.lang) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !documentIsXML &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		documentIsXML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, ret, self,
			len = this.length;

		if ( typeof selector !== "string" ) {
			self = this;
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		ret = [];
		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, this[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		var isFunc = jQuery.isFunction( value );

		// Make sure that the elements are removed from the DOM before they are inserted
		// this can help fix replacing a parent with child elements
		if ( !isFunc && typeof value !== "string" ) {
			value = jQuery( value ).not( this ).detach();
		}

		return this.domManip( [ value ], true, function( elem ) {
			var next = this.nextSibling,
				parent = this.parentNode;

			if ( parent ) {
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		});
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, table ? self.html() : undefined );
				}
				self.domManip( args, table, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						node,
						i
					);
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery.ajax({
									url: node.src,
									type: "GET",
									dataType: "script",
									async: false,
									global: false,
									"throws": true
								});
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	var attr = elem.getAttributeNode("type");
	elem.type = ( attr && attr.specified ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.hover = function( fnOver, fnOut ) {
	return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
};
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 ) {
					isSuccess = true;
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {
	var conv2, current, conv, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var value, name, index, easing, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var prop, index, length,
		value, dataShow, toggle,
		tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number if issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  var alreadyInitialized = function() {
    var events = $._data(document, 'events');
    return events && events.click && $.grep(events.click, function(e) { return e.namespace === 'rails'; }).length;
  }

  if ( alreadyInitialized() ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrf_token = $('meta[name=csrf-token]').attr('content'),
        csrf_param = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrf_param !== undefined && csrf_token !== undefined) {
        metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadata_input).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    // find all the submit events directly bound to the form and
    // manually invoke them. If anyone returns false then stop the loop
    callFormSubmitBindings: function(form, event) {
      var events = form.data('events'), continuePropagation = true;
      if (events !== undefined && events['submit'] !== undefined) {
        $.each(events['submit'], function(i, obj){
          if (typeof obj.handler === 'function') return continuePropagation = obj.handler(event);
        });
      }
      return continuePropagation;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        // this should be element.removeData('ujs:enable-with')
        // but, there is currently a bug in jquery which makes hyphenated data attributes not get removed
        element.data('ujs:enable-with', false); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($(document), 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $(document).delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $(document).delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params');
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if ( (e.metaKey || e.ctrlKey) && (!method || method === 'GET') && !data ) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $(document).delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $(document).delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        // If browser does not support submit bubbling, then this live-binding will be called before direct
        // bindings. Therefore, we should directly call any direct bindings before remotely submitting form.
        if (!$.support.submitBubbles && $().jquery < '1.7' && rails.callFormSubmitBindings(form, e) === false) return rails.stopEverything(e);

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $(document).delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $(document).delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $(document).delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      // making sure that all forms have actual up-to-date token(cached forms contain old one)
      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var csrf_param = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrf_param + '"]').val(csrf_token);
    });
  }

})( jQuery );
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
              var allResponseHeaders, doc, e, parseMessage, responses, status;
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
                  } catch (_error) {
                    e = _error;
                    status.code = 500;
                    return status.message = "parseerror";
                  }
                } else if ((userType === "xml") || ((userType !== "text") && xmlRegEx.test(xdr.contentType))) {
                  doc = new ActiveXObject("Microsoft.XMLDOM");
                  doc.async = false;
                  try {
                    doc.loadXML(xdr.responseText);
                  } catch (_error) {
                    e = _error;
                    doc = undefined;
                  }
                  if (!doc || !doc.documentElement || doc.getElementsByTagName("parsererror").length) {
                    status.code = 500;
                    status.message = "parseerror";
                    throw "Invalid XML: " + xdr.responseText;
                  }
                  return responses.xml = doc;
                }
              } catch (_error) {
                parseMessage = _error;
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
										alert('PerdÃ³n, Ã©ste producto esta agotado.');
									}else{
										alert('PerdÃ³n, solo ' + newItem.get("inventory")  + ' unidades estÃ¡n disponibles.');
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
									alert('PerdÃ³n, Ã©ste producto esta agotado.');
								}else{
									alert('PerdÃ³n, solo ' + this.get("inventory")  + ' unidades estÃ¡n disponibles.');
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
                        if ((conekta.checkout._model.get('company_id') == 2757603 || conekta.checkout._model.get('company_id') == '2757603') && (conekta.checkout._model.get('custom_fields').find(function(custom_field,i){return (custom_field.get('name') || "").match(/digo de Promoci/)}).get('value') || "").match(/PROMOHB/i)){
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
                        data["item_name_" + counter] = "Costo de EnviÃ³ (con IVA)";
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
            if (!model.get('token')) {
              model.set('token', token);
            }
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
      if (this.get('preventa')) {
        discounted_price = price * (parseFloat(this.get('preventa')) / 100.0);
      }
      if (this.get('preventa_amount_outstanding') && this.get('parent').get('status') === 'Preventa Pagada') {
        discounted_price = this.get('preventa_amount_outstanding');
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
            return "Una contraseÃ±a estÃ¡ requierida.";
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
        msg: "El correo electrÃ³nico de entrega no es valido."
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
        msg: "El paÃ­s de entrega no es valido."
      },
      postal_code: {
        minLength: 5,
        msg: "El cÃ³digo postal de entrega no es valido."
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
        msg: "El nÃºmero de telÃ©fono no es valido."
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
        msg: "El correo electrÃ³nico de facturaciÃ³n no es valido."
      },
      rfc: {
        minLength: 2,
        msg: "El RFC no es valido."
      },
      colonia: {
        minLength: 2,
        msg: "La Colonia de facturaciÃ³n ne es valido."
      },
      city: {
        minLength: 2,
        msg: "La ciudad de facturaciÃ³n no es valido."
      },
      state: {
        minLength: 2,
        msg: "El Estado de facturaciÃ³n no es valido."
      },
      postal_code: {
        minLength: 5,
        msg: "El cÃ³digo postal de facturaciÃ³n no es valido."
      },
      street: {
        minLength: 2,
        msg: "La calle de facturaciÃ³n no es valido."
      },
      external_number: {
        minLength: 1,
        msg: "El nÃºmero exterior de facturaciÃ³n no es valido."
      },
      phone: {
        minLength: 8,
        pattern: /^[\(\)\-\d ]+$/,
        msg: "El nÃºmero de telÃ©fono no es valido."
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
        msg: "El correo electrÃ³nico no es valido."
      },
      password: {
        minLength: 1,
        msg: "La contraseÃ±a no es valido."
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
          return alert('Reciberas un correo para reiniciar tu contraseÃ±a.');
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
          this.set('billing_cycles', null);
        } else {
          this.get('shipment').get('period').set('total_number', this.get('shipment').get('period').get('one_time_total_number'));
          this.get('payment').get('period').set('total_number', this.get('payment').get('period').get('one_time_total_number'));
          this.set('billing_cycles', this.get('payment').get('period').get('one_time_total_number'));
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
        if (parameter_hash['success_url']) {
          this.get('payment').set('success_url', parameter_hash['success_url']);
        }
        if (parameter_hash['failure_url']) {
          this.get('payment').set('failure_url', parameter_hash['failure_url']);
        }
        payment = this.get('payment');
        payment.set('type', provider);
        if (parameter_hash['credit_card']) {
          payment.set('credit_card', parameter_hash['credit_card']);
        }
      }
      if (this.get('payment_method') !== provider) {
        this.setPaymentMethod(provider);
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
            return window.location.href = "https://secure.conekta.mx/checkout/bank_transfer_printout?reference_id=" + model.get('reference_id');
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
              if (model.get('redirect_form_attributes')) {
                model.get('payment').set('redirect_form_attributes', model.get('redirect_form_attributes'));
              }
              if (model.get('payment').get('redirect_form_attributes')) {
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
                  return error_callback(response);
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
            if (model.get('payment').get('success_url')) {
              success_location = model.get('payment').get('success_url');
            }
            if (model.get('payment').get('failure_url')) {
              return_location = model.get('payment').get('failure_url');
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
              description = 'SubscripciÃ³n  de ';
              descriptions = model.get('items').map(function(item) {
                return ' ' + item.get('name') + (item.get('product_option_text') || '');
              });
              description += descriptions.join(', ') + ' por ' + company.get('name') + '.';
              parameters['payment_description'] = description;
            }
            simpleCart.currency(conekta.checkout.getCurrency());
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
          if (checkout_hash['payment']['success_url']) {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'payment_succeeded_url').val(checkout_hash['payment']['success_url']));
          }
          if (checkout_hash['payment']['failure_url']) {
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'payment_failed_url').val(checkout_hash['payment']['failure_url']));
          }
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
          var id, image, name, price, product_id, product_option_id, product_quantity, product_type, sku;
          id = val['id'];
          product_id = val['product_id'];
          product_option_id = val['product_option_id'];
          product_quantity = val['quantity'];
          sku = val['sku'];
          price = val['price'];
          name = val['name'];
          image = val['image'];
          product_type = val['product_type'] || 'physical';
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
            form.append(jQuery("<input/>").attr("type", "hidden").attr("name", 'items[' + i + '][product_type]').val(product_type));
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
            backbone_item.recalculate_total();
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
        setCurrency: function(currency) {
          return this._model.set('currency', currency);
        },
        getCurrency: function() {
          return this._model.get('currency') || "MXN";
        },
        getAttributes: function() {
          return this._model.toJSON();
        }
      };
      if (this instanceof conekta._models.Subscription) {
        _.extend(api, {
          setBillingPeriod: function(period_unit, period_length, recurring_number_cycles, one_time_total_number) {
            var model;
            model = this._model.get('payment').get('period');
            model.set('unit', period_unit);
            model.set('length', period_length);
            model.set('recurring_total_number', recurring_number_cycles);
            model.set('one_time_total_number', one_time_total_number);
            conekta._store.persist();
          },
          setShippingPeriod: function(period_unit, period_length, recurring_number_cycles, one_time_total_number) {
            var model;
            model = this._model.get('shipment').get('period');
            model.set('unit', period_unit);
            model.set('length', period_length);
            model.set('recurring_total_number', recurring_number_cycles);
            model.set('one_time_total_number', one_time_total_number);
            conekta._store.persist();
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
  var checkout_model, conekta_store, conekta_store_collection, data, i, new_checkout, old_conekta_store, prefix, purged_keys, _i, _ref;

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
    data = {};
    if (conekta._accessors.getCompany()) {
      data['company_id'] = conekta._accessors.getCompany().id;
    }
    data['payment'] = {};
    data['shipment'] = {};
    data['items'] = [];
    checkout_model = new conekta._models.Order(data);
    conekta._store.set('checkout_order', checkout_model);
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
var product_especial;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  page_name = "ES Subscribe 149";

  function get_special_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("149") > -1) {
        product_especial = products[i];
        break;
      }
    }
  }

  conekta.display.getProducts({}, get_special_product);

  setUpSubscription149();
})

function setUpSubscription149() {
  $("#subscribefrequency149 ul li").click(function(i) {
    $("#subscribefrequency149 ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientesubscribe149").show();
    _gaq.push(['_trackEvent', page_name, 'Frequency', 'type ' + $(this).data("frequency")]);
  });

  // siguiente button click
  $("a.nextsubscribe149").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'next']);
    nextSubscribe149();
  })
}

function nextSubscribe149() {
  conekta.checkout.new('subscription', {company_id: 2757603});
  conekta.checkout.setCurrency('MXN');
  conekta.checkout.addItem(product_especial.createItem());

  // We get the frequency
  var periodFrequencyValue = parseInt($("#subscribefrequency149 .selected").data("frequency"));

  if (conekta.checkout.getItems().length > 0 && periodFrequencyValue > 0) {
    //configure a 3 month subscription default
    if (periodFrequencyValue == 2) {
      // new syntax, and also changing from 4->3 months
      conekta.checkout.setBillingPeriod('week', 2, -1, 6);
      conekta.checkout.setShippingPeriod('week', 2, -1, 6);
    } else if (periodFrequencyValue == 4) {
      conekta.checkout.setBillingPeriod('week', 4, -1, 3);
      conekta.checkout.setShippingPeriod('week', 4, -1, 3);
    } else {
      conekta.checkout.setBillingPeriod('week', 6, -1, 2);
      conekta.checkout.setShippingPeriod('week', 6, -1, 2);
    }

    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      carrier : 'Envío Nacional',
      service_name : 'Entrega Gratis'
    });

    conekta.checkout.save();

    //conekta.checkout.proceedToCheckout();
    window.location = locale + "/shipping_mex";
  } else {
    // this case should no longer happen based on flow of page
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'failed']);
    $('html, body').animate({
      scrollTop : 0
    }, 500);
    // $("#alert").show(500)
  }
}
;
var mex_three_product;
var mex_six_product;
var mex_twelve_product;
var mex_four_product;
var usa_four_product;
var whereValue;
var locale;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("en") > -1) {
    locale = "/en";
    page_name = "EN Gift";
  } else {
    locale = "/es";
    page_name = "ES Gift";
  }

  function get_special_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("Regalo") > -1) {
        if (product_attributes.name.indexOf("Mex") > -1) {
          if (product_attributes.name.indexOf("3") > -1) {
            mex_three_product = products[i];
          } else if (product_attributes.name.indexOf("6") > -1) {
            mex_six_product = products[i];
          } else if (product_attributes.name.indexOf("12") > -1) {
            mex_twelve_product = products[i];
          } else if (product_attributes.name.indexOf("4") > -1) {
            // temporary 4 mes special
            mex_four_product = products[i];
          }
        } else if (product_attributes.name.indexOf("North") > -1) {
          if (product_attributes.name.indexOf("4") > -1) {
            // temporary 4 mes special
            usa_four_product = products[i];
          }
        }
      }
    }
  }


  conekta.display.getProducts({}, get_special_product);

  $("#content.dondegift").show();
  setUpGiftPurchase();
})

function setUpGiftPurchase() {

  $("#giftimage img").click(function(i) {
    _gaq.push(['_trackEvent', page_name, 'Clicked Image', 'next']);
    $("#content.dondegift").show();
    $('#content.dondegift').goToGift();
  });

  $("a.buygift").click(function(e) {
    e.preventDefault();
    $("#content.dondegift").show();
    $('#content.dondegift').goToGift();

    _gaq.push(['_trackEvent', page_name, 'Clicked Regala', 'regala']);
  })

  $("#giftwhere ul li").click(function(i) {
    $("#giftwhere ul li").removeClass("selected");
    $(this).addClass("selected");
    whereValue = parseInt($("#giftwhere .selected").data("where"));
    if (whereValue == 1) {
      $("#giftlengthmex ul li").removeClass("selected");
      $("#giftlengthmex").show();
      $("#giftlengthusa").hide();
      conekta.checkout.setCurrency('MXN');
    } else if (whereValue == 2) {
      $("#giftlengthmex").hide();
      $("#giftlengthusa ul li").removeClass("selected");
      $("#giftlengthusa").show();
      product = surprisemeusa_product;
      conekta.checkout.setCurrency('USD');
    } else if (whereValue == 3) {
      conekta.checkout.setCurrency('USD');
    } else if (whereValue == 4) {
      conekta.checkout.setCurrency('EUR');
    }

    $(".actions.siguientegift").hide();
    $("#content.giftlength").show();
    $('#content.giftlength').goTo();

    _gaq.push(['_trackEvent', page_name, 'Where', 'type ' + $(this).data("where")]);
  });

  $("#giftlengthmex ul li").click(function(i) {
    $("#giftlengthmex ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegift").show();
    _gaq.push(['_trackEvent', page_name, 'Mexico Length', 'type ' + $(this).data("giftlength")]);
  });

  $("#giftlengthusa ul li").click(function(i) {
    $("#giftlengthusa ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegift").show();
    _gaq.push(['_trackEvent', page_name, 'USA/Canada Length', 'type ' + $(this).data("giftlength")]);
  });

  // $("#giftlengtheurope ul li").click(function(i) {
  // $("#giftlengtheurope ul li").removeClass("selected");
  // $(this).addClass("selected");
  // $(".actions.siguientegift").show();
  // _gaq.push(['_trackEvent', 'Gift', 'Europe Length', 'type ' + $(this).data("giftlength")]);
  // });
  //
  // $("#giftlengthlatin ul li").click(function(i) {
  // $("#giftlengthlatin ul li").removeClass("selected");
  // $(this).addClass("selected");
  // $(".actions.siguientegift").show();
  // _gaq.push(['_trackEvent', 'Gift', 'South America Length', 'type ' + $(this).data("giftlength")]);
  // });

  $("a.nextgift").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'next']);
    checkOutGift();
  })
}

(function($) {
  $.fn.goToGift = function() {
    $('html, body').animate({
      scrollTop : $(this).offset().top + 'px'
    }, 250);
    return this;
    // for chaining...
  }
})(jQuery);

function checkOutGift() {
  conekta.checkout.new('order', {company_id: 2757603});

  var selected_product;
  var lengthValue;
  if (whereValue == 1) {
    conekta.checkout.setCurrency('MXN');
    lengthValue = parseInt($("#giftlengthmex .selected").data("giftlengthmex"));
    if (lengthValue == 3) {
      selected_product = mex_three_product;
    } else if (lengthValue == 6) {
      selected_product = mex_six_product;
    } else if (lengthValue == 12) {
      selected_product = mex_twelve_product;
    } else if (lengthValue == 4) {
      selected_product = mex_four_product;
    }
  } else if (whereValue == 2) {
    conekta.checkout.setCurrency('USD');
    lengthValue = parseInt($("#giftlengthusa .selected").data("giftlengthusa"));
    if (lengthValue == 3) {
    } else if (lengthValue == 6) {
    } else if (lengthValue == 12) {
    } else if (lengthValue == 4) {
      selected_product = usa_four_product;
    }
  }
  
  conekta.checkout.addItem(selected_product.createItem());

  if (conekta.checkout.getItems().length > 0) {
    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      carrier : 'Envío Nacional',
      service_name : 'Entrega Gratis'
    });

    conekta.checkout.save();
    if (whereValue == 1) {
      //conekta.checkout.proceedToCheckout();
      window.location = locale + "/shipping_mex";
    } else {
      window.location = locale + "/shipping";
    }
  } else {
    // this case should no longer happen based on flow of page
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'failed']);
    $('html, body').animate({
      scrollTop : 0
    }, 500);
    // $("#alert").show(500)
  }
}
;
var sorprendememex_product;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  function get_mex_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("México") > -1) {
        sorprendememex_product = products[i];
        break;
      }
    }
  }


  $("#gusimage img").click(function(i) {
    _gaq.push(['_trackEvent', 'Gus', 'Clicked Image', 'image']);
    $("#content.cuantogus").show();
    $('#content.cuantogus').goToPurchaseGus();
  });

  conekta.display.getProducts({}, get_mex_product);

  setUpGusPurchase();
})
function setUpGusPurchase() {
  $("a.subscribegus").click(function(e) {
    e.preventDefault();
    $("#content.cuantogus").show();
    $('#content.cuantogus').goToPurchaseGus();

    _gaq.push(['_trackEvent', 'Gus', 'Clicked Subscribe', 'subscribe']);
  })

  $("#frequencygus ul li").click(function(i) {
    $("#frequencygus ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientegus").show();
    _gaq.push(['_trackEvent', 'Gus', 'Length', 'type ' + $(this).data("frequency")]);
  });

  $("a.nextgus").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Gus', 'Clicked Next', 'next']);
    checkOutGus();
  })
}

(function($) {
  $.fn.goToPurchaseGus = function() {
    $('html, body').animate({
      scrollTop : $(this).offset().top + 'px'
    }, 250);
    return this;
    // for chaining...
  }
})(jQuery);

function checkOutGus() {
  conekta.checkout.new('subscription', {company_id: 2757603});
  conekta.checkout.addItem(sorprendememex_product.createItem());

  // We get the frequency
  var periodFrequencyValue = parseInt($("#frequencygus .selected").data("frequency"));

  if (conekta.checkout.getItems().length > 0 && periodFrequencyValue > 0) {
    //configure a 3 month subscription default
    if (periodFrequencyValue == 2) {
      conekta.checkout.setBillingPeriod('week', 2, -1, 6);
      conekta.checkout.setShippingPeriod('week', 2, -1, 6);
    } else if (periodFrequencyValue == 4) {
      conekta.checkout.setBillingPeriod('week', 4, -1, 3);
      conekta.checkout.setShippingPeriod('week', 4, -1, 3);
    } else {
      conekta.checkout.setBillingPeriod('week', 6, -1, 2);
      conekta.checkout.setShippingPeriod('week', 6, -1, 2);
    }
  }

  if (conekta.checkout.getItems().length > 0) {
    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      carrier : 'Envío Nacional',
      service_name : 'Entrega Gratis'
    });

		var referral = 'email';
    conekta.checkout.setCustomField('Si un amigo te recomendó pon su correo electrónico', referral);

    conekta.checkout.proceedToCheckout();
  }
}
;
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
    // conekta.checkout.setCustomField('utm_source', utm_source);
  }
  if (utm_medium != undefined) {
    createCookie('utm_medium', utm_medium, 30);
    // conekta.checkout.setCustomField('utm_medium', utm_medium);
  }
  if (utm_term != undefined) {
    createCookie('utm_term', utm_term, 30);
    // conekta.checkout.setCustomField('utm_term', utm_term);
  }
  if (utm_content != undefined) {
    createCookie('utm_content', utm_content, 30);
    // conekta.checkout.setCustomField('utm_content', utm_content);
  }
  if (utm_campaign != undefined) {
    createCookie('utm_campaign', utm_campaign, 30);
    // conekta.checkout.setCustomField('utm_campaign', utm_campaign);
  }

  //conekta.checkout.save();
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
;
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
;
var especial_product;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  function get_special_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
    	if (product_attributes.name.indexOf("Padre") > -1) {
  	    especial_product = products[i];
  	    break;
      }
    }
  }

  $("#padreimage img").click(function(i) {
    _gaq.push(['_trackEvent', 'Especial', 'Clicked Image', 'next']);
    checkOut();
  });

  conekta.display.getProducts(
  	{},
  get_special_product);

  setUpSpecialPurchase();
})

function setUpSpecialPurchase() {
  $("a.buy").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', 'Especial', 'Clicked Buy', 'next']);
    
    checkOut();
  })
}

function checkOut() {
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
}
;
var success_url_callback;
var failure_url_callback;
var locale;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("en") > -1) {
    locale = "/en";
    page_name = "EN Payment";
  } else {
    locale = "/es";
    page_name = "ES Payment";
  }

  if (window.location.pathname.indexOf("payment") > -1) {
    if (conekta.checkout.getItems().length == 0) {
      window.location = locale + "/subscribe";
    } else {
      // will comment this out for production (may crash some IE's)
      //console.log(conekta.checkout.getItems()[0]);
    }
  }

  // var ship_attr = conekta.checkout.getShippingOptions()[0];
  // var week = ship_attr.week;
  // console.log('week' + week);

  success_url_callback = "http://www.mycoffeebox.com" + locale + "/order_success";
  failure_url_callback = "http://www.mycoffeebox.com" + locale + "/order_failure";

  setUpPayment();
})
function setUpPayment() {

  $("#payment ul li").click(function(i) {
    $("#payment ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientepay").show();

    var paymentType = parseInt($("#payment .selected").data("paymenttype"));

    if (paymentType == 1) {
      $("a.nextpay").hide();
      $("a.nextpaypal").show();
    } else if (paymentType == 2) {
      $("a.nextpaypal").hide();
      $("a.nextpay").show();
    }
    _gaq.push(['_trackEvent', page_name, 'Method', 'type ' + $(this).data("paymenttype")]);
  });

  $('a.nextpaypal').click(function(event) {
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'paypal']);
    event.preventDefault();
    nextPayPal();
  });

  $('a.nextpay').click(function(event) {
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'bank']);
    event.preventDefault();
    nextBank();
  });

}

function nextPayPal() {
  function credit_card_callback(info) {
    var url_location = "https://secure.conekta.mx/checkout/payment_confirmation?reference_id=" + 'paypal';
    document.location.href = url_location;
  }

  conekta.checkout.processPayment({
    payment_method : 'paypal',
    success_callback : credit_card_callback, // this supposedly doesn't matter
    success_url : success_url_callback,
    failure_url : failure_url_callback
  });

  //conekta.checkout.proceedToCheckout();
}


function nextBank() {
  function bank_callback(info) {
    var url_location = "https://secure.conekta.mx/checkout/payment_confirmation?reference_id=" + 'bank';
    document.location.href = url_location;
  }

  conekta.checkout.processPayment({
    payment_method : 'bank_transfer',
    success_callback : bank_callback, // this supposedly doesn't matter
    success_url : success_url_callback,
    failure_url : failure_url_callback
  });

  //conekta.checkout.proceedToCheckout();
}
;
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
var locale;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("en") > -1) {
    locale = "/en";
    page_name = "EN Shipping";
  } else {
    locale = "/es";
    page_name = "ES Shipping";
  }

  if (window.location.pathname.indexOf("shipping") > -1) {
    if (conekta.checkout.getItems().length == 0) {
      window.location = locale + "/subscribe";
    } else {
      // will comment this out for production (may crash some IE's)
      //console.log(conekta.checkout.getItems()[0]);
    }
  }

  setUpShipping();
})
function setUpShipping() {
  $('input[type=text]').addClass("empty");

  $($('input[type=text]')).blur(function() {
    $('input[type=text]').filter(function() {
      return $(this).val() != "";
    }).removeClass("empty");
    $('input[type=text]').filter(function() {
      return $(this).val() == "";
    }).addClass("empty");
  });

  $('input[type=text]').blur(function() {
    var el = $(this);
    if (el.val().length > 0) {
      el.removeClass("invalid");
    }
  });

  $('a.nextship').click(function(event) {
    _gaq.push(['_trackEvent', page_name, 'clicked', 'Next']);
    event.preventDefault();
    nextShip();
  });

}

function nextShip() {
  if (!validateShippingForm()) {
    return;
  }

  conekta.checkout.save();
  if (window.location.pathname.indexOf("mex") > -1) {
    // go to payment option page for mexico customers
    window.location = locale + "/payment";
  } else {
    // paypal only option for international customers
    function credit_card_callback(info) {
      var url_location = "https://secure.conekta.mx/checkout/payment_confirmation?reference_id=" + 'paypal';
      document.location.href = url_location;
    }

    var success_url_callback;
    var failure_url_callback;
    success_url_callback = "http://www.mycoffeebox.com" + locale + "/order_success";
    failure_url_callback = "http://www.mycoffeebox.com" + locale + "/order_failure";

    conekta.checkout.processPayment({
      payment_method : 'paypal',
      success_callback : credit_card_callback, // this supposedly doesn't matter
      success_url : success_url_callback,
      failure_url : failure_url_callback
    });

    //conekta.checkout.proceedToCheckout();
  }
}

function validateShippingForm() {
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
  var adicional = $("#adicional").val();

  var valid = true;
  if (nombre.length < 2 || nombre.length > 30) {
    $("#nombre").addClass("invalid");
    valid = false;
  }
  if (coffeetype.length < 2 || coffeetype.length > 30) {
    $("#coffeetype").addClass("invalid");
    valid = false;
  }
  if (correo.length < 2) {
    $("#email").addClass("invalid");
    valid = false
  } else {
    var atpos = correo.indexOf("@");
    var dotpos = correo.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= correo.length) {
      $("#email").addClass("invalid");
      valid = false;
    }
    // alternatively can try regex validation: /^[a-zA-Z0-9_.-]+@[a-z0-9][a-z0-9\-]{1,64}(\.[a-z]{2,4}|[a-z]{2,3}\.[a-z]{2})$/i
  }
  if (calle.length < 2 || calle.length > 30) {
    $("#calle").addClass("invalid");
    valid = false;
  }
  if (window.location.pathname.indexOf("mex") > -1) {
    if (colonia.length < 2 || colonia.length > 30) {
      $("#colonia").addClass("invalid");
      valid = false;
    }
  }
  if (ciudad.length < 2 || ciudad.length > 30) {
    $("#ciudad").addClass("invalid");
    valid = false;
  }
  if (estado.length < 2 || estado.length > 30) {
    $("#estado").addClass("invalid");
    valid = false;
  }
  if (cp.length < 4 || cp.length > 30) {
    $("#cp").addClass("invalid");
    valid = false;
  }
  if (pais.length < 2 || pais.length > 30) {
    $("#pais").addClass("invalid");
    valid = false;
  }
  if (telefono.length < 8 || !telefono.match(/^[0-9\s-\(\)]+$/)) {
    // accept numbers, spaces, -()
    $("#telefono").addClass("invalid");
    valid = false;
  }
  if (!valid) {
    _gaq.push(['_trackEvent', page_name, 'Data entry', 'failed']);
    $('#directions').goTo();
    return false;
  }

  // TODO: temp until conekta removes validation for this field
  if (colonia.length < 2) {
    colonia = 'n/a';
  }

  conekta.checkout.setShippingAddress({
    name : nombre,
    street : calle,
    colonia : colonia,
    city : ciudad,
    state : estado,
    postal_code : cp,
    country : pais,
    email : correo,
    phone : telefono
  });

  conekta.checkout.setCustomField('¿Lo quiere en Grano o Molido Tradicional?', coffeetype);
  conekta.checkout.setCustomField('Si un amigo te recomendó pon su correo electrónico', referral);
  conekta.checkout.setCustomField('Promo Code', promocode);

  // track referral URL if applicable
  if (readCookie('utm_source') != undefined) {
    conekta.checkout.setCustomField('utm_source', readCookie('utm_source'));
  }
  if (readCookie('utm_medium') != undefined) {
    conekta.checkout.setCustomField('utm_medium', readCookie('utm_medium'));
  }
  if (readCookie('utm_term') != undefined) {
    conekta.checkout.setCustomField('utm_term', readCookie('utm_term'));
  }
  if (readCookie('utm_content') != undefined) {
    conekta.checkout.setCustomField('utm_content', readCookie('utm_content'));
  }
  if (readCookie('utm_campaign') != undefined) {
    conekta.checkout.setCustomField('utm_campaign', readCookie('utm_campaign'));
  }

  conekta.checkout.setCustomField('Información adicional', adicional);

  return true;
}
;
(function() {


}).call(this);
(function() {


}).call(this);
/* Copyright (c) 2010-2012 Marcus Westin */

this.JSON||(this.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(){function h(){try{return d in b&&b[d]}catch(a){return!1}}function i(){try{return e in b&&b[e]&&b[e][b.location.hostname]}catch(a){return!1}}var a={},b=window,c=b.document,d="localStorage",e="globalStorage",f="__storejs__",g;a.disabled=!1,a.set=function(a,b){},a.get=function(a){},a.remove=function(a){},a.clear=function(){},a.transact=function(b,c,d){var e=a.get(b);d==null&&(d=c,c=null),typeof e=="undefined"&&(e=c||{}),d(e),a.set(b,e)},a.getAll=function(){},a.serialize=function(a){return JSON.stringify(a)},a.deserialize=function(a){if(typeof a!="string")return undefined;try{return JSON.parse(a)}catch(b){return a||undefined}};if(h())g=b[d],a.set=function(b,c){return c===undefined?a.remove(b):(g.setItem(b,a.serialize(c)),c)},a.get=function(b){return a.deserialize(g.getItem(b))},a.remove=function(a){g.removeItem(a)},a.clear=function(){g.clear()},a.getAll=function(){var b={};for(var c=0;c<g.length;++c){var d=g.key(c);b[d]=a.get(d)}return b};else if(i())g=b[e][b.location.hostname],a.set=function(b,c){return c===undefined?a.remove(b):(g[b]=a.serialize(c),c)},a.get=function(b){return a.deserialize(g[b]&&g[b].value)},a.remove=function(a){delete g[a]},a.clear=function(){for(var a in g)delete g[a]},a.getAll=function(){var b={};for(var c=0;c<g.length;++c){var d=g.key(c);b[d]=a.get(d)}return b};else if(c.documentElement.addBehavior){var j,k;try{k=new ActiveXObject("htmlfile"),k.open(),k.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'),k.close(),j=k.w.frames[0].document,g=j.createElement("div")}catch(l){g=c.createElement("div"),j=c.body}function m(b){return function(){var c=Array.prototype.slice.call(arguments,0);c.unshift(g),j.appendChild(g),g.addBehavior("#default#userData"),g.load(d);var e=b.apply(a,c);return j.removeChild(g),e}}var n=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");function o(a){return a.replace(n,"___")}a.set=m(function(b,c,e){return c=o(c),e===undefined?a.remove(c):(b.setAttribute(c,a.serialize(e)),b.save(d),e)}),a.get=m(function(b,c){return c=o(c),a.deserialize(b.getAttribute(c))}),a.remove=m(function(a,b){b=o(b),a.removeAttribute(b),a.save(d)}),a.clear=m(function(a){var b=a.XMLDocument.documentElement.attributes;a.load(d);for(var c=0,e;e=b[c];c++)a.removeAttribute(e.name);a.save(d)}),a.getAll=m(function(b){var c=b.XMLDocument.documentElement.attributes;b.load(d);var e={};for(var f=0,g;g=c[f];++f)e[g]=a.get(g);return e})}try{a.set(f,f),a.get(f)!=f&&(a.disabled=!0),a.remove(f)}catch(l){a.disabled=!0}a.enabled=!a.disabled,typeof module!="undefined"&&typeof module!="function"?module.exports=a:typeof define=="function"&&define.amd?define(a):this.store=a}()
;
var surprisememex_product;
var surprisemeusa_product;
var surprisemelatin_product;
var surprisemeeuro_product;
var locale;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  if (window.location.pathname.indexOf("en") > -1) {
    locale = "/en";
    page_name = "EN Subscribe";
  } else {
    locale = "/es";
    page_name = "ES Subscribe";
  }

  function render_products(products) {
    // TODO statically displaying bags
    $("#content > ul").append(getStaticPhotoForProduct("/images/triunfo.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/vinic.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/metik.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/biocafe.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/majomut.png", 0));
    $("#content > ul").append(getStaticPhotoForProduct("/images/biomaya.png", 0));

    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("Suscripción") > -1 || product_attributes.name.indexOf("Subscription") > -1) {
        if (product_attributes.name.indexOf("México") > -1 && product_attributes.name.indexOf("149") < 0) {
          surprisememex_product = products[i];
        } else if (product_attributes.name.indexOf("North") > -1) {
          surprisemeusa_product = products[i];
        } else if (product_attributes.name.indexOf("South") > -1) {
          surprisemelatin_product = products[i];
        } else if (product_attributes.name.indexOf("Europe") > -1) {
          surprisemeeuro_product = products[i];
        } else if (product_attributes.name.indexOf("Especial") > -1) {
          // filter out special promos (father's day for now)
        } else if (product_attributes.name.indexOf("Regalo") > -1) {
          // filter out special gifts for now
        } else {
          // TODO going to statically display coffee bags for now
          //$("#content > ul").append(getTemplateForProduct(products[i], i));
        }
      }
    }
  }


  conekta.display.getProducts({}, render_products);

  setUpSubscription();
})
function getStaticPhotoForProduct(image_name, id_num) {
  var template = $("#template").clone();
  template.attr('id', 'template' + (id_num));
  template.show();

  $("#product", template).html("<img src='" + image_name + "'/>");
  //addInteractionsToProductTemplate(template, product);
  return template;
}

function getTemplateForProduct(product, id_num) {
  var template = $("#template").clone();
  template.attr('id', 'template' + (id_num));
  template.show();
  // The template is usually hidden

  product_attributes = product.getAttributes();

  // comment out logs before production (crashes older IE's)
  //console.log(product_attributes);

  $("#product", template).html("<img src='" + product_attributes.image + "'/>");
  $("#name", template).html(product_attributes.name);
  $("#brand", template).html(product_attributes.name);
  $("#shortdescription", template).html(product_attributes.short_description);
  $("#description", template).html(product_attributes.description);
  $("#price", template).html("$" + product_attributes.price + " MXN");
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

    _gaq.push(['_trackEvent', 'Catalog', 'Product Hover', product.getAttributes().name]);
  }, function() {
    var el = $(this);
    el.children(".rollover").hide();
    el.children("#product").css("opacity", "1")
    el.children("h3").show();
  })
}

function unselectProductTemplates() {
  var i = 0;
  var template = $("#template" + i);

  //  while (template != 'undefined' && template != null) {
  while (i < num_products) {// HARDCODING for now
    template.removeClass("selected");
    i++;
    template = $("#template" + i);
  }
}

function setUpSubscription() {
  // subscribe/join button click
  $("a.surpriseme").click(function(e) {
    e.preventDefault();
    $("#content.dondesubscribe").show();
    $('#content.dondesubscribe').goTo();

    _gaq.push(['_trackEvent', page_name, 'Clicked Personaliza', 'personaliza']);
  })

  $("#subscribewhere ul li").click(function(i) {
    $("#subscribewhere ul li").removeClass("selected");
    $(this).addClass("selected");
    $("#content.cuantosubscribe").show();
    $('#content.cuantosubscribe').goTo();

    _gaq.push(['_trackEvent', page_name, 'Where', 'type ' + $(this).data("where")]);
  });

  $("#subscribefrequency ul li").click(function(i) {
    $("#subscribefrequency ul li").removeClass("selected");
    $(this).addClass("selected");
    $(".actions.siguientesubscribe").show();
    _gaq.push(['_trackEvent', page_name, 'Frequency', 'type ' + $(this).data("frequency")]);
  });

  // siguiente button click
  $("a.nextsubscribe").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'next']);
    nextSubscribe();
  })
}

function nextSubscribe() {
  conekta.checkout.new('subscription', {company_id: 2757603});

  // We get the subscription location
  var whereValue = parseInt($("#subscribewhere .selected").data("where"));

  var product;
  if (whereValue == 1) {
    product = surprisememex_product;
    conekta.checkout.setCurrency('MXN');
  } else if (whereValue == 2) {
    product = surprisemeusa_product;
    conekta.checkout.setCurrency('USD');
  } else if (whereValue == 3) {
    product = surprisemelatin_product;
    conekta.checkout.setCurrency('USD');
  } else if (whereValue == 4) {
    product = surprisemeeuro_product;
    conekta.checkout.setCurrency('EUR');
  }

  conekta.checkout.addItem(product.createItem());
  // TODO get following lines to work
  //var product_attributes = product.getAttributes();
  //conekta.checkout.setCurrency(product_attributes.currency);

  // We get the frequency
  var periodFrequencyValue = parseInt($("#subscribefrequency .selected").data("frequency"));

  if (conekta.checkout.getItems().length > 0 && periodFrequencyValue > 0) {
    //configure a 3 month subscription default
    if (periodFrequencyValue == 2) {
      // new syntax, and also changing from 4->3 months
      conekta.checkout.setBillingPeriod('week', 2, -1, 6);
      conekta.checkout.setShippingPeriod('week', 2, -1, 6);
    } else if (periodFrequencyValue == 4) {
      conekta.checkout.setBillingPeriod('week', 4, -1, 3);
      conekta.checkout.setShippingPeriod('week', 4, -1, 3);
    } else {
      conekta.checkout.setBillingPeriod('week', 6, -1, 2);
      conekta.checkout.setShippingPeriod('week', 6, -1, 2);
    }

    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      carrier : 'Envío Nacional',
      service_name : 'Entrega Gratis'
    });

    conekta.checkout.save();
    if (whereValue == 1) {
      //conekta.checkout.proceedToCheckout();
      window.location = locale + "/shipping_mex";
    } else {
      window.location = locale + "/shipping";
    }
  } else {
    // this case should no longer happen based on flow of page
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'failed']);
  }
}
;
(function() {


}).call(this);
var tuola_product;
var page_name;

$(function() {
  conekta.setToken('YE138iSl1KAFfZxRS3f');

  page_name = "ES Tuola";

  function get_tuola_product(products) {
    for (var i = 0; i < products.length; i++) {
      product_attributes = products[i].getAttributes();
      if (product_attributes.name.indexOf("Gratis") > -1) {
        tuola_product = products[i];
        break;
      }
    }
  }

  conekta.display.getProducts({}, get_tuola_product);

  setUpTuolaPurchase();
})

function setUpTuolaPurchase() {

  $("a.nexttuola").click(function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'next']);
    checkOutTuola();
  })
}

function checkOutTuola() {
  if (!validateTuolaForm()) {
    return;
  }

  conekta.checkout.new ('order', {company_id: 2757603});

  conekta.checkout.addItem(tuola_product.createItem());

  if (conekta.checkout.getItems().length > 0) {
    // free shipping
    conekta.checkout.setShippingOption({
      id : 891,
      cost : 0.0,
      // for some reason, this file is throwing encoding error in rails
      carrier : 'Envio Nacional',
      service_name : 'Entrega Gratis'
    });

    conekta.checkout.save();
    if (whereValue == 1) {
      conekta.checkout.proceedToCheckout();
      //window.location = "es/shipping_mex";
    }
  } else {
    // this case should no longer happen based on flow of page
    _gaq.push(['_trackEvent', page_name, 'Clicked Next', 'failed']);
  }
}

function validateTuolaForm() {
  var promocode = $('#promocode.tuola').val();
  // obviously will obscure this in the backend one day
  var allcodes = "MCB8O3C3G0D8,MCB3H8O3Q2P5,MCB6W4T6Y2H2,MCB9M9G1F2T2,MCB2U0Z2V0W2,MCB6R5V0Q4Q4,MCB4M4D1W4E9,MCB9H6K0B6H1,MCB6E2R2D6P4,MCB0X6S6H3O6,MCB3O1L2S0N7,MCB6X5H3E9N3,MCB8Q0E8T9Y0,MCB9E2S1D6F9,MCB6J4Y2S1W7,MCB5Z4Q0T1O1,MCB8N8P7O5X9,MCB4M8J2B5T9,MCB7T6R2Q7Z9,MCB9I3N6P5V0";

  var valid = true;
  if (promocode.length < 1 || allcodes.indexOf(promocode) < 0) {
    $("#promocode").addClass("invalid");
    valid = false;
  }
  if (!valid) {
    _gaq.push(['_trackEvent', page_name, 'Data entry', 'failed']);    $('#directions').goTo();
    return false;
  }

  conekta.checkout.setCustomField('Promo Code', promocode);

  return true;
}
;
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//



;
