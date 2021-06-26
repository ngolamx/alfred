<template>
<Modal ref="modal" @on-submit="addOrder" :title="'Tạo đơn hàng mới'">
  <div class="modal-body">
    <form @submit.prevent="addOrder" class="add-order-form">
      <div class="data-set">
        <fieldset>
          <legend>Đơn hàng</legend>
          <div class="form-group">
            <label for="client">Khách hàng</label>
            <input type="text" id="client" name="client" v-model="orderModel.client" autocomplete="off">
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
          <div class="form-group">
            <label for="start-date">Ngày cắm</label>
            <DatePicker name="start_date" v-model="orderModel.start_date"/>
          </div>
          <div class="form-group">
            <label for="end-date">Ngày xuất</label>
            <DatePicker name="end_date" v-model="orderModel.end_date"/>
          </div>
        </fieldset>
      </div>
      <div class="actions">
        <a class="btn btn-cancel dismiss" @click="$refs.modal.closeModal">Cancel</a>
        <input type="submit" class="btn btn-submit" value="Create">
      </div>
    </form>
  </div>
</Modal>
<aside>
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
        <svg class="icon-add" v-svg="'icon-add'" @click="$refs.modal.openModal"></svg>
      </router-link>
    </li>
    <li class="main-nav-item">
      <router-link to="/clients">
        <svg v-svg="'icon-people'"></svg>
        <span>Khách hàng</span>
      </router-link>
    </li>
    <li class="main-nav-item">
      <router-link to="/people">
        <svg v-svg="'icon-body'"></svg>
        <span>Nhân viên</span>
      </router-link>
    </li>
    <li class="main-nav-item">
      <router-link to="cash">
        <svg v-svg="'icon-cash'"></svg>
        <span>Công nợ</span>
      </router-link>
    </li>
  </ul>
</aside>
</template>

<script>
import Modal from './Modal.vue';
import DatePicker from './DatePicker.vue';
import showAlert from '../lib/alerts';
export default {
  name: 'Aside',
  components: {
    Modal,
    DatePicker
  },
  data() {
    return {
      orderModel: {
        client: null,
        category: null,
        amount: 0,
        origin: null,
        start_date: null,
        end_date: null
      }
    }
  },
  methods: {
    async addOrder() {
      try {
        await this.$store.dispatch({
          type: 'orders/createOrder',
          data: this.orderModel
        });
        showAlert('success', 'Tạo đơn hàng thành công');
        this.$refs.modal.closeModal();
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

label.icon-calendar {
  position: absolute;
  top: 33px;
  right: 0;
}

label.icon-calendar svg {
  width: 20px;
  height: 20px;
  color: currentColor;
}
</style>
