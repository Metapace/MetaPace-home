<template>
  <div class="datebot">
    <content-view
      keyword="datebot"
      :pageType="props.pageType"
      :enterStatus="props.enterStatus"
      @pageChage="pageChange"
    ></content-view>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
import ContentView from '../components/ContentView.vue';
const props = defineProps(["pageType", "enterStatus"])
const emits = defineEmits(["pageChage"])
function pageChange(type) {
  emits("pageChage", type)
}
</script>

<style lang="scss" scoped>
.datebot {
  background: linear-gradient(288.72deg, rgb(0, 113, 130) 0%, rgb(65, 0, 130) 33.75%);
}
</style>