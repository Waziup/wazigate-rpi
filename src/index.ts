import "./css/main.scss"


if (navigator.platform.indexOf("Win") == 0)
    $.body.addClass("windows");
else if (navigator.platform.indexOf("Mac") == 0)
    $.body.addClass("mac");
else if (navigator.platform.indexOf("Linux") != -1)
    $.body.addClass("linux");

var pins = [
    {label: "3.3V PWR", color: "#bdbd18"}, {label: "5V PWR", color: "red"},
    {label: "GPIO 2", color: "orange"}, {label: "5V PWR", color: "red"},
    {label: "GPIO 3", color: "orange"}, {label: "GND", color: "black"},
    {label: "GPIO 4", color: "orange"}, {label: "UART0 TX", color: "green"},
    {label: "GND", color: "black"}, {label: "UART0 RX", color: "green"},
    {label: "GPIO 17", color: "orange"}, {label: "GPIO 18", color: "orange"},
    {label: "GPIO 27", color: "orange"}, {label: "GND", color: "black"},
    {label: "GPIO 22", color: "orange"}, {label: "GPIO 23", color: "orange"},
    {label: "3.3V PWR", color: "#bdbd18"}, {label: "GPIO 24", color: "orange"},
    {label: "GPIO 10", color: "orange"}, {label: "GND", color: "black"},
    {label: "GPIO 9", color: "orange"}, {label: "GPIO 25", color: "orange"},
    {label: "GPIO 11", color: "orange"}, {label: "GPIO 8", color: "orange"},
    {label: "GND", color: "black"}, {label: "GPIO 7", color: "orange"},
    {label: "Reserved", color: "gray"}, {label: "Reserved", color: "gray"},
    {label: "GPIO 5", color: "orange"}, {label: "GND", color: "black"},
    {label: "GPIO 6", color: "orange"}, {label: "GPIO 12", color: "orange"},
    {label: "GPIO 13", color: "orange"}, {label: "GND", color: "black"},
    {label: "GPIO 19", color: "orange"}, {label: "GPIO 16", color: "orange"},
    {label: "GPIO 26", color: "orange"}, {label: "GPIO 20", color: "orange"},
    {label: "GND", color: "black"}, {label: "GPIO 21", color: "orange"},
    
];


pins.forEach((pin, i) => {
    var box: HTMLElement;
    if (i%2 == 0) {
        box = $.box({
            className: "pin left"
        }, [
            $.box({
                className: "label",
                style: {
                    background: pin.color
                }
            }, [$.text(pin.label)]),
            $.box({
                className: "number",
            }, [$.text(`${i+1}`)])
        ]);
    } else {
        box = $.box({
            className: "pin right"
        }, [
            $.box({
                className: "number",
            }, [$.text(`${i+1}`)]),
            $.box({
                className: "label",
                style: {
                    background: pin.color
                }
            }, [$.text(pin.label)])
        ]);
    }

    $("#pins").append(box);
});