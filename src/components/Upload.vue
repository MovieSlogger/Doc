<template>
  <div class="upload" :style="{width: width + 'rem'}">
    <div class="upload-panel">
      <div class="upload-head">
        <span>头像: </span>
      </div>
      <div class="upload-option">
        <img :src="fileBase64" alt="" />
        <input id="file" type="file" accept="image/png, image/jpg, image/jpeg" multiple />
      </div>
    </div>
  </div>
</template>

<script>
import { toastBox } from "./../assets/js/appUtils.js"
export default {
  name: "Upload",
  props: {
    /* 选择器宽度 */
    width: Number,
    /* 选择项 */
    file: String
  },
  data() {
    return {
      fileBase64: ""
    }
  },
  updated() {
    this.fileBase64 = this.file
  },
  watch: {
    fileBase64: {
      handler: function() {
        if (this.fileBase64) {
          this.$emit("upload-value", this.fileBase64);
        }
      }
    }
  },
  mounted() {
    let that = this;
    const upload = document.getElementById("file");
    upload.addEventListener("change", (file) => {
      let base = file.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(base);
      reader.onload = () => {
        if (base.type.includes("png") || base.type.includes("jpg") || base.type.includes("jpeg")) {
          if (base.size > 51200) {
            toastBox("您上传的图片太大~");
          } else {
            that.fileBase64 = reader.result;
          }
        } else {
          toastBox("图片上传格式错误~");
        }
      }
      reader.onerror = (error) => {
        console.log(error);
      }
    }, false);
  }
}
</script>

<style lang="less" scoped>
.upload {
  width: 2rem;
  height: 0.46rem;
  .upload-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 0.46rem;
    .upload-head {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.28rem;
      height: 0.28rem;
      > span {
        font-size: 0.1rem;
        color: #333333;
        line-height: 0.1rem;
      }
    }
    .upload-option {
      position: relative;
      margin: 0 0 0 0.12rem;
      width: 0.46rem;
      height: 0.46rem;
      background: url("./../assets/image/upload.png") no-repeat;
      background-size: 0.26rem 0.26rem;
      background-position: center center;
      overflow: hidden;
      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.46rem;
        height: 0.46rem;
        border: none;
        background-color: #eeeeee;
        border-radius: 0.05rem;
      }
      > img[src=""] {
        opacity: 0;
      }
      > input {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.46rem;
        height: 0.46rem;
        opacity: 0;
      }
    }
  }
}
</style>