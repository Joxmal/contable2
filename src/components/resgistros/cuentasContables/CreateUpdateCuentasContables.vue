<template>
  <v-form @submit.prevent="onSubmit">
    <v-row>
      <v-col sm="6" cols="12">
        <v-select :disabled="update" :items="storeCuentasContables.combinedList" :item-props="itemProps"
          variant="filled" density="compact" label="Cuenta padre" item-value="value" type="string"
          v-model="cuentaPadre.value.value" :error-messages="errors.cuentaPadre">
        </v-select>
      </v-col>
      <v-col sm="6" cols="12">
        <v-text-field label="Nuevo Código " type="number" v-model="cod.value.value" :error-messages="errors.cod">
          <template #prepend-inner>
            <div
              :style="{ width: cuentaPadre.value.value ? `${(String(cuentaPadre.value.value).length + 1) * 8}px` : `10px` }"
              class="  font-weight-bold text-body-2 text-secondary">
              {{ cuentaPadre.value.value }}
            </div>
          </template>
        </v-text-field>
      </v-col>
      <v-col sm="12" cols="12">
        <v-text-field label="Nombre del código" type="string" v-model="nombre.value.value"
          :error-messages="errors.nombre"></v-text-field>
      </v-col>
      <v-col sm="12" cols="12">
        <v-textarea rows="1" density="compact" label="Descripción" type="string" v-model="description.value.value"
          :error-messages="errors.description">
        </v-textarea>
      </v-col>

    </v-row>
    <v-btn block color="primary" type="submit">{{ tittleButton }}</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useCuentasContablesStore } from '@/stores/cuentasContables/CuentasContables';
import { ref } from 'vue';



interface Props {
  updateId?: number
  update?: boolean
}
const props = defineProps<Props>();

const emit = defineEmits<{
  // <eventName>: <expected arguments>
  post: [value: boolean] // named tuple syntax
}>()

const storeCuentasContables = useCuentasContablesStore()
const tittleButton = ref('')
if (props.update) {
  tittleButton.value = 'Editar'
} else {
  tittleButton.value = 'Crear'
}

export interface Form {
  cuentaPadre: number;
  cod: number;
  nombre: string;
  description?: string
}

const validationSchema = yup.object().shape({
  cuentaPadre: yup.number().required('Cuenta Padre Requerida'),
  cod: yup.number().min(0, 'Minimo es 0').required('Nuevo Código requerido').typeError('El campo debe ser un número'),
  nombre: yup.string().required('Nombre de la cuenta requerido'),
  description: yup.string().optional(),
})
const { handleSubmit, errors, values } = useForm<Form>({
  validationSchema: validationSchema
});

const cuentaPadre = useField<number>('cuentaPadre', validationSchema)
const cod = useField<number>('cod', validationSchema)
const nombre = useField<string>('nombre', validationSchema)
const description = useField<string>('description', validationSchema)

const onSubmit = handleSubmit(async () => {
  storeCuentasContables.asignarFormulario({
    cod: +`${values.cuentaPadre + values.cod}`,
    cuentaPadreCod: values.cuentaPadre,
    description: values.description ? values.description : '',
    name: values.nombre
  })
  //---
  if (props.update) {
    //---actualizar
    if (props.updateId) {
      storeCuentasContables.patchDataCuentas(props.updateId).then(() => emit('post', true))
    }
  } else {
    storeCuentasContables.PostDataCuentas().then(() => emit('post', true))
  }
  // Aquí puedes usar localValues para enviar tus datos
})


function itemProps(item: any) {
  return {
    title: item.value,
    subtitle: item.tipo,
  }
}


defineExpose({
  cuentaPadre,
  cod,
  nombre,
  description,
})

</script>
