<template>
<header>
  <div class="logo">
    <img src="@/assets/img/alfred-logo-trans.png" alt="Logo">
  </div>
  <ul class="nav">
    <li class="nav-item">
      <a class="link logout" href="#">
        <span>Log out</span>
        <svg class="icon-logout">
          <use xlink:href="@/assets/img/sprite.svg#icon-logout"></use>
        </svg>
      </a>
    </li>
  </ul>
</header>
</template>

<script>
export default {
  name: 'Header',
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
