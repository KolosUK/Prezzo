/**
 * GoogleMapsAPI Loader Module
 * 
 * Returns a promise that resolves with the google.maps object when all of the google maps api loading process is complete
 * 
 * Example Usage:
 *
 *  define([ 'app/lib/google-maps-loader' ], function(GoogleMapsLoader){
 *      GoogleMapsLoader.done(function(GoogleMaps){
 *          // your google maps code here!
 *          var geocoder = new GoogleMaps.Geocoder();
 *      }).fail(function(){ 
 *          console.error("ERROR: Google maps library failed to load");
 *      });
 *  });
 *
 *  -OR-
 *
 *  define([ 'app/lib/google-maps-loader' ], function(GoogleMapsLoader){
 *      GoogleMapsLoader.done(function(){
 *          // your google maps code here!
 *          var geocoder = new google.maps.Geocoder();
 *      }).fail(function(){ 
 *          console.error("ERROR: Google maps library failed to load");
 *      });
 *  });
 *
 */

var google_maps_loaded_def = null;

function($) {
  var geoPlaces = require('geoPlaces');
  var apiKey = document.querySelector('body').getAttribute('data-hiddenApi');

  if(!google_maps_loaded_def) {
    
    google_maps_loaded_def = $.Deferred();
  
    window.google_maps_loaded = function() {
      google_maps_loaded_def.resolve(google.maps);    
    }

    require(['https://maps.googleapis.com/maps/api/js?key='+ apiKey +'&libraries=places&callback=google_maps_loaded'],function(){
      /// Create a variable for the geolocation form
      var form = document.querySelector('[data-name="js-geolocation-form"]');
      /// Check to see if there's a geolocation-form
      if(form) {
        /// If the form exists we would like to run the places function
        geoPlaces.locationSearch();
      }

    },function(err) {
      google_maps_loaded_def.reject();
      //throw err; // maybe freak out a little?
    });
    
  }
  
  return google_maps_loaded_def.promise();
  
};