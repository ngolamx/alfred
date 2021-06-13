<template>
<Dialog ref="dialog" @on-submit="deleteOrder">
  <div class="dialog-body">
    <p>Bạn có muốn xóa đơn hàng?</p>
  </div>
</Dialog>
  <div class="orders-content">
    <div class="table-content">
      <table class="table table-orders">
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Tên giống</th>
            <th>Số lượng</th>
            <th>Nguồn gốc</th>
            <th>Ngày cắm</th>
            <th>Ngày xuất</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orders" :key="order._id">
            <tr @click="selectOrder(order)" :class="(selectedOrder && order._id === selectedOrder._id) ? 'selected' : ''">
                <td>
                  <span>{{order.client}}</span>
                  <span>Khách hàng</span>
                </td>
                <td>
                  <span>{{order.category}}</span>
                  <span>Tên giống</span>
                </td>
                <td>
                  <span>{{order.amount}}</span>
                  <span>Số lượng</span>
                </td>
                <td>
                  <span>{{order.origin}}</span>
                  <span>Nguồn gốc</span>
                </td>
                <td>
                  <span>{{order.start_date}}</span>
                  <span>Ngày cắm</span>
                </td>
                <td>
                  <span>{{order.end_date}}</span>
                  <span>Ngày xuất</span>
                </td>
              </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="order-detail-edit" v-if="selectedOrder && shownPanel">
      <div class="detail-body">
        <div class="form-group">
          <label for="client">Khách hàng</label>
          <input type="text" id="client" name="client" autocomplete="off"
            @keyup.enter="updateOrder($event.target.name, $event.target.value)"
            :value="selectedOrder.client">
        </div>
        <div class="form-group">
          <label for="category">Tên giống</label>
          <input type="text" id="category" name="category" autocomplete="off"
            @focusout="updateOrder($event.target.name, $event.target.value)"
            @keyup.enter="updateOrder($event.target.name, $event.target.value)"
            :value="selectedOrder.category">
        </div>
        <div class="form-group">
          <label for="amount">Số lượng</label>
          <input type="number" id="amount" name="amount" autocomplete="off"
            @focusout="updateOrder($event.target.name, $event.target.value)"
            @keyup.enter="updateOrder($event.target.name, $event.target.value)"
            :value="selectedOrder.amount">
        </div>
        <div class="form-group">
          <label for="origin">Nguồn gốc</label>
          <input type="text" id="origin" name="origin" autocomplete="off"
            @focusout="updateOrder($event.target.name, $event.target.value)"
            @keyup.enter="updateOrder($event.target.name, $event.target.value)"
            :value="selectedOrder.origin">
        </div>
        <div class="form-group">
          <label for="start-date">Ngày cắm</label>
          <DatePicker name="start_date"
            @onchange="updateOrder($event.name, $event.value)"
            :value="selectedOrder.start_date"/>
        </div>
        <div class="form-group">
          <label for="end-date">Ngày xuất</label>
          <DatePicker name="end_date"
            @onchange="updateOrder($event.name, $event.value)"
            :value="selectedOrder.end_date"/>
        </div>
      </div>
      <footer>
        <div class="close-panel" @click="closePanel">
            <svg v-svg="'icon-forward'"></svg>
        </div>
        <div class="created-date">
          Ngày tạo: {{formatDate(selectedOrder.createdAt)}}
        </div>
        <div class="delete-record" @click="$refs.dialog.openDialog">
            <svg v-svg="'icon-delete'"></svg>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DatePicker from './DatePicker'
import Dialog from './Dialog'
import showAlert from '../lib/alerts';

export default {
  name: 'OrderManager',
  data: function() {
    return {
      selectedOrder: null,
      shownPanel: false
    }
  },
  components: {
    DatePicker,
    Dialog
  },
  computed: {
    ...mapState({
    orders: state => state.orders.all
    })
  },
  created() {
    this.$store.dispatch('orders/getAllOrders')
  },
  methods: {
    selectOrder(order) {
      this.selectedOrder = order;
      this.shownPanel = true;
    },
    closePanel() {
      this.shownPanel = false;
    },
    async deleteOrder() {
      try {
        await this.$store.dispatch({
          type: 'orders/deleteOrder',
          id: this.selectedOrder._id
        });
        showAlert('success', 'Đã xóa');
        this.selectedOrder = this.orders[0];
      } catch (error) {
        showAlert('success', error);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
      return date.toLocaleDateString('vi-vi', options);
    },
    updateOrder(key, value) {
      this.$store.dispatch({
        type: 'orders/updateOrder',
        id: this.selectedOrder._id,
        key,
        value
      });
    }
  }
}
</script>

<style scoped lang="scss">
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
  top: 25px;
  right: 0;
}

label.icon-calendar svg {
  width: 20px;
  height: 20px;
  color: #666;
}
/* ORDERS */
.table thead {
  display: none;
}
.table {
  position: relative;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1.5rem;
  width: 100%;
}
.table tbody tr {
  cursor: pointer;
}
.table tbody tr:hover {
  background-color: #e5fafe;
}

.table tbody td {
  padding: 1.3rem;
  text-align: left;
  border-bottom: 1px solid #f4f6ff;
}

.table tbody td span {
  display: block;
}

.table tbody td span:nth-child(1) {
  min-height: 1.8rem;
  font-weight: bold;
}
.table tbody td span:nth-child(2) {
  margin-top: 5px;
  color: #757575;
  font-size: 12px;
}

.table-content {
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  flex: 1;
}

.item:hover {
  background-color: #e5fafe;
}

.orders-content {
  display: flex;
}
.order-detail-edit {
  border: 1px solid #d0d0d0;
  padding: 2rem 1rem;
  background-color: #f0f0f0;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 4rem);

  footer {
    display: flex;
    justify-content: space-between;
    .close-panel,.delete-record {
      width: 3rem;
      height: 3rem;
      cursor: pointer;
      &:hover {
        background-color: #d0d0d0;
      }
    }
    .created-date {
      margin-top: .5rem;
      font-size: 1.3rem;
      color: #777E78;
    }
    svg {
      margin-left: .5rem;
      margin-top: .5rem;
      width: 2rem;
      height: 2rem;
      color: #666;
    }
  }
}
.selected {
  background-color: #e3eef1;
}
</style>
