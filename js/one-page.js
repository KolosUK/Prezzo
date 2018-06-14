var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.select();
        $("[data-toggle='tooltip-area']").tooltip('toggle');
        setTimeout(function(){ $("[data-toggle='tooltip-area']").tooltip('destroy');}, 1500)
});
var copyInputBtn = document.querySelector('.js-inputcopybtn');
copyInputBtn.addEventListener('click', function(event) {
  var copyInput = document.querySelector('.js-copyinput');
  copyInput.select();
        $("[data-toggle='tooltip-input']").tooltip('toggle');
        setTimeout(function(){ $("[data-toggle='tooltip-input']").tooltip('destroy');}, 1500)
});
var copyInputBtnD = document.querySelector('.js-inputcopybtnD');
copyInputBtnD.addEventListener('click', function(event) {
  var copyInputD = document.querySelector('.js-copyinputD');
  copyInputD.select();
        $("[data-toggle='tooltip-inputD']").tooltip('toggle');
        setTimeout(function(){ $("[data-toggle='tooltip-inputD']").tooltip('destroy');}, 1500)

});
    'use strict';

    // Toggle class for mobile nav - can't show/hide wrapper as flex-children need to be direct descendants of their flex-parent, and since the first flex-child is always visible I can't wrap the remaining elements
    // Change style on toggle - hidden by default so not visible if device doesn't have JS enabled
    $('.navigation__toggle').css('visibility', 'visible');

    // Add class on page load so that it's visible if device doesn't have JS enabled
    //$('nav.navigation--primary > ul.navigation__container > li:not(.navigation__item--home)').addClass('navigation__item--hide');
        // Modified to be much more generic:
    $('.js__hide-nav-item').addClass('navigation__item--hide');

    // Then toggle the class
    $('.navigation__toggle').on('click', function () {
        // Select everything that isn't the home link - this ugly chain of selectors is to avoid selecting other list-items or nav instances
        //$('nav.navigation--primary > ul.navigation__container > li:not(.navigation__item--home)').toggleClass('navigation__item--hide');
        // Modified to be much more generic:
        $('.js__hide-nav-item').toggleClass('navigation__item--hide');
        $('body').toggleClass('menu-open');
    });
    $('.bg').on('click', function () {
        $('body').removeClass('menu-open');
    });
