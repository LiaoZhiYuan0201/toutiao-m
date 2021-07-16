<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>
    <!-- 所有评论回复 -->
    <van-cell title="所有回复"> </van-cell>
    <comment-list :source="comment.com_id" type="c" :list="commentList">
    </comment-list>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 发布评论 -->
    <!-- 评论回复 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="onPostSuccess"
      ></post-comment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import commentList from "./comment-list.vue";
import PostComment from "./post-comment.vue";
export default {
  name: "CommentReply",

  created() {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [], //评论回复列表
    };
  },
  methods: {
    onPostSuccess(comment) {
      this.commentList.unshift(comment);
      this.comment.reply_count++;
      this.isPostShow = false;
    },
  },
  components: {
    CommentItem,
    commentList,
    PostComment,
  },
  computed: {},
};
</script>

<style scoped lang="less">
.article-bottom {
  height: 40px;
  display: flex;
  padding-top: 5px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  .comment-btn {
    width: 170px;
    height: 28px;
    color: #ccc;
  }
}
</style>
