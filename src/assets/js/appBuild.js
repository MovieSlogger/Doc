import { axiosFetch } from "./appUtils.js"
import store from "./../../store"

export function initialize(token, expired) { /* @@ 验证用户权限 */
  return new Promise((ret, rej) => {
    if (token && expired) {
      axiosFetch({
        method: "POST",
        url: "/api/member/verify",
        params: {
          token: token,
          expired: expired
        }
      })
      .then((res) => {
        if (res.code == 200) {
          store.commit("setStateLogin", true);
          store.commit("setStateRole", res.data.role);
        } else {
          store.commit("setStateLogin", false);
        }
        ret();
      })
      .catch(() => {
        rej();
      })
    } else {
      ret();
    }
  })
}