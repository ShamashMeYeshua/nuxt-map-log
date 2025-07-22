import type { MapPoint } from "~/lib/types";
import type { SidebarItem } from "~/stores/sidebar";

import { useMapStore } from "~/stores/map";
import { useSidebarStore } from "~/stores/sidebar";

export const useLocationStore = defineStore("useLocationStore", () => {
    const { data, status, refresh } = useFetch("/api/locations", {
        lazy: true,
    });

    const sidebarStore = useSidebarStore();
    const mapStore = useMapStore();

    effect(() => {
        if (data.value) {
            const mapPoints: MapPoint[] = [];
            const sidebarItems: SidebarItem[] = [];

            data.value.forEach((location) => {
                const mapPoint = createMapPointFromLocation(location);
                sidebarItems.push({
                    id: `location-${location.id}`,
                    label: location.name,
                    icon: "tabler:map-pin-filled",
                    to: { name: "dashboard-location-slug", params: { slug: location.slug } },
                    mapPoint,
                });
                mapPoints.push(mapPoint);
            });

            sidebarStore.loading = false;
            sidebarStore.sidebarItems = sidebarItems;
            mapStore.mapPoints = mapPoints;
        }
        else {
            sidebarStore.loading = status.value === "pending";
        }
    });

    return {
        locations: data,
        status,
        refresh,
    };
});
