<template>
  <VContainer fluid class="fill-height ma-md-0 pa-md-0">

    <VRow align="center" justify="center">


      <VSpacer />

      <VCol class="px-5 px-lg-0" cols="12" sm="6" lg="4" xl="3">

        <v-row align="center" justify="center">
          <v-btn-toggle group density="comfortable" rounded="10" v-model="roleInicio">
            <v-btn :value="'Admin'">
              <v-icon>mdi-shield-crown</v-icon>
              ADMIN
            </v-btn>
            <v-btn :value="'Caja'">
              <v-icon>mdi-desktop-classic</v-icon>
              CAJA
            </v-btn>
          </v-btn-toggle>
        </v-row>

        <div class="text-center">
          <h1 class="font-weight-bold">Sign In</h1>
          <p class="text-medium-emphasis mt-1 text-subtitle-1">
            Coloca tu Usuario y contraseña para iniciar Sesión
          </p>
        </div>

        <form @submit="submit" class="mt-10 px-lg-15">
          <FormInput v-model="dataUser.name" name="user" :label="labelsInicio.usuario" type="text"
            placeholder="usuario" />
          <FormInput v-model="dataUser.password" class="mt-3" name="password" :label="labelsInicio.contraseña"
            type="password" autocomplete="on" />

          <v-divider />

          <div v-if="roleInicio === 'Caja'">
            <p class="text-center text-medium-emphasis mt-1 text-subtitle-1">
              Usuario del Cajero
            </p>
            <FormInput v-model="dataUser.cajeroName" name="cajaUser" label="Tu usuario" type="text"
              placeholder="usuario" />
            <FormInput v-model="dataUser.cajeroPassword" name="cajaPassword" autocomplete="on" label="Tu contraseña"
              type="password" />
          </div>

          <div class="mt-5">
            <PrimaryBtn :loading="isSubmitting" type="submit" block>Iniciar Sesión</PrimaryBtn>
          </div>
        </form>
      </VCol>
      <VSpacer />
      <VCol sm="4" lg="8" xl="8" class="pa-5 h-screen" v-if="$vuetify.display.mdAndUp">
        <VImg cover src="/lottoPortada.webp" alt="Sign In" class="h-screen w-full rounded-lg" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { useAgenciaGestionStore } from "~/stores/gestion";
import { bancaGestionStore } from "~/stores/gestion/banca.gestion";
import { object, string } from "yup";


const storeSession = useSessionStore()

const dataUser = ref({
  name: '',
  password: '',
  cajeroName: "",
  cajeroPassword: ""
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    object({
      user: string().required("Usuario es requerido"),
      password: string().required("Usuario es requerido").min(8, "no menor a 8 caracteres"),
      cajaUser: string(),
      cajaPassword: string().min(8, "no menor a 8 caracteres"),
    })
  ),
});

const submit = handleSubmit(async (values) => {

  try {
    // Llamar a la función iniciarSesion y esperar su resultado
    const data = await storeSession.iniciarSesion({
      name: dataUser.value.name,
      password: dataUser.value.password,
      cajeroName: dataUser.value.cajeroName,
      cajeroPassword: dataUser.value.cajeroPassword,
    });

    //obtener todos los datos que tienen que persistir
    await useAgenciaGestionStore().obtenerAgencia()
    usePersistedStore().$state.agencias = useAgenciaGestionStore().$state.listAgencias
    usePersistedStore().$state.bancas = await bancaGestionStore().obtenerBanca()



    // Navegar a la página de dashboard después de iniciar sesión
    await navigateTo("/admin/dashboard");
  } catch (error) {
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
  usuario: 'Usuario',
  contraseña: 'Contraseña'
})
const roleInicio: Ref<'Caja' | 'Admin'> = ref('Admin')
watch(roleInicio, (newRole, oldRole) => {
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
})
</script>
