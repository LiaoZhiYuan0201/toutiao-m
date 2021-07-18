<template>
  <div class="update-gender">
    <van-picker
      title="修改性别"
      show-toolbar
      :columns="columns"
      :default-index="defalutIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
export default {
  name: "UpdateGender",

  created() {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      defalutIndex: this.value,
    };
  },
  methods: {
    onGenderChange(picker, value, index) {
      this.defalutIndex = index;
    },
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
      });
      await updateUserProfile({
        gender: this.defalutIndex,
      });
      this.$emit("input", this.defalutIndex);
      this.$emit("close");
      this.$toast.success("保存成功");
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
</style>
