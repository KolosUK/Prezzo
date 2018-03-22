//------------------------------------
//	PREZZO.JS
//	Requires:	jquery 1.6.x
//------------------------------------


////////////////////////////
// BEGIN JQUERY

$(function(){



	//////////////////////////
	// TWITTER

	$('#twitter_feed p:first').show().css({
		'top':		36
	}).animate({
		'top':		0
	},600,'easeInOutExpo',function(){
		autoTweet();
	});

	//////////////////////////
	// EXTERNAL LINKS

	// $('a[href*="http://"]:not([href*="'+location.hostname+'"]):not([class*="internal"]):not([class*="colorbox"]), .external').live('click',function(e) {

	$('.external').live('click',function(e) {

	    window.open($(this).attr('href'));

	    e.preventDefault();

	});

	$('body').find('[data-analytics]').click(function(e){

        // if( !window.location.hostname.indexOf('.dev.com') ){

            var track = $(this).data('analytics').split(',');

            if( _gaq )
                _gaq.push(track);

            if( track[0].indexOf('_link') !== -1)
            	return false;

        // }

    });

	//////////////////////////
	// HOMEPAGE/NEWS BOXES
	//

	$('.box').boxes();

	//////////////////////////
	// Popups
	//
	//
	$colorBoxLink = $('.colorbox-youtube');

	if($colorBoxLink.length){
		$colorBoxLink.colorbox({
			iframe : true,
			innerWidth : 853,
			width : 853,
			innerHeight : 480,
			height : 480
		});
	}

	//////////////////////////
	// FOOTER

	function footerType(){

		if( $(window).height() >= $(document).height() ){

			$('footer nav a.backtotop').css({
				'opacity':	.5
			});

		}else{

			$('footer nav a.backtotop').css({
				'opacity':	1
			});

		}

	}

	$(window).resize(function(){

		footerType();

	});

	footerType();


	//////////////////////////
	// BACK TO TOP LINK

	$('.backtotop').click(function(e){

		$window = $.browser.safari ? $('body') : $('html');

		$window.stop([]).animate({
			scrollTop:0
		},500,'easeInOutExpo');

		e.preventDefault();

	});


	//////////////////////////
	// FORMS

	$('.form_wrapper').addClass('fresh');

	// Simple select replacement for forms, not for the location picker
	$('html:not(.ie6) .content:not(#christmas,#valentines,#homepage,#mothers_day,#fathers_day,#easter,#spring,#trio,#alfresco,#landing_page) form .field select').simpleSelect({
		change: function(){
			if($(this).attr('id') == 'locations') window.location.href = '/restaurant/'+$(this).val();
		}
	});

	// Input placeholder replacement for unsupporting browsers
	if( 'placeholder' in document.createElement('input') === false ){

		$('input').each(function(){

			var $el = $(this);

			// skip if we do not have the placeholder attribute
			if( !$el.is('[placeholder]') )
				return;

			// we cannot do password fields, but supported browsers can
			if( $el.is(':password') )
				return;

			$el.bind('focus.placeholder', function(){
				if( this.value == $el.attr('placeholder' ) )
					$el.val('');
			});

			$el.bind('blur.placeholder', function(){
				if(this.value == '')
					$el.val( $el.attr('placeholder') );
            });

            $el.triggerHandler('blur');

			// Prevent incorrect form values being posted
			$el.parents('form').submit(function(){
				$el.triggerHandler('focus.placeholder');
			});

		});

	}


	//////////////////////////
	// VALIDATION

	// SIMPLE TEXT FIELD
	$('input[type!=checkbox][type!=radio][type!=url].required, textarea.required').live('change',function(){

		if( $(this).closest('.form_wrapper').hasClass('fresh') == false ){
			v = $(this).val();
			l = v.length;

			if( l < 1 || v == $(this).attr('title') || $(this).siblings('.character_count').hasClass('error') == true ){
				$(this).field_error('.field');
			}else{
				$(this).field_valid('.field');
			}
		}
	});

	// SIMPLE DROP DOWN
	$('select.required').live('change',function(){
		if( $(this).closest('.form_wrapper').hasClass('fresh') == false ){

			v = $(this).val();

			if( v == $(this).children('option:first').val() || v == $(this).children('option[disabled]').val() ){
				$(this).field_error('.field');
			}else{
				$(this).field_valid('.field');
			}
		}
	});

	// EMAIL
	$('input[type=email]').live('change',function(){
		if( $(this).closest('.form_wrapper').hasClass('fresh') == false ){

			v = $(this).val();
			email = checkemail( v );

			if( v != $(this).attr('title') && ( email == false || email == null ) ){
				$(this).field_error('.field');
			}else if( v != $(this).attr('title') ){
				$(this).field_valid('.field');
			}else if( v == $(this).attr('title') && !$(this).hasClass('required') ){
				$(this).parent('.field').removeClass('valid').removeClass('error');
			}
		}
	});

	// RADIO
	$('input[type=radio]').live('change',function(){

		var count = $(this).closest('ul').find('input[type=radio]:checked').length;

		if( count < 1 ){
			$(this).field_error('.field');
		}else{
			$(this).field_valid('.field');
		}

	});

	function checkRadio(formID){
		$(formID + ' .radio ul.required').each(function(){
			var count = $(this).find('input[type=radio]:checked').length;

			if( count < 1 ){
				$(this).field_error('.field');
			}else{
				$(this).field_valid('.field');
			}
		});

		$(formID + ' input[type=checkbox].required').each(function(){
			if( !$(this).attr('checked') ) $(this).error('.field');
		});
	}


	function checkValidation(formID){

		// Innocent until proven guilty!
		valid = true;

		// Check the required fields
		$(formID + ' .required').change();

		// Check the email field
		$(formID + ' .email').change();

		// Check the radios
		checkRadio(formID);

		// Are we validated?
		if( $(formID + ' .error:visible').size() > 0 ){
			valid = false;
		}

		return valid;
	}

	$('.form_wrapper button[type=submit]').click(function(e){

		formID = '#' + $(this).closest('.form_wrapper').attr('id');
		$(formID).removeClass('fresh');

		if($.browser.safari){
			scrollElement = $('body');
		}else{
			scrollElement = $('html');
		}

		formOffset = $(formID).parent().offset().top - 15;

		if( checkValidation(formID) == false ){

			scrollElement.animate({scrollTop:formOffset},500,'easeInOutExpo',function(){
				$(formID).addClass('show_validation');
			});

			return false;
		}

	});

	// Geolocation

	if ( navigator && navigator.geolocation ){

		$('.geo_locate').live('click', function (e) {

			navigator.geolocation.getCurrentPosition(geo_success, geo_error);

			e.preventDefault();

		});

	}else{

		$('.geo_locate').remove();

	}

	//////////////////////////
	// BOOKING SELECTOR

	$('.booking_selector select').change(function(){

		var $select = $(this);
		var value = $select.val();
		var $bookingPanel = $select
				.closest('.booking_selector')
				.find('.booking_panel');

		if(value != ''){

			var info = value.split('|');
			var html = '';
			var panelHeight = 350;

			// If no livebookings code
			if(info[1] == ''){

				html = '<p>Please call <strong>' + info[2] + '</strong> to book.</p>';

				panelHeight = 40;

			}

			$.get('/restaurants/set_location/' + info[0]);

			$bookingPanel
				.html(html)
				.css({background: 'none'})
				.animate({height: panelHeight}, 250, 'easeInOutExpo', function(){

					if(info[1] != ''){

						$(this).lbuiDirect({
							connectionid: 'UK-RES-PREZZOGROUP:20157',
							gaAccountNumber  :  'UA-40872131-1',
							restaurantid: info[1],
							style:{
								pageColor: 'ffffff',
								baseColor: 'cfc7b2',
								highlightColor: '363230',
								borderColor: 'ffffff'
							},
							conversionjs: 'http://www.prezzorestaurants.co.uk/8bqns834m'
						});

					}

				});

		}else{

			$bookingPanel
				.animate({height: 0}, 250, 'easeInOutExpo', function(){

					$(this).html('');

				});

		}

	}).change();

});

/*---------------------

	GEOLOCATION

---------------------*/

/**
 * Geolocation success
 * @param  {Object} position
 * @return {void}
 */
function geo_success(position){

	getAddress(position.coords.latitude, position.coords.longitude);

}

/**
 * Geolocation error
 * @param  {number} err
 * @return {void}
 */
function geo_error(err){

	if( err.code == 1 ){

		showError('You have denied access to Geolocation. If you wish to re-enable, please do so from your browser\'s settings.')

	}else if ( err.code == 2 ){

		showError('Your location information is unavailable.')

	}else if( err.code == 3 ){

		showError('The request to get your location timed out.')

	}else{

		showError('An unknown error occurred while requesting your location.')

	}

}

/**
 * Show Error
 * @param  {string} msg
 * @return {void}
 */
function showError(msg){

	alert(msg);

}

/**
 * Get Address
 * @param  {number} latitude
 * @param  {number} longitude
 * @return {void}
 */
function getAddress(latitude, longitude){

	// set up the Geocoder object
	var geocoder = new google.maps.Geocoder(),
		yourLocation = new google.maps.LatLng(latitude, longitude);

	// find out info about our location
	geocoder.geocode({ 'latLng': yourLocation }, function (results, status){

		if( status == google.maps.GeocoderStatus.OK ){

			if( results[3] ){

				$('#search_nearest').val(results[3].formatted_address);
				$('#restaurant_search_form').submit();

			}else if( results[0] ){

				$('#search_nearest').val(results[0].formatted_address);
				$('#restaurant_search_form').submit();


			}else{

				showError('Google did not return any results.');

			}

		}else{

			showError("Reverse Geocoding failed due to: " + status);

		}
	});

}


//////////////////////////
// PLUGINS

(function($) {

	//////////////////////////
	// BOX TRANSITIONS

	$.fn.boxes = function(settings){

		// Settings
		var defaults = {
			speed:		600,				// The speed of transition
			easing:		'easeInOutExpo',	// The easing used
			delay:		500,				// The delay between slideshows starting (in milliseconds)
			pause:		3					// The pause between slides (in seconds)
		}

		var o = $.extend(defaults, settings);

		// Keep a track of how many boxes in this set
		var box = 1;

		return this.each(function(){

			// Objects
			var $this = $(this);
			var $panel = $this.find('.panel');
			var $content = $this.find('.content');
			var $slide = new Array();

			// Variables
			var t = $this.find('.slide').size();
			var c = 1;
			var timer;
			var mooseBan = false;
			var cycle = $this.find('.slide').size() > 1;
			var transition = $panel.size() != 0 || $content.size() != 0;
			var hover = false;
			var clickToTransition = $this.find('.show_content').size() > 0;

			// What is happening?
			//console.log('Transition:	' + transition + '\nCycle:		' + cycle);

			// Increase the box number
			box++;

			// The cycle panel
			if( cycle ){

				// Create array of slides
				for( i = 1; i <= t; i++ ){

					$slide[i] = $this.find('.slide:eq(' + ( i - 1 ) + ')');

					if( i == t ){

						$slide[c].show();

						// Delay each box by its number on the screen
						setTimeout(function(){

							slideshow();

						},( ( box - 1 ) * o.delay ))

					}

				}

				// Go to slide
				function goTo(num,callback){

					// Ban the moose!
					mooseBan = true;

					// Get the old and new
					var $new = $slide[num];
					var $old = $slide[num == 1 ? t : num - 1];

					$new.css({
						'opacity':	0
					}).show().animate({
						'opacity':	1
					},o.speed);

					$old.animate({
						'opacity':	0
					},o.speed,function(){

						// Hide it
						$(this).hide();

						// Unban the moose!
						mooseBan = false;

						// If there is a callback
						if( callback ) callback.apply($this);

					});

				}

				// Slideshow time!
				function slideshow(){

					// Set up a timer, afterwards we change slides
					timer = setTimeout(function(){

						// Clear the timer
						clearTimeout(timer);

						// Final prevention against hover bugs
						if( !hover ){

							// Which is the next slide?
							c == t ? c = 1 : c++;

							// Add a class to the container (this stops the 3D browsers from messing up mid spin)
							$this.addClass('ban_flip');

							// Do the slides
							goTo(c,function(){

								// Remove that class
								$this.removeClass('ban_flip');

								slideshow();

							});

						}

					}, ( o.pause * 1000 ))

				}

			}else{

				$this.find('.slide').fadeIn();

			}

			// Is there a hover transition?
			if( transition ){

				// Is this a 3D supporting browser?
				if( !$.support.transition || !$('html').hasClass('safari') ){

					// Variables
					var w = $this.width();

					// Set overflow
					$this.css({
						'overflow':	'hidden'
					});

					// Show content but set it to opacity:0;
					$content.show().css({
						'opacity':	0
					});

					// Show event
					var showContent = function(){

						hover = true;

						// Hide the image
						$panel.stop([]).animate({
							'left':	w
						},o.speed,o.easing);

						// Show the text
						$content.stop([]).delay(o.speed/2).animate({
							'opacity':	1
						},o.speed/2);

						// Stop the slideshow
						if( cycle ) clearTimeout(timer);

					}

					var hideContent = function(){

						hover = false;

						// Show the image
						$panel.stop([]).delay(o.speed/2).animate({
							'left':	0
						},o.speed,o.easing);

						// Hide the text
						$content.stop([]).animate({
							'opacity':	0
						},o.speed/2);

						// Restart the slideshow
						if( cycle ) slideshow();

					}

					// Bind the events
					if( !clickToTransition ){

						$this.bind({

							'mouseenter':	showContent,
							'mouseleave':	hideContent

						});

					}else{

						$this.find('.show_content').click(function(e){

							showContent();

							e.preventDefault();

						});

					}

				}else{

					if( cycle ){

						$this.bind({
							'mouseenter':	function(){

								hover = true;

								// Stop the slideshow
								clearTimeout(timer);

							},
							'mouseleave':	function(){

								hover = false;

								// Restart the slideshow
								slideshow();

							}
						});

					}

					if( clickToTransition ){

						$this.addClass('ban_flip').find('.show_content').click(function(e){

							$this.addClass('flip').removeClass('ban_flip');

							e.preventDefault();

						});

					}

				}

			}


			//////////////////////////
			// LINKS

			$panel.each(function(){

				// Variables & objects
				var $link = $(this);
				var href = $link.attr('href');

				// If the link isn't a link then ignore it
				if( href != undefined && href != '#' ){

					// The panel will already have a link and the relevant cleverness, so just target the content
					$link.siblings('.content').mouseup(function(e){

						// Detect which mouse button
						switch(e.which){

							// Left
							case 1:

								// Check for external links. Can be forced with .external
								if( href.indexOf(location.hostname) >= 0 || href.indexOf('http://') >= 0 || $link.hasClass('external') ){

									window.open(href);

								}else{

									window.location = href;

								}

							break;

							// Middle
							case 2:

								window.open(href);

							break;

						}

						e.preventDefault();

					// Give the cursor a pointer
					}).css({
						'cursor':	'pointer'
					});

				}

			});

		});

	}


	//////////////////////////
	// SET VALID OR ERROR

	$.fn.field_valid = function(e) {
		this.closest(e).addClass('valid').removeClass('error');
	};

	$.fn.field_error = function(e) {

		//console.log('set error', e);
		this.closest(e).addClass('error').removeClass('valid');
	};


	//////////////////////////
	// SELECT PLUGIN

	$.fn.simpleSelect = function(settings) {

		// Settings
		var defaults = {
			defaultText:	null,
			ready:			function(){},
			click:			function(){},
			change:			function(){}
		};

		var o = $.extend(defaults, settings);

		return this.each(function(){

			var $this = $(this);

			// Are there classes
			var classes = $this.attr('class') == undefined ? 'select' : 'select ' + $this.attr('class');

			$this.wrap('<span class="' + classes + '"/>');

			var $s = $this.parent('.select');

			if( o.defaultText == null ){

				var initial = $this.find('option:selected').text();

			}else{

				var initial = o.defaultText;

			}

			$s.prepend('<span class="body">' + initial + '</span><a href="#"><span></span></a>');

			$this.css({
				'width':		$s.outerWidth(),
				'height':		$s.outerHeight(),
				'opacity':		0
			}).bind({
				change:		function(){

					$s.find('.body').text($this.find('option:selected').text());

					o.change.apply($this);

				},
				click:		function(){

					o.click.apply($this);

				},
				focus:		function(){

					$s.addClass('focus');
				},
				blur:		function(){

					$s.removeClass('focus');

				},
				mouseenter:	function(){

					$s.addClass('hover');

				},
				mouseleave:	function(){

					$s.removeClass('hover');

				}

			});

			o.ready.apply($this);

		});

	};

})(jQuery);

//////////////////////////
// REGULAR EXPRESSIONS

// EMAIL
function checkemail(email_address) {
	email_address = email_address.toLowerCase();
	return email_address.length > 5 && email_address.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/);
}

//////////////////////////
// EASING

jQuery.extend( jQuery.easing,{
    easeInOutExpo: function (x, t, b, c, d){
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    }
});

/*
 * jQuery Timer Plugin
 * http://www.evanbot.com/article/jquery-timer-plugin/23
 *
 * @version      1.0
 * @copyright    2009 Evan Byrne (http://www.evanbot.com)
 */

jQuery.timer = function(time,func,callback){
    var a = {timer:setTimeout(func,time),callback:null}
    if(typeof(callback) == 'function'){a.callback = callback;}
    return a;
};

jQuery.clearTimer = function(a){
    clearTimeout(a.timer);
    if(typeof(a.callback) == 'function'){a.callback();};
    return this;
};

// jQuery.support.transition
// to verify that CSS3 transition is supported (or any of its browser-specific implementations)
$.support.transition = (function(){
    var thisBody = document.body || document.documentElement,
    thisStyle = thisBody.style,
    support = thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.OTransition !== undefined || thisStyle.transition !== undefined;

    return support;
})();

/*---------------------

	Auto Tweet

---------------------*/

function autoTweet(){

	var t = $('#twitter_feed p').size();
	var c = 1;
	var d = 4;
	var timer;
	var hover = false;

	$('#twitter_feed').hover(function(){
		hover = true;
		clearTimeout(timer);
	},function(){
		hover = false;
		change();
	});

	function change(){

		c = c == t ? 1 : c + 1;

		timer = setTimeout(function(){

			clearTimeout(timer);

			if( !hover ){

				$('#twitter_feed p:eq(' + ( c - 1 ) + ')').show().css({
					'top':	36
				}).stop([]).animate({
					'top':	0
				},600,'easeInOutExpo').siblings('p').stop([]).animate({
					'top':	-36
				},600,'easeInOutExpo',function(){
					$(this).hide();
				});

			}

			change();

		}, d * 1000);

	}

	change();

}
