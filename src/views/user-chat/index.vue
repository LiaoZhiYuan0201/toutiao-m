<template>
  <div class="user-chat">
    <van-nav-bar
      title="小智同学"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <van-cell
        :title="item.msg"
        v-for="(item, index) in messages"
        :key="index"
      />
    </van-cell-group>

    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入消息" :border="false" />
      <van-button
        size="small"
        type="primary"
        class="send-message-btn"
        @click="onSend"
        >发送</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import io from "socket.io-client";
import { setItem, getItem } from "@/utils/storage";

export default {
  name: "UserrChat",

  created() {
    let socket = io("http://ttapi.research.itcast.cn");
    this.socket = socket;
    //建立链接
    socket.on("connect", () => {});

    //断开连接
    socket.on("disconnect", () => {});

    window.socket = socket;

    //发送消息
    socket.on("message", (data) => {
      this.messages.push(data);
    });
  },
  props: {},
  data() {
    return {
      message: "",
      socket: null,
      messages: getItem("chat-messages") || [],
    };
  },
  methods: {
    onSend() {
      let data = {
        msg: this.message,
        timestamp: Date.now(),
      };
      this.socket.emit("message", data);
      this.messages.push(data);
      this.message = "";
    },
    scrollToBottom() {
      let list = this.$refs["message-list"];
      list.scrollTop = list.scrollHeight;
    },
  },
  components: {},
  computed: {},
  watch: {
    message() {
      setItem("chat-messages", this.messages);
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped lang="less">
.send-message-wrap {
  display: flex;
  padding: 0 14px;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: none;
  .send-message-btn {
    width: 70px;
  }
}
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
</style>
