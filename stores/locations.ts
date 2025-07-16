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
            sidebarStore.loading = false;
            sidebarStore.sidebarItems = data.value.map(location => ({
                id: `location-${location.id}`,
                label: location.name,
                icon: "tabler:map-pin-filled",
                to: "#",
            }));
            mapStore.mapPoints = data.value.map(location => ({
                id: location.id,
                label: location.name,
                lat: location.lat,
                lng: location.lng,
            }));
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
