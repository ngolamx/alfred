(function() {
  //Dependencies
  $script(['vendor/ready.js', 'vendor/reqwest.min.js'], 'bundle');

  var app = function() {
    reqwest('templates/index.html', function (resp) {
      document.querySelector('#app').insertAdjacentHTML('afterbegin', resp);
    });
  }

  //Init
  $script.ready('bundle', function() {
    domready(function() {
      app();
    });
  })
}());
