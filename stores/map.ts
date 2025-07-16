import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
    const mapPoints = ref<MapPoint[]>([]);
    async function init() {
        const { useMap } = await import("@indoorequal/vue-maplibre-gl");
        const { LngLatBounds } = await import("maplibre-gl");

        const map = useMap();

        effect(() => {
            const firstPoint = mapPoints.value[0];
            if (!firstPoint) {
                return;
            }

            const bounds = mapPoints.value.reduce((bounds, point) => {
                return bounds.extend([point.lng, point.lat]);
            }, new LngLatBounds(
                [firstPoint.lng, firstPoint.lat],
                [firstPoint.lng, firstPoint.lat],
            ));
            map.map?.fitBounds(bounds, {
                padding: 70,
            });
        });
    }

    return {
        init,
        mapPoints,
    };
});
