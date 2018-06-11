document.querySelectorAll('a[href^="#"]')
    .forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

var photo = document.querySelectorAll('.team-item__photo');

function animatedPhoto() {
    photo.forEach(function(photo) {

        var visibleTeam = window.scrollY + window.innerHeight - photo.height / 2;
        var photoBottom = (photo.offsetTop + photo.height);
        var visibleHalfTeam = visibleTeam > photo.offsetTop;
        var isNotScrolledPast = window.scrollY < photoBottom;


        if (visibleHalfTeam && isNotScrolledPast) {
            photo.classList.add('active');
        } else {
            photo.classList.remove('active');
        }
    })
}

window.addEventListener('scroll', animatedPhoto);


