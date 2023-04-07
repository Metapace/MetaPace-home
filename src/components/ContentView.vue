<template>
  <article>
    <img class="protagonist" alt="" v-lazy="config.protagonist">
    <img class="backimg" alt="" v-lazy="config.backfloor">
    <button class="left">
      <img alt="left" src="../assets/imgs/left.png">
    </button>

    <button class="right">
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
import { ref, defineProps } from "vue"

import gateback from "@/assets/imgs/gate3_back.png";
import gatelogo from "@/assets/imgs/gate3_logo.png"
import gateVector1 from "@/assets/imgs/gate3_Vector_1.png"
import gateVector2 from "@/assets/imgs/gate3_Vector_2.png"
import gateVector3 from "@/assets/imgs/gate3_Vector_3.png"

import starlandBack from "@/assets/imgs/starland_back.png";
import starlandLogo from "@/assets/imgs/starland_logo.png";
import starlandVector1 from "@/assets/imgs/starland_Vector_1.png";
import starlandVector2 from "@/assets/imgs/starland_Vector_2.png";
import starlandVector3 from "@/assets/imgs/starland_Vector_3.png";

import datebotBack from "@/assets/imgs/datebot_back.png";
import datebotLogo from "@/assets/imgs/datebot_logo.png";
import datebotVector1 from "@/assets/imgs/datebot_Vector_1.png";
import datebotVector2 from "@/assets/imgs/datebot_Vector_2.png";
import datebotVector3 from "@/assets/imgs/datebot_Vector_3.png";

const props = defineProps({ keyword: String })
const config = ref(null)

const setConfig = {
  gate: {
    protagonist: null,
    backfloor: gateback,
    footerlogo: gatelogo,
    deslogo: { width: "0.71rem", height: "0.64rem" },
    desColor: "#BD92FF",
    des: "A one-stop web3 game task tool for planning and launching activities. It supports activity customization, game pre-registration, game internal experience invitations, etc. It supports distributing NFTs as rewards and has built-in tasks for mining games and deep interaction with users.",
    vector: [gateVector1, gateVector2, gateVector3],
  },
  starland: {
    protagonist: null,
    backfloor: starlandBack,
    footerlogo: starlandLogo,
    deslogo: { width: "0.97rem", height: "0.66rem" },
    desColor: "#24B6D3",
    des: "One-click order advertisement promotion supports the selection of global web2 and web3 media to continuously provide a large number of new active users for game projects",
    vector: [starlandVector1, starlandVector2, starlandVector3]
  },
  datebot: {
    protagonist: null,
    backfloor: datebotBack,
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

function logohandle() {}

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
    left: 0;
    top: 0;
    z-index: 1;
  }
  .backimg {
    z-index: -1;
  }

  button {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    border: #fff 1px solid;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.5s;
    padding: 0 0.06rem;
    box-sizing: border-box;
    z-index: 2;
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