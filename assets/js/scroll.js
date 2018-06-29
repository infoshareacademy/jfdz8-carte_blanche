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
var image = document.querySelectorAll('.features__image');


function animatedPhoto() {
    photo.forEach(function(photo) {

        var photoTop = getElemDistance(photo);
        var visibleTeam = window.scrollY + window.innerHeight - photo.height / 2;
        var photoBottom = (photoTop + photo.height);
        var visibleHalfTeam = visibleTeam > photoTop;
        var isNotScrolledPast = window.scrollY < photoBottom;

        if (visibleHalfTeam && isNotScrolledPast) {
            photo.classList.add('photo__active');
        } else {
            photo.classList.remove('photo__active');
        }
    })
}

function animatedImage() {
    image.forEach(function(image) {

        var imageTop = getElemDistance(image);
        var visibleSection = window.scrollY + window.innerHeight - image.height / 2;
        var imageBottom = (imageTop + image.height);
        var visibleHalfSection = visibleSection > imageTop;
        var isNotScrolledPast = window.scrollY < imageBottom;

        if (visibleHalfSection && isNotScrolledPast) {
            image.classList.add('image__active');
        } else {
            image.classList.remove('image__active');
        }
    })
}
window.addEventListener('scroll', animatedPhoto);
window.addEventListener('scroll', animatedImage);