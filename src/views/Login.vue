<template>
  <div class="login" @click="onLogin">Login</div>
</template>

<script>
import { axiosFetch, toastBox, setItem } from "./../assets/js/appUtils.js"
export default {
  name: "Login",
  created() {
    // this.onLogin();
  },
  methods: {
    onLogin() {
      let that = this;
      axiosFetch({
        method: "POST",
        url: "/api/member/login",
        load: "登陆中..",
        params: {
          account: "account",
          password: "password"
        }
      })
      .then((res) => {
        if (res.status) {
          setItem("token", res.data.token);
          setItem("expired", res.data.expired);
          const role = res.data.role;
          const current = that.$store.getters.getStateCurrent;
          setTimeout(() => {
            that.$router.push({
              name: current[role][1]
            })
          }, 30);
        } else {
          toastBox(res.message);
        }
      })
      .catch((err) => {
        toastBox(err);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
}
</style>
