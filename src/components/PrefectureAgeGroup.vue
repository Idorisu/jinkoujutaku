<script setup>
import { ref, defineEmits } from 'vue'
const ageGroups = ref(['総人口', '年少人口', '生産年齢人口', '老年人口'])

/* const emit = defineEmits(['isCheckedAge', 'AgeGrp']) */
</script>

<template>
  <h2>年齢別人口</h2>
  <div class="selection">
    <div v-for="ageGroup in ageGroups" :key="ageGroup.age" class="prefecture">
      <input type="checkbox" :id="ageGroup.age" :checked="isCheckedAge" />
      {{ ageGroup }}
    </div>
  </div>
</template>

<style scoped>
.selection {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 3px solid #ffffff;
  border-radius: 20px;
  background-color: black;
}

.prefecture {
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  color: black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
