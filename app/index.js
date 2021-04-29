(function() {
  //Dependencies
  var lib = [
  'app/vendor/ready.js',
  'app/vendor/reqwest.min.js',
  'app/vendor/lazyload.js',
  'app/vendor/picoModal-3.0.0.min.js',
  'app/vendor/tiny-date-picker.min.js',
  'app/vendor/form-to-obj.min.js',
  'app/vendor/notyf.min.js'
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

  var setupCalendarInput = function() {
    document.querySelectorAll('.date-picker')
            .forEach(function(ele) {
            TinyDatePicker(ele, {
              mode: 'dp-below',
              dayOffset: 1,
              lang: {
                days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                months: [
                  'Th.Một',
                  'Th.Hai',
                  'Th.Ba',
                  'Th.Tư',
                  'Th.Năm',
                  'Th.Sáu',
                  'Th.Bảy',
                  'Th.Tám',
                  'Th.Chín',
                  'Th.Mười',
                  'Th.Mười Một',
                  'Th.Mười Hai',
                ],
                today: 'Hôm nay',
                clear: 'Xóa',
                close: 'Đóng',
            },
            format(date) {
              var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
              return date.toLocaleDateString('vi-vi', options);
            },
            parse(str) {
              var parts, date;
              if (str) {
                parts = str.split(',')[1].trim().split('/');
                date = new Date(parts[2], parts[1] - 1, parts[0]);
              }
              return isNaN(date) ? new Date() : date;
            },
        });
    });
  }

  var addOrderHandler = function() {
    var notyf = new Notyf({
        duration: 5000,
        className: 'notyf-toast',
        dismissible: true,
        position: {
          x: 'center',
          y: 'top',
      }});
    var plusEle = document.querySelector('#add-order');
    var dialog;
    if (plusEle) {
      plusEle.addEventListener('click', function(e) {
        e.preventDefault();
        dialog.show();
        // Bind form actions
        document.querySelector('form.add-order-form').addEventListener('submit', function(event) {
          event.preventDefault();
          var obj = formToObj(document.querySelector('form.add-order-form'));
          reqwest({
            url: '/api/v1/orders',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(obj),
            error: function(err) {
              var message = JSON.parse(err.response).message;
              notyf.error(message);
            },
            success: function(resp) {
              notyf.success(resp.status);
            }
          });
        });
        setupCalendarInput();
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
    LazyLoad.css('app/vendor/notyf.min.css');

  }

  //Init
  $script.ready('bundle', function() {
    domready(function() {
      app();
    });
  })
}());
