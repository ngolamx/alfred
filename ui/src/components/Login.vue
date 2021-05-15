<template>
<main class="main landing">
  <div class="login-form">
    <div class="login-form__heading">
      <img src="img/alfred-logo-trans.png" alt="LOGO" class="login-form__logo">
    </div>
    <form class="form form--login" action="">
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
export default {
  name: 'Login',
}
</script>

<style scoped lang="scss">
// COLORS VAR
$primary-color-dark:   #388E3C;
$primary-color:        #4CAF50;
$primary-color-light:  #C8E6C9;
$primary-color-text:   #FFFFFF;
$accent-color:         #CDDC39;
$primary-text-color:   #212121;
$secondary-text-color: #757575;
$divider-color:        #BDBDBD;

// INDICATOR COLOR
$indicator-color-green: #27ae60;
$indicator-color-red: #e74c3c;
$indicator-color-yellow: #f1c40f;


// RESPONSIVE BREAKPOINTS
$bp-largest: 75em;   // 1200px
$bp-large: 62.5em;   // 1000px
$bp-medium: 50em;    // 800px;
$bp-small: 37.5em;    // 600px;

// FONT
$default-font-size: 1.6rem;

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
</style>
