"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Device_1 = require("./Device");
if (navigator.platform.indexOf("Win") == 0)
    $.body.addClass("windows");
else if (navigator.platform.indexOf("Mac") == 0)
    $.body.addClass("mac");
else if (navigator.platform.indexOf("Linux") != -1)
    $.body.addClass("linux");
var fullscreen = $.create("img", {
    props: {
        id: "fullscreen"
    }
});
$.body.append(fullscreen);
$.body.append(new Device_1.Device("My fancy Device", 300, 300).$);
$.body.append(new Device_1.Device("New Device #1", 550, 350).$);
//# sourceMappingURL=index.js.map