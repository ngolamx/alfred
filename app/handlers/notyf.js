  var setupNotyf = function() {
    window.notyf = new Notyf({
        duration: 5000,
        className: 'notyf-toast',
        dismissible: true,
        position: {
          x: 'center',
          y: 'top',
      }});
  }
