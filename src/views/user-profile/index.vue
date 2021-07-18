<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="app-nav-bar"
    />
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      v-model="user.birthday"
      @click="isEditBirthdayShow = true"
    ></van-cell>

    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isEditNameShow"
        @close="isEditNameShow = false"
        v-model="user.name"
      ></update-name>
    </van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender
        @close="isEditGenderShow = false"
        v-model="user.gender"
      ></update-gender>
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <update-birthday
        v-if="isEditBirthdayShow"
        @close="isEditBirthdayShow = false"
        v-model="user.birthday"
      ></update-birthday>
    </van-popup>

    <!-- 修改头像弹出层 -->
    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      style="height: 100%"
      class="update-photo-popup"
    >
      <update-photo
        v-if="isEditPhotoShow"
        :file="previewImage"
        @close="isEditPhotoShow = false"
        @update-photo="user.photo = $event"
      ></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user.js";
import UpdateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdatePhoto from "./components/update-photo.vue";

export default {
  name: "UserProfile",

  created() {
    this.loadUserProfile();
  },
  props: {},
  data() {
    return {
      user: {}, //用户对象
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow: false,
      previewImage: null,
    };
  },
  methods: {
    //获取用户信息
    async loadUserProfile() {
      let { data: res } = await getUserProfile();
      this.user = res.data;
    },
    onFileChange() {
      let file = this.$refs.file.files[0];
      this.previewImage = file;
      this.isEditPhotoShow = true;
      this.$refs.file.value = "";
    },
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  computed: {},
};
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
</style>
