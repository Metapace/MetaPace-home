<template>
  <header>
    <img class="Logo" alt="logd" v-lazy="logo" @click="goHome"/>
    <span class="products" @click="goProducts">Products</span>
    <span class="docs" @click="goDocs">Docs</span>
  </header>
</template>

<script setup>
import { defineEmits } from "vue"

import logo from "@/assets/imgs/homeicon.webp"

const emits = defineEmits(["pageChage"])

function goHome() {
  emits("pageChage", 0)
}

function goProducts() {
  emits("pageChage", 1)
}

function goDocs() {
  window.location.href = "https://stargate-doc.gitbook.io/product-docs/why-metapace"
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  font-family: "Outfit";
  font-weight: 700;
  letter-spacing: 0.075em;
  color: #fff;

  line-height: 0.19rem;
  font-size: 0.24rem;
  padding: 0.182rem 0.273rem 0;

  position: relative;
  z-index: 9;

  img {
    width: 0.8416rem;
    height: 0.5313rem;
    margin-right: 0.287rem;
  }

  span {
    margin-right: 0.399rem;
  }

  span:hover {
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>