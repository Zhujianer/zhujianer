$(document).ready(function() {
    if ($('#header--section')) {
        indexScroll();
    }
});



// Change browser and mobile position when scroll down.
function indexScroll() {
    $(window).scroll(function(e) {
        var headerHeight = $('#index-header').height() - $('.navbar').height();
        var top = $(window).scrollTop();
        var ratio = !headerHeight ? 0 : top / headerHeight;
        if (headerHeight - top) {
            // home section visible
            $('#header-mobile').css({
                'margin-top': -350 + top * 0.2,
                'opacity': 1 - ratio * ratio
            });
            $('#header-browser').css({
                'margin-top': 350 + top * 0.4,
                'opacity': 1 - ratio
            });
        }
    })
}
