<template>
  <div class="gate">
    <content-view
      keyword="gate"
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
.gate {
  background-color: #3e009a;
}
</style>