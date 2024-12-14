<template>
  <div class="">
    <v-btn block color="primary" v-if="props.props_openBtn ? true : false" @click="dialog = true">
      {{ props_openBtn }}
    </v-btn>

    <v-dialog :persistent="props.persistent" v-model="dialog" width="auto">
      <v-card :min-width="mobile ? '' : '900'" max-width="1500" :prepend-icon="props_prepend_icon"
        :title="props_titleDialog">

        <template #text>
          <slot name="contenido">

          </slot>
        </template>

        <v-btn @click.stop="dialog = !dialog" position="absolute" density="compact" class="text-error"
          location="top right" icon="mdi-close"></v-btn>

        <!-- <template v-slot:actions>
          <v-btn v-if="false" class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
        </template> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { useDisplay } from 'vuetify'
const { mobile, } = useDisplay()

// const { props_openBtn = 'Open', props_titleDialog = 'Titulo', props_prepend_icon = 'mdi-folder-plus-outline' } = defineProps<Props>()

const props = withDefaults(
  defineProps<{
    props_openBtn?: string
    props_titleDialog?: string,
    props_prepend_icon?: string
    closedNumberDialog?: number
    persistent?: boolean
  }>(),
  {
    props_titleDialog: 'Titulo',
    props_prepend_icon: 'mdi-folder-plus-outline',
    closedNumberDialog: 0,
    persistent: false
  }
);
const dialog: Ref<boolean> = ref(false)

const emit = defineEmits(['close'])
// function closeDialog(value: boolean) {

//   emit('close', dialog.value)
// }

watch(
  () => dialog.value,
  async () => {
    if (dialog.value === false) {
      emit('close', dialog.value)
    }

  },
  { deep: true }
);

watch(
  () => props.closedNumberDialog,
  async () => {
    if (props.closedNumberDialog > 0) {
      dialog.value = false
    }

  },
  { deep: true }
);

defineExpose({
  dialog
})
</script>
