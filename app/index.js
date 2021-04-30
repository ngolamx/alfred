(function() {
  //Dependencies
  var lib = [
  'app/vendor/ready.js',
  'app/vendor/reqwest.min.js',
  'app/vendor/rsvp.min.js',
  'app/vendor/lazyload.js',
  'app/vendor/picoModal-3.0.0.min.js',
  'app/vendor/tiny-date-picker.min.js',
  'app/vendor/handlebars.min-v4.7.7.js',
  'app/vendor/form-to-obj.min.js',
  'app/vendor/notyf.min.js',
  'app/handlers/logout.js',
  'app/handlers/calendar.js',
  'app/handlers/notyf.js',
  'app/handlers/order.js'
  ];
  $script(lib, 'bundle');
  //Init
  $script.ready('bundle', function() {
    domready(function() {
      LazyLoad.css('app/css/style.css');
      LazyLoad.css('app/vendor/tiny-date-picker.min.css');
      LazyLoad.css('app/vendor/notyf.min.css');
      reqwest('app/templates/index.html', function (resp) {
        document.querySelector('#app').insertAdjacentHTML('afterbegin', resp);
        app();
      });
    });
  });
  var app = function() {
    logoutHandler();
    addOrderHandler();
    getAllOrders();
    setupNotyf();
  }
}());
