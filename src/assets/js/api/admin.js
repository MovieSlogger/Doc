import { axiosFetch } from "./../appUtils.js"

/* 【创建账户】 */
export function adminCreate(params) {
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
export function adminEdit(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/member/edit",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【删除账户】 */
export function adminDelete(params) {
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
export function adminManage(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/member/manage",
    params: params
  })
  .then((res) => {
    return res;
  })
}
