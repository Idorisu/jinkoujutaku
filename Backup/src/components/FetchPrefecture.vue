<script setup>
import axios from 'axios'
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['addItems', 'removeItems'])

const ACCESS_TOKEN = 'GKVk1oWzexxJz7hrgnivmX20jtuGKMbU1LMx4i16'

const getPrefectures = async (path) => {
  const response = await axios.get(`https://opendata.resas-portal.go.jp/api/v1/${path}`, {
    headers: {
      'X-API-KEY': ACCESS_TOKEN
    }
  })
  return response
}

const prefectures = ref([])

onMounted(async () => {
  fetchPrefectures()
})

const fetchPrefectures = async () => {
  const path = 'prefectures'
  try {
    const response = await getPrefectures(path)
    prefectures.value = response.data.result.map((val) => {
      return {
        id: val['prefCode'],
        name: val['prefName'],
        isChecked: false
      }
    })
  } catch (error) {
    console.error(error.message)
  }
}

const drawChart = async (id, name) => {
  const path = `population/composition/perYear?prefCode=${id}`
  try {
    const response = await getPrefectures(path)
    const population = response.data.result.data[0].data.map((val) => val['value'])
    emit('addItems', id, name, population)
    prefectures.value[id - 1].isChecked = true
    console.log(prefectures.value[id - 1].isChecked)
  } catch (error) {
    console.error(error.message)
  }
}

const deleteChart = (id) => {
  emit('removeItems', id)
  prefectures.value[id - 1].isChecked = false
}

const switchChart = (id, name, isChecked) => {
  if (isChecked) {
    deleteChart(id)
  } else {
    drawChart(id, name)
  }
}
</script>

<template>
  <div class="PrefZone">
    <!-- <input v-model.trim="search" type="text" placeholder="県サーチ。。。" /> -->
    <div v-for="prefecture in prefectures" :key="prefecture.id" class="prefecture">
      <label :for="prefecture.id">
        <input
          type="checkbox"
          :id="prefecture.id"
          :checked="prefecture.isChecked"
          @click="switchChart(prefecture.id, prefecture.name, prefecture.isChecked)"
        />
        {{ prefecture.name }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.prefZone {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px auto;
  padding: 10px 10px;
  background-color: #cd2222;
  border-radius: 20px;
  border: #7b3a9b;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.prefecture {
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  color: black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.prefecture:checked {
  background-color: #7b3a9b;
  color: #ffffff;
}
</style>
