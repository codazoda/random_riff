// Define the QuickUser class
function QuickUser() {

	// Create the data property array
	this.data = new Array();
	
	// --------------
	// Public Methods
	// --------------
	
	// Public method for writing data to the data array
	this.set = function(id, val) {
		// Write this value to the data array
		this.data[id] = val;
		// Store this data in a cookie
		this.store();
	}
	
	// Public method for reading data from the data array
	this.get = function(id) {
		// Return the value from the data array
		return this.data[id];
	}
	
	// ---------------
	// Private Methods (Someday Maybe)
	// ---------------

	// QuickUser Constructor
	this.QuickUser = function () {
		// Load the cookie
		//var dataStr = this.getCookie('data');
		// Load from HTML5 local database
		var dataStr = localStorage.getItem('data');
		// If the data exists
		if (dataStr != null && dataStr != '') {
			// Unserialize the cookie into the data array
			this.data = this.unserialize(dataStr);
			// Add a hit
			this.set("hits", this.get("hits") + 1);
		} else {
			// Setup a very random user id
			var id = this.user();
			// Set the user ID
			this.set("id", id);
			// Set the hits
			this.set("hits", 1);
		}
		
	}

	// Setup a new very random user id
	this.user = function () {
		// Setup a blank id
		var id = '';
		// Setup a list of possible digits
		var digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		// Loop 10 times
		for ($i=1;$i<=10;$i++) {
			// Randomly pick a digit
			var start = Math.floor(Math.random()*61);
			var end = start + 1;
			// Add that digit to the id
			id = id + digits.substring(start, end);
		}
		return id;
	}
	
	// Store the data array in a cookie (private)
	this.store = function () {
		// Serialize the data array into a string
		var dataStr = this.serialize(this.data);
		// Set the cookie
		//this.setCookie('data', dataStr, 3650);
		// Store in HTML5 local database
		localStorage.setItem('data', dataStr);
	}
	
	// setCookie function (private) - from w3schools.com
	this.setCookie = function (c_name,value,expiredays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	}

	// getCookie function (private) - from w3schools.com
	this.getCookie = function (c_name) {
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=");
		  if (c_start!=-1)
			{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
			}
		  }
		return "";
	}

	// Serialize function (private)
	this.serialize = function (mixed_value) {
		// http://kevin.vanzonneveld.net
		// +   original by: Arpad Ray (mailto:arpad@php.net)
		// +   improved by: Dino
		// +   bugfixed by: Andrej Pavlovic
		// +   bugfixed by: Garagoth
		// +      input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)
		// +   bugfixed by: Russell Walker (http://www.nbill.co.uk/)
		// +   bugfixed by: Jamie Beck (http://www.terabit.ca/)
		// %          note: We feel the main purpose of this function should be to ease the transport of data between php & js
		// %          note: Aiming for PHP-compatibility, we have to translate objects to arrays
		// *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
		// *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
		// *     example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
		// *     returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'
	 
		var _getType = function (inp) {
		    var type = typeof inp, match;
		    var key;
		    if (type == 'object' && !inp) {
		        return 'null';
		    }
		    if (type == "object") {
		        if (!inp.constructor) {
		            return 'object';
		        }
		        var cons = inp.constructor.toString();
		        match = cons.match(/(\w+)\(/);
		        if (match) {
		            cons = match[1].toLowerCase();
		        }
		        var types = ["boolean", "number", "string", "array"];
		        for (key in types) {
		            if (cons == types[key]) {
		                type = types[key];
		                break;
		            }
		        }
		    }
		    return type;
		};
		var type = _getType(mixed_value);
		var val, ktype = '';
		
		switch (type) {
		    case "function": 
		        val = ""; 
		        break;
		    case "boolean":
		        val = "b:" + (mixed_value ? "1" : "0");
		        break;
		    case "number":
		        val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
		        break;
		    case "string":
		        val = "s:" + encodeURIComponent(mixed_value).replace(/%../g, 'x').length + ":\"" + mixed_value + "\"";
		        break;
		    case "array":
		    case "object":
		        val = "a";
		        var count = 0;
		        var vals = "";
		        var okey;
		        var key;
		        for (key in mixed_value) {
		            ktype = _getType(mixed_value[key]);
		            if (ktype == "function") { 
		                continue; 
		            }
		            
		            okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
		            vals += this.serialize(okey) +
		                    this.serialize(mixed_value[key]);
		            count++;
		        }
		        val += ":" + count + ":{" + vals + "}";
		        break;
		    case "undefined": // Fall-through
		    default: // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
		        val = "N";
		        break;
		}
		if (type != "object" && type != "array") {
		    val += ";";
		}
		return val;
	}

	// Unserialize function (private)
	this.unserialize = function (data) {
		// http://kevin.vanzonneveld.net
		// +     original by: Arpad Ray (mailto:arpad@php.net)
		// +     improved by: Pedro Tainha (http://www.pedrotainha.com)
		// +     bugfixed by: dptr1988
		// +      revised by: d3x
		// +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +        input by: Brett Zamir (http://brett-zamir.me)
		// +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +     improved by: Chris
		// +     improved by: James
		// %            note: We feel the main purpose of this function should be to ease the transport of data between php & js
		// %            note: Aiming for PHP-compatibility, we have to translate objects to arrays
		// *       example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
		// *       returns 1: ['Kevin', 'van', 'Zonneveld']
		// *       example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
		// *       returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}
	 
		var error = function (type, msg, filename, line){throw new this.window[type](msg, filename, line);};
		var read_until = function (data, offset, stopchr){
		    var buf = [];
		    var chr = data.slice(offset, offset + 1);
		    var i = 2;
		    while (chr != stopchr) {
		        if ((i+offset) > data.length) {
		            error('Error', 'Invalid');
		        }
		        buf.push(chr);
		        chr = data.slice(offset + (i - 1),offset + i);
		        i += 1;
		    }
		    return [buf.length, buf.join('')];
		};
		var read_chrs = function (data, offset, length){
		    var buf;
	 
		    buf = [];
		    for (var i = 0;i < length;i++){
		        var chr = data.slice(offset + (i - 1),offset + i);
		        buf.push(chr);
		    }
		    return [buf.length, buf.join('')];
		};
		var _unserialize = function (data, offset){
		    var readdata;
		    var readData;
		    var chrs = 0;
		    var ccount;
		    var stringlength;
		    var keyandchrs;
		    var keys;
	 
		    if (!offset) {offset = 0;}
		    var dtype = (data.slice(offset, offset + 1)).toLowerCase();
	 
		    var dataoffset = offset + 2;
		    var typeconvert = new Function('x', 'return x');
	 
		    switch (dtype){
		        case 'i':
		            typeconvert = function (x) {return parseInt(x, 10);};
		            readData = read_until(data, dataoffset, ';');
		            chrs = readData[0];
		            readdata = readData[1];
		            dataoffset += chrs + 1;
		        break;
		        case 'b':
		            typeconvert = function (x) {return parseInt(x, 10) !== 0;};
		            readData = read_until(data, dataoffset, ';');
		            chrs = readData[0];
		            readdata = readData[1];
		            dataoffset += chrs + 1;
		        break;
		        case 'd':
		            typeconvert = function (x) {return parseFloat(x);};
		            readData = read_until(data, dataoffset, ';');
		            chrs = readData[0];
		            readdata = readData[1];
		            dataoffset += chrs + 1;
		        break;
		        case 'n':
		            readdata = null;
		        break;
		        case 's':
		            ccount = read_until(data, dataoffset, ':');
		            chrs = ccount[0];
		            stringlength = ccount[1];
		            dataoffset += chrs + 2;
	 
		            readData = read_chrs(data, dataoffset+1, parseInt(stringlength, 10));
		            chrs = readData[0];
		            readdata = readData[1];
		            dataoffset += chrs + 2;
		            if (chrs != parseInt(stringlength, 10) && chrs != readdata.length){
		                error('SyntaxError', 'String length mismatch');
		            }
		        break;
		        case 'a':
		            readdata = {};
	 
		            keyandchrs = read_until(data, dataoffset, ':');
		            chrs = keyandchrs[0];
		            keys = keyandchrs[1];
		            dataoffset += chrs + 2;
	 
		            for (var i = 0; i < parseInt(keys, 10); i++){
		                var kprops = _unserialize(data, dataoffset);
		                var kchrs = kprops[1];
		                var key = kprops[2];
		                dataoffset += kchrs;
	 
		                var vprops = _unserialize(data, dataoffset);
		                var vchrs = vprops[1];
		                var value = vprops[2];
		                dataoffset += vchrs;
	 
		                readdata[key] = value;
		            }
	 
		            dataoffset += 1;
		        break;
		        default:
		            error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
		        break;
		    }
		    return [dtype, dataoffset - offset, typeconvert(readdata)];
		};
		
		return _unserialize((data+''), 0)[2];
	}

	// ----
	// Main
	// ----	

	// Run the constructor
	this.QuickUser();
	
}
