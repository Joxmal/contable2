import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  number: yup.number().required('Campo requerido').typeError('El campo debe ser un número'), // Mensaje si no es un número

  numberMin0: yup
    .number()
    .min(0, 'Mínimo es 0')
    .required('Campo requerido')
    .typeError('El campo debe ser un número'), // Mensaje si no es un número

  string: yup
    .string()
    .required('Campo requerido')
    .min(1, 'El nombre debe tener al menos 1 caracteres') // Longitud mínima
    .max(50, 'El nombre no puede exceder los 50 caracteres'), // Longitud máxima

  description: yup
    .string()
    .optional()
    .max(200, 'La descripción no puede exceder los 200 caracteres'), // Longitud máxima

  email: yup
    .string()
    .email('Correo electrónico inválido') // Validación de formato de correo electrónico
    .required('Correo electrónico requerido'),

  fecha: yup.date().required('Fecha requerida').typeError('Formato de fecha inválido'), // Mensaje si no es una fecha válida

  activo: yup.boolean().required('Estado requerido'), // Campo booleano (true/false)
})
