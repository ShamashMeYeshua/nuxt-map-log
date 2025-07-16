import type { LngLatBounds } from "maplibre-gl";

import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
    const mapPoints = ref<MapPoint[]>([]);
    const selectedPoint = ref<MapPoint | null>(null);
    const shouldFlyTo = ref(true);

    function selectPointWithoutFlyTo(point: MapPoint | null) {
        shouldFlyTo.value = false;
        selectedPoint.value = point;
    }

    async function init() {
        const { useMap } = await import("@indoorequal/vue-maplibre-gl");
        const { LngLatBounds } = await import("maplibre-gl");

        const map = useMap();

        let bounds: LngLatBounds | null = null;
        const padding = 70;

        effect(() => {
            const firstPoint = mapPoints.value[0];
            if (!firstPoint) {
                return;
            }

            bounds = mapPoints.value.reduce((bounds, point) => {
                return bounds.extend([point.lng, point.lat]);
            }, new LngLatBounds(
                [firstPoint.lng, firstPoint.lat],
                [firstPoint.lng, firstPoint.lat],
            ));
            map.map?.fitBounds(bounds, {
                padding,
            });
        });

        effect(() => {
            if (selectedPoint.value) {
                if (shouldFlyTo) {
                    map.map?.flyTo({
                        center: [selectedPoint.value.lng, selectedPoint.value.lat],
                        speed: 0.8,
                    });
                }
                shouldFlyTo.value = true;
            }
            else if (bounds) {
                map.map?.fitBounds(bounds, {
                    padding,
                });
            }
        });
    }

    return {
        init,
        mapPoints,
        selectedPoint,
        selectPointWithoutFlyTo,
    };
});
