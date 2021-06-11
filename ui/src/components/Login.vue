<template>
<main class="main landing">
  <div class="login-form">
    <div class="login-form__heading">
      <img src="img/alfred-logo-trans.png" alt="LOGO" class="login-form__logo">
    </div>
    <form class="form form--login" @submit.prevent="onLogin">
      <div class="form__group">
        <input id="email" class="form__input" type="email" placeholder="E-mail" required="true">
      </div>
      <div class="form__group ma-bt-md">
        <input id="password" class="form__input" type="password" placeholder="Password" required="true" minlength="8">
      </div>
      <div class="form__group">
        <button class="btn btn--green">
          Login
        </button>
      </div>
    </form>
  </div>
</main>
</template>

<script>
import axios from 'axios';
import showAlert from '../lib/alerts';

export default {
  name: 'Login',
  methods: {
	async onLogin(evt) {
      const { email, password } = evt.target
      try {
            const res = await axios({
              method: 'POST',
              url: '/api/v1/users/login',
              data: {
                email: email.value,
                password: password.value
              }
            });

            if (res.data.status === 'success') {
              sessionStorage.loggedIn = true;
              showAlert('success', 'Logged in successfully!');
              window.setTimeout(() => {
                this.$router.push('/')
              }, 1500);
            }
        } catch (err) {
          showAlert('error', err.response.data.message);
        }
	}
  }
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
}
.login-form {
  .form {
    &__input {
      width: 100%;
      font-size: 1.8rem;
      font-family: inherit;
      padding: 1rem 1.5rem;
      border-radius: 2px;
      border: 1px solid $primary-color-light;
      display: block;
      background-color: rgba($primary-color-text, .5);
      &:focus {
        outline: none;
        border: 1px solid $primary-color;
      }
    }

  }
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  border: 1px solid $primary-color;
  background-color: $primary-color-text;

  &__logo {
    width: 20rem;
    height: auto;
  }

  &__heading {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary-text-color;
  }
}

.form--login {
  width: 80%;
  margin: 3rem auto;
  & > *:not(last-child) {
    margin-bottom: 2rem;
  }

  & > *:last-child {
    margin-top: 8rem;
  }
}
.landing {
  height: 100vh;
  background-image: linear-gradient(
  to right bottom,
    rgba($primary-color, .7),
    rgba($primary-color-dark, .7)),
  url(../assets/img/dalat.jpg);
  background-size: cover;
}
</style>
