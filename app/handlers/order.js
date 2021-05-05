  var addOrderHandler = function() {
    var dialog;
    var plusEle = document.querySelector('#add-order');
    if (plusEle) {
      plusEle.addEventListener('click', function(e) {
        e.preventDefault();
        dialog.show();
      });
    }
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
}
  var addEventListener = function() {
    var elements = document.querySelectorAll('.table-orders tbody tr');
    elements.forEach(function(ele) {
      ele.addEventListener('click', function(event) {
        console.log(event.target);
        console.log(event.currentTarget);
      });
    });
  }
  var getAllOrders = function() {
    var orders = reqwest({
      url: '/api/v1/orders',
      method: 'get',
      contentType: 'application/json',
    });
    var ordersTemplate = reqwest({
      url: 'app/templates/order-list.html',
      method: 'get',
    });

    RSVP.all([orders, ordersTemplate])
        .then(function(resp) {
          var template = Handlebars.compile(resp[1]);
          var ele = template({ orders: resp[0].data.data });
          document.querySelector('main').insertAdjacentHTML('afterbegin', ele);
          addEventListener();
        })
        .catch(function(err) {
          console.log(err);
        });
}
