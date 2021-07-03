<template>
  <div>
    <input type="text" :id="name" :name="name" readonly="readonly"
      :value="modelValue ? modelValue : value" class="date-picker" ref="input" autocomplete="off" @change="$emit('update:modelValue', $event.target.value)">
    <label :for="name" class="icon-calendar">
      <svg class>
        <use xlink:href="@/assets/img/sprite.svg#icon-calendar"></use>
      </svg>
    </label>
  </div>
</template>
<script>
import TinyDatePicker from 'tiny-date-picker'
export default {
  name: 'DatePicker',
  emits: ['onchange', 'update:modelValue'],
  props: {
    value: String,
    name: String,
    modelValue: String,
  },
  mounted() {
    console.log(this)
    const ele = this.$refs.input;
    TinyDatePicker(ele, {
        appendTo: document.querySelector('#app'),
        mode: 'dp-below',
        dayOffset: 1,
        lang: {
          days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
          months: [
            'Th.Một',
            'Th.Hai',
            'Th.Ba',
            'Th.Tư',
            'Th.Năm',
            'Th.Sáu',
            'Th.Bảy',
            'Th.Tám',
            'Th.Chín',
            'Th.Mười',
            'Th.Mười Một',
            'Th.Mười Hai',
          ],
          today: 'Hôm nay',
          clear: 'Xóa',
          close: 'Đóng',
      },
      format(date) {
        var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('vi-vi', options);
      },
      parse(str) {
        var parts, date;
        if (str) {
          parts = str.split(',')[1].trim().split('/');
          date = new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return isNaN(date) ? new Date() : date;
      },
    }).on('select', (_, dp) => {
      const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
      this.$emit('onchange', {
        name: this.name,
        value: dp.state.selectedDate.toLocaleDateString('vi-vi', options)
      });
    });
  }
}
</script>

<style lang='scss' scoped>
.date-picker {
  width: calc(100% - 25px);
  cursor: pointer;
}
input {
  display: block;
  font: 14px/18px OpenSans, Arial, sans-serif;
  border: 1px solid #d0d0d0;
  border-radius: 0;
  background: #fff;
  padding: 3px 5px;
  outline: none;
}

input:focus {
  border-color: var(--color-primary);
}
label.icon-calendar {
  position: absolute;
  top: 34px;
  right: 0;
  cursor: pointer;
}

label.icon-calendar svg {
  width: 20px;
  height: 20px;
  color: #666;
}

</style>
