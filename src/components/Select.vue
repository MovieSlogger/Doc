<template>
  <div class="select" :style="{width: width + 'rem'}">
    <div class="select-panel">
      <div class="select-role">
        <span>角色: </span>
      </div>
      <div class="select-option">
        <div v-for="(item, index) in data" :key="index" :style="index != selected ? dark : light" @click="onSelect(index)">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="select-tip">已选择: {{ data[selected] }}权限</div>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    /* 选择器宽度 */
    width: Number,
    /* 选择项 */
    data: Array,
    /* 默认选择项 */
    default: Number,
  },
  data() {
    return {
      selected: 2,
      light: "background: rgba(64, 158, 255, 1)",
      dark: "background: rgba(64, 158, 255, 0.38)"
    }
  },
  watch: {
    default: {
      handler: function() {
        this.selected = this.default;
      }
    }
  },
  methods: {
    onSelect(val) {
      this.selected = val;
      this.$emit("select-btn", val)
    }
  }
}
</script>

<style lang="less" scoped>
.select {
  width: 2rem;
  height: 0.46rem;
  .select-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.08rem 0 0;
    width: 100%;
    height: 0.28rem;
    .select-role {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.28rem;
      height: 0.28rem;
      > span {
        font-size: 0.1rem;
        color: #333333;
        line-height: 0.1rem;
      }
    }
    .select-option {
      margin: 0 0 0 0.08rem;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.46rem;
        height: 0.18rem;
        > span {
          font-size: 0.08rem;
          color: #ffffff;
          line-height: 0.08rem;
        }
      }
    }
  }
  .select-tip {
    margin: 0.04rem 0 0 0;
    width: 100%;
    font-size: 0.1rem;
    color: #999999;
    line-height: 0.1rem;
  }
}
</style>