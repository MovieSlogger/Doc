import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { getItem } from "./assets/js/appUtils.js"
import { initialize } from "./assets/js/appBuild.js"

router.beforeEach((to, from, next) => {
  console.log(to, from)
  const token = getItem("token");
  const expired = getItem("expired");

  initialize(token, expired).then(() => {
    const login = store.getters.getStateLogin;
    const role = store.getters.getStateRole;
    const current = store.getters.getStateCurrent;
    if (login) { /* @@ 已登陆 */
      if (current[role].includes(to.name)) { /* @@ 有访问权限 */
        if (to.name == "Login") {
          next({
            name: current[role][1]
          });
        } else {
          next();
        }
      } else { /* @@ 无访问权限 */
        store.commit("setStateLogin", false);
        next({
          name: "Login"
        });
      }
    } else { /* @@ 未登陆 */
      if (to.name == "Login") {
        next();
      } else {
        next({
          name: "Login"
        });
      }
    }
  });
})

router.afterEach((to) => {
  if (to.name == "Login") {
    store.commit("setStateHeader", false);
  } else {
    store.commit("setStateHeader", true);
  }
})

createApp(App).use(store).use(router).mount("#app")