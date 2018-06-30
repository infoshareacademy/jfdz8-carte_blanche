var firstRun = new Date("Oct 7, 2018 14:00:00").getTime();

var timer = setInterval(function() {
    var today = new Date().getTime();
    var interval = firstRun - today;

    var days = Math.floor(interval / (1000 * 60 * 60 * 24));
    var hours = Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((interval % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + "d | " + hours + "h | "
        + minutes + "m | " + seconds + "s";

    if (interval < 0) {
        clearInterval(timer);
    }
}, 1000);

