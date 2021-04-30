  var addOrderHandler = function() {
    var dialog;
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

            setupCalendarInput();
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
                  dialog.close();
                }
              });
          });
        });
    });
    var plusEle = document.querySelector('#add-order');
      if (plusEle) {
        plusEle.addEventListener('click', function(e) {
          e.preventDefault();
          dialog.show();
      });
    }
  }
