<template>
  <div class="starland">
    <content-view
      keyword="starland"
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
.starland {
  background-color: #0C3688;
}
</style>