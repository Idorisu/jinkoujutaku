<!-- eslint-disable vue/no-dupe-keys -->
<script setup>
import FetchPrefecture from './FetchPrefecture.vue'
import PrefectureAgeGroup from './PrefectureAgeGroup.vue'
import MapChart from '@/components/MapChart.vue'
import { Chart } from 'highcharts-vue'
import { reactive, ref } from 'vue'

const Highcharts = Chart

let setAge = ref('総人口')
const populationData = ref([''])

const fetchPrefecture = ref(null)
const insertedGraphs = ref([])
const saveLast = ref('No')
const lastSaveChecked = ref(false)
const elSelectendo = ref(false)

const updateData = (year) => {
  console.log('I am in updateData')
  fetchPrefecture.value.masterSetter(year)
}

const saveLastStatus = () => {
  if (elSelectendo.value === true) {
    saveLast.value = 'Yes'
  } else {
    saveLast.value = 'No'
  }
  localStorage.setItem('saveLast', JSON.stringify(saveLast.value))
}

/* const checkLastStatus = () => {
  const lastSavSelStatus = JSON.parse(localStorage.getItem('saveLast'))
  if (lastSavSelStatus !== null) {
    saveLast.value = lastSavSelStatus
    if (saveLast.value === 'Yes') {
      elSelectendo.value = true
    } else {
      elSelectendo.value = false
    }
  }
} */

const ageSetter = (ageData) => {
  if (ageData !== setAge.value) {
    setAge.value = ageData
    console.log(setAge.value)
    currentGraphsUpdater()
    console.log(options.series.find((item) => item.id == 13))
  } else {
    console.log('Same age group')
  }
}

const currentGraphsUpdater = () => {
  /* console.log('logging the age from CurrentGraphsUpdater ' + setAge.value) */
  options.series.forEach((obj) => {
    console.log(obj.id, obj.population)
    fetchPrefecture.value.updatePopulation(obj.id, obj.name, setAge.value)
  })
}

const setToggle = () => {
  console.log('I am in setToggle')
  fetchPrefecture.value.proceedSaving()
  alert('Saved')
}

const clearGraph = () => {
  options.series = []
  fetchPrefecture.value.clearSaved()
}

// reactive state
const options = reactive({
  // Chart Properties
  chart: {
    style: {
      fontFamily: 'IMPACT'
    },
    type: 'spline',
    scrollablePlotArea: {
      minWidth: 300,
      scrollPositionX: 1,
      color: '#ffffff'
    },
    borderColor: '#19666b',
    borderWidth: 4,
    borderRadius: 10,
    zoomType: 'x',
    panning: true,
    panKey: 'shift',
    backgroundColor: '#FFFFFF'
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 1300,
          minWidth: 300
        }
      }
    ]
  },
  plotOptions: {
    spline: {
      lineWidth: 4,
      states: {
        hover: {
          lineWidth: 5
        }
      },
      marker: {
        enabled: false
      }
    }
  },
  series: [],
  navigation: {
    menuItemStyle: {
      fontSize: '10px'
    }
  },
  title: {
    style: {
      display: 'none',
      color: '#ffffff'
    }
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical'
  },
  xAxis: {
    title: {
      text: '年度',
      labels: {
        style: {
          color: '#ffffff'
        }
      }
    },
    categories: [
      1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030,
      2035, 2040, 2045
    ]
  },
  yAxis: {
    title: {
      text: '人口数',
      labels: {
        style: {
          color: '#ffffff'
        }
      }
    }
  }
})

const addItems = (id, name, population) => {
    options.series.push({
      id: id,
      name: name,
      data: population
    })
    insertedGraphs.value.push({
      id: id,
      name: name,
      data: population
    })
  },
  removeItems = (id) => {
    options.series = options.series.filter((item) => item.id !== id)
    insertedGraphs.value = insertedGraphs.value.filter((item) => item.id !== id)
  }
</script>

<template>
  <main>
    <div class="PrefSelect">
      <h2>Prefecture Selector / 都道府県選ぶ</h2>
      <FetchPrefecture
        @addItems="addItems"
        @removeItems="removeItems"
        :setAge="setAge"
        :populationData="populationData"
        ref="fetchPrefecture"
      />
      <div class="PrefList"></div>
      <PrefectureAgeGroup @ageSetter="ageSetter" />
      <div class="clearer">
        <button @click="clearGraph()">Clear</button>
        <button @click="setToggle()">Save</button>
      </div>
      <div class="clearSaver">
        <label :for="savedPreset"
          ><input
            type="checkbox"
            :id="savedPreset"
            :checked="lastSaveChecked"
            v-model="elSelectendo"
            class="Saver"
            @change="console.log(saveLast), saveLastStatus()"
          />
          Save Last Selected?</label
        >
      </div>
    </div>
    <div class="highchart">
      <Highcharts :options="options" class="highchartInner" />
    </div>
    <div class="highMap">
      <MapChart @updateData="updateData" :populationData="populationData" />
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #ffffff;
}

div .clearSaver {
  background-color: #322c35;
  border: 3px solid #ffffff;
  border-radius: 10px;
  max-width: 300px;
  min-width: 200px;
  margin-top: 5px;
  margin-bottom: 5px;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #322c35;
  padding: 10px;
  text-align: center;
  font-size: larger;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: aliceblue;
  border: 3px solid #ffffff;
  border-radius: 10px;
  max-width: 1600px;
  padding: 40px;
}

div {
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 30px;
}

.PrefSelect {
  min-width: 1200px;
  max-width: 100%;
  margin: 10px auto;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #ffffff;
  border-radius: 10px;
  background-color: #19666b;
}

.highchart {
  margin: 0px auto;
  padding: 0px;
  background-color: #322c35;
  border: 3px solid #ffffff;
  border-radius: 10px;
}
.highMap {
  margin: 0px auto;
  margin-top: 10px;
  padding: 0px;
  background-color: #322c35;
  border: 3px solid #ffffff;
  border-radius: 10px;
}

.highchartInner {
  width: 100%;
}

.highchart text {
  fill: #ffffff;
  color: #ffffff;
}

div#highcharts-9hof5bn-0.highcharts-container {
  width: auto !important;
}

button {
  margin: 0px 10px;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  background-color: #322c35;
  color: #ffffff;
  font-size: 15px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  border: 3px solid #ffffff;
}

button:hover {
  background-color: #ffffff;
  color: #322c35;
}

.highcharts-background {
  fill: #322c35;
  max-width: 1200px;
  min-width: 300px;
}

@media (max-width: 1200px) {
  h2 {
    font-size: 20px;
  }
  div {
    margin-top: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }
  .highchart {
    margin: 0px auto;
    padding: 5px;
    width: 100%;
  }
  .highchartInner {
    max-width: 1200px;
    min-width: 300px;
  }
  body {
    max-width: 1200px;
  }
  main {
    max-width: 1200px;
  }
  .PrefSelect {
    max-width: 1200px;
    min-width: 300px;
    flex-direction: none;
  }
}
</style>
