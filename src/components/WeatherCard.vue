<template>
  <div class="flex-row">
    <div>
      <h2>{{ selectedLocation }}</h2>
      <h5 v-if="latitude != null && longitude != null">
        ({{ latitude }}, {{ longitude }})
      </h5>

      <div v-if="geoLoading">
        <p>"Translating into coordinates..."</p>
      </div>
      <div v-else-if="geoError !== null">
        <p>Could not translate location. Try another city.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';

const store = useStore()
const { selectedLocation, latitude, longitude } = storeToRefs(store);

</script>
