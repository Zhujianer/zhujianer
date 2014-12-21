$(document).ready(function() {
    if ($('#header--section')) {
        indexScroll();
    }
});



// Change browser and mobile position when scroll down.
function indexScroll() {
    var headerBrowserHeight = $('#index-header').height() + 1
            - $('#header-browser').height();
    var headerMobileHeight = $('#header-mobile').height();
    $(window).scroll(function(e) {
        var headerHeight = $('#index-header').height() - $('.navbar').height();
        var top = $(window).scrollTop();
        var ratio = !headerHeight ? 0 : top / headerHeight;
        if (headerHeight - top) {
            // home section visible
            $('#header-mobile').css({
                'margin-top': -headerMobileHeight + top * 0.1,
                'opacity': 1 - ratio * ratio
            });
            $('#header-browser').css({
                'margin-top': headerBrowserHeight + top * 0.2,
                'opacity': 1 - ratio
            });
        }
        if (top > 0) {
            $('.navbar').addClass('bordered');
        } else {
            $('.navbar').removeClass('bordered');
        }
    })
}
