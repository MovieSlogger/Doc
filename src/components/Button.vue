<template>
  <div class="button" ref="button" :class="['button-' + size, 'button-' + type]" :style="{opacity: opacity}" @click="onButton">
    <svg v-show="load && !status" :style="{width: client, height: client}" viewBox="-5 3 70 70" style="color: rgb(255, 255, 255)">
      <circle cx="30" cy="40" r="15" fill="none" style="animation: v-circular 1.5s ease-in-out infinite; stroke: currentColor; stroke-width: 3; stroke-linecap: round;"></circle>
    </svg>
    <span>{{ load && !status ? load : text }}</span>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    /* 按钮文本大小 large medium small mini */
    size: {
      default: "small"
    },
    /* 按钮样式 primary success info warning danger */
    type: {
      default: "primary"
    },
    /* 按钮默认文本 */
    text: {
      default: "Doc"
    },
    /* 按钮状态 */
    status: {
      default: true
    },
    /* 按钮状态 */
    load: {
      default: null
    }
  },
  data() {
    return {
      client: 0,
      opacity: 1
    }
  },
  mounted() {
    this.client = this.$refs.button.offsetHeight;
  },
  updated() {
    this.status ? this.opacity = 1 : this.opacity = 0.38
  },
  methods: {
    onButton() {
      this.$emit("btn-click");
    }
  }
}
</script>

<style lang="less" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.06rem;
  background-color: #409eff;
  border-radius: 0.02rem;
  overflow: hidden;
  > span {
    font-size: 50%;
    color: #ffffff;
    white-space: nowrap;
  }
}
.button-large {
  width: 2.24rem;
  height: 0.24rem;
  overflow: hidden;
  > span {
    font-size: 0.12rem;
    line-height: 0.12rem;
  }
  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    > span {
      font-size: 0.12rem;
      line-height: 0.12rem;
    }
  }
}
.button-medium {
  width: 0.5rem;
  height: 0.22rem;
}
.button-small {
  width: 0.46rem;
  height: 0.2rem;
}
.button-mini {
  width: 0.42rem;
  height: 0.18rem;
}
.button-primary {
  background-color: #409eff;
}
.button-success {
  background-color: #67c23a;
}
.button-info {
  background-color: #909399;
}
.button-warning {
  background-color: #e6a23c;
}
.button-danger {
  background-color: #f56c6c;
}
</style>