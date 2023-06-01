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
  box-sizing: content-box;
  margin: 0px auto;
}

h1 {
  text-align: center;
  margin: 0px 0px;
  text-shadow: 2px 2px 2px #313131;
  font-size: 50px;
  color: aliceblue;
  border: #ffffff 3px solid;
  border-radius: 10px;
  background-color: #19666b;
}

div {
  max-width: 1600px;
  min-width: 600px;
}
</style>
