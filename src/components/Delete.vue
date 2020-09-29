<template>
  <div class="delete" v-show="status">
    <div class="delete-panel">
      <h3>{{ title }}</h3>
      <div class="delete-article">{{ article }}</div>
      <div class="delete-btn">
        <span @click="onCancel">取消</span>
        <span @click="onSure">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Delete",
  props: {
    /* 标题 */
    title: String,
    /* 文本 */
    article: String,
    /* 对话框状态 */
    status: Boolean,
    /* 删除数据 */
    gather: Object
  },
  methods: {
    onCancel() {
      this.$emit("delete-cancel");
    },
    onSure() {
      this.$emit("delete-sure", this.gather.id);
    }
  }
}
</script>

<style lang="less" scoped>
.delete {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.28);
  .delete-panel {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 2.6rem;
    border-radius: 0.05rem;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    overflow: hidden;
    > h3 {
      margin: 0.16rem 0 0 0;
      font-size: 0.14rem;
      color: #333333;
      line-height: 0.14rem;
      text-align: center;
      font-weight: normal;
    }
    .delete-article {
      margin: 0.2rem 0 0 0;
      font-size: 0.1rem;
      color: #666666;
      line-height: 0.1rem;
      text-align: center;
    }
    .delete-btn {
      display: flex;
      flex-direction: row;
      margin: 0.18rem 0 0 0;
      width: 100%;
      height: 0.36rem;
      border-top: 1px solid #ebeef5;
      > span {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        font-size: 0.12rem;
        color: #409eff;
        line-height: 0.12rem;
        &:nth-child(1) {
          border-right: 1px solid #ebeef5;
          color: #666666;
        }
      }
    }
  }
}
</style>