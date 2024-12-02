import { type RouteRecordRaw } from 'vue-router'

interface RouteMeta {
  layout?: string
  // Otras propiedades que puedas tener
}

// Extiende RouteRecordRaw para incluir meta
interface ExtendedRouteRecord extends Omit<RouteRecordRaw, 'meta'> {
  meta?: RouteMeta
}

export async function loadLayoutMiddleware(route: ExtendedRouteRecord): Promise<void> {
  try {
    const layout: string = route.meta?.layout || 'DefaultLayout'
    const layoutComponent = await import(`@/layouts/${layout}.vue`)
    route.meta = route.meta || {}
    ;(route.meta as RouteMeta & { layoutComponent: any }).layoutComponent = layoutComponent.default
  } catch (e) {
    console.error('Error occurred in processing of layouts: ', e)
    console.log('Mounted DefaultLayout')
    const defaultLayout = 'DefaultLayout'
    const layoutComponent = await import(`@/layouts/${defaultLayout}.vue`)
    route.meta = route.meta || {}
    ;(route.meta as RouteMeta & { layoutComponent: any }).layoutComponent = layoutComponent.default
  }
}
