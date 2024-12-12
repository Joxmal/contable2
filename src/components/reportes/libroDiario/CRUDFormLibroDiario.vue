<template>
  <v-form @submit.prevent="onSubmit">
    <v-row no-gutters>
      <v-col sm="4" cols="12">
        <v-autocomplete item-value="value" item-title="tipo" item-subtitle="2" :error-messages="errors.cuentaId"
          :items="useCuentasContablesStore().combinedList" density="compact">

          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="item.raw.value" :title="item.raw.tipo"></v-list-item>
          </template>

        </v-autocomplete>
      </v-col>
      <v-col sm="4" cols="6">
        <v-text-field label="DEBE" density="compact" />
      </v-col>
      <v-col sm="4" cols="6">
        <v-text-field label="HABER" density="compact" />
      </v-col>
      <v-col sm="12" cols="12">
        <v-textarea rows="1" density="compact" label="Descripción" persistent-hint hint="opcional" type="string" />
      </v-col>
    </v-row>
    <v-btn block color="primary" type="submit">{{ tittleButton }}</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useLibroDiarioStore } from '@/stores/libroDiario/LibroDiario';
import { useCuentasContablesStore } from '@/stores/cuentasContables/CuentasContables';


const storeLibroDiario = useLibroDiarioStore()
const tittleButton = ref('')

interface Props {
  updateId?: number
  update?: boolean
}
const props = defineProps<Props>();

if (props.update) {
  tittleButton.value = 'Editar'
} else {
  tittleButton.value = 'Crear'
}

interface Form {
  fecha: string;
  cuentaId: number;
  description: string
  debe: number
  haber: number
}
const validationSchema = yup.object().shape({
  fecha: yup.string().required().typeError('Debe ser una Fecha'),
  cuentaId: yup.number().min(0, 'Minimo es 0').required('Nuevo Código requerido').typeError('El campo debe ser un número'),
  description: yup.string().optional(),
  debe: yup.number().min(0, 'Minimo es 0').optional().typeError('El campo debe ser un número'),
  haber: yup.number().min(0, 'Minimo es 0').optional().typeError('El campo debe ser un número'),
})
const { handleSubmit, errors, values } = useForm<Form>({
  validationSchema: validationSchema
});

const fecha = useField<string>('cuentaPadre', validationSchema)
const cuentaId = useField<number>('nombre', validationSchema)
const description = useField<string>('description', validationSchema)
const debe = useField<number>('description', validationSchema)
const haber = useField<number>('description', validationSchema)

const onSubmit = handleSubmit(async () => {
  if (values)
    storeLibroDiario.asignarFormulario({
      cuentaId: values.cuentaId,
      fecha: values.fecha,
      description: values.description ? values.description : '',
      debe: values.debe,
      haber: values.haber
    })

  if (props.update) {
    //---actualizar
    if (props.updateId) {
      // storeLibroDiario.patchDataCuentas(props.updateId)
    }
  } else {
    // storeLibroDiario.PostDataCuentas()
  }
})
defineExpose({
  fecha,
  cuentaId,
  description,
  debe,
  haber
})


</script>
