<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/no-dupe-keys -->
<script setup>
import { reactive, ref, defineProps, defineEmits } from 'vue'
import jpMap from '@highcharts/map-collection/countries/jp/jp-all.topo.json'

const emit = defineEmits(['updateData'])

const { populationData } = defineProps(['populationData'])

const Years = ref([
  '1960',
  '1965',
  '1970',
  '1975',
  '1980',
  '1985',
  '1990',
  '1995',
  '2000',
  '2005',
  '2010',
  '2015',
  '2020',
  '2025',
  '2030',
  '2035',
  '2040',
  '2045'
])

const selectedYr = ref('1960')

const onChange = (e) => {
  selectedYr.value = e.target.value
  console.log(selectedYr.value)
}

/* const mapData = ref([
  ['jp-hs', 10, 'Hiroshima'],
  ['jp-sm', 11, 'Shiga'],
  ['jp-yc', 12, 'Yamaguchi'],
  ['jp-km', 13, 'Kumamoto'],
  ['jp-eh', 14, 'Ehime'],
  ['jp-kg', 15, 'Kyoto'],
  ['jp-is', 16, 'Ishikawa'],
  ['jp-hk', 17, 'Hokkaido'],
  ['jp-tk', 18, 'Tokyo'],
  ['jp-3461', 19, 'Nagasaki'],
  ['jp-3457', 20, 'Kagoshima'],
  ['jp-ib', 21, 'Ibaraki'],
  ['jp-st', 22, 'Shizuoka'],
  ['jp-sg', 23, 'Saga'],
  ['jp-yn', 24, 'Yamanashi'],
  ['jp-kn', 25, 'Kanagawa'],
  ['jp-fo', 26, 'Fukui'],
  ['jp-fs', 27, 'Fukuoka'],
  ['jp-3480', 28, 'Gunma'],
  ['jp-ts', 29, 'Tottori'],
  ['jp-ky', 30, 'Kochi'],
  ['jp-me', 31, 'Mie'],
  ['jp-ai', 32, 'Aichi'],
  ['jp-nr', 33, 'Nara'],
  ['jp-os', 34, 'Osaka'],
  ['jp-wk', 35, 'Wakayama'],
  ['jp-ch', 36, 'Chiba'],
  ['jp-ak', 37, 'Akita'],
  ['jp-mg', 38, 'Miyagi'],
  ['jp-tt', 39, 'Tochigi'],
  ['jp-hg', 40, 'Hyogo'],
  ['jp-gf', 41, 'Gifu'],
  ['jp-nn', 42, 'Nagano'],
  ['jp-ty', 43, 'Toyama'],
  ['jp-ni', 44, 'Niigata'],
  ['jp-oy', 45, 'Okayama'],
  ['jp-ao', 46, 'Aomori'],
  ['jp-mz', 47, 'Miyazaki'],
  ['jp-iw', 48, 'Iwate'],
  ['jp-kc', 49, 'Kochi'],
  ['jp-ot', 50, 'Oita'],
  ['jp-sz', 51, 'Saitama'],
  ['jp-fi', 52, 'Fukushima'],
  ['jp-sh', 53, 'Shimane'],
  ['jp-tc', 54, 'Tokushima'],
  ['jp-yt', 55, 'Yamagata'],
  ['jp-3302', 56, 'Okinawa']
]) */

const mapOptions = reactive({
  chart: {
    map: jpMap,
    backgroundColor: '#FFFFFF',
    borderColor: '#19666b',
    borderWidth: 4,
    borderRadius: 10
  },
  title: {
    text: 'Highmaps 日本地図'
  },
  subtitle: {
    text: '日本人口地図'
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      alignTo: 'spacingBox'
    }
  },
  colorAxis: {
    min: 0
  },
  series: [
    {
      name: '人口データ',
      states: {
        hover: {
          color: '#19666b'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      allAreas: false,
      data: [
        ['jp-hs', 10, '広島県'],
        ['jp-sm', 11, '滋賀県'],
        ['jp-yc', 12, '山口県'],
        ['jp-km', 13, '熊本県'],
        ['jp-eh', 14, '愛媛県'],
        ['jp-kg', 15, '京都府'],
        ['jp-is', 16, '石川県'],
        ['jp-hk', 17, '北海道'],
        ['jp-tk', 18, '東京都'],
        ['jp-3461', 19, '長崎県'],
        ['jp-3457', 20, '鹿児島県'],
        ['jp-ib', 21, '茨城県'],
        ['jp-st', 22, '静岡県'],
        ['jp-sg', 23, '佐賀県'],
        ['jp-yn', 24, '山梨県'],
        ['jp-kn', 25, '神奈川県'],
        ['jp-fo', 26, '福井県'],
        ['jp-fs', 27, '福岡県'],
        ['jp-3480', 28, '群馬県'],
        ['jp-ts', 29, '鳥取県'],
        ['jp-ky', 30, '高知県'],
        ['jp-me', 31, '三重県'],
        ['jp-ai', 32, '愛知県'],
        ['jp-nr', 33, '奈良県'],
        ['jp-os', 34, '大阪府'],
        ['jp-wk', 35, '和歌山県'],
        ['jp-ch', 36, '千葉県'],
        ['jp-ak', 37, '秋田県'],
        ['jp-mg', 38, '宮城県'],
        ['jp-tt', 39, '栃木県'],
        ['jp-hg', 40, '兵庫県'],
        ['jp-gf', 41, '岐阜県'],
        ['jp-nn', 42, '長野県'],
        ['jp-ty', 43, '富山県'],
        ['jp-ni', 44, '新潟県'],
        ['jp-oy', 45, '岡山県'],
        ['jp-ao', 46, '青森県'],
        ['jp-mz', 47, '宮崎県'],
        ['jp-iw', 48, '岩手県'],
        ['jp-kc', 49, '高知県'],
        ['jp-ot', 50, '大分県'],
        ['jp-sz', 51, '埼玉県'],
        ['jp-fi', 52, '福島県'],
        ['jp-sh', 53, '島根県'],
        ['jp-tc', 54, '徳島県'],
        ['jp-yt', 55, '山形県'],
        ['jp-3302', 56, '沖縄県']
      ]
    }
  ]
})

const updateData = () => {
  console.log('Population Data is: ', populationData.value)
  mapOptions.series[0].data.forEach((obj) => {
    populationData.value.forEach((item) => {
      if (obj[2] === item.name) {
        console.log('Matched')
        obj[1] = item.population
      } else {
        // do something else
      }
    })
  })
}

const updateMapData = () => {
  emit('updateData', selectedYr.value)
}
</script>

<template>
  <highcharts constructor-type="mapChart" :options="mapOptions" class="map" />
  <button @click="updateMapData(), updateData()">Update Map Data</button>
  <select v-model="selectedYear" @change="onChange($event)">
    <option v-for="year in Years" :value="year" :key="year">
      {{ year }}
    </option>
  </select>
</template>
<style>
.map {
  min-height: 500px;
  min-width: 100%;
}
</style>
