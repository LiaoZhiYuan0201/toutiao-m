<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        >
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from "@/api/article.js";
import ArticleItem from "@/components/article-item/index.vue";
import { debounce } from "lodash";

export default {
  name: "ArticleList",
  created() {},
  props: {
    channel: {
      tppe: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      //获取下一页的时间戳
      timestamp: null,
      //下拉刷新的状态
      isRefreshLoading: false,
      //下拉刷新成功提示文本
      refreshSuccessText: "",
      scrollTop: 0,
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      let { data: res } = await getArticle({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1,
      });
      let { results } = res.data;
      this.articles.push(...results);
      this.loading = false;
      if (results.length !== 0) {
        this.timestamp = res.data.pre_timestamp;
      } else {
        this.finished = true;
      }
    },
    async onRefresh() {
      let { data: res } = await getArticle({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      let { results } = res.data;
      this.articles.unshift(...results);
      this.isRefreshLoading = false;
      this.refreshSuccessText = `更新了${results.length}条数据`;
    },
  },
  components: {
    ArticleItem,
  },
  computed: {},
  mounted() {
    let articleList = this.$refs["article-list"];
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop;
    }, 50);
  },
  activated() {
    //把记录的达到顶部的距离重新设置回去
    this.$refs["article-list"].scrollTop = this.scrollTop;
  },
};
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
