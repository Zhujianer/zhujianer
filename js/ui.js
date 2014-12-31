$(document).ready(function() {
    if (location.pathname === '/index.html' || location.pathname === '/') {
        // index page
        indexScroll();
        indexTooltip();
        indexProcess();
    } else if (location.pathname === '/team.html') {
        teamImage();
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
    $('#header-mobile-logo-gif.tooltip').tooltipster({
        theme: 'home-tooltip',
        animation: 'swing',
        position: 'bottom',
        autoClose: false
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
    if ($('.tooltip').length > 0) {
        $('.tooltip').tooltipster('hide');
    }
}



// index process section
function indexProcess() {
    // show related description when hover on image
    $($('.process-title')[0]).show();
    $('.process-image').hover(function() {
        $('.process-title').hide();
        $($('.process-title')[$(this).index()]).show();
    });
}



// change image when hover in team page
function teamImage() {
    var hoverHandler = null;

    $('.team-member').mouseenter(function() {
        var name = $(this).attr('team-member');
        // use gif when hover
        var url = 'img/' + name + '-hover.gif';
        $(this).children('.default').attr('src', url);

        // other members in the same line look at the hovered one
        if (name === 'wenli') {
            lookAt('jiajun', 'img/jiajun-left.jpg',
                    'shixin', 'img/shixin-left.jpg');
        } else if (name === 'jiajun') {
            lookAt('shixin', 'img/shixin-left.jpg',
                    'wenli', 'img/wenli-right.jpg');
        } else if (name === 'shixin') {
            lookAt('wenli', 'img/wenli-right.jpg',
                    'jiajun', 'img/jiajun-right.jpg');
        } else if (name === 'chentian') {
            lookAt('yingshan', 'img/yingshan-left.jpg',
                    'qianying', 'img/qianying-left.jpg');
        } else if (name === 'yingshan') {
            lookAt('qianying', 'img/qianying-left.jpg',
                    'chentian', 'img/chentian-right.jpg');
        } else if (name === 'qianying') {
            lookAt('chentian', 'img/chentian-right.jpg',
                    'yingshan', 'img/yingshan-right.jpg');
        }

    }).mouseleave(function() {
        $('.team-member').each(function() {
            var name = $(this).attr('team-member');
            // use default when unhover
            var url = 'img/' + name + '.jpg';
            $(this).children('.default').attr('src', url);
        });
        if (hoverHandler) {
            clearTimeout(hoverHandler);
            hoverHandler = null;
        }
    });

    function lookAt(nameA, imgA, nameB, imgB) {
        if (hoverHandler) {
            clearTimeout(hoverHandler);
        }
        hoverHandler = setTimeout(function() {
            $('#' + nameA + '-img').attr('src', imgA);
            $('#' + nameB + '-img').attr('src', imgB);
        }, 1800);
    }
}
