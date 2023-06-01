<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<!-- eslint-disable vue/no-dupe-keys -->
<script setup>
import { ref, onMounted, defineEmits } from 'vue'
const ageGroups = ref(['総人口', '年少人口', '生産年齢人口', '老年人口'])

const emit = defineEmits(['ageSetter', 'currentGraphsUpdater'])

const selectedValue = ref('総人口')

const ageGroupSelect = () => {
  try {
    ageGroups.value = ageGroups.value.map((val) => {
      return {
        id: val,
        isChecked: false
      }
    })
  } catch (error) {
    console.error(error.message)
  }
}

onMounted(async () => {
  ageGroupSelect()
  ageGroups.value.find((item) => item.id === '総人口').isChecked = true
  console.log(ageGroups.value)
})
</script>

<template>
  <h3>年齢別人口</h3>
  <div class="selection">
    <div v-for="ageGroup in ageGroups" :key="ageGroup.age" class="prefecture">
      <label :for="id" id="ageGroup.age">
        <input
          type="radio"
          :value="ageGroup.id"
          v-model="selectedValue"
          :id="ageGroup.age"
          :checked="ageGroup.isChecked"
          @change="emit('ageSetter', selectedValue), emit('currentGraphsUpdater')"
          :style="{ backgroundColor: ageGroup.isChecked ? '#3a0852' : 'white' }"
        />
        {{ ageGroup.id }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.selection {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 3px solid #ffffff;
  border-radius: 10px;
  background-color: black;
  margin-bottom: 10px;
}

.prefecture {
  margin: 5px;
  padding: 5px;
  font-size: 11px;
  background-color: #ffffff;
  color: black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.prefecture:hover {
  background-color: #3a0852;
  color: #ffffff;
}

.checked {
  background-color: #3a0852;
  color: #ffffff;
}

@media (max-width: 600px) {
  .selection {
    flex-wrap: wrap;
    max-width: 153px;
    justify-content: center;
  }
}
</style>
