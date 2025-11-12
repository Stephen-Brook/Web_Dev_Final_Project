<template>
    <div v-if="selectedForecastRow">
        <p>{{ selectedForecastRow }}</p>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';

const store = useStore();

const { selectedForecastRow } = storeToRefs(store);

</script>