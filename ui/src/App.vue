<template>
<Header/>
<Aside/>
<main>
 <OrderManager/>
</main>
<footer>
</footer>
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

<style lang="scss">
@import '@/assets/css/tiny-date-picker.min';
.dp-below {
  z-index: 100001;
  width: 26rem !important;
  height: 30rem !important;
}

.dp:before {
  background: var(--color-primary) !important;
}
:root {
  --color-black: #212121;
  --color-text-white: #FFF;
  --color-accent: #CDDC39;
  --color-primary: #4CAF50;
  --color-alert: #e74c3c;
  --color-background: #BDBDBD
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
  font: 1.6rem/1.8rem OpenSans, Arial, sans-serif;
  max-width: 100vw;
}

#app {
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

.link:link,
.link:visited {
  color: currentColor;
  font-size: 1.8rem;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
