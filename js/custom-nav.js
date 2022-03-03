$(window).on('scroll', function(event) {
    var scrollValue = $(window).scrollTop();
    if (scrollValue > 70) {
        $('.header_menu').addClass('fixed-top animated slideInDown');
    } else {
        $('.header_menu').removeClass('fixed-top animated slideInDown');
    }
});



"use strict";


/*======== Doucument Ready Function =========*/
jQuery(document).ready(function() {

    // slicknav
    /**
     * Slicknav - a Mobile Menu
     */
    var $slicknav_label;
    $('.responsive-menu').slicknav({
        duration: 500,
        easingOpen: 'easeInExpo',
        easingClose: 'easeOutExpo',
        closedSymbol: '<i class="fa fa-angle-down"></i>',
        openedSymbol: '<i class="fa fa-angle-up"></i>',
        prependTo: '#slicknav-mobile',
        allowParentLinks: true,
        label: ""
    });

    var $slicknav_label;
    $('#responsive-menu').slicknav({
        duration: 500,
        easingOpen: 'easeInExpo',
        easingClose: 'easeOutExpo',
        closedSymbol: '<i class="fa fa-angle-down"></i>',
        openedSymbol: '<i class="fa fa-angle-up"></i>',
        prependTo: '#slicknav-mobile',
        allowParentLinks: true,
        label: ""
    });


    /**
     * Sticky Header
     */

    $(window).scroll(function() {

        if ($(window).scrollTop() > 10) {

            $('.navbar').addClass('navbar-sticky-in')

        } else {
            $('.navbar').removeClass('navbar-sticky-in')
        }

    })

    /**
     * Main Menu Slide Down Effect
     */

    var selected = $('#navbar li');
    // Mouse-enter dropdown
    selected.on("mouseenter", function() {
        $(this).find('ul').first().stop(true, true).delay(350).slideDown(500, 'easeInOutQuad');
    });

    // Mouse-leave dropdown
    selected.on("mouseleave", function() {
        $(this).find('ul').first().stop(true, true).delay(100).slideUp(150, 'easeInOutQuad');
    });

    /**
     *  Arrow for Menu has sub-menu
     */
    if ($(window).width() > 992) {
        $(".navbar-arrow ul ul > li").has("ul").children("a").append("<i class='arrow-indicator fa fa-angle-right'></i>");
    }


});