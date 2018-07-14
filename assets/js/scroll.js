var photo = document.querySelectorAll('.team-item__photo');
var image = document.querySelectorAll('.features__image');
var photoAnimation = 'photo__active';
var imageAnimation = 'image__active';

function animatedPhoto() {
    getPosition(photo, photoAnimation);
}

function animatedImage() {
    getPosition(image, imageAnimation);
}

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

function getPosition (elem, animation) {
    elem.forEach(function(elem) {

        var elemTop = getElemDistance(elem);
        var visibleSection = window.scrollY + window.innerHeight - elem.height / 2;
        var elemBottom = (elemTop + elem.height);
        var visibleHalfSection = visibleSection > elemTop;
        var isNotScrolledPast = window.scrollY < elemBottom;

        if (visibleHalfSection && isNotScrolledPast) {
            elem.classList.add(animation);
        } else {
            elem.classList.remove(animation);
        }
    });
}

window.addEventListener('scroll', animatedPhoto);
window.addEventListener('scroll', animatedImage);
