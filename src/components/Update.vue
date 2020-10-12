<template>
  <div class="update" v-show="status">
    <div class="update-panel">
      <h3>编辑用户</h3>
      <img @click="onCancel" src="@/assets/image/cancel.png" alt="">
      <div class="update-form">
        <div>
          <Upload
            :width="2.24"
            :file="uploadFile"
            @upload-value="onUpload"
          />
        </div>
        <div>
          <Select
            :width="2.24"
            :default="selectRole"
            :data="selectData"
            @select-value="onSelect"
          />
        </div>
        <div>
          <Input
            :width="2.24"
            type="text"
            holder="请输入姓名"
            :status="nameStatus"
            :fillin="nameValue"
            icons="name"
            warn="请输入姓名"
            err="请输入合法姓名"
            @val-value="onName"
          />
        </div>
        <div>
          <Input
            :width="2.24"
            type="text"
            holder="请输入用户名"
            :status="accountStatus"
            :fillin="accountValue"
            :disable="true"
            icons="account"
            warn="请输入用户名"
            err="请输入合法用户名"
            @val-value="onAccount" />
        </div>
        <div>
          <Input
            :width="2.24"
            type="password"
            holder="请输入密码"
            :status="passwordStatus"
            :fillin="passwordValue"
            icons="password"
            warn="请输入密码"
            err="请输入合法密码"
            @val-value="onPassword"
          />
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            text="确 定"
            :status="updateStatus"
            @btn-click="onUpdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "./Upload.vue"
import Select from "./Select.vue"
import Input from "./Input.vue"
import Button from "./../components/Button.vue"
export default {
  name: "Update",
  props: {
    /* 对话框状态 */
    status: Boolean,
    /* 对话框数据 */
    gather: Object
  },
  components: {
    Upload,
    Select,
    Input,
    Button
  },
  data() {
    return {
      memberId: null,
      selectData: ["管理员", "维护者", "使用者"],
      nameStatus: 0,
      accountStatus: 0,
      passwordStatus: 0,
      updateStatus: true,
      uploadFile: "",
      selectRole: 2,
      nameValue: null,
      accountValue: null,
      passwordValue: null,
      nameVerify: false,
      accountVerify: false,
      passwordVerify: false
    }
  },
  watch: {
    gather: {
      handler: function() {
        this.memberId = this.gather.id;
        this.uploadFile = this.gather.avatar;
        this.selectRole = this.gather.role;
        this.nameValue = this.gather.name;
        this.accountValue = this.gather.account;
        this.passwordValue = "";
      }
    }
  },
  methods: {
    onUpload(val) {
      this.uploadFile = val;
    },
    onSelect(val) {
      this.selectRole = val;
    },
    onName(val) {
      this.nameValue = val;
      if (val) {
        if (val.length >= 5) {
          this.nameStatus = 1;
          this.nameVerify = true;
        } else {
          this.nameStatus = 2;
          this.nameVerify = false;
        }
      } else {
        this.nameStatus = 3;
        this.nameVerify = false;
      }
    },
    onAccount(val) {
      this.accountValue = val;
      if (val) {
        if (val.length >= 5) {
          this.accountStatus = 1;
          this.accountVerify = true;
        } else {
          this.accountStatus = 2;
          this.accountVerify = false;
        }
      } else {
        this.accountStatus = 3;
        this.accountVerify = false;
      }
    },
    onPassword(val) {
      this.passwordValue = val;
      if (val && val != "******") {
        if (val.length >= 5) {
          this.passwordStatus = 1;
          this.passwordVerify = true;
        } else {
          this.passwordStatus = 2;
          this.passwordVerify = false;
        }
      } else {
        this.passwordStatus = 3;
        this.passwordVerify = false;
      }
    },
    onUpdate() {
      this.onName(this.nameValue);
      this.onAccount(this.accountValue);
      this.onPassword(this.passwordValue);

      if (this.nameVerify && this.accountVerify && this.passwordVerify) {
        let params = {
          id: this.memberId,
          avatar: this.uploadFile,
          role: this.selectRole,
          name: this.nameValue,
          account: this.accountValue,
          password: this.passwordValue
        };
        this.$emit("update-btn", params);
      }
    },
    onCancel() {
      this.$emit("update-cancle");
    }
  }
}
</script>

<style lang="less" scoped>
.update {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.28);
  .update-panel {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.8rem;
    border-radius: 0.02rem;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    > h3 {
      position: relative;
      margin: 0.22rem 0 0 0;
      font-size: 0.14rem;
      color: #333333;
      line-height: 0.14rem;
      font-weight: normal;
      text-align: center;
    }
    > img {
      position: absolute;
      top: 0.18rem;
      right: 0.12rem;
      width: 0.18rem;
      height: 0.18rem;
    }
    .update-form {
      position: relative;
      margin: 0.16rem 0 0 0.27rem;
      padding: 0 0 0.24rem 0;
      > div {
        margin: 0.08rem 0 0 0;
      }
    }
  }
}
</style>