import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function updated(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updated)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', updated)
  })

  return { x, y }
}
