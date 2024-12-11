import type { VDataTable } from "vuetify/components";

export type ReadOnlySortItem = VDataTable["$props"]["groupBy"];

export type ReadonlyHeaders = VDataTable["$props"]["headers"];
export type ReadonlyItems = VDataTable["$props"]["items"];

export type ReadonlyRowProps = VDataTable["$props"]["rowProps"];
