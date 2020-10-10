<template>
  <div class="switch">
    <div class="switch-title">{{ title }}</div>
    <div class="switch-taber" :class="status ? 'tabber-light' : 'tabber-dark'" @click="onSwitch">
      <div :class="status ? 'switchLeft' : 'switchRight'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Switch",
  props: {
    /* 表头信息 */
    title: String,
    /* 按钮状态 */
    status: Boolean,
  },
  data() {
    return {
    }
  },
  methods: {
    onSwitch() {
      this.$emit("switch-btn");
    }
  }
}
</script>

<style lang="less" scoped>
.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  .switch-title {
    font-size: 0.1rem;
    color: #333333;
    line-height: 0.1rem;
  }
  .switch-taber {
    margin: 0 0 0 0.06rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 0.3rem;
    height: 0.16rem;
    border-radius: 0.1rem;
    overflow: hidden;
    > div {
      width: 0.14rem;
      height: 0.14rem;
      border-radius: 1rem;
      background-color: #ffffff;
    }
    .switchLeft {
      animation: animateLeft 0.4s ease forwards;
      -webkit-animation: animateLeft 0.4s ease forwards;
    }
    .switchRight {
      animation: animateRight 0.4s ease forwards;
      -webkit-animation: animateRight 0.4s ease forwards;
    }
    @keyframes animateLeft
    {
      0%   {margin: 0 0 0 0;}
      100%  {margin: 0 0 0 0.14rem;}
    }
    @-webkit-keyframes animateLeft
    {
      0%   {margin: 0 0 0 0;}
      100%  {margin: 0 0 0 0.14rem;}
    }
    @keyframes animateRight
    {
      0%   {margin: 0 0 0 0.14rem;}
      100%  {margin: 0 0 0 0;}
    }
    @-webkit-keyframes animateRight
    {
      0%   {margin: 0 0 0 0.14rem;}
      100%  {margin: 0 0 0 0;}
    }
  }
  .tabber-light {
    border: 0.01rem solid #409eff;
    box-shadow: inset 0 0 0.1rem 0.1rem #409eff;
  }
  .tabber-dark {
    border: 0.01rem solid #dcdfe6;
    box-shadow: inset 0 0 0.1rem 0.1rem #dcdfe6;
  }
}
</style>