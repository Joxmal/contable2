export const rules = {
  required: (value: any) => !!value || 'Requerido',
  min: (v: string | any[]) => v.length >= 8 || 'Min 8 characters',
  min0_required: (v: any) => (v >= 0 && v !== '') || 'Campo obligatorio',
  min1_required: (v: any) => (v > 0 && v !== '') || 'Campo obligatorio',
}
