var getElemDistance = function (elem) {
    var location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};

var photo = document.querySelectorAll('.team-item__photo');

function animatedPhoto() {
    photo.forEach(function(photo) {

        var photoTop = getElemDistance(photo);
        var visibleTeam = window.scrollY + window.innerHeight - photo.height / 2;
        var photoBottom = (photoTop + photo.height);
        var visibleHalfTeam = visibleTeam > photoTop;
        var isNotScrolledPast = window.scrollY < photoBottom;

        if (visibleHalfTeam && isNotScrolledPast) {
            photo.classList.add('active');
        } else {
            photo.classList.remove('active');
        }
    })
}

window.addEventListener('scroll', animatedPhoto);


