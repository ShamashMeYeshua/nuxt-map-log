import type { LngLatLike } from "maplibre-gl";

export const CENTER_ISRAEL = [31.77856, 35.22943] as LngLatLike;
export const CENTER_BRASIL = [-47.45765, -13.78262] as LngLatLike;
export const CENTER_ATLANTICO = [-41.587202, 24.068054] as LngLatLike;

export const LOCATION_PAGES = new Set(["dashboard", "dashboard-add"]);
export const CURRENT_LOCATION_LOG_PAGES = new Set([
    "dashboard-location-slug-id",
    "dashboard-location-slug-id-edit",
    "dashboard-location-slug-id-add",
    "dashboard-location-slug-id-images",
]);
export const CURRENT_LOCATION_PAGES = new Set([
    "dashboard-location-slug",
    "dashboard-location-slug-edit",
    "dashboard-location-slug-add",
]);
export const EDIT_PAGES = new Set([
    "dashboard-add",
    "dashboard-location-slug-edit",
    "dashboard-location-slug-add",
]);
