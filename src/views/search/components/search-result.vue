<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search.js";

export default {
  name: "SearchResult",

  created() {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    };
  },
  methods: {
    async onLoad() {
      let { data: res } = await getSearchResult({
        page: this.page,
        per_page: this.per_page, //每页大小
        q: this.searchText,
      });
      let { results } = res.data;
      this.list.push(...results);
      this.loading = false;
      if (results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
