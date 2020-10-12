import { axiosFetch } from "../appUtils.js"

/* 【创建模板】 */
export function manageCreate(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/manage/create",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【编辑模板】 */
export function manageUpdate(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/manage/update",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【删除模板】 */
export function manageDelete(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/manage/delete",
    params: params
  })
  .then((res) => {
    return res;
  })
}

/* 【模板管理】 */
export function manageModel(params) {
  return axiosFetch({
    method: "POST",
    url: "/api/manage/manage",
    params: params
  })
  .then((res) => {
    return res;
  })
}