function fingerprint_latency() {
    "use strict";
    var perfData, dns, connection, requestTime, networkLatency;

    perfData = null;
    dns = null;
    connection = null;
    requestTime = null;
    networkLatency = null;

    try {
	   // supported by a number of modern browsers
       perfData = window.performance.timing;
       requestTime = perfData.responseStart - perfData.requestStart;
       networkLatency = perfData.responseEnd - perfData.fetchStart;
       return requestTime + "|" + networkLatency;
    } catch (err) {
        return "Unknown";
    }
}