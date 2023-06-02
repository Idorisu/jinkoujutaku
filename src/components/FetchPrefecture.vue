<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/no-dupe-keys -->
<script setup>
import axios from 'axios'
import { ref, onMounted, defineEmits, defineProps } from 'vue'

const { setAge, populationData } = defineProps(['setAge', 'populationData'])
const currId = ref('')
const currName = ref('')
const currisChecked = ref(false)

const emit = defineEmits(['addItems', 'removeItems'])

const ACCESS_TOKEN = 'h4BYH4uBZ2dW7i5D6sPr8CMexzH8ZN9Kk3NVmY1P'

const getPrefectures = async (path) => {
  const response = await axios.get(`https://opendata.resas-portal.go.jp/api/v1/${path}`, {
    headers: {
      'X-API-KEY': ACCESS_TOKEN
    }
  })
  return response
}

const prefectures = ref([])
const insertedGraphs = ref([])
const selectedPrefs = ref([])
const allPrefPop = ref([])

const getSelColor = () => {
  prefectures.value.forEach((obj) => {
    if (obj.isChecked === true) {
      return '3a0852'
    } else {
      return 'white'
    }
  })
}

const proceedSaving = () => {
  /* console.log('I am in proceedSaving')
  console.log(selectedPrefs.value) */
  prefectures.value.forEach((obj) => {
    if (
      obj.isChecked === true &&
      !selectedPrefs.value.some((item) => item.id === obj.id) &&
      !selectedPrefs.value.some((item) => item.name === obj.name)
    ) {
      selectedPrefs.value.push({ id: obj.id, name: obj.name, setAge: setAge })
      /* console.log(selectedPrefs.value) */
    } else if (!obj.isChecked) {
      selectedPrefs.value = selectedPrefs.value.filter((item) => item.id !== obj.id)
      /* console.log(selectedPrefs.value) */
    }
  })
  localStorage.setItem('selectedPrefs', JSON.stringify(selectedPrefs.value))
}

const masterSetter = async (year) => {
  console.log('I am in masterSetter, year is: ', year)
  console.log(prefectures.value)
  prefectures.value.forEach((item) => {
    console.log('I am in masterSetter, and the item is ', item)
    getPopulation(item.id).then((res) => {
      console.log('I am in masterSetter, and the res is ', res)
      const populationFound = res.find((pop) => pop.year == year)
      if (populationFound) {
        const nameExists = allPrefPop.value.some((obj) => obj.name === item.name) // use some to check if the name already exists in the array
        console.log('I am in masterSetter, and the nameExists is ', nameExists)
        if (!nameExists) {
          // if the name does not exist, push it
          allPrefPop.value.push({
            id: item.id,
            name: item.name,
            population: populationFound['value']
          })
          populationData.value = allPrefPop.value
          console.log('I am in masterSetter, and the allPrefPop is ', allPrefPop.value)
        } else {
          console.log('I am in masterSetter, and the name already exists')
        }
      } else {
        // do something else
      }
    })
  })
  console.log(
    'I am in masterSetter, and the Population Data is ',
    populationData.value,
    'for the year: ',
    year
  )
}

const loadSaving = async () => {
  console.log('I am in loadSaving')
  const savedPrefs = JSON.parse(localStorage.getItem('selectedPrefs'))
  console.log(savedPrefs)
  if (savedPrefs !== null) {
    console.log('SavedPrefs is not null')
    console.log('Im printing prefectures first', prefectures.value)
    prefectures.value.forEach((item) => {
      savedPrefs.forEach((obj) => {
        /* console.log('Inside the foreach loop: ', obj.name, item.name) */
        if (obj.name === item.name) {
          /* console.log('I am in loadSaving, and the name is ', item.name) */
          item.isChecked = true
          updatePopulation(item.id, item.name, setAge)
        }
      })
    })
    populationData.value = allPrefPop.value
  }
  console.log('I am in loadSaving, and the populationData is ', allPrefPop.value)
}

const getPopulation = async (id) => {
  const path = `population/composition/perYear?prefCode=${id}`
  /* console.log('Im currently in DrawChart, and the id is ' + setAge) */
  try {
    const response = await getPrefectures(path)
    // filter the data array by year
    const population = response.data.result.data[0].data.map((val) => {
      return {
        year: val['year'],
        value: val['value']
      }
    })
    /* mapPopulation.value = population
    console.log('I got mapPopulation here: ', mapPopulation.value) */
    return population
  } catch (error) {
    console.error(error.message)
  }
}

const setPrefectureToggle = async (id, name) => {
  /* console.log('I am in setPrefectureToggle') */
  console.log(id, name)
  prefectures.value.forEach((obj) => {
    /* console.log(obj.id, obj.name) */
    if (obj.id === id && obj.name === name) {
      obj.isChecked = true
    }
  })
  console.log(prefectures.value)
}

const clearSaved = () => {
  localStorage.removeItem('selectedPrefs')
  prefectures.value.forEach((obj) => {
    obj.isChecked = false
  })
}

const updatePopulation = async (id, name, setAge) => {
  /* console.log('I am in updatePopulation, and the Age is ' + setAge)
  console.log('I am in updatePopulation, and the id is ' + id) */
  const path = `population/composition/perYear?prefCode=${id}`
  try {
    const response = await getPrefectures(path)
    const population = response.data.result.data
      .find((item) => item.label === setAge)
      .data.map((val) => val['value'])
    prefectures.value[id - 1].isChecked = true
    console.log(prefectures.value[id - 1].isChecked)
    if (population !== undefined) {
      /* console.log('I am in updatePopulation, population is VALID!')
      console.log(setAge) */
      deleteChart(id)
      drawChartAge(id, name, setAge)
    }
  } catch (error) {
    console.error(error.message)
  }
}

defineExpose({
  prefectures,
  insertedGraphs,
  updatePopulation,
  setPrefectureToggle,
  proceedSaving,
  clearSaved,
  allPrefPop,
  masterSetter
})

onMounted(async () => {
  fetchPrefectures()
  loadSaving()
})

const fetchPrefectures = async () => {
  const path = 'prefectures'
  try {
    const response = await getPrefectures(path)
    console.log(response.data.result)
    prefectures.value = response.data.result.map((val) => {
      return {
        id: val['prefCode'],
        name: val['prefName'],
        isChecked: false
      }
    })
    loadSaving()
  } catch (error) {
    console.error(error.message)
  }
}

const drawChart = async (id, name) => {
  /* console.log('Im currently in DrawChart, and the id is ' + setAge) */
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

const drawChartAge = async (id, name, age) => {
  const path = `population/composition/perYear?prefCode=${id}`
  try {
    const response = await getPrefectures(path)
    const population = response.data.result.data
      .find((item) => item.label === age)
      .data.map((val) => val['value'])
    console.log('I am in drawChartAge, and the population is ', population)
    emit('addItems', id, name, population)
    prefectures.value[id - 1].isChecked = true
    console.log(prefectures.value[id - 1].isChecked)
  } catch (error) {
    console.error(error.message)
  }
}

const deleteChart = (id) => {
  emit('removeItems', id)
  insertedGraphs.value = insertedGraphs.value.filter((item) => item.id !== id)
  prefectures.value[id - 1].isChecked = false
  /* console.log(setAge) */
}

const switchChart = (id, name, isChecked, setAge) => {
  if (isChecked) {
    deleteChart(id)
    currId.value = ''
    currName.value = ''
    currisChecked.value = false
  } else {
    if (setAge === '合計' || setAge === '総人口') {
      console.log('If no place')
      currId.value = id
      currName.value = name
      currisChecked.value = true
      drawChart(id, name)
    } else {
      currId.value = id
      currName.value = name
      currisChecked.value = true
      /* console.log('Im currently in switchChart, and the age is ' + setAge) */
      drawChartAge(id, name, setAge)
    }
  }
}
</script>

<template>
  <div id="prefZone" class="PrefZone">
    <!-- <input v-model.trim="search" type="text" placeholder="県サーチ。。。" /> -->
    <div
      v-for="prefecture in prefectures"
      :key="prefecture.id"
      class="prefecture"
      :class="{ checked: prefecture.isChecked }"
    >
      <label :for="prefecture.id">
        <input
          type="checkbox"
          :id="prefecture.id"
          :checked="prefecture.isChecked"
          v-model="prefecture.isChecked"
          @click="
            console.log(setAge),
              switchChart(prefecture.id, prefecture.name, prefecture.isChecked, setAge),
              getSelColor()
          "
          :style="{ backgroundcolor: getSelColor() }"
        />
        {{ prefecture.name }}
      </label>
    </div>
  </div>
</template>

<style scoped>
div #prefZone .prefZone {
  width: 1600px;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 10px 10px;
  background-color: #cd2222;
  border-radius: 10px;
  border: #7b3a9b;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.prefecture {
  display: flex;
  max-width: 1600px;
  margin: 2px;
  padding: 10px;
  background-color: #ffffff;
  color: black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.checked {
  background-color: #3a0852;
  color: #ffffff;
}

.selection {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.prefecture:hover {
  background-color: #3a0852;
  color: #ffffff;
}

@media (max-width: 1200px) {
  .prefecture {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    min-width: 20px;
    padding: 4px;
    margin: 1px;
  }
}
</style>
