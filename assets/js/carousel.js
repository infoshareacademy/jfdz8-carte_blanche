$(document).ready(function(){
    $("#featuresCarousel").carousel({interval: 3000});

    $(".item1").click(function(){
        $("#featuresCarousel").carousel(0);
    });
    $(".item2").click(function(){
        $("#featuresCarousel").carousel(1);
    });
    $(".item3").click(function(){
        $("#featuresCarousel").carousel(2);
    });
    $(".item4").click(function(){
        $("#featuresCarousel").carousel(3);
    });

    $(".left").click(function(){
        $("#featuresCarousel").carousel("prev");
    });
    $(".right").click(function(){
        $("#featuresCarousel").carousel("next");
    });
});