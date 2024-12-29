<template>
  <v-form @submit.prevent="onSubmit">
    <v-card class="my-4 py-4" flat>

      <v-row dense>
        <v-col cols="6">
          <v-text-field density="compact" label="Nombre de usuario" :error-messages="errors.nombre"
            v-model="nombre.value.value" />
        </v-col>

        <v-col cols="6">
          <v-textarea :rows="1" auto-grow density="compact" label="Descripsión" :error-messages="errors.description"
            v-model="description.value.value" />
        </v-col>

        <v-col cols="12" sm="6" md="4" v-for="( Permission, key ) in permissions" :key="key">
          <v-checkbox density="compact" hide-details v-model="permissions[key]" :label="key">
          </v-checkbox>
        </v-col>
      </v-row>
    </v-card>
    <v-btn block color="primary" type="submit">{{ tittleButton }}</v-btn>

  </v-form>

</template>

<script setup lang="ts">
import type { Permissions } from '@/interface/permissions';
import AxiosService from '@/services/userServices'
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

const permissions = ref<Permissions>({
  'libro_mayor': false,
  'libro_diario': false,
  'balance_comprobacion': false,
  'est_financieros': false,
  'export_data': false,
  'import_data': false,
});

const updateId = ref<number>(0)
interface Props {
  update?: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  // <eventName>: <expected arguments>
  created: [value: boolean] // named tuple syntax
}>()

const tittleButton = ref('')
if (props.update) {
  tittleButton.value = 'Editar'
} else {
  tittleButton.value = 'Crear'
}

interface Form {
  nombre: string;
  description: string;
}

const validationSchema = yup.object().shape({
  nombre: yup.string().required('nombre requerido'),
  description: yup.string().optional(),
})

const { handleSubmit, errors, values } = useForm<Form>({
  validationSchema: validationSchema,
});

const nombre = useField<string>('nombre', validationSchema)
const description = useField<string>('description', validationSchema)

const onSubmit = handleSubmit(async () => {

  const { description, nombre } = values
  if (props.update) {

    await AxiosService.patch(`/roles/${updateId.value}`, {
      name: nombre,
      description,
      permissions: { ...permissions.value }
    }).then(() => {
      toast.success('Rol editado con exito')
      emit('created', true)
    }).catch((error: any) => {
      toast.error(`${error?.response.data.message || 'Error interno'}`)
    })

  } else {
    await AxiosService.post(`/roles`, {
      name: nombre,
      description,
      permissions: { ...permissions.value }
    }).then(() => {
      toast.success('Rol creado con exito')
      emit('created', true)
    }).catch((error: any) => {
      console.error(error)
      toast.error(`${error?.response?.data?.message || 'Error interno'}`)
    })
  }
})

defineExpose({
  updateId,
  nombre,
  description,
  permissions
})

</script>
