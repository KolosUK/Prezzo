/**
 * Base functions
 *
 * $author       Zone dev
 * $email        frontend@thisiszone.com
 * $url          http://www.thisiszone.com/
 * $copyright    Copyright (c) 2013, thisiszone.com. All rights reserved.
 * $version      1.0
 *
 * $notes        Notes
 */

define(['jquery'], function($) {
    'use strict';

    var base = {

        ltIe9: $('html.lt-ie9').length,
        animationSpeed: 1000,
        animationEasing: 'easeOutCirc',

        init: function() {
            this.defineConsoleLog();
            this.placeholderFallback();
            this.outerhtmlFallback();
        },

        /* ---------- Define console log ------------------------------------ */
        defineConsoleLog: function defineConsoleLogFn() {
            if (typeof console === 'undefined' || typeof console.log === 'undefined') {
                /*global console:true */
                console = { log: function() {} };
            }
        },

        /* ---------- Placeholder fallback ---------------------------------- */
        placeholderFallback: function placeholderFallbackFn() {
            /*bases Modernizr:true*/
            if (!Modernizr.input.placeholder) {
                $('[placeholder]').focus(function() {
                    var input = $(this);
                    if (input.val() === input.attr('placeholder')) {
                        input.val('').removeClass('placeholder');
                    }
                }).blur(function() {
                    var input = $(this);
                    if (input.val() === '') {
                        input.val(input.attr('placeholder')).addClass('placeholder');
                    }
                }).blur();
                $('form').submit(function() {
                    $('[placeholder]', this).each(function() {
                        var input = $(this);
                        if (input.val() === input.attr('placeholder')) {
                            input.val('').removeClass('placeholder');
                        }
                    });
                });
            }
        },

        /* ---------- Outer HTML fallback ----------------------------------- */
        outerhtmlFallback: function outerhtmlFallbackFn() {
            $.fn.outerHTML = function() {
                return (!this.length) ? this : (this[0].outerHTML || (
                    function(el) {
                        var div = document.createElement('div');
                        div.appendChild(el.cloneNode(true));
                        var contents = div.innerHTML;
                        div = null;
                        return contents;
                    })(this[0]));
            };
        }

    }; //end base object

    return base;
});
