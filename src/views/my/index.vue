<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell center class="base-info" :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button size="small" round class="update-btn">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item text="头条" class="data-info-item">
          <span slot="icon">{{ currentUser.art_count }}</span>
        </van-grid-item>
        <van-grid-item text="关注" class="data-info-item">
          <span slot="icon">{{ currentUser.follow_count }}</span>
        </van-grid-item>
        <van-grid-item text="粉丝" class="data-info-item">
          <span slot="icon">{{ currentUser.fans_count }}</span>
        </van-grid-item>
        <van-grid-item text="获赞" class="data-info-item">
          <span slot="icon">{{ currentUser.like_count }}</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <img src="../../assets/logPhone.png" alt="" class="mobile" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item
        icon-prefix="icon"
        icon="shoucang"
        text="收藏"
        class="nav-grid-item"
      />
      <van-grid-item
        icon-prefix="icon"
        icon="lishi"
        text="历史"
        class="nav-grid-item"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="" />
    <van-cell title="小智同学" is-link to="" class="mb-4" />
    <van-cell
      class="logout-cell"
      center
      title="退出登录"
      v-if="user"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCurrentUser } from "@/api/user.js";

export default {
  created() {
    this.loadCurrentUser();
  },
  props: {},
  data() {
    return {
      //当前登录用户信息
      currentUser: {},
    };
  },
  methods: {
    onLogout() {
      //提示用户确认退出
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗？",
        })
        .then(() => {
          // on confirm
          // 清除用户登录状态
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    async loadCurrentUser() {
      let { data: res } = await getCurrentUser();
      this.currentUser = res.data;
    },
  },
  components: {},
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url("../../assets/banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        width: 66px;
        height: 66px;
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
  }
  .data-info {
    .data-info-item {
      height: 65px;
      color: #fff;

      span {
        font-size: 18px;
      }
      /deep/.van-grid-item__text {
        font-size: 11px;
        color: #fff;
      }
    }
  }
  /deep/ .data-info-item > div {
    background-color: unset;
  }
  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      .icon {
        font-size: 22px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }

  .not-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 180px;
    background: url("../../assets/banner.png") no-repeat;
    background-size: cover;
    .mobile {
      height: 66px;
      width: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
