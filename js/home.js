//------------------------------------
//
//	HOME.JS
//
//------------------------------------

////////////////////////////
// BOOKING/SEARCH PANELS

$(function(){

	var $bookATable = $('#book_a_table');
	var $locationSearch = $('#location_search');
	var $bookingPanel = $('#booking_panel');
	var $bookingReset = $('#booking_reset');
	var resetHeight = $bookATable.height();
	var resetLeftOffset = $locationSearch.position().left;
	var leftOffset = resetLeftOffset + $locationSearch.outerWidth();

	$('html:not(.ie6) #book_a_table select').simpleSelect({
		change: function(){

			var value = $(this).val();

			if(value == ''){
				return false;
			}

			var info = value.split('|');
			var html = '';
			var panelHeight = 479;

			// If no livebookings code
			if(info[1] == ''){

				html = '<p>Please call <strong>' + info[2] + '</strong> to book.</p>';

				var panelHeight = 170;

			}

			$.get('/restaurants/set_location/' + info[0]);

			$locationSearch
				.animate({left: -leftOffset}, 250, 'easeInOutExpo', function(){

					$bookingPanel
						.html('');

					$bookATable
						.animate({height: panelHeight}, 250, 'easeInOutExpo', function(){

							$bookingPanel
								.html(html)
								.css({background: 'none'})
								.fadeIn(250, 'easeInOutExpo', function(){

									if(info[1] != ''){

										$bookingPanel.lbuiDirect({
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

							$bookingReset
								.fadeIn(250, 'easeInOutExpo');

						});

				});

		}
	}).change();

	$bookingReset.click(function(e){
		e.preventDefault();

		$bookingPanel
			.fadeOut(250, 'easeInOutExpo');

		$bookingReset
			.fadeOut(250, 'easeInOutExpo', function(){

				$bookATable
					.animate({height: resetHeight}, 250, 'easeInOutExpo', function(){

						$bookATable
							.find('.body')
							.html('-- Please select --');

						$bookATable
							.find(':selected')
							.removeAttr('selected');

						$locationSearch
							.animate({left: resetLeftOffset}, 250, 'easeInOutExpo');

					});

			});

	});

});

////////////////////////////
// MAIN SLIDER

$(function(){

	var blockClick = false;
	var slidePause = 5000;
	var slideSpeed = 800;
	var slideInterval = {};
	var $slider = $('#slider');
	var sliderHeight = $slider.outerHeight();

	var moveToSlide = function($current, $next){

		blockClick = true;

		$navigation
			.find('.active')
			.removeClass('active');

		$navigation
			.children(':eq(' + $slider.children().index($next) + ')')
			.addClass('active');

		$current.animate({top: -sliderHeight}, slideSpeed, 'easeInOutExpo');
		$next.animate({top: 0}, slideSpeed, 'easeInOutExpo', function(){

			$slider
				.find('.active')
				.removeClass('active')
				.css({top: sliderHeight});

			$(this)
				.addClass('active');

			blockClick = false;

		});

	}

	var slideStart = function(){

		slideInterval = setInterval(function(){

			var $current = $slider.children('.active');

			var $next = $current.next();

			if(!$next.length){
				$next = $slider.children(':first');
			}

			moveToSlide($current, $next);

		}, slidePause);
	}

	var positionNavigation = function(){

		var sliderOffset = $slider.offset();
		var sliderWidth = $slider.outerWidth();

		$navigation.css({
			top: sliderOffset.top + ((sliderHeight - $navigation.outerHeight()) / 2),
			left: sliderOffset.left + sliderWidth
		}).fadeIn();

	}

	if($slider.children().length > 1){

		// Setup the navigation
		var $navigation = $('<div/>', {
			id: 'slider_navigation'
		}).appendTo('body');

		for(i = 1; i <= $slider.children().length; i++){

			$('<a/>', {
				href: '#'
			}).appendTo($navigation);

		}

		// Chrome is too fast so we need to slow it down!
		setTimeout(positionNavigation, 500);

		// Set the first slide and navigation
		$slider
			.children(':first')
			.addClass('active');

		$navigation
			.children(':first')
			.addClass('active')

		// Start the slider
		slideStart($slider);

		$('#slider, #slider_navigation').hover(
			function(){ clearInterval(slideInterval); },
			function(){ slideStart(); }
		);

		// Listen for navigation clicks
		$navigation
			.find('a')
			.click(function(e){
				e.preventDefault();

				if(blockClick){
					return false;
				}

				var $button = $(this);

				if(!$button.hasClass('active')){

					moveToSlide(
						$slider.children('.active'),
						$slider.children(':eq(' + $button.index() + ')')
					);

				}

			});

		// Move navigation if window is resized
		$(window).resize(positionNavigation);

	}

});

////////////////////////////
// FUNNELS

$(function(){

	var fadePause = 5000;
	var fadeSpeed = 1000;
	var fadeInterval = {};

	var fadeStart = function($wrapper){

		fadeInterval = setInterval(function(){

			var $current = $wrapper.children('a:visible');

			var $next = $current.next('a');

			if(!$next.length){
				$next = $wrapper.children('a:first');
			}

			$current.fadeOut(fadeSpeed);
			$next.fadeIn(fadeSpeed);

		}, fadePause);

		$wrapper.data('fadeInterval', fadeInterval);

	}

	$('.funnel.transitions').each(function(){

		var $wrapper = $(this);

		if($wrapper.children('a').length > 1){

			fadeStart($wrapper);

			$wrapper.hover(
				function(){
					clearInterval($(this).data('fadeInterval'));
				},
				function(){
					fadeStart($(this));
				}
			);

		}

	});

});
