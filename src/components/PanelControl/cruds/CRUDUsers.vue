<template>
  <v-form @submit.prevent="onSubmit">
    <v-card class="my-4 py-4" flat>
      <v-row dense>
        <v-col cols="6">
          <v-text-field density="compact" label="Nombre de usuario" :error-messages="errors.nameUser"
            v-model="nameUser.value.value" />
        </v-col>
        <v-col cols="6">
          <v-text-field density="compact" label="Contraseña de usuario" :error-messages="errors.passwordUser"
            v-model="passwordUser.value.value" />
        </v-col>
        <v-col cols="12">
          <v-autocomplete density="compact" item-title="name" item-value="id" :items="storeRoles.findAllRoles"
            :error-messages="errors.roleId" v-model="roleId.value.value" />
        </v-col>

        <v-col cols="6">
          <v-text-field density="compact" label="Primer Nombre" :error-messages="errors.firtsName"
            v-model="firtsName.value.value" />
        </v-col>

        <v-col cols="6">
          <v-text-field density="compact" label="Segundo Nombre" :error-messages="errors.lastName"
            v-model="lastName.value.value" />
        </v-col>

        <v-col cols="12">
          <v-text-field density="compact" type="email" label="Correo" :error-messages="errors.email"
            v-model="email.value.value" />
        </v-col>

        <v-col cols="11" class="mx-auto">
          <v-textarea :rows="1" auto-grow density="compact" label="Descripsión" :error-messages="errors.description"
            v-model="description.value.value" />
        </v-col>
      </v-row>
    </v-card>
    <v-btn block color="primary" type="submit">{{ tittleButton }}</v-btn>

  </v-form>

</template>

<script setup lang="ts">
import AxiosService from '@/services/userServices'
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useRolesPanelControlStore } from '@/stores/panelControl/roles';
const storeRoles = useRolesPanelControlStore()


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
  nameUser: string;
  passwordUser: string;
  roleId: number;
  firtsName: string
  lastName: string
  description: string
  email: string
}

const validationSchema = yup.object().shape({
  nameUser: yup.string().required('Nombre de usuario requerido'),
  passwordUser: yup.string().required('Contraseña requerida'),
  roleId: yup.number().required('Seleccione un rol de usuario').typeError('Seleccione un rol de usuario'),

  firtsName: yup.string().required('Contraseña requerida'),
  lastName: yup.string().optional(),
  email: yup.string().email().optional(),
  description: yup.string().optional(),
})

const { handleSubmit, errors, values } = useForm<Form>({
  validationSchema: validationSchema,
});

const nameUser = useField<string>('nameUser', validationSchema)
const passwordUser = useField<string>('passwordUser', validationSchema)
const roleId = useField<number>('roleId', validationSchema)

const firtsName = useField<string>('firtsName', validationSchema)
const lastName = useField<string>('lastName', validationSchema)
const email = useField<string>('email', validationSchema)
const description = useField<string>('description', validationSchema)





const onSubmit = handleSubmit(async () => {

  const { description, firtsName, lastName, nameUser, passwordUser, roleId, email } = values

  if (props.update) {

    await AxiosService.patch(`/user/${updateId.value}`, {
      email: email || undefined,
      userName: nameUser,
      first_name: firtsName,
      second_name: lastName || undefined,
      password: passwordUser,
      roleCompanyId: roleId || undefined,
      description: description
    }).then(() => {
      toast.success('Usuario Editado Con exito')
      emit('created', true)
    }).catch((error: any) => {
      toast.error(`${error?.response.data.message || 'Error interno'}`)
    })

  } else {
    await AxiosService.post('/user', {
      email: email || undefined,
      userName: nameUser,
      first_name: firtsName,
      second_name: lastName || undefined,
      password: passwordUser,
      roleCompanyId: roleId || undefined,
      description: description
    }).then(() => {
      toast.success('Usuario Creado Con exito')
      emit('created', true)
    }).catch((error: any) => {
      toast.error(`${error?.response.data.message || 'Error interno'}`)
    })
  }


})

defineExpose({
  updateId,
  nameUser,
  passwordUser,
  roleId,
  firtsName,
  lastName,
  description,
})
</script>
