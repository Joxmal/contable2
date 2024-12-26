<template>
  <v-date-input clearable width="300" v-model="dateInput.raw" @update:model-value="asignarTimeStorage" density="compact"
    variant="solo" prepend-icon="" prepend-inner-icon="$calendar" :label="props.label" multiple="range" hide-details
    @click:clear="clearVDateInput">
  </v-date-input>
</template>

<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'

import { onMounted, ref } from 'vue';
import { FechatoISOString } from '@/utils/fechas/toISOString';

const props = withDefaults(
  defineProps<{
    prosDateInputRaw?: string[] | undefined
    label?: string
  }>(),
  {
    label: 'Seleccionar Rango de Fechas',
  }
);

onMounted(() => {
  dateInput.value.raw = props.prosDateInputRaw || undefined
})

const emit = defineEmits<{
  // <eventName>: <expected arguments>
  date: [value: DateInput] // named tuple syntax
}>()

export interface DateInput {
  raw: undefined | string[],
  desde: undefined | string,
  hasta: undefined | string
}

const dateInput = ref<DateInput>({
  raw: undefined,
  desde: undefined,
  hasta: undefined
})

function asignarTimeStorage() {
  const { value } = dateInput

  if (!value.raw) return


  value.desde = value.raw[0]

  if (value.raw.length === 1) {
    value.hasta = FechatoISOString({ fecha: value.raw[0], hora: '12am' })
  } else {
    value.hasta = value.raw[value.raw.length - 1]
  }
  emit('date', dateInput.value)
}


function clearVDateInput() {
  const { value } = dateInput

  value.raw = undefined
  value.desde = undefined
  value.hasta = undefined

  emit('date', dateInput.value)
}

</script>
