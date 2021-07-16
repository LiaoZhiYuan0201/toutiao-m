<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button size="small" @click="onPost" :disabled="!message">
      发布
    </van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comment.js";
export default {
  name: "PostComment",

  created() {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: "", //输入框内容
    };
  },
  methods: {
    async onPost() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
      });
      let { data: res } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null,
      });
      this.$emit("post-success", res.data.new_obj);
      this.$toast.success("发布成功");
      this.message = "";
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 14px;
}
</style>
