import { createStore } from "vuex"

export default createStore({
  state: {
    stateHeader: false, // 是否需要头部左侧框架
    stateLogin: false,
    stateRole: 2, // 0 管理员; 1 维护者; 2 使用者;
    stateCurrent: { /* @@ 页面对应权限 */
      0: ["Login", "Admin", "Upkeep", "Reader"],
      1: ["Login", "Upkeep", "Reader"],
      2: ["Login", "Reader"]
    }
  },
  getters: {
    getStateHeader(state) {
      return state.stateHeader;
    },
    getStateLogin(state) {
      return state.stateLogin;
    },
    getStateRole(state) {
      return state.stateRole;
    },
    getStateCurrent(state) {
      return state.stateCurrent;
    }
  },
  mutations: {
    setStateHeader(state, stateHeader) {
      state.stateHeader = stateHeader;
    },
    setStateLogin(state, stateLogin) {
      state.stateLogin = stateLogin;
    },
    setStateRole(state, stateRole) {
      state.stateRole = stateRole;
    }
  },
  actions: {
  },
  modules: {
  }
})
