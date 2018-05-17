document.querySelectorAll('a[href^="#"]')
    .forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function MouseRollover(MyImage) {
    MyImage.src = "assets/images/ewasiwek.jpg";
}

function MouseOut(MyImage) {
    MyImage.src = "assets/images/kajetan.jpg";
}