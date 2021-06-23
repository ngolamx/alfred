<template>
<div class="actions">
  <input type="text" id="add-new" ref="input" name="add-new" placeholder="Thêm khách hàng mới" @keyup.enter="addNewClient">
  <label for="add-new">
    <svg v-svg="'icon-add-simple'"></svg>
  </label>
  <p @click="addNewClient">Thêm</p>
</div>
</template>
<script>
import showAlert from '../lib/alerts';
export default {
  name: 'ClientManager',
  methods: {
    async addNewClient() {
      const clientName = this.$refs.input.value;
      try {
        await this.$store.dispatch({
          type: 'clients/createClient',
          data: { name: clientName }
        });
        showAlert('success', 'Tạo khách hàng thành công');
      } catch(err) {
        showAlert('error', err);
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.actions {
  margin: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--color-background);
  label {
    order: -1;
    display: flex;
    align-items: center;
    color: var(--color-background);
    margin-right: 1rem;
    transition: all .2s ease-out;
  }
  p {
    color: var(--color-primary);
    visibility: hidden;
    opacity: 0;
    transition: all .2s ease-out;
    text-transform: uppercase;
    cursor: pointer;
    margin-left: auto;
  }
  input {
    outline: none;
    font-size: 1.8rem;
    border: none;
    flex: 1;
    margin-right: 1rem;
    &:placeholder {
      color: var(--color-background);
    }
    &:focus ~ label {
      color: var(--color-primary);
    }
    &:not(:placeholder-shown) ~ p {
      visibility: visible;
      opacity: 1;
    }
  }

}

</style>
