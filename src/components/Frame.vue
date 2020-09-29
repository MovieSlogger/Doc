<template>
  <div class="frame">
    <template v-if="$store.getters.getStateHeader">
      <div class="frame-head" ref="head">head</div>
      <div class="frame-panel" :style="'height: ' + height + 'px;'">
        <div class="frame-left">left</div>
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: "Frame",
  data() {
    return {
      height: Number
    }
  },
  updated() {
    if (this.$store.getters.getStateHeader) {
      let client = window.innerHeight;
      let header = this.$refs.head.offsetHeight;
      this.height = client - header;
    }
  }
}
</script>

<style lang="less" scoped>
.frame {
  width: 100%;
  min-height: 100vh;
  .frame-head {
    width: 100%;
    height: 0.48rem;
    border-bottom: 1px solid #ebeef5;
  }
  .frame-panel {
    display: flex;
    flex-direction: row;
    .frame-left {
      width: 1.46rem;
      height: 100%;
      border-right: 1px solid #ebeef5;
    }
  }
}
</style>