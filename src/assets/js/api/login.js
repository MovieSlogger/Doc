import { axiosFetch } from "./../appUtils.js"

/* 【登录账户】 */
export function loginAccount(params) {
    return axiosFetch({
      method: "POST",
      url: "/api/signin/login",
      params: params
    })
    .then((res) => {
      return res;
    })
  }