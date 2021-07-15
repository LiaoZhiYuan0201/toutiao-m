<template>
  <div class="article-container">
    <van-nav-bar
      title="文章详情"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <h1 class="title">{{ article.title }}</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">{{ article.aut_name }}</div>

      <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="article.aut_photo"
      />
      <div slot="label" class="pubdate">
        {{ article.pubdate | relativeTime }}
      </div>
      <van-button
        round
        size="small"
        :type="article.is_followed ? 'default' : 'danger'"
        class="follow-btn"
        :icon="article.is_followed ? '' : 'plus'"
        @click="onFollow"
        :loading="isFollowLoading"
        >{{ article.is_followed ? "已关注" : "关注" }}</van-button
      >
    </van-cell>
    <div
      class="markdown-body"
      v-html="article.content"
      ref="article-content"
    ></div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777"></van-icon>
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? 'orange' : '#777'"
        @click="onCollect"
      ></van-icon>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? 'red' : '#777'"
        @click="onLike"
      ></van-icon>
      <van-icon name="share" color="#777"></van-icon>
    </div>
  </div>
</template>

<script>
import "./github-markdown.css";
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike,
} from "@/api/article.js";
import { ImagePreview } from "vant";
import { addFollow, deleteFollow } from "@/api/user.js";

export default {
  name: "ArticleIndex",

  created() {
    this.loadArticle();
  },
  props: {
    //获取动态路由参数 也可以使用$route
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      //关注用户的按钮loading的状态
      isFollowLoading: false,

      //收藏
      isCollectLoading: false,
    };
  },
  methods: {
    async loadArticle() {
      let { data: res } = await getArticleById(this.articleId);
      this.article = res.data;
      this.$nextTick(() => {
        this.handlePerviewImage();
      });
    },
    handlePerviewImage() {
      let articleContent = this.$refs["article-content"];
      let imgs = articleContent.querySelectorAll("img");
      let imgPaths = [];
      imgs.forEach((img, index) => {
        imgPaths.push(img.src);
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index,
          });
        };
      });
    },
    async onFollow() {
      this.isFollowLoading = true;
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id);
      } else {
        await addFollow(this.article.aut_id);
      }
      this.article.is_followed = !this.article.is_followed;
      this.isFollowLoading = false;
    },
    async onCollect() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true, //禁止点击
      });
      if (this.article.is_collected) {
        await deleteCollect(this.articleId);
      } else {
        await addCollect(this.articleId);
      }
      this.article.is_collected = !this.article.is_collected;
      this.$toast.success(`${this.article.is_collected ? "" : "取消"}收藏成功`);
    },
    async onLike() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true, //禁止点击
      });
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId);
        this.article.attitude = -1;
      } else {
        await addLike(this.articleId);
        this.article.attitude = 1;
      }
      this.$toast.success(
        `${this.article.attitude === 1 ? "" : "取消"}点赞成功`
      );
    },
  },

  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.article-container {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .title {
    margin: 0;
    padding: 14px;
    font-size: 20px;
    color: #3a3a3a;
    background-color: #fff;
  }
  .user-info {
    .name {
      font-size: 12px;
      color: #333;
    }
    .pubdate {
      color: #b4b4b4;
      font-size: 11px;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
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
    border-top: 1px solid #ccc;
    background-color: #fff;
    .comment-btn {
      width: 170px;
      height: 28px;
      color: #ccc;
    }
  }
}
</style>
