<template>
  <div ref="dialog">
    <transition name="fade">
      <div class="dialog" v-if="show">
        <div class="dialog-content">
          <div class="dialog-title">
            <h3>Xác nhận</h3>
            <svg @click="show = false">
              <use xlink:href="@/assets/img/sprite.svg#icon-close"></use>
            </svg>
          </div>
          <slot></slot>
          <div class="dialog-buttons">
            <input class="dialog-button dialog-button--green" type="button" value="OK" @click="closeDialog">
            <input class="dialog-button" type="button" value="Hủy" @click="show = false">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    const ele = this.$refs.dialog;
    const app = document.querySelector('body');
    app.insertAdjacentElement('afterbegin', ele);
  },
  methods: {
    closeDialog() {
      this.show = false;
      this.$emit('on-submit');
    },
    openDialog() {
      this.show = true;
    }
  }
}

</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.dialog {
  position: fixed;
  z-index: 10000;
  background-color: rgba(#757575, .5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.dialog-content {
  background-color: #FFF;
  width: 50rem;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.23);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .dialog-title {
    background-color: #f5f5f5;
    border-radius: 1rem 1rem 0 0;
    padding: 1rem;
    font-size: 1.8rem;
    font-weight: 600;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
    }
  }

  .dialog-body {
    min-height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog-buttons {
    display: flex;
    margin: 2rem;
    justify-content: flex-end;

    .dialog-button {
      font-size: 1.6rem;
      font-weight: 500;
      width: 10rem;
      border: none;
      padding: 1rem 2rem;
      margin-left: 1.5rem;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.23);

      &--green {
        background-color: var(--color-primary);
        color: var(--color-text-white);
      }
    }
  }
}
</style>
