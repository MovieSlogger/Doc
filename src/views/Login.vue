<template>
  <div class="login">
    <div class="login-panel">
      <div class="login-box">
        <h3>Doc 文档系统</h3>
        <div class="login-account">
          <Input
            :width="2.24"
            type="text"
            icons="account"
            holder="请输入用户名"
            warn="请输入用户名称"
            err="用户名错误"
            :status="accountStatus"
            @val-value="verifyAccount"
          />
        </div>
        <div class="login-password">
          <Input
            :width="2.24"
            type="password"
            icons="password"
            holder="请输入密码"
            warn="请输入用户密码"
            err="密码错误"
            :status="passwordStatus"
            @val-value="verifyPassword"
          />
        </div>
        <div class="login-btn">
          <Button
            size="large"
            text="登 录"
            load="登录中.."
            :status="loginStatus"
            @btn-click="userLogin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toastBox, setItem } from "./../assets/js/appUtils.js"
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
    async userLogin() {
      let that = this;
      /* 验证账户密码是否合法 */
      that.verifyAccount(that.accountValue);
      that.verifyPassword(that.passwordValue);

      if (that.loginStatus && that.accountVerify && that.passwordVerify) {
        that.loginStatus = false;
        let params = {
          account: that.accountValue,
          password: that.passwordValue
        };
        let result = await loginAccount(params);
        that.loginStatus = true;
        if (result.code == 200) {
          /* 存储密钥 */
          setItem("token", result.data.token);
          setItem("expired", result.data.expired);
          const role = result.data.role;
          const current = that.$store.getters.getStateCurrent;
          setTimeout(() => {
            that.$router.push({
              name: current[role][1]
            })
          }, 300);
        } else {
          toastBox(result.message);
        }
      }
    },
    verifyAccount(val) {
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
    verifyPassword(val) {
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
      margin: 0.8rem auto 0 auto;
      padding: 0 0 0.22rem 0;
      width: 2.62rem;
      border-radius: 0.02rem;
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
        margin: 0.24rem auto 0 auto;
        width: 2.24rem;
        height: 0.28rem;
        border-radius: 0.02rem;
      }
      .login-password {
        margin: 0.22rem auto 0 auto;
        width: 2.24rem;
        height: 0.28rem;
        border-radius: 0.02rem;
      }
      .login-btn {
        margin: 0.22rem auto 0 auto;
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
