<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDelete(history, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>

export default {
  name: "SearchHistory",

  created() {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    onDelete(history, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
        //持久化
        return;
      }
      //非删除状态显示搜索结果
      this.$emit("search", history);
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
</style>
