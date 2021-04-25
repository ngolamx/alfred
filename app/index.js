(function() {
  //Dependencies
  $script(['app/vendor/ready.js', 'app/vendor/reqwest.min.js', 'app/vendor/lazyload.js'], 'bundle');

  var logoutHandler = function() {
    document.querySelector('.logout').addEventListener('click', function(e) {
      e.preventDefault();
      reqwest('/api/v1/users/logout').then(function(resp) {
        if (resp.status === 'success')
          location.reload(true);
      });
    });
  }

  var app = function() {
    reqwest('app/templates/index.html', function (resp) {
      document.querySelector('#app').insertAdjacentHTML('afterbegin', resp);
      logoutHandler();
    });
    LazyLoad.css('app/css/style.css');

  }

  //Init
  $script.ready('bundle', function() {
    domready(function() {
      app();
    });
  })
}());
