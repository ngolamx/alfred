<template>
  <div>
    <Dialog ref="dialog" @on-submit="deleteOrder">
      <div class="dialog-body">
        <p>Bạn có muốn xóa đơn hàng?</p>
      </div>
    </Dialog>
      <div class="container">
        <div class="main">
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
              <template v-for="order in orders">
                <tr :key="order._id" @click="selectOrder(order)" :class="(selectedOrder && order._id === selectedOrder._id) ? 'selected' : ''">
                    <td>
                      <span>{{order.client.name}}</span>
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
                      <span>{{order.start_date ? new Date(order.start_date).toLocaleDateString('vi') : ''}}</span>
                      <span>Ngày cắm</span>
                    </td>
                    <td>
                      <span>{{order.end_date ? new Date(order.end_date).toLocaleDateString('vi') : ''}}</span>
                      <span>Ngày xuất</span>
                    </td>
                  </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="side" v-if="selectedOrder && shownPanel">
          <div class="detail-body">
            <div class="form-group">
              <label for="client">Khách hàng</label>
              <v-select :options="clients" label="name" :value="selectedOrder.client" :reduce="client => client._id"
                @input="updateOrderClient"></v-select>
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
            <v-date-picker v-model="range" is-range @input="updateDate" locale="vi">
              <template v-slot="{ inputValue, inputEvents }">
                <div class="flex justify-center items-center">
                  <div class="form-group">
                  <label for="'start_date'">Ngày cắm</label>
                    <input
                      id="'start_date'"
                      :value="inputValue.start"
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
                    <label for="'end_date'">Ngày xuất</label>
                    <input
                      id="'end_date'"
                      :value="inputValue.end"
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
          </div>
          <footer>
            <div class="close-panel" @click="closePanel">
                <svg v-svg="'icon-forward'"></svg>
            </div>
            <div class="created-date">
              Ngày tạo: {{new Date(selectedOrder.createdAt).toLocaleString('vi')}}
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
import { mapState } from 'vuex'
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
    Dialog
  },
  computed: {
    range: {
      set(newValue) {
        return newValue;
      },
      get() {
        return {
          start: this.selectedOrder.start_date ? new Date(this.selectedOrder.start_date) : '',
          end: this.selectedOrder.end_date ? new Date(this.selectedOrder.end_date) : '',
        };
      }
    },
    ...mapState({
      orders: state => state.orders.all,
      clients: state => state.clients.all
    })
  },
  created() {
    this.$store.dispatch('orders/getAllOrders')
    this.$store.dispatch('clients/getAllClients')
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
    updateDate(value) {
      this.$store.dispatch({
        type: 'orders/updateOrder',
        id: this.selectedOrder._id,
        data: {
          start_date: value.start,
          end_date: value.end
        }
      });
    },
    updateOrderClient(value) {
      this.$store.dispatch({
        type: 'orders/updateOrder',
        id: this.selectedOrder._id,
        key: 'client',
        value
      });
    },
    updateOrder(key, value) {
      this.$store.dispatch({
        type: 'orders/updateOrder',
        id: this.selectedOrder._id,
        data: {
          [key]: value
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
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

.main {
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  flex: 1;
}

.item:hover {
  background-color: #e5fafe;
}

.container {
  display: flex;
}
.side {
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
