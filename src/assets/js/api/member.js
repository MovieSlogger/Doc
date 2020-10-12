import { axiosFetch } from "../appUtils.js"

/* 【创建账户】 */
export function memberCreate(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/member/create",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【编辑账户】 */
export function memberUpdate(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/member/update",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【删除账户】 */
export function memberDelete(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/member/delete",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【账户管理】 */
export function memberManage(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/member/manage",
    params: params
  })
  .then((res) => {
    return res;
  })
}
