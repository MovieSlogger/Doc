<template>
  <div class="admin">
    <Table :head="manageHead" :data="manageData" @table-delete="onDelete" @table-edit="onEdit" @table-create="onCreate" />
    <Create :title="createTitle" :status="createStatus" :gather="createData" @create-btn="onAccount" />
    <Delete title="删除" article="您确定删除该账户吗？" :status="deleteStatus" :gather="deleteData" @delete-cancel="delCancel" @delete-sure="delSure" />
  </div>
</template>

<script>
import { getItem } from "./../assets/js/appUtils.js"
import { toastBox } from "./../assets/js/appUtils.js"
import { adminManage, adminCreate, adminEdit, adminDelete } from "./../assets/js/api/admin.js"
import Table from "./../components/Table.vue"
import Create from "./../components/Create.vue"
import Delete from "./../components/Delete.vue"

export default {
  name: 'Admin',
  components: {
    Table,
    Create,
    Delete
  },
  data() {
    return {
      manageType: 0, // 0 新增 1 编辑
      manageHead: [
        {name: "ID", hold: 1},
        {name: "角色", hold: 2},
        {name: "头像", hold: 2},
        {name: "姓名", hold: 2},
        {name: "账号", hold: 2},
        {name: "操作", hold: 3},
      ],
      manageData: [],
      createTitle: "创建用户",
      createStatus: false,
      createData: {},
      deleteStatus: false,
      deleteData: {}
    }
  },
  created() {
    this.onManage();
  },
  methods: {
    /* 【账户管理】 */
    async onManage() {
      let params = {
        token: getItem("token"),
        expired: getItem("expired")
      };
      let result =  await adminManage(params);
      this.manageData = result.data;
    },
    /* 【创建账户 && 编辑账户】 */
    async onAccount(params) {
      /* 【创建账户】 */
      if (this.manageType == 0) {
        let result =  await adminCreate(params);
        if (result.status) {
          this.manageData.push(result.data);
          this.createStatus = false;
        }
        toastBox(result.message);
      } else {
      /* 【编辑账户】 */
        let result =  await adminEdit(params);
        if (result.status) {
          this.manageData = this.manageData.filter(item => item.id != this.createData.id);
          this.manageData.push(result.data)
          this.createStatus = false;
        }
        toastBox(result.message);
      }
    },
    onDelete(row) {
      this.deleteData = row;
      this.deleteStatus = true;
    },
    onEdit(row) {
      this.manageType = 1;
      this.createTitle = "编辑用户";
      this.createData = row;
      this.createStatus = true;
    },
    onCreate() {
      this.manageType = 0;
      this.createTitle = "创建用户";
      this.createData = {
        avatar: "",
        role: 2,
        name: "",
        account: ""
      };
      this.createStatus = true;
    },
    delCancel() {
      this.deleteStatus = false;
    },
    async delSure(id) {
      let params = {
        id: id
      }
      /* 【删除账户】 */
      let result =  await adminDelete(params);
      if (result.status) {
        this.manageData = this.manageData.filter(item => item.id != id);
      }
      toastBox(result.message);
      this.deleteStatus = false;
    }
  }
}
</script>

<style lang="less" scoped>
.admin {
  width: 100%;
  height: 100%;
}
</style>
