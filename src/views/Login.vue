<template>
  <div class="login">
    <div class="login-panel">
      <div class="login-box">
        <h3>Doc 文档系统</h3>
        <div class="login-account">
          <Input :width="2.24" type="text" holder="请输入用户名" :status="accountStatus" icons="account" warn="请输入用户名称" err="用户名错误" @input-value="onAccount" />
        </div>
        <div class="login-password">
          <Input :width="2.24" type="password" holder="请输入密码" :status="passwordStatus" icons="password" warn="请输入用户密码" err="密码错误" @input-value="onPassword" />
        </div>
        <div class="login-btn">
          <Button :width="2.24" :height="0.28" text="登 录" :under="'登录中..'" :status="loginStatus" @button-btn="onLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setItem } from "./../assets/js/appUtils.js"
import { loginAccount } from "./../assets/js/api/login.js"
import Button from "./../components/Button.vue"
import Input from "./../components/Input.vue"
export default {
  name: "Login",
  components: {
    Button,
    Input
  },
  data() {
    return {
      loginStatus: true,
      accountStatus: 0,
      passwordStatus: 0,
      accountValue: null,
      passwordValue: null,
      accountVerify: false,
      passwordVerify: false
    }
  },
  methods: {
    async onLogin() {
      let that = this;
      that.onAccount(that.accountValue);
      that.onPassword(that.passwordValue);

      if (that.loginStatus && that.accountVerify && that.passwordVerify) {
        that.loginStatus = false;
        let params = {
          account: that.accountValue,
          password: that.passwordValue
        };
        let result = await loginAccount(params);
        that.loginStatus = true;
        if (result) {
          setItem("token", result.data.token);
          setItem("expired", result.data.expired);
          const role = result.data.role;
          const current = that.$store.getters.getStateCurrent;
          setTimeout(() => {
            that.$router.push({
              name: current[role][1]
            })
          }, 300);
        }
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
      if (val) {
        if (val.length >= 3 && val.length <= 9) {
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
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  .login-panel {
    width: 100%;
    height: 3.2rem;
    background: url("./../assets/image/login.jpg") no-repeat;
    background-position: center center;
    background-size: 100% auto;
    overflow: hidden;
    .login-box {
      margin: 1rem auto 0 auto;
      padding: 0 0 0.14rem 0;
      width: 2.62rem;
      background-color: #ffffff;
      overflow: hidden;
      > h3 {
        margin: 0.28rem 0 0 0;
        font-size: 0.16rem;
        color: #333333;
        line-height: 0.16rem;
        font-weight: normal;
        text-align: center;
      }
      .login-account {
        margin: 0.18rem auto 0 auto;
        width: 2.24rem;
        height: 0.28rem;
        border: 1px solid #eeeeee;
        border-radius: 0.02rem;
      }
      .login-password {
        margin: 0.12rem auto 0 auto;
        width: 2.24rem;
        height: 0.28rem;
        border: 1px solid #eeeeee;
        border-radius: 0.02rem;
      }
      .login-btn {
        margin: 0.12rem auto 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.24rem;
        height: 0.28rem;
        background-color: #409eff;
        > span {
          font-size: 0.13rem;
          color: #ffffff;
          line-height: 0.13rem;
        }
      }
    }
  }
}
</style>
