"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imgDevice = require("./img/device.png");
const Popup_1 = require("./Popup");
function round(a) {
    return Math.round(a / 10) * 10;
}
function preventDefault(event) {
    event.preventDefault();
    event.returnValue = false;
}
$.window.on("wheel", preventDefault, { passive: false });
$.body.on("wheel", preventDefault, { passive: false });
class Device {
    constructor(name, x, y) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.$ = $.box({
            className: "device",
            style: {
                transform: `translate(${x}px, ${y}px)`
            },
            on: {
                mousedown: this.onMouseDown,
                touchstart: this.onTouchStart
            }
        }, [
            $.create("img", {
                props: { src: imgDevice }
            }),
            $.create("div", {
                className: "name"
            }, [$.text(name)])
        ]);
    }
    onMouseDown(event) {
        var x = this.x, y = this.y;
        var sx = event.screenX, sy = event.screenY;
        var dragging = false;
        var onMouseMove = (event) => {
            var dx = event.screenX - sx, dy = event.screenY - sy;
            if (!dragging) {
                if (Math.abs(dx) + Math.abs(dy) > 8) {
                    this.$.classList.add("dragging");
                    dragging = true;
                    sx = event.screenX;
                    sy = event.screenY;
                }
            }
            else {
                this.x = round(x + dx);
                this.y = round(y + dy);
                this.$.style.transform = `translate(${this.x}px, ${this.y}px)`;
            }
        };
        $.window.on("mousemove", onMouseMove);
        $.window.once("mouseup", () => {
            $.window.off("mousemove", onMouseMove);
            this.$.classList.remove("dragging");
            if (!dragging) {
                this.inspect();
            }
        });
    }
    onTouchStart(event) {
        var touch = event.changedTouches[0];
        var sx = touch.screenX, sy = touch.screenY;
        var id = touch.identifier;
        var dragging = false;
        var x = this.x, y = this.y;
        $.body.addClass("dragging");
        var onTouchMove = (event) => {
            var touches = event.touches;
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[id];
                if (touch.identifier == id) {
                    var dx = touch.screenX - sx, dy = touch.screenY - sy;
                    if (!dragging) {
                        if (Math.abs(dx) + Math.abs(dy) > 8) {
                            this.$.classList.add("dragging");
                            dragging = true;
                            sx = touch.screenX;
                            sy = touch.screenY;
                        }
                    }
                    else {
                        this.x = round(x + dx);
                        this.y = round(y + dy);
                        this.$.style.transform = `translate(${this.x}px, ${this.y}px)`;
                    }
                }
            }
        };
        var onTouchEnd = (event) => {
            var touches = event.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                if (touches[id].identifier == id) {
                    $.window.off("touchmove", onTouchMove);
                    $.window.off("touchend", onTouchEnd);
                    this.$.classList.remove("dragging");
                    $.body.removeClass("dragging");
                    if (!dragging) {
                        this.inspect();
                    }
                }
            }
        };
        $.window.on("touchmove", onTouchMove);
        $.window.on("touchend", onTouchEnd);
    }
    inspect() {
        Popup_1.showPopup($.text("Hallo"));
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map