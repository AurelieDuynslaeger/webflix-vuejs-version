<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {
  House,
  Film,
  Filter,
  Avatar,
  CirclePlusFilled,
  TopRight,
} from '@element-plus/icons-vue'

import { ElAside, ElMain, ElIcon, ElContainer } from 'element-plus'
</script>

<template>
  <div class="common-layout">
    <el-container class="w-screen h-screen flex relative">
      <div
        class="w-[100px] bg-gray-800 text-[#00bd7e] font-bold text-9xl uppercase flex items-center justify-center"
      >
        <h1
          class="transform -rotate-90 text-center tracking-[0.3em] hover:tracking-tighter transition-all duration-300 ease-in-out"
        >
          webflix
        </h1>
      </div>
      <el-aside
        class="bg-gray-800 text-white p-4 w-1/4 flex flex-col justify-evenly"
      >
        <nav class="flex flex-col justify-between space-y-4 text-xl">
          <RouterLink
            to="/"
            class="hover:text-white hover:font-bold flex items-center justify-start gap-1"
          >
            <el-icon class="w-4 h-4 text-[#00bd7e]"><House /></el-icon>
            Home</RouterLink
          >

          <RouterLink
            to="/films"
            class="hover:text-white hover:font-bold flex items-center justify-start gap-1"
            ><el-icon class="w-4 h-4 text-[#00bd7e]"><Film /></el-icon
            >Films</RouterLink
          >
          <RouterLink
            to="/categories"
            class="hover:text-white hover:font-bold flex items-center justify-start gap-1"
            ><el-icon class="w-4 h-4 text-[#00bd7e]"><Filter /></el-icon
            >Categories</RouterLink
          >
          <RouterLink
            to="/actors"
            class="hover:text-white hover:font-bold flex items-center justify-start gap-1"
            ><el-icon class="w-4 h-4 text-[#00bd7e]"><Avatar /></el-icon
            >Actors</RouterLink
          >
        </nav>
        <nav class="flex flex-col space-y-4">
          <RouterLink
            to="/login"
            class="hover:text-white hover:font-bold flex items-center justify-start gap-1"
            ><el-icon class="w-4 h-4 text-[#00bd7e]"><TopRight /></el-icon
            >Login</RouterLink
          >
          <RouterLink
            to="/register"
            class="hover:text-white hover:font-bold flex items-center justify-start gap-1"
            ><el-icon class="w-4 h-4 text-[#00bd7e]"
              ><CirclePlusFilled /></el-icon
            >Register</RouterLink
          >
          <RouterLink
            to="/about"
            class="hover:text-white hover:font-bold flex items-center justify-start gap-1"
            >About</RouterLink
          >
        </nav>
      </el-aside>

      <el-main
        class="bg-gray-100 w-3/4 h-screen overflow-auto scrollbar-custom"
      >
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  min-height: 100vh;
  width: 100vw;
}
</style>
