<template>
  <van-cell class="comment-item">
    <van-image
      round
      :src="comment.aut_photo"
      fit="cover"
      slot="icon"
      class="avatar"
    />
    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap" @click="onCommentLike">
          <van-icon
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            class="like-icon"
            :class="{ liked: comment.is_liking }"
          ></van-icon>
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div class="content-wrap">
        <span class="pubdate">{{ comment.pubdate | dateTime }}</span>
        <van-button
          round
          size="mini"
          class="reply-btn"
          @click="$emit('reply-click', comment)"
          >{{ comment.reply_count }} 回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from "@/api/comment.js";

export default {
  name: "CommentItem",

  created() {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async onCommentLike() {
      let commentId = this.comment.com_id.toString();
      if (this.comment.is_liking) {
        await deleteCommentLike(commentId);
        this.comment.like_count--;
      } else {
        await addCommentLike(commentId);
        this.comment.like_count++;
      }
      this.comment.is_liking = !this.comment.is_liking;
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    height: 36px;
    width: 36px;
    margin-right: 13px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .conent {
    font-size: 16px;
    color: #222;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 10px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
  .content-wrap {
    display: flex;
    align-items: center;
  }
  .like-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .like-icon.liked {
    color: #ff69b4;
  }
}
</style>
