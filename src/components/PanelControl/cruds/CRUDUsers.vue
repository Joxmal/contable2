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
          <v-autocomplete density="compact" :items="[1, 2, 3, 4]" :error-messages="errors.roleId"
            v-model="roleId.value.value" />
        </v-col>

        <v-col cols="6">
          <v-text-field density="compact" label="Primer Nombre" :error-messages="errors.firtsName"
            v-model="firtsName.value.value" />
        </v-col>

        <v-col cols="6">
          <v-text-field density="compact" label="Segundo Nombre" :error-messages="errors.lastName"
            v-model="lastName.value.value" />
        </v-col>/

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
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';


interface Props {
  updateId?: number
  update?: boolean
}

const props = defineProps<Props>();

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
}

const validationSchema = yup.object().shape({
  nameUser: yup.string().required('Nombre de usuario requerido'),
  passwordUser: yup.string().required('Contraseña requerida'),
  roleId: yup.number().required('Seleccione un rol de usuario').typeError('Seleccione un rol de usuario'),

  firtsName: yup.string().required('Contraseña requerida'),
  lastName: yup.string().optional(),
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
const description = useField<string>('description', validationSchema)


const emit = defineEmits<{
  // <eventName>: <expected arguments>
  created: [value: boolean] // named tuple syntax
}>()


const onSubmit = handleSubmit(async () => {

  if (props.update) {
    console.log(values)
    emit('created', true)
  } else {
    console.log(values)
    emit('created', true)
  }


})

defineExpose({
  nameUser,
  passwordUser,
  roleId,
  firtsName,
  lastName,
  description,
})
</script>
