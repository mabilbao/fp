function fingerprint_flash() {
    "use strict";
    var strOnError, objPlayerVersion, strVersion, strOut;

    strOnError = "N/A";
    objPlayerVersion = null;
    strVersion = null;
    strOut = null;

    try {
        objPlayerVersion = swfobject.getFlashPlayerVersion();
        strVersion = objPlayerVersion.major + "." + objPlayerVersion.minor + "." + objPlayerVersion.release;
        if (strVersion === "0.0.0") {
            strVersion = "N/A";
        }
        strOut = strVersion;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}