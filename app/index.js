(function() {
  //Dependencies
  var lib = [
  'app/vendor/ready.js',
  'app/vendor/reqwest.min.js',
  'app/vendor/lazyload.js',
  'app/vendor/picoModal-3.0.0.min.js',
  'app/vendor/tiny-date-picker.min.js'
  ];
  $script(lib, 'bundle');

  var logoutHandler = function() {
    document.querySelector('.logout').addEventListener('click', function(e) {
      e.preventDefault();
      reqwest('/api/v1/users/logout').then(function(resp) {
        if (resp.status === 'success')
          location.reload(true);
      });
    });
  }

  var addOrderHandler = function() {
    var plusEle = document.querySelector('#add-order');
    var dialog;
    if (plusEle) {
      plusEle.addEventListener('click', function(e) {
        e.preventDefault();
        dialog.show();
        document.querySelectorAll('.date-picker')
                .forEach(function(ele) {
                  TinyDatePicker(ele, {
                    mode: 'dp-below'
                  });
                });
      });
      reqwest('/app/templates/add-order.html').then(function(resp) {
         dialog = picoModal({
           content: resp,
           overlayClose: false,
           modalClass: 'modal',
           closeClass: 'modal-close',
           closeHtml: `
              <svg class="icon-close">
                <use xlink:href="app/img/sprite.svg#icon-close"></use>
              </svg>
           `
         }).afterCreate(function(modal){
            modal.modalElem().getElementsByClassName("dismiss")[0]
                .addEventListener('click', modal.close);
        });
      });
    }
  }

  var app = function() {
    reqwest('app/templates/index.html', function (resp) {
      document.querySelector('#app').insertAdjacentHTML('afterbegin', resp);
      logoutHandler();
      addOrderHandler();
    });
    LazyLoad.css('app/css/style.css');
    LazyLoad.css('app/vendor/tiny-date-picker.min.css');

  }

  //Init
  $script.ready('bundle', function() {
    domready(function() {
      app();
    });
  })
}());
