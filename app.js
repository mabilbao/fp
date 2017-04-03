function init() {
	console.log('Ejecutando...');
	
	// Device
	getDevice();
	getBattery();
	getGPU();

	// Geolocation
	// getGeolocation();
	getGeoIp();

	// Fingerprint
	getManualTest();
	getFingerprintJSTest();
	getClientJSTest();

	console.log('Fin');
}

function getDevice() {
	var parser = new UAParser();
    var data = {};
    if (parser.getDevice() && parser.getDevice().name) {
        data['device'] = parser.getDevice();
    }
    if (parser.getCPU() && parser.getCPU().name) {
        data['cpu'] = navigator.platform + ' - ' + parser.getCPU() + ', ' + (navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' Cores' : '');
    }else{
    	data['cpu'] = navigator.platform + ', ' + (navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' Cores' : '');
    }

    if ( data != {} ) {
		output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#device');
    }
}

function getBattery() {
	navigator.getBattery().then(function(battery) {
        let data = {};
        data['charging'] = (battery.charging ? 'charging' : 'not charging');
        data['level'] = (Math.round(battery.level * 10000) / 100) + '%';
        if (!battery.charging) {
            data['#ischargingTime'] = 'Time remaining: ' + (battery.dischargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.dischargingTime / 3600) / 100) + 'h');
        } else {
            data['dischargingTime'] = 'Charging Time: ' + (battery.chargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.chargingTime / 3600) / 100) + 'h');
        }
		output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#battery');
    });
}

function getGPU() {
	var data = {};
	var gl = undefined;
	var canvas = document.getElementById("glcanvas");
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {}
    if ( gl != undefined ) {
        var extension = gl.getExtension('WEBGL_debug_renderer_info');
        if (extension != undefined) {
            data['vendor'] = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
            data['renderer'] = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
        } else {
            data['vendor'] = gl.getParameter(gl.VENDOR);
            data['renderer'] = gl.getParameter(gl.RENDERER);
        }
    }
    data['display'] = window.screen.width + ' x ' + window.screen.height + ' - ' + window.screen.colorDepth + 'bits/pixel';
	output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#gpu');
}

function getGeoIp() {
	var onSuccess = function(location){
		let data = {};
		data.continent = location.continent.names.en;
		data.country = location.country.names.en;
		data.city = location.city.names.en;
		// data.subdivision = location.subdivisions;
		data.postal = location.postal;
		data.location = location.location;
		data.traits = location.traits;
		
        var el = document.getElementById("geo-ip__map");
        var loc = location.location.latitude + ',' + location.location.longitude;
		el.innerHTML = '<a target="_blank" href="http://maps.google.com/maps/place/' + loc + '/@' + loc + ',10z/data=!3m1!1e3"><img src=https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=700x400&maptype=roadmap&markers=color:red%7Clabel:C%7C' + loc + '&key=AIzaSyDWO8tV87DC4tCaHOLoADkL71G-jcyBdwk ></a><br><br>';
	    let geoCoordinates = {};
            
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function() {
            if (xhttp2.readyState == 4 && xhttp2.status == 200) {
                var locationName = JSON.parse(xhttp2.responseText).results;
                data['address'] = locationName[0].formatted_address;
				output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#geo-ip__data');
            }
        };
        xhttp2.open("POST", 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc + '&sensor=true', true);
        xhttp2.send();
	};
	var onError = function(error){
		console.error(JSON.stringify(error, undefined, 4)); 
	};
	 
	geoip2.city(onSuccess, onError);
}

function getGeolocation() {
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var el = document.getElementById("location__map");
        var data = {};
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var geolocation = JSON.parse(xhttp.responseText).location;
            var loc = geolocation.lat + ',' + geolocation.lng;
            el.innerHTML = '<a target="_blank" href="http://maps.google.com/maps/place/' + loc + '/@' + loc + ',10z/data=!3m1!1e3"><img src=https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=700x400&maptype=roadmap&markers=color:red%7Clabel:C%7C' + loc + '&key=AIzaSyDWO8tV87DC4tCaHOLoADkL71G-jcyBdwk ></a><br><br>';
            let geoCoordinates = {};
            geoCoordinates['lat'] = geolocation.lat; 
            geoCoordinates['lng'] = geolocation.lng; 
            data['geo_coordinates'] = geoCoordinates;

            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function() {
                if (xhttp2.readyState == 4 && xhttp2.status == 200) {
                    var locationName = JSON.parse(xhttp2.responseText).results;
                    data['location'] = locationName[0].formatted_address;
					output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#location__data');
                }
            };

            xhttp2.open("POST", 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + geolocation.lat + ',' + geolocation.lng + '&sensor=true', true);
            xhttp2.send();
        }
        if (xhttp.readyState == 4 && (xhttp.status == 403 || xhttp.status == 500)) {
            el.innerHTML += 'Sorry! Our Google Geolocation API Quota exceeded. Maybe refresh the page to try again.';
        }
    };
    var key = "AIzaSyAGXgeg_PA50r_H8u5_XPE06jZI6xyYIRw";
    xhttp.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key, true);
    xhttp.send();
}

function getManualTest() {
	let data = {};
	data['fingerprint_hash'] = 'We need tro calculate this value!';

	data.adobe = fingerprint_flash();
	data.browser = fingerprint_browser();
	data.androidConnection = fingerprint_android_connection();
	data.canvas = fingerprint_canvas();
	data.cookie = fingerprint_cookie();
	data.fonts = fingerprint_fonts();
	data.fontsmoothing = fingerprint_fontsmoothing();
	data.formfields = fingerprint_formfields();
	data.java = fingerprint_java();
	data.language = fingerprint_language();
	data.latency = fingerprint_latency();
	data.os = fingerprint_os();
	data.plugins = fingerprint_plugins();
	data.screen = fingerprint_display();
	data.silverlight = fingerprint_silverlight();
	data.timezone = fingerprint_timezone();
	data.touch = fingerprint_touch();
	data.trueBrowser = fingerprint_truebrowser();
	data.useragent = fingerprint_useragent();

	output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#manual__data');

}

function getFingerprintJSTest() {
	let data = {};
	new Fingerprint2().get(function(result, components){
	  	data['fingerprint_hash'] = result;
		components.forEach(function(element, index, array){
			data[element.key] = element.value;
	  	});
		output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#fingerprint__data');
	});
}

function getClientJSTest() {
	// Create a new ClientJS object
	let client = new ClientJS();

	let data = {};
	data['fingerprint__hash'] = client.getFingerprint();
	data['browser_data'] = client.getBrowserData();
	data

	output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#client__data');
}

function languages(langs) {
    if (!langs.reduce) {
        return languageMap[langs];
    }
    return langs.reduce(function(a, e) {
        if (e === 'en-US' && langs.indexOf('en-US') > -1) {
            return a;
        }
        return a + (window.languageMap[e] ? (window.languageMap[e].int + ', ') : (e + ', '))
    }, '');
}

function output(inp, container) {
	if ( typeof container === 'undefined' ){
    	document.body.appendChild(document.createElement('pre')).innerHTML = inp;		
	}else{
		document.querySelector(container).appendChild(document.createElement('pre')).innerHTML = inp;
	}
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

init();


