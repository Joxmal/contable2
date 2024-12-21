<template>
  <v-form @submit.prevent="onSubmit">
    <v-card class="my-4 py-4" flat>
      <v-row>
        <v-col cols="12">
          <v-text-field density="compact" label="Nombre" :error-messages="errors.nombre" v-model="nombre.value.value" />
        </v-col>

        <v-col md="12" cols="12">
          <v-textarea rows="1" density="compact" label="Descripsion" :error-messages="errors.description"
            v-model="description.value.value"></v-textarea>
        </v-col>

        <v-divider></v-divider>
        <span class="mx-auto">Permisos</span>
        <v-divider></v-divider>

        <v-col sm="12" md="4" cols="6" v-for="( Permission, key ) in permissions" :key="key">
          <v-checkbox density="compact" hide-details v-model="permissions[key]" :label="key">
          </v-checkbox>
        </v-col>


      </v-row>

    </v-card>



    <v-btn block color="primary" type="submit">{{ tittleButton }}</v-btn>

  </v-form>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import type { Permissions } from '@/interface/permissions';
import { useRootPlanesStore } from '@/stores/root/rootPlanes';

const storePlanes = useRootPlanesStore()

interface Props {
  updateId?: number
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
  nombre: yup.string().required('Dato requerido'),
  description: yup.string().optional(),
})

const { handleSubmit, errors, values } = useForm<Form>({
  validationSchema: validationSchema,
  validateOnMount: true
});

const nombre = useField<string>('nombre', validationSchema)
const description = useField<string>('description', validationSchema)
const permissions = ref<Permissions>({
  'libro_mayor': false,
  'libro_diario': false,
  'balance_comprobacion': false,
  'est_financieros': false,
  'export_data': false,
  'import_data': false,
});


const onSubmit = handleSubmit(async () => {

  const { form } = storePlanes
  const { description, nombre } = values

  try {
    form.nombre = nombre
    form.description = description
    form.Permissions = { ...permissions.value }

    await storePlanes.postPlanes()

    toast.success('PLAN DE COMPAÑIA CREADO')
  } catch (error: any) {
    console.log(error)
    toast.error(error)
    throw new Error()
  }


  emit('created', true)
})


</script>
