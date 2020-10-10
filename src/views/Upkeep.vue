<template>
  <div class="upkeep">
    <!--【新增接口信息】-->
    <div class="upkeep-add">upkeep-add</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Upkeep'
}
</script>

<style lang="less" scoped>
.upkeep {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  .upkeep-add {
    margin: 0.12rem auto 0 auto;
    width: 98%;
    border-radius: 0.02rem;
    background-color: #ffffff;
  }
}
</style>
