<template>
  <article>
    <div class="protagonist" @click="logohandle">
      <img ref="pngDom" alt="" v-lazy="config.protagonist" :style="config.backPosition">
    </div>
    <img class="floorImg" alt="" v-lazy="floorImg" :style="{ bottom: `${config.floorBottom}%` }">
    <img class="backimg" alt="" v-lazy="config.backfloor">
    <button
      class="left"
      v-if="config.left"
      :style="{
        backgroundColor: isHoverL ? config.btnColor : 'transparent',
        border: isHoverL ? 'none' : '#fff 1px solid'
      }"
      @mouseover="btnHover(true, 'l')"
      @mouseout="btnHover(false, 'l')"
      @click="btnHandle(-1)"
    >
      <img alt="left" src="../assets/imgs/left.png">
    </button>

    <button 
      class="right"
      v-if="config.right" 
      :style="{
        backgroundColor: isHoverR ? config.btnColor : 'transparent',
        border: isHoverR ? 'none' : '#fff 1px solid'
      }"
      @mouseover="btnHover(true, 'r')"
      @mouseout="btnHover(false, 'r')"
      @click="btnHandle(1)"
    >
      <img alt="right" src="../assets/imgs/right.png">
    </button>
  </article>

  <footer>
    <img class="footerlogo" alt="logo" v-lazy="config.footerlogo" :style="{ ...config.deslogo }" @click="logohandle">
    <div class="description" :style="{ color: config.desColor }">{{ config.des }}</div>
    <div class="footer-bar">
      <img v-for="(item, index) in config.vector" :key="index" alt="vector" v-lazy="item">
    </div>
  </footer>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted, resolveDirective } from "vue"
import { getImgUrl, runPngAnimation } from "@/utils/index"

const floorImg = getImgUrl("../assets/imgs/floor.png")

const gateback = getImgUrl("../assets/imgs/gate3_back.png")
const gatelogo = getImgUrl("../assets/imgs/gate3_logo.png")
const gateVector1 = getImgUrl("../assets/imgs/gate3_Vector_1.png")
const gateVector2 = getImgUrl("../assets/imgs/gate3_Vector_2.png")
const gateVector3 = getImgUrl("../assets/imgs/gate3_Vector_3.png")

const starlandBack = getImgUrl("../assets/imgs/starland_back.png")
const starlandLogo = getImgUrl("../assets/imgs/starland_logo.png")
const starlandVector1 = getImgUrl("../assets/imgs/starland_Vector_1.png")
const starlandVector2 = getImgUrl("../assets/imgs/starland_Vector_2.png")
const starlandVector3 = getImgUrl("../assets/imgs/starland_Vector_3.png")

const datebotBack = getImgUrl("../assets/imgs/datebot_back.png")
const datebotLogo = getImgUrl("../assets/imgs/datebot_logo.png")
const datebotVector1 = getImgUrl("../assets/imgs/datebot_Vector_1.png")
const datebotVector2 = getImgUrl("../assets/imgs/datebot_Vector_2.png")
const datebotVector3 = getImgUrl("../assets/imgs/datebot_Vector_3.png")

const props = defineProps({ keyword: String, pageType: Number })
const emits = defineEmits(["pageChage"])
const config = ref(null)
const isHoverL = ref(false)
const isHoverR = ref(false)

const setConfig = {
  gate: {
    protagonist: getImgUrl("../assets/imgs/spider_1/spider1.png"),
    backPosition: { left: "-150%", top: "-95%" },
    animation: "spider_1",
    speed: 1,
    step: 26,
    floorBottom: 34,
    spiderSite: { top: "3%", left: "0" },
    backfloor: gateback,
    left: false,
    right: true,
    btnColor: "#6b0afe",
    footerlogo: gatelogo,
    deslogo: { width: "0.71rem", height: "0.64rem" },
    desColor: "#BD92FF",
    des: "A one-stop web3 game task tool for planning and launching activities. It supports activity customization, game pre-registration, game internal experience invitations, etc. It supports distributing NFTs as rewards and has built-in tasks for mining games and deep interaction with users.",
    vector: [gateVector1, gateVector2, gateVector3],
  },
  starland: {
    protagonist: null,
    animation: "spider_2",
    floorBottom: 30,
    spiderSite: { top: "3%", left: "0" },
    backfloor: starlandBack,
    left: true,
    right: true,
    btnColor: "#00b2ff",
    footerlogo: starlandLogo,
    deslogo: { width: "0.97rem", height: "0.66rem" },
    desColor: "#24B6D3",
    des: "One-click order advertisement promotion supports the selection of global web2 and web3 media to continuously provide a large number of new active users for game projects",
    vector: [starlandVector1, starlandVector2, starlandVector3]
  },
  datebot: {
    protagonist: null,
    animation: "spider_3",
    floorBottom: 30,
    spiderSite: { top: "3%", left: "0" },
    backfloor: datebotBack,
    left: true,
    right: false,
    btnColor: "#6764f2",
    footerlogo: datebotLogo,
    deslogo: { width: "1.04rem", height: "0.7rem" },
    desColor: "#7875FF",
    des: "A comprehensive game data analysis platform that tracks user on-chain and off-chain data after cooperation with project parties, helping game project parties establish their own web3 game user data value standards.",
    vector: [datebotVector1, datebotVector2, datebotVector3]
  }
}

renderGate(props.keyword)
function renderGate(keyword) {
  const options = setConfig[keyword]
  config.value = { ...options }
}

function btnHover(status, type) {
  if (type === "l") isHoverL.value = status
  if (type === "r") isHoverR.value = status
}

function btnHandle(step) {
  const goPage = props.pageType + step
  if (![1, 2, 3].includes(goPage)) return
  emits("pageChage", goPage)
}

const pngDom = ref(null)
const timer = ref(null)

onMounted(() => {
  let options = setConfig[props.keyword]
  if (timer.value) clearInterval(timer.value)
  timer.value = runPngAnimation(pngDom.value, `../assets/imgs/${options.animation}/spider`, options.speed, options.step)
})

onUnmounted(() => {
  timer.value && clearInterval(timer.value)
  timer.value = null
})

function logohandle() {
  alert("123456")
}

</script>

<style lang="scss" scoped>
article {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .protagonist {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 35%;
    width: 25%;
    img {
      width: 100vw;
      height: 100vh;
      position: absolute;
      z-index: -1;
    }
  }
  .floorImg {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: -1;
  }
  .backimg {
    z-index: -2;
  }

  button {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.5s;
    padding: 0 0.06rem;
    box-sizing: border-box;
    translate: 0.5s;
  }

  button:hover {
    transform: translateY(-50%) scale(1.2);
  }

  .left {
    left: 1.0809rem;
  }

  .right {
    right: 1.0809rem;
  }
}

footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.308rem;

  .description {
    font-family: "Pixel Arial";
    font-style: normal;
    font-weight: 400;
    text-align: center;
    width: 6.24rem;
    font-size: 0.13rem;
    line-height: 0.26rem;
    margin: 0.1rem 0 0.15rem;
  }

  .footer-bar img {
    display: inline-block;
    margin: 0 6.5px;
    width: 14px;
    height: 14px;
  }
}
</style>