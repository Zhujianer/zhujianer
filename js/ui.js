$(document).ready(function() {
    if ($('#header--section')) {
        // index page
        indexScroll();
        indexTooltip();
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

            // hide tooltip
            cancelTooltip();
        } else {
            $('.navbar').removeClass('bordered');
        }
    })
}



// Show tooltip in index page when hover or randomly
var tooltipHandle = null;
function indexTooltip() {
    // Init
    $('.logo-primary.tooltip').tooltipster({
        theme: 'home-tooltip',
        animation: 'swing',
        autoClose: false,
        position: 'left'
    });
    $('.subtitle.tooltip').tooltipster({
        theme: 'home-tooltip',
        animation: 'swing',
        autoClose: false,
        offsetX: 140
    });
    $('#header-browser.tooltip').tooltipster({
        theme: 'home-tooltip',
        animation: 'swing',
        autoClose: false,
        offsetX: -80
    });
    $('#header-mobile.tooltip').tooltipster({
        theme: 'home-tooltip',
        animation: 'swing',
        position: 'left',
        autoClose: false,
        offsetY: -80
    });

    // Show one tooltip in every other 5 seconds
    $($('.tooltip')[0]).tooltipster('show');
    var id = 1;
    var len = $('.tooltip').length;
    tooltipHandle = setInterval(function() {
        if (id === len) {
            $('.tooltip').tooltipster('hide');
            id = 0;
            return;
        }
        $($('.tooltip')[id]).tooltipster('show');
        ++id;
    }, 2000);
}

function cancelTooltip() {
    if (tooltipHandle) {
        clearInterval(tooltipHandle);
        tooltipHandle = null;
    }
    $('.tooltip').tooltipster('hide');
}
