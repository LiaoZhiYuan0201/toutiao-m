<template>
  <div class="update-photo">
    <img :src="image" alt="" ref="image" class="image" />
    <van-nav-bar
      left-text="取消"
      right-text="完成"
      class="toolbar"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>
  </div>
</template>

<script>
import { updateUserPhoto } from "@/api/user.js";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  name: "UpdatePhoto",

  created() {},
  props: {
    file: {
      required: true,
    },
  },
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null, //裁切器实例
    };
  },
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob);
        });
      });
    },
    async onConfirm() {
      this.$toast.loading({
        message: "保存中",
        forbidClick: true,
        duration: 0, //展示时间，0 持续展示
      });

      let file = await this.getCroppedCanvas();
      let fd = new FormData();
      fd.append("photo", file);
      await updateUserPhoto(fd);
      this.$emit("update-photo", window.URL.createObjectURL(file));
      this.$emit("close");
      this.$toast.success("保存成功");
    },
  },
  components: {},
  computed: {},
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
};
</script>

<style scoped lang="less">
.toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
}
.image {
  /* Ensure the size of the image fit the container perfectly */
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
