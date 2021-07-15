<template>
  <div class="search-container">
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form action="/">
      <!-- 搜索框 -->
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    >
    </search-suggestion>
    <!-- 历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    >
    </search-history>
  </div>
</template>

<script>
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import { setItem, getItem } from "@/utils/storage.js";
import { getSearchHistories } from "@/api/search.js";
import { mapState } from "vuex";

export default {
  name: "SearchInedx",

  created() {
    this.loadSearchHistories();
  },
  props: {},
  data() {
    return {
      searchText: "",
      isResultShow: false, //控制搜索结果的显示状态
      searchHistories: [], //搜索历史数据
    };
  },
  methods: {
    onSearch(searchText) {
      //设置想要搜索的文本
      this.searchText = searchText;
      let index = this.searchHistories.indexOf(searchText);
      if (index !== -1) {
        //重复项删除
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(searchText);
      // 展示搜索结果
      this.isResultShow = true;
    },
    async loadSearchHistories() {
      let searchHistories = getItem("search-histories") || [];

      if (this.user) {
        let { data: res } = await getSearchHistories();
        searchHistories = [
          ...new Set([...searchHistories, ...res.data.keywords]),
        ];
      }
      this.searchHistories = searchHistories;
    },
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult,
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    searchHistories() {
      setItem("search-histories", this.searchHistories);
    },
  },
};
</script>

<style scoped lang="less">
</style>
