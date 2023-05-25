<script setup>
import FetchPrefecture from './FetchPrefecture.vue'
import PrefectureAgeGroup from './PrefectureAgeGroup.vue'
import { Chart } from 'highcharts-vue'
import { reactive } from 'vue'

const Highcharts = Chart

// reactive state
const options = reactive({
  // same properties as before
  chart: {
    height: '400px',
    width: 1100,
    borderColor: '#7b3a9b',
    borderWidth: 4,
    backgroundColor: {
      linearGradient: [0, 0, 500, 500],
      stops: [
        [0, 'rgb(255, 255, 255)'],
        [1, 'rgb(200, 200, 255)']
      ]
    }
  },
  series: [],
  title: {
    style: {
      display: 'none'
    }
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical'
  },
  xAxis: {
    title: {
      text: '年度'
    },
    categories: [
      1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030,
      2035, 2040, 2045
    ]
  },
  yAxis: {
    title: {
      text: '人口数'
    }
  }
})

const addItems = (id, name, population) => {
    options.series.push({
      id: id,
      name: name,
      data: population
    })
  },
  removeItems = (id) => {
    options.series = options.series.filter((item) => item.id !== id)
  }

/* const isCheckedAge = (id, name, population) => {
  options.series = options.series.filter((item) => item.id !== id)
} */
</script>

<template>
  <main>
    <!--     <header>
      <h1>人口グラフ</h1>
    </header> -->
    <div class="PrefSelect">
      <h2>Prefecture Selector / 都道府県選ぶ</h2>
      <FetchPrefecture @addItems="addItems" @removeItems="removeItems" />
      <div class="PrefList"></div>
      <PrefectureAgeGroup />
      <div class="clearer">
        <button>Clear</button>
      </div>
      <div class="highchart">
        <Highcharts :options="options" />
      </div>
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
  border-radius: 20px;
  width: 1200px;
  padding: 40px;
}

div {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 30px;
}

.PrefSelect {
  width: 1200px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #ffffff;
  border-radius: 20px;
  background-color: #5f0a89;
}

.highchart {
  width: 1200px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
}

button {
  width: 100px;
  height: 40px;
  margin: 0px;
  border-radius: 20px;
  background-color: #322c35;
  color: #ffffff;
  font-size: 20px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  border: 3px solid #ffffff;
}
</style>
