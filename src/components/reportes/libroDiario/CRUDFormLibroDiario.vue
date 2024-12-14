<template>
  <v-form v-model="isFormValid" @submit.prevent="onSubmit">
    <v-row align="center" justify="center">
      <v-col cols="6" md="2" class="text-body-2 font-weight-semibold text-center">
        <v-text-field :rules="[rules.min0_required]" label="ASIENTO N°" type="number" variant="plain" density="compact">
        </v-text-field>

      </v-col>
    </v-row>

    <!-- <v-row no-gutters>
      <v-col sm="4" cols="12">
        <v-autocomplete item-value="codigo" item-title="nombre" item-subtitle="2" :error-messages="errors.cuentaId"
          :items="useCuentasContablesStore().dataCuentasContables.cuentaContables" density="compact">

          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="item.raw.codigo" :title="item.raw.nombre"></v-list-item>
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
</v-row> -->


    <v-divider></v-divider>
    <v-card title="Tabla a insertar" class="mb-2">
      <v-table fixed-header style="max-height: 700px;" density="compact" class="border-thin position-relative">
        <v-btn style="z-index: 10;" @click="addRowBorrador" position="absolute" color="success" density="compact"
          location="top right" size="small" icon="mdi-plus" />

        <thead>
          <tr>
            <th v-for="item in headersBorrador" :key="item" class="text-left">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(item, index) in dataBorrador" :key="`${item}+ ${index}`">
            <td width="220" class="border-e-md pa-0">
              <v-autocomplete :rules="[rules.required]" v-model="item.cuentaID" style=" width: 100%; height: 100%;"
                hide-details variant="plain" item-value="codigo" item-title="nombre" item-subtitle="2"
                :items="useCuentasContablesStore().dataCuentasContables.cuentaContables" density="compact">

                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props" :subtitle="item.raw.codigo" :title="item.raw.nombre"></v-list-item>
                </template>

                <template v-slot:chip="{ props, item }">
                  <v-chip size="large" variant="text" v-bind="props" :text="`${item.title}(${item.value})`">
                  </v-chip>
                </template>

              </v-autocomplete>
            </td>
            <td width="150" class="border-e-md pa-0">
              <v-text-field hide-details :rules="[rules.min0_required]" min="0" type="number" v-model.number="item.debe"
                class="text-center w-100 h-100 pa-0" />
            </td>
            <td width="150" class="border-e-md pa-0">
              <v-text-field hide-details :rules="[rules.min0_required]" min="0" type="number"
                v-model.number="item.haber" class="text-center w-100 h-100 pa-0" />
            </td>
            <td width="150" class="border-e-md pa-0">
              <textarea rows="1" class="text-center w-100 h-100"></textarea>
            </td>
            <td width="30" class="position-relative">
              <v-btn @click="DeleteRowBorrador(index)" position="absolute" color="error" density="compact"
                location="center center" size="small" icon="mdi-close">
              </v-btn>
            </td>
          </tr>

          <tr class="text-left" :class="resultadosDebe.isFormValid ? 'bg-blue-grey-lighten-3' : 'bg-red-lighten-4'">
            <td class="border-e-md">TOTAL</td>
            <td class="border-e-md">{{ resultadosDebe.debe }}</td>
            <td class="border-e-md">{{ resultadosDebe.haber }}</td>
            <td></td>
            <td></td>
          </tr>

        </tbody>
      </v-table>
      <v-spacer class="mt-4" />
      <v-card-actions>
        <v-btn variant="elevated" block color="primary" type="submit">{{ tittleButton }}</v-btn>
      </v-card-actions>
    </v-card>

  </v-form>
  <!-- //tabla -->
  <pre>
  {{ dataBorrador }}
</pre>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCuentasContablesStore } from '@/stores/cuentasContables/CuentasContables';
import { toast } from 'vue3-toastify';

const rules = {
  required: (value: any) => !!value || 'Requerido',
  min: (v: string | any[]) => v.length >= 8 || 'Min 8 characters',
  min0_required: (v: any) => (v >= 0 && v !== "") || 'Campo obligatorio',
}
const headersBorrador = [
  'CuentaID',
  'Debe',
  'Haber',
  'Descripción',
  'Acciones'
]
const fechaMovimientoDesde = ref("2024-12-14T03:24:45.472Z")
const asiento = ref<number>(0)
const dataBorrador = ref([
  {
    cuentaID: null,
    debe: 0,
    haber: 0,
    description: '',

  },
])


function addRowBorrador() {
  dataBorrador.value.push({
    cuentaID: null,
    debe: 0,
    haber: 0,
    description: '',
  })
}



const resultadosDebe = computed(() => {
  const data = dataBorrador.value.reduce((acc, values) => {
    console.log(typeof values.debe)

    return {
      debe: acc.debe + values.debe,
      haber: acc.haber + values.haber,
    }
  }, { debe: 0, haber: 0 })

  const isFormValid = data.debe - data.haber === 0 ? true : false

  return {
    ...data,
    isFormValid
  }
})

function DeleteRowBorrador(index: number) {
  console.log(0)
  dataBorrador.value.splice(index, 1)
}


//------


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


interface CreatedRowLibroDiario {
  cuentaID: null;
  debe: number;
  haber: number;
  description: string;
}




const isFormValid = ref(false)
const onSubmit = async (event: any) => {

  const { valid, errors } = await event

  if (!resultadosDebe.value.isFormValid) {
    toast.error(' Total Incorrecto:Verifique el debe y el haber')
    return
  }

  if (valid) {
    try {
      if (props.update) {
        //---actualizar
        if (props.updateId) {
          // storeLibroDiario.patchDataCuentas(props.updateId)
        }
      } else {
        // storeLibroDiario.PostDataCuentas()
      }
      const dataEnviar = {
        asiento: asiento.value,
        fechaMovimientoDesde: "2024-12-14T03:24:45.472Z",
        createdRowLibroDiario: dataBorrador.value
      }


      toast.success('enviado')

    } catch (error) {
      alert(error)

    }
  } else if (!valid && errors) {
    toast.error("Por favor completa los campos obligatorios")
  }

}



</script>

<style>
/* Ocultar botones de incremento/decremento */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
  /* Cambia la apariencia a un campo de texto */
}
</style>
