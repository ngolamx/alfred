<template>
<header>
  <div class="logo">
    <img src="@/assets/img/alfred-logo-trans.png" alt="Logo">
  </div>
  <ul class="nav">
    <li class="nav-item">
      <a class="link logout" href="#" @click.prevent="$refs.dialog.openDialog">
        <span>Log out</span>
        <svg class="icon-logout">
          <use xlink:href="@/assets/img/sprite.svg#icon-logout"></use>
        </svg>
      </a>
    </li>
  </ul>
  <Dialog ref="dialog" @on-submit="logOut">
    <div class="dialog-body">
      <p>Bạn có muốn thoát khỏi ứng dụng?</p>
    </div>
  </Dialog>
</header>
</template>

<script>
import Dialog from './Dialog'
import axios from 'axios';
import showAlert from '../lib/alerts';

export default {
  name: 'Header',
  components: {
    Dialog
  },
  methods: {
    async logOut() {
      try {
        const res = await axios({
          method: 'GET',
          url: '/api/v1/users/logout'
        });
        if (res.data.status === 'success') {
          localStorage.loggedIn = false;
          location.reload(true);
        }
      } catch (err) {
        console.log(err.response);
        showAlert('error', 'Error logging out! Try again.');
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo img {
  height: 4rem;
}

svg.icon-logout {
  width: 30px;
  height: 30px;
  margin-left: .8rem;
}
header {
  grid-column: 1/-1;
  display: flex;
  justify-content: stretch;
  align-items: center;
  background-color: var(--color-black);
  color: var(--color-text-white);
  height: 4rem;
}

.nav {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  align-items: center;
  list-style: none;
}
</style>
