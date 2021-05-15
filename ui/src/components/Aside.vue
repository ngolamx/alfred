<template>
<aside>
  <div class="user">
    <svg>
      <use xlink:href="@/assets/img/sprite.svg#icon-user"></use>
    </svg>
    <span>User name</span>
  </div>
  <ul class="main-nav">
    <li class="main-nav-item">
      <svg>
        <use xlink:href="@/assets/img/sprite.svg#icon-speedometer"></use>
      </svg>
      <span>Tổng quan</span>
    </li>
    <li class="main-nav-item active">
      <svg>
        <use xlink:href="@/assets/img/sprite.svg#icon-file-tray"></use>
      </svg>
      <span>Đơn Hàng</span>
      <svg class="icon-add" id="add-order">
        <use xlink:href="@/assets/img/sprite.svg#icon-add"></use>
      </svg>
    </li>
    <li class="main-nav-item">
      <svg>
        <use xlink:href="@/assets/img/sprite.svg#icon-people"></use>
      </svg>
      <span>Khách hàng</span>
    </li>
    <li class="main-nav-item">
      <svg>
        <use xlink:href="@/assets/img/sprite.svg#icon-body"></use>
      </svg>
      <span>Nhân viên</span>
    </li>
    <li class="main-nav-item">
      <svg>
        <use xlink:href="@/assets/img/sprite.svg#icon-cash"></use>
      </svg>
      <span>Công nợ</span>
    </li>
  </ul>
</aside>
</template>

<script>
export default {
  name: 'Aside',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  padding: 1rem 0;
  padding-left: 2rem;
  position: relative;
  width: 100%;
}

aside .main-nav-item .icon-add {
  margin-left: 4rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}

aside .main-nav-item .icon-add:hover {
  color: var(--color-alert);
}

aside .main-nav-item:not(:last-child)::after {
  position: absolute;
  left: 2rem;
  top: 5rem;
  content: "";
  display: inline-block;
  height: 1px;
  width: 20rem;
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


</style>
