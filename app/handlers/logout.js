var logoutHandler = function() {
  document.querySelector('.logout').addEventListener('click', function(e) {
    e.preventDefault();
    reqwest('/api/v1/users/logout').then(function(resp) {
      if (resp.status === 'success')
        location.reload(true);
    });
  });
};
