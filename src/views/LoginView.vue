<template>
  <VContainer fluid class="fill-height ma-md-0 pa-md-0">

    <VRow align="center" justify="center">

      <VCol sm="4" lg="8" xl="7" class="pa-5 h-screen" v-if="$vuetify.display.mdAndUp">
        <VImg cover src="/portada.webp" alt="Portada" class="h-screen w-full rounded-lg" />
      </VCol>
      <VSpacer />

      <VCol class="px-5 px-lg-0" cols="12" sm="6" lg="4" xl="3">
        <div class="text-center">
          <h1 class="font-weight-bold">Iniciar Sesión</h1>
          <p class="text-medium-emphasis mt-1 text-subtitle-1">
            Coloque la llave de la compañia, el usuario y la contraseña
          </p>
        </div>

        <form @submit="submit" class="mt-10 px-lg-15">
          <FormInput v-model="dataUser.authKeyCompany" name="authKeyCompany" :label="labelsInicio.authKeyCompany"
            type="text" placeholder="authKeyCompany" />
          <FormInput v-model="dataUser.username" name="username" :label="labelsInicio.usuario" type="text"
            placeholder="usuario" />
          <FormInput v-model="dataUser.Userpassword" class="mt-3" name="Userpassword" :label="labelsInicio.contraseña"
            type="password" autocomplete="Off" placeholder="Contraseña" />

          <v-divider />

          <div class="mt-5">
            <PrimaryBtn :loading="isSubmitting" type="submit" block>Iniciar Sesión</PrimaryBtn>
          </div>
        </form>
      </VCol>
      <VSpacer />

    </VRow>

  </VContainer>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';

import useAxios from '@/composables/useAxios';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { ref } from 'vue';
import FormInput from '@/components/form/FormInput.vue';
import { usePersistedStore } from '@/stores/persisted';


const persistedStore = usePersistedStore()
export interface ResponseAuth {
  token: string;
  user: User;
}

interface RoleCompany {
  name: string
  permissionsId: number
}
export interface User {
  firstName: string;
  lastName: string;
  rolePrimary: string;
  roleCompany: RoleCompany;
}

const { response, exec } = useAxios<ResponseAuth>(); // Cambia 'any' por el tipo de respuesta esperado

// Función para manejar el envío del formulario
const Login = async () => {
  const options = {
    method: 'POST',
    url: `${import.meta.env.VITE_API_URL}/auth`, // Cambia esto por tu URL de API
    data: dataUser.value, // El cuerpo de la solicitud es el objeto formData
  };

  await exec(options);
};

const dataUser = ref({
  authKeyCompany: '',
  username: '',
  Userpassword: '',
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    object({
      authKeyCompany: string().required('Llave es requerida'),
      username: string().required("Usuario es requeridoassdsds"),
      Userpassword: string().required("contraseña es requerido"),
    })
  ),
});
const router = useRouter()

//NOTIFICACION ERROR AL INICIAR SESION
const notify = () => {
  toast("ERROR AL INICIAR SESIÓN", {
    type: toast.TYPE.ERROR,
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT
  });
}

const submit = handleSubmit(async () => {


  try {
    await Login(); // Llama a la función Login aquí
    router.push('dashboard')

    // Llamar a la función iniciarSesion y esperar su resultado
    if (response.value)
      persistedStore.authSession = {
        token: response.value.token,
        user: {
          firstName: response.value.user.firstName,
          lastName: response.value.user.lastName,
          roleCompany: response.value.user.roleCompany,
          rolePrimary: response.value.user.rolePrimary,

        }
      }

    //obtener todos los datos que tienen que persistir
    // Navegar a la página de dashboard después de iniciar sesión
    // await navigateTo("/admin/dashboard");
  } catch (error) {
    notify()
    console.error('Error during login:', error);
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  }

  // await new Promise<void>((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 2000);
  // });
  // await navigateTo("/admin/dashboard");
});


const labelsInicio = ref({
  authKeyCompany: 'LLAVE COMPAÑIA',
  usuario: 'Usuario',
  contraseña: 'Contraseña'
})

/* watch(roleInicio, (newRole, oldRole) => {
  switch (roleInicio.value) {
    case "Caja":
      labelsInicio.value.usuario = 'Caja'
      labelsInicio.value.contraseña = 'Caja contraseña'
      break;
    case "Admin":
      labelsInicio.value.usuario = 'Usuario'
      labelsInicio.value.contraseña = 'Contraseña'

      break;
  }
}) */
</script>
