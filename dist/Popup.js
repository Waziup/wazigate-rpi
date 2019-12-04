"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shadow = $.box({
    className: "shadow",
    on: {
        click: hidePopup
    }
});
var popup = $.box({
    className: "popup",
});
$.body.append(shadow);
$.body.append(popup);
function showPopup(content) {
    popup.innerHTML = "";
    popup.appendChild(content);
    setTimeout(() => {
        popup.classList.add("pinned");
        shadow.classList.add("pinned");
    });
}
exports.showPopup = showPopup;
function hidePopup() {
    popup.innerHTML = "";
    popup.classList.remove("pinned");
    shadow.classList.remove("pinned");
}
exports.hidePopup = hidePopup;
//# sourceMappingURL=Popup.js.map