<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        class="search-btn"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 导航栏 标签页 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"> </article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user.js";
import ArticleList from "./components/article-list.vue";

export default {
  created() {
    this.loadChannels();
  },
  props: {},
  data() {
    return {
      //控制被激活标签
      active: 0,
      //频道列表数据
      channels: [],
    };
  },
  methods: {
    async loadChannels() {
      let { data: res } = await getUserChannels();
      this.channels = res.data.channels;
    },
  },
  components: {
    ArticleList,
  },
  computed: {},
};
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    border: none;
    background-color: #5babfb;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs {
    /deep/.van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;
    }
  }
}
</style>
