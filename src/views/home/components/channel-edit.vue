<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel.js";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage.js";

export default {
  name: "ChannelEdit",
  created() {
    this.loadAllChannels();
  },
  props: {
    userChannels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // 所有频道列表
      allChannels: [],
      //编辑显示状态
      isEdit: false,
      active: {
        type: Number,
        required: true,
      },
    };
  },
  methods: {
    async loadAllChannels() {
      let { data: res } = await getAllChannels();
      this.allChannels = res.data.channels;
    },
    async onAdd(channel) {
      this.userChannels.push(channel);
      //数据持久化
      if (this.user) {
        // 数据储存到线上
        await addUserChannel({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length,
            },
          ],
        });
      } else {
        setItem("user-channel", this.userChannels);
      }
    },
    onUserChannelClick(channel, index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index);
      } else {
        this.switchChannel(index);
      }
    },
    //删除频道
    async deleteChannel(channel, index) {
      //如果删除激活频道前面的频道
      if (index <= this.active) {
        this.$emit("updata-active", this.active - 1);
      }
      this.userChannels.splice(index, 1);
      //数据持久化
      if (this.user) {
        await deleteUserChannel(channel.id);
      } else {
        setItem("user-channel", this.userChannels);
      }
    },
    //切换频道
    switchChannel(index) {
      this.$emit("update-active", index);
      //关闭弹出层
      this.$emit("close");
    },
  },
  components: {},
  computed: {
    ...mapState(["user"]),

    //推荐频道列表
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.userChannels.find((userChannel) => {
          return userChannel.id === channel.id;
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/.van-grid-item__icon {
      position: absolute;
      right: -9px;
      top: -8px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/.van-grid-item__text {
      color: red !important;
    }
  }
  /deep/.van-button__text {
    padding: 0 8px;
  }
}
</style>

