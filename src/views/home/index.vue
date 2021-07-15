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
        to="/search"
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
      <!-- 占位以防挡住其他 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div
        slot="nav-right"
        @click="ischannelEditShow = true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="ischannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <!-- $event 表示事件参数 -->
      <channel-edit
        :user-channels="channels"
        :active="active"
        @close="ischannelEditShow = false"
        @update-active="active = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user.js";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage.js";

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

      ischannelEditShow: false,
    };
  },
  methods: {
    async loadChannels() {
      let channels = [];
      if (this.user) {
        let { data: res } = await getUserChannels();
        channels = res.data.channels;
      } else {
        let localChannels = getItem("user-channels");
        // 如果有本地频道则使用
        if (localChannels) {
          channels = localChannels;
        } else {
          let { data: res } = await getUserChannels();
          channels = res.data.channels;
        }
      }
      this.channels = channels;
    },
    // onUpdateActive(index) {
    //   this.active = index;
    // },
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
  computed: {
    ...mapState(["user"]),
  },
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
      // border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;
    }
  }

  .wap-nav-placeholder {
    width: 25px;
    flex-shrink: 0;
  }

  .wap-nav-wrap {
    position: fixed;
    right: 0;
    height: 43px;
    width: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    background-color: #fff;
    .van-icon {
      font-size: 16px;
    }
    &::before {
      content: "";
      width: 1px;
      height: 43px;
      position: absolute;
      left: 0;
      top: 0;
      background: url("../../assets/line.png") no-repeat;
      background-size: contain;
    }
  }
}

.channel-edit-popup {
  height: 100%;
}
</style>
