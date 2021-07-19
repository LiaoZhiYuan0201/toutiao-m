<template>
  <div class="login-container">
    <van-nav-bar
      title="注册/登录"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      :validate-first="true"
      ref="login-form"
      @submit="onLogin"
      @failed="onFalied"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        center
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        center
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            format="sss"
            :time="1000 * 60"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="large"
            round
            class="send-btn"
            v-else
            @click.prevent="onSendSms"
            :loading="isSendSmsLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user.js";

export default {
  name: "LoginIndex",
  created() {},
  props: {},
  data() {
    return {
      user: {
        mobile: "15211111111", //手机号
        code: "246810", //验证码
      },
      formRules: {
        mobile: [
          { required: true, message: "请填写手机号码" },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      //控制倒计时
      isCountDownShow: false,
      //发送验证码按钮的loading 状态
      isSendSmsLoading: false,
    };
  },
  methods: {
    //点击登录
    async onLogin() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, //禁止背景点击
        duration: 0,
      });
      try {
        let { data: res } = await login(this.user);
        this.$toast.success("登录成功");
        //将后端返回的token等数据 放在vuex中
        this.$store.commit("setUser", res.data);

        //清除layout的缓存，让它重新渲染
        this.$store.commit("removeCachePage", "LayoutIndex");

        this.$router.push(this.$route.query.redirect || "/");
      } catch (err) {
        this.$toast.fail("登录失败,手机或验证码错误");
      }
    },
    //提示错误信息
    onFalied(error) {
      if (error.errors[0]) {
        this.$toast({ message: error.errors[0].message, position: "top" });
      }
    },
    //点击发送验证码
    async onSendSms() {
      try {
        await this.$refs["login-form"].validate("mobile");
        this.isSendSmsLoading = true; //展示按钮loading状态
        await sendSms(this.user.mobile);
        this.isCountDownShow = true;
      } catch (err) {
        let message = "";
        if (err && err.response && err.response.status === 429) {
          message = "发送太频繁，请稍后重试";
          //表单验证失败
        } else if (err.name === "mobile") {
          message = err.message;
        } else {
          //未知错误
          message = "发送失败，请稍后重试";
        }

        this.$toast({ message, position: "top" });
      }
      this.isSendSmsLoading = false;
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }

  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .van-cell {
    justify-content: center;
    align-items: center;
  }
}
</style>
