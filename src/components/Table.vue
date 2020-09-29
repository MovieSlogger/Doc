<template>
  <div class="table">
    <!--【表头】-->
    <div class="table-head" ref="head">
      <template v-for="(item, index) in head" :key="index">
        <div class="table-head-list" :style="{flex: item.hold}">
          <span>{{ item.name }}</span>
        </div>
      </template>
    </div>
    <!--【表格】-->
    <div v-if="data.length > 0" class="table-panel-data">
      <template v-for="(item, index) in data" :key="index">
        <div class="table-panel-item">
          <span :style="{flex: layout[0]}">{{ item.id }}</span>
          <span :style="{flex: layout[1]}">{{ filtrRole(item.role) }}</span>
          <span :style="{flex: layout[2]}">{{ item.avatar }}</span>
          <span :style="{flex: layout[3]}">{{ item.name }}</span>
          <span :style="{flex: layout[4]}">{{ item.account }}</span>
          <span :style="{flex: layout[5]}">
            <Button :width="0.46" :height="0.2" :disabled="item.id == 1" color="#f56c6c" size="0.08" text="删除" :status="true" style="margin: 0 0.06rem;" @button-btn="onDelete(item)" />
            <Button :width="0.46" :height="0.2" text="编辑" size="0.08" :status="true" style="margin: 0 0.06rem;" @button-btn="onEdit(item)" />
            <Button :width="0.46" :height="0.2" color="#5cb87a" size="0.08" text="增加" :status="true" style="margin: 0 0.06rem;" @button-btn="onCreate(item)"/>
          </span>
        </div>
      </template>
    </div>
    <div v-else class="table-panel-empty">
      <div class="table-panel-none">暂无数据~</div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue"
export default {
  name: "Table",
  props: {
    /* 表头信息 */
    head: Object,
    /* 表格信息 */
    data: Array
  },
  components: {
    Button
  },
  data() {
    return {
      layout: []
    }
  },
  created() {
    for (let i = 0; i < this.head.length; i++) {
      let hold = this.head[i].hold;
      this.layout.push(hold);
    }
  },
  methods: {
    filtrRole(val) {
      switch(val)
      {
        case 0:
          return "管理员";
        case 1:
          return "维护者";
        case 2:
          return "使用者";
      }
    },
    onDelete(row) {
      this.$emit("table-delete", row);
    },
    onEdit(row) {
      this.$emit("table-edit", row);
    },
    onCreate(row) {
      this.$emit("table-create", row);
    }
  }
}
</script>

<style lang="less" scoped>
.table {
  margin: 0.22rem auto 0 auto;
  width: 96%;
  height: 92%;
  border: 1px solid #ebeef5;
  .table-head {
    padding: 0.12rem 0 0.12rem 0;
    margin: 0 auto;
    width: 96%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ebeef5;
    .table-head-list {
      > span {
        font-size: 0.1rem;
        color: #333333;
        line-height: 0.1rem;
      }
    }
  }
  .table-panel-data {
    margin: 0 auto;
    width: 96%;
    height: 92%;
    display: flex;
    flex-direction: column;
    .table-panel-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.08rem 0;
      border-bottom: 1px solid #ebeef5;
      > span {
        display: flex;
        flex-direction: row;
        font-size: 0.1rem;
        color: #666666;
        line-height: 0.1rem;
      }
    }
  }
  .table-panel-empty {
    margin: 0 auto;
    width: 96%;
    height: 92%;
    display: flex;
    justify-content: center;
    align-items: center;
    .table-panel-none {
      font-size: 0.1rem;
      color: #999999;
      line-height: 0.1rem;
    }
  }
}
</style>