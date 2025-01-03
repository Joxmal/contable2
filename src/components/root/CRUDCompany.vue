<template>
  <v-form @submit.prevent="onSubmit">
    <v-card class="my-4 py-4" flat>
      <v-row>
        <v-col cols="12">
          <v-text-field density="compact" label="Llave secreta de la compañia" append-inner-icon="mdi-auto-fix"
            :error-messages="errors.authKeyCompany" v-model="authKeyCompany.value.value"
            @click:append-inner="asignarUUID" />
        </v-col>

        <v-col cols="12">
          <v-text-field counter="10" type="number" density="compact" label="LLave perteneciente al sistema FoxPro"
            :error-messages="errors.authKeySystemFoxPro" v-model="authKeySystemFoxPro.value.value" />
        </v-col>

        <v-col md="12" cols="12">
          <v-text-field density="compact" label="Nombre de la Compañia" :error-messages="errors.nameCompany"
            v-model="nameCompany.value.value" />
        </v-col>

        <v-col>
          <v-select :disabled="update" :items="dataPlanesDB" variant="filled" density="compact" label="Plan de permisos"
            v-model="planCompanyId.value.value" item-title="nombre" item-value="id">
          </v-select>
        </v-col>

        <v-col md="12" cols="12">
          <v-textarea rows="1" density="compact" label="Descripsion" :error-messages="errors.description"
            v-model="description.value.value"></v-textarea>
        </v-col>
      </v-row>

    </v-card>

    <v-card elevation="10" class="py-4 px-2" title="Usuario Administrador de la compañia">
      <v-row>
        <!-- Nombre del usuario para acceder -->
        <v-col md="6" cols="12">
          <v-text-field density="compact" label="Nombre de usuario" :error-messages="errors.username"
            v-model="username.value.value" persistent-hint hint="Dato requerido para acceer" />
        </v-col>

        <!-- Contraseña del usuario para acceder -->
        <v-col md="6" cols="12">
          <v-text-field density="compact" label="Contraseña" :error-messages="errors.password"
            v-model="password.value.value" />
        </v-col>
      </v-row>

      <v-divider> </v-divider>
      <span class="pl-2">Datos del usuario </span>
      <v-row>
        <!-- primer nombre del usuario -->
        <v-col md="6" cols="12">
          <v-text-field density="compact" label="Primer nombre" :error-messages="errors.first_name"
            v-model="first_name.value.value" />
        </v-col>

        <!-- segundo nombre del usuario -->
        <v-col md="6" cols="12">
          <v-text-field density="compact" label="Segundo nombre" :error-messages="errors.second_name"
            v-model="second_name.value.value" />
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
import type { GetPlanes } from '@/stores/root/rootPlanes';


interface Props {
  updateId?: number
  update?: boolean
  dataPlanesDB: GetPlanes[] | undefined
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
  authKeySystemFoxPro: number,
  authKeyCompany: string;
  nameCompany: string;
  description: string;
  username: string;
  first_name: string;
  second_name: string;
  password: string;
  planCompanyId: number
}


export interface GetCompany {
  authKeySystemFoxPro: number | null,
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
  planCompanyId: yup.number().required('Plan de permisos requerido').typeError('Plan de permisos requerido'),
  authKeySystemFoxPro: yup.number().optional().typeError('Debe ser un numero').test(
    'len',
    'El número debe tener un máximo de 10 dígitos',
    val => val === undefined || (Number.isInteger(val) && val >= 0 && val <= 2147483647) // Comprobación para números enteros de hasta 10 dígitos
  ),
  first_name: yup.string().required('Dato requerido'),
  second_name: yup.string().required('Dato requerido'),
})

const { handleSubmit, errors, values } = useForm<Form>({
  validationSchema: validationSchema
});

const authKeyCompany = useField<string>('authKeyCompany', validationSchema)
const authKeySystemFoxPro = useField<number>('authKeySystemFoxPro', validationSchema)
const nameCompany = useField<string>('nameCompany', validationSchema)
const description = useField<string>('description', validationSchema)
const username = useField<string>('username', validationSchema)
const password = useField<string>('password', validationSchema)

const first_name = useField<string>('first_name', validationSchema)
const second_name = useField<string>('second_name', validationSchema)

const planCompanyId = useField<number>('planCompanyId', validationSchema)

const onSubmit = handleSubmit(async () => {

  try {
    const { data }: { data: GetCompany } = await AxiosService.post<GetCompany>('/company', {
      authKeySystemFoxPro: values.authKeySystemFoxPro || undefined,
      authKeyCompany: values.authKeyCompany,
      planCompanyId: values.planCompanyId,
      data_company: {
        nameCompany: values.nameCompany,
        description: values.description
      }
    })
    await AxiosService.post('/user', {
      first_name: values.first_name,
      second_name: values.second_name,
      companyId: data.id,
      userName: values.username,
      password: values.password,
      rolePrimary: Role.SUPERADMIN
    })

    console.log(data)
    toast.success('Compañia Creada')
    emit('created', true)
  } catch (error: any) {
    toast.error(`Error: ${error.response.data.message}`)
    console.error(error)
    throw new Error()
  }


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
