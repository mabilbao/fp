// (function() {
//     var parser = new UAParser();
//     var data = {};
//     if (parser.getDevice() && parser.getDevice().name) {
//         data['device'] = parser.getDevice();
//     }
//     if (parser.getCPU() && parser.getCPU().name) {
//         data['cpu'] = parser.getDevice() + ' ' + parser.getCPU();
//     }
//     navigator.getBattery().then(function(battery) {
//         let batteryData = {};
//         batteryData['charging'] = (battery.charging ? 'charging' : 'not charging');
//         batteryData['level'] = (Math.round(battery.level * 10000) / 100) + '%';
//         if (!battery.charging) {
//             batteryData['#ischargingTime'] = 'Time remaining: ' + (battery.dischargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.dischargingTime / 3600) / 100) + 'h');
//         } else {
//             batteryData['dischargingTime'] = 'Charging Time: ' + (battery.chargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.chargingTime / 3600) / 100) + 'h');
//         }
//     }

//     // function updateBatteryStatus(battery) {
//     //     document.querySelector('#charging').innerHTML = '<b>Battery</b><br>';
//     //     document.querySelector('#charging').innerHTML += 'Charging: ' + (battery.charging ? 'charging' : 'not charging');
//     //     document.querySelector('#level').textContent = 'Battery Level: ' + (Math.round(battery.level * 10000) / 100) + '%';
//     //     if (!battery.charging) {
//     //         document.querySelector('#dischargingTime').textContent = 'Time remaining: ' + (battery.dischargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.dischargingTime / 3600) / 100) + 'h');
//     //     } else {
//     //         document.querySelector('#dischargingTime').textContent = 'Charging Time: ' + (battery.chargingTime === Infinity ? 'Infinity' : (Math.round(100 * battery.chargingTime / 3600) / 100) + 'h');
//     //     }
//     // }

//     navigator.getBattery().then(function(battery) {
//         // Update the battery status initially when the promise resolves ...
//         updateBatteryStatus(battery);

//         // .. and for any subsequent updates.
//         battery.onchargingchange = function() {
//             updateBatteryStatus(battery);
//         };

//         battery.onlevelchange = function() {
//             updateBatteryStatus(battery);
//         };

//         battery.ondischargingtimechange = function() {
//             updateBatteryStatus(battery);
//         };
//     });
//     window.addEventListener('devicelight', function(event) {
//         document.getElementById('ambient').textContent = 'Ambient Light: ' + event.value;
//     });


//     /* GPU */
//     var canvas = document.getElementById("glcanvas");
//     var gpu = document.getElementById("gpu");
//     try {
//         gl = canvas.getContext("experimental-webgl");
//         gl.viewportWidth = canvas.width;
//         gl.viewportHeight = canvas.height;
//     } catch (e) {}
//     if (gl) {
//         gpu.innerHTML = '<b>GPU:</b><br/>';
//         console.log(gl);
//         var extension = gl.getExtension('WEBGL_debug_renderer_info');

//         if (extension != undefined) {
//             gpu.innerHTML += "Vendor: " + gl.getParameter(extension.UNMASKED_VENDOR_WEBGL) + '<br/>';
//             gpu.innerHTML += "Renderer: " + gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) + '<br/>';
//         } else {
//             gpu.innerHTML += "Vendor: " + gl.getParameter(gl.VENDOR) + '<br/>';
//             gpu.innerHTML += "Renderer: " + gl.getParameter(gl.RENDERER) + '<br/>';
//         }
//         // gpu.innerHTML += "Version: " + gl.getParameter(gl.VERSION) + '<br/>';
//         // gpu.innerHTML += "Shading language: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION) + '<br/>';

//         // gpu.innerHTML += "Extensions: " + gl.getSupportedExtensions();

//     }
//     gpu.innerHTML += 'Display: ' + window.screen.width + ' x ' + window.screen.height + ' - ' + window.screen.colorDepth + 'bits/pixel';


//     /* Plugins */
//     // function getPlugins() {
//     //     var a = '';
//     //     try {
//     //         for (var i = 0; i < navigator.plugins.length; i++) {
//     //             a += navigator.plugins[i].name + '<br>'; //+ ': ' + navigator.plugins[i].description + ' (' + navigator.plugins[i].filename + ')')
//     //         }
//     //         return a;
//     //     } catch (e) {
//     //         return null;
//     //     }
//     // }

//     // var plugins = document.getElementById("plugins");
//     // var pluginsString = getPlugins();
//     // if (pluginsString !== '') {
//     //     plugins.innerHTML = pluginsString;
//     // }

// }())
