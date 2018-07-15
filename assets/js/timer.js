var firstRun = new Date("Oct 7, 2018 14:00:00").getTime();

var timer = setInterval(function() {
    var today = new Date().getTime();
    var interval = firstRun - today;

    var days = Math.floor(interval / (1000 * 60 * 60 * 24));
    var hours = Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((interval % (1000 * 60)) / 1000);

    document.getElementById("timer--d").innerHTML = days + "d";
    document.getElementById("timer--h").innerHTML = hours + "h";
    document.getElementById("timer--m").innerHTML = minutes + "m";
    document.getElementById("timer--s").innerHTML = seconds + "s";

    if (interval < 0) {
        clearInterval(timer);
    }
}, 1000);

