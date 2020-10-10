<template>
  <div class="member">
    <!--【表格】-->
    <div class="member-table">
      <div class="member-table-head">
        <span>ID</span>
        <span>角色</span>
        <span>头像</span>
        <span>姓名</span>
        <span>账号</span>
        <span>密码</span>
        <span>操作</span>
      </div>
      <div class="member-table-panel">
        <template v-for="(item, index) in memberData" :key="index">
          <div>
            <span>{{ item.id }}</span>
            <span>{{ item.role }}</span>
            <span>{{ item.avatar }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.account }}</span>
            <span>******</span>
            <span>
              <Button
                text="删除"
                type="danger"
                @btn-click="deleteMember(item)"
              />
              <Button
                text="编辑"
                type="warning"
                @btn-click="editMember(item)"
              />
              <Button
                text="新增"
                type="primary"
                @btn-click="createMember"
              />
            </span>
          </div>
        </template>
      </div>
    </div>
    <Create :title="createTitle" :status="createStatus" :gather="createData" :type="manageType" @create-btn="onAccount" @create-cancle="onCancel" />
    <Delete title="删除账户" article="您确定删除该账户吗？" :status="deleteStatus" :gather="deleteData" @delete-cancel="delCancel" @delete-sure="delSure" />
  </div>
</template>

<script>
import { getItem } from "@/assets/js/appUtils.js"
import { toastBox } from "@/assets/js/appUtils.js"
import { adminManage, adminCreate, adminEdit, adminDelete } from "@/assets/js/api/admin.js"
import Button from "@/components/Button.vue"
import Create from "@/components/Create.vue"
import Delete from "@/components/Delete.vue"

export default {
  name: 'Member',
  components: {
    Button,
    Create,
    Delete
  },
  data() {
    return {
      manageType: 0, // 0 新增 1 编辑
      memberData: [],
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
      this.memberData = result.data;
      console.log(this.memberData, "@@ memberData")
    },
    /* 【创建账户 && 编辑账户】 */
    async onAccount(params) {
      /* 【创建账户】 */
      if (this.manageType == 0) {
        let result =  await adminCreate(params);
        if (result.status) {
          this.memberData.push(result.data);
          this.createStatus = false;
        }
        toastBox(result.message);
      } else {
      /* 【编辑账户】 */
        let result =  await adminEdit(params);
        console.log(result, "@@ result");
        if (result.status) {
          this.memberData = this.memberData.filter(item => item.id != this.createData.id);
          this.memberData.push(result.data)
          this.createStatus = false;
        }
        toastBox(result.message);
      }
    },
    onCancel() {
      this.createStatus = false;
    },
    deleteMember(row) {
      console.log(row, "deleteMember");
      this.deleteData = row;
      this.deleteStatus = true;
    },
    editMember(row) {
      this.manageType = 1;
      this.createTitle = "编辑用户";
      this.createData = row;
      this.createStatus = true;
    },
    createMember() {
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
        this.memberData = this.memberData.filter(item => item.id != id);
      }
      toastBox(result.message);
      this.deleteStatus = false;
    }
  }
}
</script>

<style lang="less" scoped>
.member {
  width: 100%;
  height: 100%;
  .member-table {
    margin: 0.22rem auto 0 auto;
    width: 92%;
    .member-table-head {
      display: flex;
      align-items: center;
      padding: 0.1rem 0;
      border-bottom: 1px solid #dcdfe6;
      > span {
        flex: 2;
        font-size: 0.1rem;
        color: #333333;
        line-height: 0.1rem;
        text-align: center;
        &:first-child {
          flex: 1;
        }
        &:last-child {
          flex: 4;
        }
      }
    }
    .member-table-panel {
      > div {
        display: flex;
        align-items: center;
        padding: 0.1rem 0;
        border-bottom: 1px solid #eeeeee;
        > span {
          flex: 2;
          font-size: 0.1rem;
          color: #666666;
          line-height: 0.1rem;
          text-align: center;
          &:first-child {
            flex: 1;
          }
          &:last-child {
            flex: 4;
            justify-content: center;
            display: flex;
          }
        }
      }
    }
  }
}
</style>