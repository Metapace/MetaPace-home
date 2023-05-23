<template>
  <div class="home" ref="homeDom">
    <img class="backimg" alt="back" v-lazy="homeback" />
    <article>
      <img
        id="cube"
        alt="matapace"
        ref="pngDom"
        src="/src/assets/imgs/homeAnimation/animation1.png"
      />
      <div class="line"></div>
      <img class="spider" alt="spider" v-lazy="homedislogo" />
      <div class="description">
        web3.0 professional platform focusing on providing user growth and market development, which
        makes everyone an undefined market pioneer
      </div>
      <footer>
        <img alt="vector" v-lazy="home_Vector_1" />
        <img alt="vector" v-lazy="home_Vector_2" />
        <img alt="vector" v-lazy="home_Vector_3" />
      </footer>
      <a
        class="describe-item"
        href="https://warm-lady-347.notion.site/Metapace-Privacy-Policy-4639ebb5de894d83b31f97e3246e3340"
        target="_blank"
        >Privacy Policy</a
      >
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { runPngAnimation } from '@/utils/index'

import homeback from '/src/assets/imgs/homeback.webp'
import homedislogo from '/src/assets/imgs/homedislogo.webp'
import home_Vector_1 from '/src/assets/imgs/home_Vector_1.webp'
import home_Vector_2 from '/src/assets/imgs/home_Vector_2.webp'
import home_Vector_3 from '/src/assets/imgs/home_Vector_3.webp'

const homeDom = ref(null)
const pngDom = ref(null)
const timer = ref(null)

onMounted(() => {
  if (timer.value) clearInterval(timer.value)
  timer.value = runPngAnimation(pngDom.value, '../assets/imgs/homeAnimation/animation', 10, 32)
})

onUnmounted(() => {
  timer.value && clearInterval(timer.value)
  timer.value = null
})
</script>

<style lang="scss" scoped>
.home {
  background-color: #111;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-end;
  .describe-item {
    color: #ffffff;
    font-size: 14px;
    margin-top: 46px;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .backimg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -2;
  }

  article {
    width: 9.0196rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 0.58rem;

    #cube {
      width: 5.3966rem;
      height: 3.407rem;
    }

    .line {
      width: 100%;
      height: 0.5px;
      margin-top: 0.325rem;
      background-color: #fff;
    }

    .description {
      width: 6.2rem;
      text-align: center;
      font-family: 'Pixel Arial 11';
      font-style: normal;
      font-weight: 700;
      line-height: 0.396rem;
      font-size: 0.2rem;
      opacity: 0.8;
      color: #fff;
      margin-top: -0.2545rem;
    }

    footer {
      margin-top: 0.1689rem;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 0.27rem;
        height: 0.27rem;
        margin: 0 0.132rem;
      }
    }
  }
}
</style>
