<template>
  <div id="content">
    <Header />
    <Aside />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './Header.vue'
import Aside from './Aside.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
  }
}
</script>

<style lang="scss" scoped>
#content {
  position: relative;
  display: grid;
  grid-template-columns: minmax(min-content, 25rem) 1fr;
  grid-template-rows: min-content auto minmax(min-content, 5rem);
  height: 100vh;
  max-width: 100vw;
  color: var(--color-black);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

footer {
  grid-column: 2/-1;
}

</style>
