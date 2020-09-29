# 【Doc】
* 开发环境 npm run pre
* 生产环境 npm run prd
* 测试打包 npm run buildpre
* 正式打包 npm run buildprd

# 【文档角色】
## admin  管理员
## upkeep 维护者
## reader 使用者

# 【项目结构】
#      |
#      |
#      |                 |-- Button.vue 按钮组件
#      |                 |-- Create.vue 新增、编辑会员组件
#      |                 |-- Delete.vue 删除会员组件
#      |-- components -- |-- Frame.vue  头部组件
#      |                 |-- Table.vue  会员管理组件
# src -|                 |-- Input.vue  input组件
#      |                 |-- Select.vue 选择器组件
#      |                 |-- Upload.vue 图片上传组件
#      |
#      |           |-- Login.vue  登陆
#      |           |-- Admin.vue  管理员
#      |-- views --|-- Upkeep.vue 维护者
#      |           |-- Reader.vue 使用者

###

###### lib-flexible pc端适配
######    function refreshRem(){
######        var width = docEl.getBoundingClientRect().width;
######        if (width / dpr > 540) {
######            width = width * dpr;
######        }
######        var rem = width / 10;
######        docEl.style.fontSize = rem + 'px';
######        flexible.rem = win.rem = rem;
######    }

###