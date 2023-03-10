<template>
  <aside>
    <Modal ref="modal" @on-submit="addOrder" :title="'Tạo đơn hàng mới'">
      <div class="modal-body">
        <form @submit.prevent="addOrder" class="add-order-form">
          <div class="data-set">
            <fieldset>
              <legend>Đơn hàng</legend>
              <div class="form-group">
                <label for="client">Khách hàng</label>
                <v-select :options="clients" label="name" v-model="orderModel.client" :reduce="client => client._id"></v-select>
              </div>
              <div class="form-group">
                <label for="category">Tên giống</label>
                <input type="text" id="category" name="category" v-model="orderModel.category" autocomplete="off">
              </div>
              <div class="form-group">
                <label for="amount">Số lượng</label>
                <input type="number" id="amount" name="amount" v-model="orderModel.amount" autocomplete="off">
              </div>
            </fieldset>
            <fieldset>
              <legend>Thông tin</legend>
              <div class="form-group">
                <label for="origin">Nguồn gốc</label>
                <input type="text" id="origin" name="origin" v-model="orderModel.origin" autocomplete="off">
              </div>
              <v-date-picker v-model="range" is-range locale="vi">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="flex justify-center items-center">
                    <div class="form-group">
                    <label for="'dg_start_date'">Ngày cắm</label>
                      <input
                        id="'dg_start_date'"
                        :value="inputValue.start"
                        autocomplete="off"
                        v-on="inputEvents.start"
                        class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                      />
                      <label class="icon-calendar" :for="'start_date'">
                        <svg>
                          <use xlink:href="@/assets/img/sprite.svg#icon-calendar"></use>
                        </svg>
                      </label>
                    </div>
                    <div class="form-group">
                      <label for="'dg_end_date'">Ngày xuất</label>
                      <input
                        id="'dg_end_date'"
                        :value="inputValue.end"
                        autocomplete="off"
                        v-on="inputEvents.end"
                        class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                      />
                      <label class="icon-calendar" :for="'end_date'">
                        <svg>
                          <use xlink:href="@/assets/img/sprite.svg#icon-calendar"></use>
                        </svg>
                      </label>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </fieldset>
          </div>
          <div class="actions">
            <a class="btn btn-cancel dismiss" @click="closeModal">Cancel</a>
            <input type="submit" class="btn btn-submit" value="Create">
          </div>
        </form>
      </div>
    </Modal>
    <div class="user">
      <svg v-svg="'icon-user'"></svg>
      <span>User name</span>
    </div>
    <ul class="main-nav">
      <li class="main-nav-item">
        <router-link to="/general">
          <svg v-svg="'icon-speedometer'"></svg>
          <span>Tổng quan</span>
        </router-link>
      </li>
      <li class="main-nav-item">
        <router-link to="/orders">
          <svg v-svg="'icon-file-tray'"></svg>
          <span>Đơn Hàng</span>
          <svg class="icon-add" v-svg="'icon-add'" @click="openModal"></svg>
        </router-link>
      </li>
      <li class="main-nav-item">
        <router-link to="/clients">
          <svg v-svg="'icon-people'"></svg>
          <span>Khách hàng</span>
        </router-link>
      </li>
      <li class="main-nav-item">
        <router-link to="cash">
          <svg v-svg="'icon-cash'"></svg>
          <span>Công nợ</span>
        </router-link>
      </li>
      <li class="main-nav-item main-nav-item--with-sub">
        <label for="tracking" class="tracking-label">
          <svg v-svg="'icon-body'"></svg>
          <span>Quản lý</span>
        </label>
        <input type="checkbox" id="tracking">
        <ul class="sub-menu">
          <li>Kho</li>
          <li>Cây giống</li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import Modal from './Modal.vue';
import showAlert from '../lib/alerts';
import { mapState } from 'vuex'

export default {
  name: 'Aside',
  components: {
    Modal
  },
  data() {
    return {
      orderModel: {}
    }
  },
  computed: {
    range: {
      set(newValue) {
        this.orderModel.start_date = newValue.start;
        this.orderModel.end_date = newValue.end;
      },
      get() {
        return {
          start: null,
          end: null
        };
      }
    },
    ...mapState({
      clients: state => state.clients.all
    })
  },
  methods: {
    closeModal() {
      this.$refs.modal.closeModal();
    },
    openModal() {
      this.orderModel = {};
      this.$refs.modal.openModal();
      this.$store.dispatch('clients/getAllClients')
    },
    async addOrder() {
      try {
        await this.$store.dispatch({
          type: 'orders/createOrder',
          data: this.orderModel
        });
        showAlert('success', 'Tạo đơn hàng thành công');
        this.$refs.modal.closeModal();
        this.$store.dispatch('orders/getAllOrders')
      } catch(error) {
        showAlert('error', error.message);
      }
    }
  }
}
</script>

<style scoped lang="scss">
aside {
  grid-row: 2/-1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

aside .main-nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(205, 220, 57, .5);
  color: var(--color-primary);
  flex: 1;
}
aside .user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--color-black);
  color: var(--color-text-white);
}
aside .user svg {
  width: 5rem;
  height: 5rem;
  fill: currentColor;
}

aside .main-nav svg {
  width: 3rem;
  height: 3rem;
}

aside .main-nav-item {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  &--with-sub {
    display: block;
  }
}

.icon-add {
  margin-left: 4rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}

.icon-add:hover {
  color: var(--color-alert);
}

aside .main-nav-item:not(:last-child)::after {
  position: absolute;
  left: 2rem;
  top: 5rem;
  content: "";
  display: inline-block;
  height: 1px;
  width: 60%;
  background-color: var(--color-primary);
}

aside .main-nav-item span{
  font-weight: 500;
  font-size: 1.6rem;
  margin-left: 1rem;
}

aside .main-nav-item.active {
  background-color: var(--color-text-white);
  width: 100%;
}
aside .main-nav-item.active::after {
  width: 0;
}

aside .main-nav-item:not(.active):hover {
  cursor: pointer;
  background-color: #DCEDC8;
  width: 100%;
}

.main-nav-item {
  a,
  a:link,
  a:visited {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    padding-left: 2rem;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .router-link-active {
    background-color: var(--color-text-white);
    width: 100%;
  }
}

#tracking {
  display: none;
}

.tracking-label {
  width: 100%;
}

#tracking:not(:checked) ~ .sub-menu {
  display: none;
}

/* FORM */

form {
  background-color: #f0f0f0;
  padding-bottom: 10px;
  position: relative;
}
form .heading {
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--color-alert);
  line-height: 1.5;
  padding: 15px 20px 10px;
}

form legend {
  color: var(--color-alert);
}

form fieldset {
  margin: 10px 20px;
  padding: 10px;
}

.form-group:not(:last-child) {
  margin-bottom: 1rem;
}

.form-group input {
  display: block;
  font: 14px/18px OpenSans, Arial, sans-serif;
  border: 1px solid #d0d0d0;
  border-radius: 0;
  background: #fff;
  padding: 3px 5px;
  outline: none;
}

.form-group input:focus {
  border-color: var(--color-primary);
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}

form .btn {
  font-family: inherit;
  font-size: 1.4rem;
  background-color: var(--color-primary);
  width: 10rem;
  height: 30px;
  padding: 0 20px;
  border-radius: 7px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.23);
  text-align: center;
  outline: none;
  border: none;
  color: var(--color-text-white);
  cursor: pointer;
}

form .btn.btn-cancel {
  line-height: 2;
  background: #fdfdfd;
  color: var(--color-black);
}

form .btn.btn-cancel:hover {
  background: #e0e0e0;
}

form .actions {
  margin: 10px 20px;
  display: flex;
  justify-content: flex-end;
}

form .actions > *:first-child {
  margin-right: 10px;
}

.add-order-form {
  border-radius: 5px;
}

.add-order-form .data-set {
  display: flex;
}

.form-group {
  position: relative;
}

.form-group .date-picker {
  width: calc(100% - 25px);
  cursor: pointer;
}

</style>
