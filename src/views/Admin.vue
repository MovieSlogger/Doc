<template>
  <div class="admin" @click="onMember">Admin</div>
</template>

<script>
import { axiosFetch, toastBox } from "./../assets/js/appUtils.js"
export default {
  name: 'Admin',
  methods: {
    onMember() {
      axiosFetch({
        method: "POST",
        url: "/api/member/create",
        load: "创建中..",
        params: {
          account: "account",
          password: "password"
        }
      })
      .then((res) => {
        if (res.status) {
          toastBox(res.message);
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
.admin {
  width: 100%;
  height: 100%;
}
</style>
