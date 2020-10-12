<template>
  <div class="manage">
    <template v-if="manageData.length > 0">
      <div class="manage-table">table</div>
    </template>
    <template v-else>
      <div class="manage-empty">
        <div @click="createManage">创建模板</div>
      </div>
    </template>
  </div>
</template>

<script>
import { getItem } from "@/assets/js/appUtils.js"
import { manageModel, manageCreate, manageUpdate, manageDelete } from "@/assets/js/api/manage.js"
export default {
  name: "Manage",
  data() {
    return {
      manageData: [],
      createStatus: false,
      updateStatus: false,
      deleteStatus: false,
    }
  },
  created() {
    this.modelManage();
    this.createModel();
    this.updateModel();
    this.deleteModel();
  },
  methods: {
    /* 【模板管理】 */
    async modelManage() {
      let params = {
        token: getItem("token"),
        expired: getItem("expired")
      };
      let result =  await manageModel(params);
      console.log(result, "@@ result");
      this.manageData = result.data;
    },
    /* 【创建模板】 */
    async createModel() {
      let params = {
        token: getItem("token"),
        expired: getItem("expired"),
        title: "title",
        level: 0,
        table: "table"
      };
      let result =  await manageCreate(params);
      console.log(result, "@@ manageCreate");
    },
    /* 【编辑模板】 */
    async updateModel() {
      let params = {
        token: getItem("token"),
        expired: getItem("expired"),
        title: "title",
        level: 0,
        table: "table"
      };
      let result =  await manageUpdate(params);
      console.log(result, "@@ manageCreate");
    },
    /* 【删除模板】 */
    async deleteModel() {
      let params = {
        token: getItem("token"),
        expired: getItem("expired"),
        title: "title",
        level: 0,
        table: "table"
      };
      let result =  await manageDelete(params);
      console.log(result, "@@ manageCreate");
    },
    createManage() {
      this.createStatus = true;
    }
  }
}
</script>

<style lang="less" scoped>
.manage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .manage-table {

  }
  .manage-empty {
    > div {

    }
  }
}
</style>