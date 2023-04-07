<template>
  <article>
    <div class="protagonist spiderMove" @click="logohandle"></div>
    <img class="spiderImg spiderMove" ref="pngDom" alt="" v-lazy="config.protagonist">
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

  <Transition
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div v-if="dialog" class="dialog" @click="dialogClose">
      <input v-model="dialgoText" />
      <img alt="" v-lazy="dialogPng">
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted, watch } from "vue"
import { getImgUrl, runPngAnimation } from "@/utils/index"

const floorImg = getImgUrl("../assets/imgs/floor.png")
const dialogPng = getImgUrl("../assets/imgs/dialog.png")

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

const props = defineProps({ keyword: String, pageType: Number, enterStatus: Boolean })
const emits = defineEmits(["pageChage"])
const config = ref(null)
const isHoverL = ref(false)
const isHoverR = ref(false)

const setConfig = {
  gate: {
    protagonist: getImgUrl("../assets/imgs/spider_1/spider1.png"),
    animation: "spider_1",
    speed: 1,
    step: 26,
    floorBottom: 33,
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
    animation: ["spider_2_1", "spider_2_2", "spider_2_1"],
    speed: [0.25, 1.1, 0.4],
    delay: [2.5, 1.1, 10],
    step: [8, 35, 8],
    floorBottom: -30,
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
    speed: 2.5,
    step: 50,
    floorBottom: -30,
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

watch(() => props.enterStatus, async (val) => {
  if (!val) return
  let options = setConfig[props.keyword]
  const spiderMoveDom = document.querySelectorAll(".spiderMove")
  async function secondRun() {
    let runArr = options.delay.map((item, index) => {
      return () => new Promise((resolve) => {
        timer.value && clearInterval(timer.value);
        timer.value = runPngAnimation(pngDom.value, `../assets/imgs/${(options.animation)[index]}/spider`, (options.speed)[index], (options.step)[index]);
        if (index === 0) {
          spiderMoveDom.forEach((item) => {
            item.classList.add("leftin")
            item.classList.remove("rightout")
          })
        }

        if (index === 1) {
          spiderMoveDom.forEach((item) => {
            item.classList.remove("leftin")
            item.classList.remove("rightout")
          })
        }

        if (index === 2) {
          spiderMoveDom.forEach((item) => {
            item.classList.remove("lfetInto")
            item.classList.add("rightout")
          })
        }

        (delayTimer.value)[index] && clearTimeout((delayTimer.value)[index]);
        (delayTimer.value)[index] = setTimeout(resolve, item * 1000);
      })
    })

    for(let i = 0; i < runArr.length; i++) {
      await runArr[i]()
      if (i === 2) i = -1
    }
  }
  switch (props.pageType) {
    case 1:
      spiderMoveDom.forEach((item) => {
        item.classList.remove("enterInto")
      })
      timer.value = runPngAnimation(pngDom.value, `../assets/imgs/${options.animation}/spider`, options.speed, options.step)
      break
    case 2:
      secondRun()
      break
    case 3:
      timer.value = runPngAnimation(pngDom.value, `../assets/imgs/${options.animation}/spider`, options.speed, options.step)
      break
  }
})

const pngDom = ref(null)
const timer = ref(null)
const delayTimer = ref([])
let firstTimer = ref(null)

onMounted(async () => {
  if (timer.value) clearInterval(timer.value)
  if (props.pageType === 1) {
    const spiderMoveDom = document.querySelectorAll(".spiderMove")
    spiderMoveDom.forEach((item) => {
      item.classList.remove("enterInto")
      item.classList.add("enterInto")
    })
  }
})

onUnmounted(() => {
  timer.value && clearInterval(timer.value)
  firstTimer.value && clearTimeout(firstTimer.value)
  delayTimer.value.length && delayTimer.value.forEach((item) => clearTimeout(item))
  delayTimer.value = []
  timer.value = null
  firstTimer.value = null
})

const dialog = ref(false)
const dialgoText = ref("")
const dialogTimer = ref(null)

watch(
  () => dialog,
  (val) => {
    if (!val) {
      clearInterval(dialogTimer.value)
      dialogTimer.value = null
      dialgoText.value = ""
    }
  }
)

function logohandle() {
  if (props.pageType === 1) {
    window.location.href = "https://gate-3.io/"
  } else {
    dialog.value = true
    dialogTimer.value && clearInterval(dialogTimer.value)
    let str = "coming soon..."
    let i = 0
    dialogTimer.value = setInterval(() => {
      dialgoText.value += str[i]
      i++
      if (i >= str.length) {
        clearInterval(dialogTimer.value)
        dialogTimer.value = null
      }
    }, 200)
  }
}

function dialogClose() {
  dialog.value = false
  clearInterval(dialogTimer.value)
  dialogTimer.value = null
  dialgoText.value = ""
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
    height: 2.6rem;
    width: 3.7rem;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .spiderImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
  .floorImg {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: -2;
  }
  .backimg {
    z-index: -3;
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

.enterInto {
  animation: enterIn 0.6s ease 0.4s;
}

.leaveOut {
  animation: enterIn 0.6s ease 0.4s reverse;
}

@keyframes enterIn {
  0% {
    transform: translateX(-20vw) scale(0);
  }
  100% {
    transform: translate(0) scale(1);
  }
}

.leftin {
  animation: spiderLeftInto 2.4s linear;
}

@keyframes spiderLeftInto {
  0% { transform: translateX(-60vw); }
  100% { transform: translateX(0); }
}

.rightout {
  animation: spiderRightGoOut 10s linear;
}

@keyframes spiderRightGoOut {
  0% { transform: translateX(0); }
  100% { transform: translateX(100vw); }
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(6px);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.8rem;
  box-sizing: border-box;

  input {
    font-weight: 700;
    font-size: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    color: #fff;
    font-family: "Outfit";
    background-color: transparent;
    outline: none;
    border: none;
  }

  img {
    width: 10rem;
    height: 5rem;
  }
}
</style>