<template>
  <div>
    <Modal ref="modal" @on-submit="addNewClient" :title="'Tạo khách hàng mới'">
      <div class="modal-body">
        <form @submit.prevent="addNewClient" class="add-order-form">
          <div class="data-set">
            <fieldset>
              <legend>Khách hàng</legend>
              <div class="form-group">
                <label for="name">Tên</label>
                <input type="text" id="name" name="name" v-model="clientModel.name" autocomplete="off">
              </div>
              <div class="form-group">
                <label for="phone">Số điện thoại</label>
                <input type="tel" id="phone" name="phone" v-model="clientModel.phone" autocomplete="off">
              </div>
              <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input type="text" id="address" name="address" v-model="clientModel.address" autocomplete="off">
              </div>
            </fieldset>
          </div>
          <div class="actions">
            <a class="btn btn-cancel dismiss" @click="closeModal">Cancel</a>
            <input type="submit" class="btn btn-submit" value="Create">
          </div>
        </form>
      </div>
    </Modal>
    <Dialog ref="dialog" @on-submit="deleteClient">
      <div class="dialog-body">
        <p>Bạn có muốn xóa khách hàng?</p>
      </div>
    </Dialog>
    <div class="container">
      <div class="main">
        <div class="inline-actions">
          <input type="text" id="add-new" ref="input" v-model="clientModel.name" name="add-new" placeholder="Thêm khách hàng mới" @keyup.enter="addNewClient">
          <label for="add-new" @click="openModal" class="add-new">
            <svg v-svg="'icon-add-simple'"></svg>
          </label>
          <p @click="addNewClient">Thêm</p>
        </div>
        <ul class="client-list">
          <li v-for="client in clients" :key="client._key" @click="selectClient(client)" :class="client === selectedClient ? 'selected' : ''">
            <div class="block">
              <p class="value">{{client.name}}</p>
              <p class="title">Tên</p>
            </div>
            <div class="block">
              <p class="value">{{client.phone ? client.phone : '&nbsp;'}}</p>
              <p class="title">Số điện thoại</p>
            </div>
            <div class="block">
              <p class="value">{{client.address ? client.address : '&nbsp;'}}</p>
              <p class="title">Địa chỉ</p>
            </div>

          </li>
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
            Ngày tạo: {{new Date(selectedClient.createdAt).toLocaleString('vi')}}
          </div>
          <div class="delete-record" @click="$refs.dialog.openDialog">
              <svg v-svg="'icon-delete'"></svg>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import showAlert from '../lib/alerts';
import { mapState } from 'vuex'
import Modal from './Modal.vue';
import Dialog from './Dialog'

export default {
  name: 'ClientManager',
  components: {
    Dialog,
    Modal
  },
  data() {
    return {
      shownPanel: false,
      selectedClient: null,
      clientModel: {}
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
    closeModal() {
      this.$refs.modal.closeModal();
    },
    openModal() {
      this.$refs.modal.openModal();
    },
    selectClient(client) {
      this.selectedClient = client;
      this.shownPanel = true;
    },
    async addNewClient() {
      try {
        const newClient = await this.$store.dispatch({
          type: 'clients/createClient',
          data: this.clientModel
        });
        showAlert('success', 'Tạo khách hàng thành công');
        this.$refs.input.blur();
        this.selectedClient = newClient;
        this.closeModal();
        this.clientModel = {};
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
    }
  }
}

</script>

<style lang="scss" scoped>
.add-new {
  cursor: pointer;
  &:hover {
    color: var(--color-primary);
  }
}
.inline-actions {
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
    display: flex;
    justify-content: space-between;
    padding: 5px 1rem;
    cursor: pointer;
    transition: all .2s ease-out;
    &:not(:last-child) {
      box-shadow: 0 1px 0 0px #e5e5e5;
    }
    &:hover {
      background-color: #e5fafe;
      box-shadow: 0 1px 0 0px #e5e5e5;
    }
    &.selected {
      background-color: #e3eef1;
    }

    .block {
      width: calc(100% / 3);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p:last-child {
        color: var(--color-background);
        font-size: 1.3rem;
        font-weight: 400;
      }
    }
  }
}

</style>
