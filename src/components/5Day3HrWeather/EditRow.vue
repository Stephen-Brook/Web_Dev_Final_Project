<template>
    <div v-if="selectedForecastRow">
        <div class="flex-column p-4">
            <Button
                label="Reset Selected Row"
                rounded
                outlined
                @click="resetRow"
            />
            <FormKit
                type="form"
                v-model="formData"
                incomplete-message="Invalid Inputs"
                @submit="editRow"
            >
                <FormKitSchema :schema="editForecastRowSchema" />
            </FormKit>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import { editForecastRowSchema } from "@/Utility/formkitSchema";

const store = useStore();

const { selectedForecastRow } = storeToRefs(store);

function asDate(v: unknown) {
    if (v instanceof Date) return v;
    return v ? new Date(String(v)) : null;
}

const formData = ref<{ row: any }>({
    row: {
        ...selectedForecastRow.value,
        dateString: asDate(selectedForecastRow.value?.dateString),
    },
});

watch(selectedForecastRow, (row) => {
    if (row) {
        // repopulate form when selection changes
        formData.value = { row: { ...row, dateString: asDate(row.dateString) } };
    }
});

function editRow(payload: { row: Record<string, any> }) {
    const current = selectedForecastRow.value;
    if (!current) return;

    const ds = payload.row.dateString;
    const dateString =
        ds instanceof Date
        ? ds.toISOString().slice(0, 16) // or whatever format your store expects
        : ds;

    store.editForecastRow(
        current.id,
        current.dayKey,
        Number(payload.row.temp),
        Number(payload.row.feelsLike),
        payload.row.conditions,
        Number(payload.row.humidity),
        dateString
    );
}

function resetRow() {
    const current = selectedForecastRow.value;
    if (current) {
        formData.value = {
            row: { ...current, dateString: asDate(current.dateString) },
        };
    }
}
</script>