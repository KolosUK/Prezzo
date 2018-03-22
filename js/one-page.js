var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
        $("[data-toggle='tooltip-area']").tooltip('toggle');
        setTimeout(function(){ $("[data-toggle='tooltip-area']").tooltip('destroy');}, 1500)
  } catch (err) {
    window.alert('Oops, unable to copy');
  }
});
var copyInputBtn = document.querySelector('.js-inputcopybtn');
copyInputBtn.addEventListener('click', function(event) {
  var copyInput = document.querySelector('.js-copyinput');
  copyInput.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
        $("[data-toggle='tooltip-input']").tooltip('toggle');
        setTimeout(function(){ $("[data-toggle='tooltip-input']").tooltip('destroy');}, 1500)
  } catch (err) {
    window.alert('Oops, unable to copy');
  }
});
var copyInputBtnD = document.querySelector('.js-inputcopybtnD');
copyInputBtnD.addEventListener('click', function(event) {
  var copyInputD = document.querySelector('.js-copyinputD');
  copyInputD.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
        $("[data-toggle='tooltip-inputD']").tooltip('toggle');
        setTimeout(function(){ $("[data-toggle='tooltip-inputD']").tooltip('destroy');}, 1500)
  } catch (err) {
    window.alert('Oops, unable to copy');
  }
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
 'use strict';

    /* global google */


        /// Start of Simon's code from FindaPrezzoBlock modules
        /// Get location is called when 'nearest' button is clicked
        window.GetLocation = function GetLocation() {
          debugger
            if (navigator.geolocation) {
                var timeoutVal = 10 * 1000 * 1000;
                navigator.geolocation.getCurrentPosition(
                    positionFound,
                    positionError,
                    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
                );
            } else {
                alert('Your browser can not give us a location');
            }
        };

        window.FindCoordinates = function FindCoordinates(address) {
            var form = document.querySelector('[data-name="js-geolocation-form"]');
            var geocoder = new google.maps.Geocoder();
            var address = document.getElementsByClassName(address)[0].value;
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    document.getElementById('txtGeocodeLongitude').value = longitude;
                    document.getElementById('txtGeocodeLatitude').value = latitude;
                    if (document.getElementById('txtAddressPrevious')) {
                        document.getElementById('txtAddressPrevious').value = '';
                    }
                    if (document.getElementById('command')) {
                        document.getElementById('command').value = 'jsRun';
                    }
                }
            });
        };

        /// This is the success function called from GetLocation
        function positionFound(position) {
            /// Find the form
            var form = document.querySelector('[data-name="js-geolocation-form"]');
            /// Update the hidden fields with lat and lng from the browser
            form.querySelector('[data-name="hiddenLong"]').value = position.coords.longitude;
            form.querySelector('[data-name="hiddenLat"]').value = position.coords.latitude;
            form.querySelector('[data-name="hiddenCommand"]').value = 'nearestClicked';
            /// Submit form
            form.submit();
        }
        /// This is the error function called from GetLocation
        function positionError(error) {
            var errors = {
                1: 'Your browser did not share your location ',
                2: 'Your location is not available ',
                3: 'Finding your location took too long '
            };
            alert(errors[error.code]);
        }
        /// End of Simon's code
    }).fail(function() {
        console.error('ERROR: Google maps library failed to load');
    });

    window.checkDistance = function () {
        var longitude = document.getElementById('txtGeocodeLongitude').value;
        var latitude = document.getElementById('txtGeocodeLatitude').value;

        if (!Number(longitude) && !Number(latitude)) {
            document.querySelector('[name="FilterDistance"]').value = "";
            //get emty list
            document.querySelector('[name="txtAddress"]').value = " ";
            //get all results
            //document.querySelector('[name="txtAddress"]').value = "";   
        }
    