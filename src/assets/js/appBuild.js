import { axiosFetch, setItem, delItem } from "./appUtils.js"
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
        console.log('走到了这里', res);
        if (res.code == 200) {
          if (!res.status) {
            setItem("token", res.data.token);
            setItem("expired", res.data.expired);
          }
          store.commit("setStateLogin", true);
          store.commit("setStateRole", res.data.role);
        } else {
          store.commit("setStateLogin", false);
          store.commit("setStateRole", 2);
          /* @@ 清除storage */
          delItem("expired");
          delItem("token");
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