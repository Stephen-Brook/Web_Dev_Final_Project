<template>
    <p>{{ selectedLocation }}</p>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';

const store = useStore()

const { selectedLocation } = storeToRefs(store);
</script>