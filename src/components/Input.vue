<template>
  <div class="input" :style="{width: width + 'rem'}">
    <div :style="{border: border, opacity: disable ? 0.68 : 1}" class="input-art">
      <div>
        <img v-if="icons == 'name'" src="@/assets/image/name.png" alt="">
        <img v-if="icons == 'account'" src="@/assets/image/account.png" alt="">
        <img v-if="icons == 'password'" src="@/assets/image/password.png" alt="">
      </div>
      <input :type="type" :disabled="disable" v-model="value" :placeholder="holder" @focus="onFocus" @blur="onBlur">
    </div>
    <div v-show="status == 2 || status == 3" class="input-tip">{{ status == 2 ? err : warn }}</div>
  </div>  
</template>

<script>
export default {
  name: "Input",
  props: {
    /* 按钮宽度 */
    width: Number,
    /* 表单类型 */
    type: String,
    /* 禁用 */
    disable: Boolean,
    /* 图标 account 账户 */
    icons: String,
    /* 表单占位符 */
    holder: String,
    /* 警告 */
    warn: String,
    /* 错误 */
    err: String,
    /* 表单状态 0 初始状态 1 验证通过 2 验证失败 3 验证为空 */
    status: Number,
    /* 填充值 */
    fillin: String
  },
  data() {
    return {
      value: null,
      focus: false,
      border: "1px solid #dcdfe6",
      tips: null
    }
  },
  watch: {
    fillin: {
      handler: function() {
        this.value = this.fillin;
      }
    },
    focus: {
      handler: function() {
        if (!this.focus) {
          this.$emit("val-value", this.value);
        }
      }
    },
    status: {
      handler: function() {
        if (this.status == 0) {
          this.border = "1px solid #dcdfe6";
        } else if (this.status == 1) {
          this.border = "1px solid #409eff";
        } else if (this.status == 2) {
          this.border = "1px solid #f56c6c";
        } else {
          this.border = "1px solid #f56c6c";
        }
      }
    }
  },
  computed() {
    this.value = this.fillin;
  },
  methods: {
    onFocus() {
      this.focus = true;
    },
    onBlur() {
      this.focus = false;
    }
  }
}
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  color: #999999;
}
::-moz-placeholder {
  color: #999999;
}
:-ms-input-placeholder {
  color: #999999;
}
.input {
   width: 2rem;
   height: 0.46rem;
  .input-art {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.08rem 0 0;
    width: 100%;
    height: 0.28rem;
    border-radius: 0.02rem;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.28rem;
      height: 0.22rem;
      border-right: 1px solid #dcdfe6;
      > img {
        width: 0.14rem;
        height: 0.14rem;
      }
    }
    > input {
      margin: 0 0 0 0.08rem;
      width: 100%;
      height: 0.26rem;
      font-size: 0.1rem;
      color: #333333;
      line-height: 0.1rem;
      background-color: #ffffff;
    }
  }
  .input-tip {
    margin: 0.04rem 0 0 0;
    width: 100%;
    font-size: 0.1rem;
    color: #f56c6c;
    line-height: 0.1rem;
  }
}
</style>