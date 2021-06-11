<template>
  <div id="content">
    <Header/>
    <Aside/>
    <main>
      <OrderManager/>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import OrderManager from './components/OrderManager.vue'

export default {
  name: 'App',
  components: {
    Header,
    Aside,
	OrderManager
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
