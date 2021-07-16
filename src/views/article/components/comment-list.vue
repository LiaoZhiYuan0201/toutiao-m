<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from "@/api/comment.js";
import CommentItem from "./comment-item.vue";
export default {
  name: "commentList",

  created() {},
  props: {
    source: {
      type: [String, Number, Object],
      required: true,
    },
    //获取文章评论
    type: {
      type: String,
      default: "a",
    },
    commentList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页的页码
      limit: 10, //每页大小
    };
  },
  methods: {
    async onLoad() {
      let { data: res } = await getComments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit,
      });
      this.$emit("update-total-count", res.data.total_count);
      let { results } = res.data;
      this.list.push(...results);
      this.loading = false;
      if (results.length) {
        //如果有，更新获取下一页数据的页码
        this.offset = res.data.last_id;
      } else {
        //如果没有就不再加载
        this.finished = true;
      }
    },
  },
  components: {
    CommentItem,
  },
  computed: {},
  watch: {},
};
</script>

<style scoped lang="less">
</style>
