<script setup>
import PrefectureList from './components/PrefectureList.vue'
</script>

<template>
  <main>
    <h1>都道府県人口グラフ</h1>
    <PrefectureList />
  </main>
</template>

<style scoped>
* {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

h1 {
  text-align: center;
  margin: 20px 0;
  text-shadow: 2px 2px 2px #313131;
  font-size: 50px;
  color: aliceblue;
  border: #313131 3px solid;
  border-radius: 20px;
  background-color: #5f0a89;
}
</style>
