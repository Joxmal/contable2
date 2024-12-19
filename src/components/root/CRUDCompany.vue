<template>
  <v-form @submit.prevent="onSubmit">
    <v-card class="my-4 py-4" flat>
      <v-row>
        <v-col cols="12">
          <v-text-field density="compact" label="Llave secreta de la compañia" append-inner-icon="mdi-auto-fix"
            :error-messages="errors.authKeyCompany" v-model="authKeyCompany.value.value"
            @click:append-inner="asignarUUID" />
        </v-col>

        <v-col md="12" cols="12">
          <v-text-field density="compact" label="Nombre de la Compañia" :error-messages="errors.nameCompany"
            v-model="nameCompany.value.value" />
        </v-col>

        <v-col md="12" cols="12">
          <v-textarea rows="1" density="compact" label="Descripsion" :error-messages="errors.description"
            v-model="description.value.value"></v-textarea>
        </v-col>
      </v-row>
    </v-card>

    <v-card elevation="10" class="py-4 px-2" title="Usuario Administrador de la compañia">
      <v-row>
        <v-col md="6" cols="12">
          <v-text-field density="compact" label="Nombre de usuario" :error-messages="errors.username"
            v-model="username.value.value" />
        </v-col>

        <v-col md="6" cols="12">
          <v-text-field density="compact" label="Contraseña" :error-messages="errors.password"
            v-model="password.value.value" />
        </v-col>
      </v-row>
    </v-card>


    <v-btn block color="primary" type="submit">{{ tittleButton }}</v-btn>

  </v-form>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { generateUUID } from '@/utils/generateUUID';
import { ref } from 'vue';
import AxiosService from '@/services/userServices'
import { toast } from 'vue3-toastify';
import { Role } from '@/interface/roles';


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
  authKeyCompany: string;
  nameCompany: string;
  description: string;
  username: string;
  password: string;
}


export interface GetCompany {
  id: number;
  authKeyCompany: string;
  createdAt: Date;
  updatedAt: Date;
  is_active: boolean;
}


const validationSchema = yup.object().shape({
  username: yup.string().required('Nombre de usuario requerido'),
  password: yup.string().required('Contraseña requerida'),
  authKeyCompany: yup.string().min(8, 'minimo de 8 letras').required('Se requiere una llave identificadora').matches(/^\S*$/, 'No se permiten espacios en blanco'),
  nameCompany: yup.string().required('Nombre de la compañia requerido').typeError('El campo debe ser un texto'),
  description: yup.string().optional(),
})

const { handleSubmit, errors, values } = useForm<Form>({
  validationSchema: validationSchema
});

const authKeyCompany = useField<string>('authKeyCompany', validationSchema)
const nameCompany = useField<string>('nameCompany', validationSchema)
const description = useField<string>('description', validationSchema)
const username = useField<string>('username', validationSchema)
const password = useField<string>('password', validationSchema)

const onSubmit = handleSubmit(async () => {



  try {
    const { data }: { data: GetCompany } = await AxiosService.post<GetCompany>('/company', {
      authKeyCompany: values.authKeyCompany,
      data_company: {
        nameCompany: values.nameCompany,
        description: values.description
      }
    })
    await AxiosService.post('/user', {
      companyId: data.id,
      userName: values.authKeyCompany,
      password: values.authKeyCompany,
      rolePrimary: Role.SUPERADMIN
    })

    console.log(data)
    toast.success('Compañia Creada')
  } catch (error: any) {
    toast.error(`Error: ${error.response.data.message}`)
    console.error(error)
    throw new Error()
  }


  emit('created', true)
})

function asignarUUID() {
  authKeyCompany.value.value = generateUUID()
}

defineExpose({
  authKeyCompany,
  nameCompany,
  description,
  username,
  password
})
</script>
