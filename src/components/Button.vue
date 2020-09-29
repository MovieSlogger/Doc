<template>
  <div class="button" :style="{backgroundColor: color, opacity: opacity, width: width + 'rem', height: height + 'rem'}" @click="onButton">
    <template v-if="status">
      <span :style="{fontSize: size + 'rem'}">{{ text ? text : "doc" }}</span>
    </template>
    <template v-else>
      <div>
        <svg :style="{width: height + 'rem', height: height + 'rem'}" viewBox="-5 3 70 70" style="color: rgb(255, 255, 255)">
          <circle cx="30" cy="40" r="15" fill="none" style="animation: v-circular 1.5s ease-in-out infinite; stroke: currentColor; stroke-width: 3; stroke-linecap: round;"></circle>
        </svg>
        <span>{{ under ? under : "doc" }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    /* 按钮状态 */
    status: Boolean,
    /* 是否禁用 */
    disabled: Boolean,
    /* 按钮宽度 */
    width: Number,
    /* 按钮高度 */
    height: Number,
    /* 按钮文本 */
    text: String,
    /* 按钮文本大小 */
    size: String,
    /* 进行中 */
    under: String,
    /* 按钮颜色 */
    color: String,
  },
  data() {
    return {
      opacity: 1
    }
  },
  watch: {
    status: {
      handler: function() {
        this.onOpacity();
      }
    },
    disabled: {
      handler: function() {
        this.onOpacity();
      }
    }
  },
  mounted() {
    this.onOpacity();
  },
  methods: {
    onOpacity() {
      if (this.disabled) {
        this.opacity = 0.38;
      } else {
        this.opacity = this.status ? 1 : 0.38
      }
    },
    onButton() {
      if (!this.disabled) {
        this.$emit("button-btn");
      }
    }
  }
}
</script>

<style lang="less" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 0.28rem;
  background-color: #409eff;
  border-radius: 0.02rem;
  > span {
    font-size: 0.12rem;
    color: #ffffff;
    line-height: 0.12rem;
  }
  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    > span {
      font-size: 0.12rem;
      color: #ffffff;
      line-height: 0.12rem;
    }
  }
}
</style>