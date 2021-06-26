<template>
<Dialog ref="dialog" @on-submit="deleteClient">
  <div class="dialog-body">
    <p>Bạn có muốn xóa khách hàng?</p>
  </div>
</Dialog>
<div class="container">
  <div class="main">
    <div class="actions">
      <input type="text" id="add-new" ref="input" name="add-new" placeholder="Thêm khách hàng mới" @keyup.enter="addNewClient">
      <label for="add-new">
        <svg v-svg="'icon-add-simple'"></svg>
      </label>
      <p @click="addNewClient">Thêm</p>
    </div>
    <ul class="client-list">
      <li v-for="client in clients" :key="client._key" @click="selectClient(client)" :class="client === selectedClient ? 'selected' : ''">{{client.name}}</li>
    </ul>
  </div>
  <div class="side" v-if="selectedClient && shownPanel">
    <div class="detail-body">
      <div class="form-group">
        <label for="name">Tên</label>
        <input type="text" id="name" name="name" autocomplete="off"
          @keyup.enter="updateClient($event.target.name, $event.target.value)"
          :value="selectedClient.name">
      </div>
      <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <input type="tel" id="phone" name="phone" autocomplete="off"
          @focusout="updateClient($event.target.name, $event.target.value)"
          @keyup.enter="updateClient($event.target.name, $event.target.value)"
          :value="selectedClient.phone">
      </div>
      <div class="form-group">
        <label for="address">Địa chỉ</label>
        <input type="text" id="address" name="address" autocomplete="off"
          @focusout="updateClient($event.target.name, $event.target.value)"
          @keyup.enter="updateClient($event.target.name, $event.target.value)"
          :value="selectedClient.address">
      </div>
    </div>
    <footer>
      <div class="close-panel" @click="shownPanel = false">
          <svg v-svg="'icon-forward'"></svg>
      </div>
      <div class="created-date">
        Ngày tạo: {{formatDate(selectedClient.createdAt)}}
      </div>
      <div class="delete-record" @click="$refs.dialog.openDialog">
          <svg v-svg="'icon-delete'"></svg>
      </div>
    </footer>
  </div>
</div>
</template>
<script>
import showAlert from '../lib/alerts';
import { mapState } from 'vuex'
import Dialog from './Dialog'

export default {
  name: 'ClientManager',
  components: {
    Dialog
  },
  data() {
    return {
      shownPanel: false,
      selectedClient: null
    }
  },
  computed: {
    ...mapState({
    clients: state => state.clients.all
    })
  },
  created() {
    this.$store.dispatch('clients/getAllClients')
  },
  methods: {
    selectClient(client) {
      this.selectedClient = client;
      this.shownPanel = true;
    },
    async addNewClient() {
      const clientName = this.$refs.input.value;
      try {
        const newClient = await this.$store.dispatch({
          type: 'clients/createClient',
          data: { name: clientName }
        });
        showAlert('success', 'Tạo khách hàng thành công');
        this.$refs.input.value = '';
        this.$refs.input.blur();
        this.selectedClient = newClient;
      } catch(err) {
        showAlert('error', err);
      }
    },
    async updateClient(key, value) {
      try {
        await this.$store.dispatch({
          type: 'clients/updateClient',
          id: this.selectedClient._id,
          key,
          value
        });
        } catch(err) {
          showAlert('error', err);
        }
    },
    async deleteClient() {
      try {
        await this.$store.dispatch({
          type: 'clients/deleteClient',
          id: this.selectedClient._id
        });
        showAlert('success', 'Đã xóa');
        this.selectedClient = this.clients[0];
      } catch (error) {
        showAlert('success', error);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
      return date.toLocaleDateString('vi-vi', options);
    },
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

.client-list {
  list-style: none;
  margin: 1rem;
  li {
    padding: 5px 1rem;
    cursor: pointer;
    transition: all .2s ease-out;
    &:not(:last-child) {
      border-bottom: 0.5px solid var(--color-background);
    }
    &:hover {
      background-color: #e5fafe;
      border-bottom: 0.5px solid transparent;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.23);
    }
    &.selected {
      background-color: #e3eef1;
    }
  }
}

</style>
