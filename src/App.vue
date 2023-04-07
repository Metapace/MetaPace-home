<template>
  <div class="layout">
    <header-view @pageChage="pageTypeChange"></header-view>

    <Transition name="fade" :enter-active-class="intoClassName">
      <home-view class="wrap" v-if="pageType === 0"></home-view>
    </Transition>

    <Transition name="fade" :enter-active-class="intoClassName">
      <gate-three class="wrap" v-if="pageType === 1" :pageType="pageType" @pageChage="pageTypeChange"></gate-three>
    </Transition>
    
    <Transition name="fade" :enter-active-class="intoClassName">
      <starland-view class="wrap" v-if="pageType === 2" :pageType="pageType" @pageChage="pageTypeChange"></starland-view>
    </Transition>

    <Transition name="fade" :enter-active-class="intoClassName">
      <datebot-view class="wrap" v-if="pageType === 3" :pageType="pageType" @pageChage="pageTypeChange"></datebot-view>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue"

import HeaderView from "@/components/HeaderView.vue"
import HomeView from "@/views/HomeView.vue"
import GateThree from "@/views/GateThree.vue"
import StarlandView from "@/views/StarlandView.vue"
import DatebotView from "@/views/DatebotView.vue"

const pageType = ref(2);
const intoClassName = ref("fade-enter-active-right")
function pageTypeChange(type) {
  intoClassName.value = type >= pageType.value ? "fade-enter-active-right" : "fade-enter-active-left"
  pageType.value = type
}

</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .wrap {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

.fade-enter-active-right {
  animation: rightInto 1s ease;
}

@keyframes rightInto {
  0% {
    z-index: 2;
    transform: translateX(100vw);
  }
  100% {
    z-index: 2;
    tramsform: translateX(0);
  }
}

.fade-enter-active-left {
  animation: leftInto 0.8s ease;
}

@keyframes leftInto {
  0% {
    z-index: 2;
    transform: translateX(-100vw);
  }
  100% {
    z-index: 2;
    tramsform: translateX(0);
  }
}

.fade-leave-active {
  animation: pageLeave 0.799s;
}

@keyframes pageLeave {
  0% {
    z-index: 1;
  }
  100% {
    z-index: 1;
  }
}
</style>