<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search.js";
import { debounce } from "lodash";

export default {
  name: "SearchSuggestion",

  created() {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  methods: {
    highlight(str) {
      let reg = new RegExp(this.searchText, "gi");
      return str.replace(
        reg,
        `<span style='color:red'>${this.searchText}</span>`
      );
    },
  },
  components: {},
  computed: {},
  //监听
  watch: {
    //属性名与要监视的数据名称一致
    searchText: {
      //当数据发生变化执行处理函数
      //deboubce  函数防抖  节流
      handler: debounce(async function () {
        let { data: res } = await getSearchSuggestions(this.searchText);
        this.suggestions = res.data.options;
      }, 150),
      //在监听开始时立即调用
      immediate: true,
    },
  },
};
</script>

<style scoped lang="less">
</style>
