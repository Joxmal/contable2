<template>
  <v-row class="pb-2">
    <v-col>
      <DialogGeneral :closed-number-dialog="closedNumberDialog" @close="update = false" ref="dialog"
        :props_title-dialog="update ? 'Editar Cuenta' : 'Crear Cuenta'" props_open-btn="CREAR CUENTA">
        <template #contenido>
          <CreateUpdateCuentasContables @post="ocultar" :update="update" :updateId="updateId" ref="dialogContenido" />
        </template>
      </DialogGeneral>
    </v-col>
  </v-row>


  <DialogGeneral color-btn="success" @close="update = false"
    :props_title-dialog="update ? 'Editar Cuenta' : 'Crear Cuenta'" props_open-btn="CREAR USANDO EXCEL">
    <template #contenido>

      <v-row style="margin: 0 auto;" width="200">
        <DialogGeneral props_open-btn="EJEMPLO">
          <template #contenido>
            <VImg cover src="/images/examples/excelEjemploCuentasContables.webp" alt="Portada" class=" rounded-lg" />
          </template>
        </DialogGeneral>
      </v-row>

      <ImportFileExcel @items-raw="obtenerItemsExcel" />
      <TableDataGeneral :row-props="rowProws" table_title="Datos del excel" v-if="itemsExcel.length > 0"
        :table_items="itemsExcel" :table_headers="table_headers">
      </TableDataGeneral>

      <v-row>
        <VBtn color="success" style="margin: 0 auto;" width="200" @click="enviarDataExcel">ENVIAR </VBtn>
      </v-row>
    </template>
  </DialogGeneral>


  <!-- tabla de cuentas contables -->
  <TableDataCuentaContable :items="storeCuentasContables.dataCuentasContables.cuentaContables"
    @eliminar="storeCuentasContables.deleteDataCuentas($event as number)" @editar="updateForm" />
</template>
<script setup lang="ts">
import { useCuentasContablesStore } from '@/stores/cuentasContables/CuentasContables';
import TableDataCuentaContable from '@/components/TableData/TableDataCuentaContable.vue'
import { onMounted, ref, watch, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import CreateUpdateCuentasContables from '@/components/resgistros/cuentasContables/CreateUpdateCuentasContables.vue';
import DialogGeneral from '@/components/dialog/DialogGeneral.vue';
import useWaitForDialog from '@/composables/useWaitForDialog';
import ImportFileExcel from '@/composables/test/ImportFileExcel.vue';
import TableDataGeneral from '@/components/TableData/TableDataGeneral.vue';
import type { ReadonlyHeaders, ReadonlyRowProps } from '@/interface/vuetify/dataTable';
import { toast } from 'vue3-toastify';


//testing de los datos a pasar TODO: PASAR A OTRO COMPONENTE



// Definimos un tipo para un array de arrays
type ItemsExcelArray = (string | number | null | undefined)[][];

const itemsExcel = ref([]) as Ref<ItemsExcelArray>
const dataExcelEnviarBD = ref<any>([])
function obtenerItemsExcel(itemsExcelArray: ItemsExcelArray) {
  const tipoCuentas = useCuentasContablesStore().dataCuentasContables.cuentasTipo

  validateRows({ rows: itemsExcelArray })



  itemsExcelArray.forEach((item) => {


    if (typeof item[0] === 'number') {
      // Obtener el primer dígito del código
      const primerDigito = +String(item[0]).charAt(0);

      // Buscar el nombre correspondiente en tipoCuentas
      const tipoCuenta = tipoCuentas.find((tipoCuenta) => tipoCuenta.codigo === primerDigito);

      if (tipoCuenta) {
        dataExcelEnviarBD.value.push({
          cuentaPadreCod: primerDigito,
          cod: item[0],
          name: item[1],
          description: item[2],
        })
        // Agregar el nombre al final del subarray
        item.push(tipoCuenta.nombre);
      } else {
        toast.error(`No se encontró el tipo de cuenta para el código: ${item[0]}`, {
          autoClose: false
        })
        // Lanzar un error si no se encuentra el tipo de cuenta
        throw new Error(`No se encontró el tipo de cuenta para el código: ${item[0]}`);
      }

    }
  })
  //eliminar el primer que representa el encabezado
  itemsExcelArray.shift()

  itemsExcel.value = itemsExcelArray
}

const table_headers: ReadonlyHeaders = [
  {
    key: '3',
    title: 'TIPO'
  },
  {
    key: '0',
    title: 'código'
  },
  {
    key: '1',
    title: 'nombre'
  },
  {
    key: '2',
    title: 'descripción'
  }
]

function rowProws(item: any): ReadonlyRowProps {
  if (item.index % 2 === 0) {
    return { class: 'bg-blue-grey-lighten-5' }
  }

}

function validateRows({ rows }: { rows: any[] }) {

  const cuentaContables = useCuentasContablesStore().dataCuentasContables.cuentaContables


  const codigosRepetidos = []
  // Definir el formato esperado
  const expectedLength = 3; // Se espera que cada fila tenga 4 elementos

  for (let i = 1; i < rows.length; i++) { // Comenzar desde 1 para omitir encabezados
    const row = rows[i];


    const codigo = cuentaContables.find((cuentaExistente) => cuentaExistente.codigo === row[0])?.codigo

    if (codigo) {
      codigosRepetidos.push(codigo)
    }

    // Verificar la longitud de la fila
    if (row.length !== expectedLength) {
      toast.error(`Fila ${i + 1} no cumple con el formato esperado. Se esperaban ${expectedLength} columnas.`)
      throw new Error(`Fila ${i + 1} no cumple con el formato esperado. Se esperaban ${expectedLength} columnas.`);
    }

    // Verificar tipos de datos
    if (typeof row[0] !== 'number' || typeof row[1] !== 'string' || typeof row[2] !== 'string' && row[2] !== null) {
      toast.error(`Fila ${i + 1} contiene tipos de datos incorrectos.`)
      throw new Error(`Fila ${i + 1} contiene tipos de datos incorrectos.`);
    }


  }

  if (codigosRepetidos.length > 0) {
    toast.error(`los codigos [${codigosRepetidos}] ya existen en la base de datos actual`, {
      autoClose: false
    })
    throw new Error();
  }

}

async function enviarDataExcel() {

  // Usar map para crear un array de promesas
  const promises = dataExcelEnviarBD.value.map(async (element: any) => {
    return await useCuentasContablesStore().PostDataCuentas({ reloadData: false, bodyManual: element });
  });

  // Esperar a que todas las promesas se resuelvan
  await Promise.all(promises);

  // Incrementar el contador después de que todas las promesas se hayan completado
  useCuentasContablesStore().reload++;

}
//----------------------------------------------------------


//store
const storeCuentasContables = useCuentasContablesStore()
const { reload } = storeToRefs(storeCuentasContables)

///-----------------------
onMounted(() => {
  storeCuentasContables.fetchDataCuentas()
  storeCuentasContables.fetchDataCuentasTipo()
})



watch(reload, () => {
  storeCuentasContables.fetchDataCuentas()
  storeCuentasContables.fetchDataCuentasTipo()
})

//ocultar el dialogo al crear o editar
const closedNumberDialog = ref(0)
function ocultar(value: boolean) {
  if (value)
    closedNumberDialog.value++
}


//EDITAR
const dialog = ref<InstanceType<typeof DialogGeneral> | null>(null);
const dialogContenido = ref<InstanceType<typeof CreateUpdateCuentasContables> | null>(null);
const update = ref(false)
const updateId = ref(0)

export interface Data {
  id: number;
  codigo: number;
  nombre: string;
  description: string;
  Cuenta_contable_tipoId: number;
  companyId: number;
  createdAt: Date;
  updatedAt: Date;
}


async function updateForm(data: Data) {

  console.log(data)



  const { Cuenta_contable_tipoId, codigo, description, id, nombre } = data
  updateId.value = +id
  update.value = true
  if (dialog.value) {
    dialog.value.dialog = true;
  }

  await useWaitForDialog(dialog)

  if (dialogContenido.value) {
    dialogContenido.value.cuentaPadre.value.value = Cuenta_contable_tipoId;
    dialogContenido.value.cod.value.value = codigo;
    dialogContenido.value.nombre.value.value = nombre;
    dialogContenido.value.description.value.value = description;
  }
}

</script>
