$(document).ready(function() {
    if ($('#header--section')) {
        // index page, change nav background when scroll down
        indexScroll();
    }
});



// Change nav background when scroll down.
// Use transparent background when scroll up to header
// because there would be fancy effects on the background.
function indexScroll() {
    $(window).scroll(function(e) {
        if (!$('.navbar').hasClass('down')) {
            var headerHeight = $('#index-header').height() - $('.navbar').height();
            if ($(window).scrollTop() >= headerHeight) {
                // scrolled down
                $('.navbar').addClass('down');
                console.log('add');
            }
        } else if ($(window).scrollTop() < headerHeight) {
            // scrolled up
            $('.navbar').removeClass('down');
                console.log('remove');
        }
    })
}
