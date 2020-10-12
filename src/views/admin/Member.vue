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
            <span>{{ roleFilter(item.role) }}</span>
            <img :src="item.avatar" alt="">
            <span>{{ item.name }}</span>
            <span>{{ item.account }}</span>
            <span>******</span>
            <span>
              <Button
                text="删除"
                :status="!(item.id == 1)"
                type="danger"
                @btn-click="deleteMember(item)"
              />
              <Button
                text="编辑"
                type="warning"
                @btn-click="updateMember(item)"
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
    <Create
      :status="createStatus"
      @create-btn="createAccount"
      @create-cancle="createCancel"
    />
    <Update
      :status="updateStatus"
      :gather="updateData"
      @update-btn="updateAccount"
      @update-cancle="updateCancel"
    />
    <Delete
      title="删除账户"
      article="您确定删除该账户吗？"
      :status="deleteStatus"
      :gather="deleteData"
      @delete-btn="deleteAccount"
      @delete-cancel="deleteCancel"
    />
  </div>
</template>

<script>
import { getItem, toastBox } from "@/assets/js/appUtils.js"
import { memberManage, memberCreate, memberUpdate, memberDelete } from "@/assets/js/api/member.js"
import Button from "@/components/Button.vue"
import Create from "@/components/Create.vue"
import Update from "@/components/Update.vue"
import Delete from "@/components/Delete.vue"

export default {
  name: 'Member',
  components: {
    Button,
    Create,
    Update,
    Delete
  },
  data() {
    return {
      memberData: [],
      createStatus: false,
      updateStatus: false,
      deleteStatus: false,
      updateData: {},
      deleteData: {}
    }
  },
  created() {
    this.accountManage();
  },
  methods: {
    /* 【账户管理】 */
    async accountManage() {
      let params = {
        token: getItem("token"),
        expired: getItem("expired")
      };
      let result =  await memberManage(params);
      this.memberData = result.data;
    },
    /* 【创建账户】 */
    async createAccount(params) {
      let result =  await memberCreate(params);
      if (result.status) {
        this.memberData.push(result.data);
        this.createStatus = false;
      }
      toastBox(result.message);
    },
    /* 【编辑账户】 */
    async updateAccount(params) {
      let result =  await memberUpdate(params);
      if (result.status) {
        this.memberData = this.memberData.filter(item => item.id != this.updateData.id);
        this.memberData.push(result.data);
        this.updateStatus = false;
      }
      toastBox(result.message);
    },
    /* 【删除账户】 */
    async deleteAccount(id) {
      let params = {
        id: id
      }
      let result =  await memberDelete(params);
      if (result.status) {
        this.memberData = this.memberData.filter(item => item.id != id);
      }
      toastBox(result.message);
      this.deleteStatus = false;
    },
    roleFilter(val) {
      switch(val) {
        case 0:
          return "管理员"
        case 1:
          return "维护者"
        case 2:
          return "使用者"
        default:
          return ""
      }
    },
    createCancel() {
      this.createStatus = false;
    },
    updateCancel() {
      this.updateStatus = false;
    },
    deleteMember(row) {
      this.deleteData = row;
      this.deleteStatus = true;
    },
    updateMember(row) {
      this.updateData = row;
      this.updateStatus = true;
    },
    createMember() {
      this.createStatus = true;
    },
    deleteCancel() {
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
        > img {
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 0.01rem;
          background-color: #eeeeee;
        }
      }
    }
  }
}
</style>