<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="name-field-wrap">
      <!-- 输入框 -->

      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";

export default {
  name: "UpdateName",

  created() {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    };
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
      });

      try {
        await updateUserProfile({
          name: this.localName,
        });
        this.$emit("input", this.localName);
        this.$emit("close");
        this.$toast.success("保存成功");
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail("昵称已存在");
        }
      }
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.name-field-wrap {
  padding: 10px;
}
</style>
