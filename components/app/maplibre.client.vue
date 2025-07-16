<script lang="ts" setup>
// import maplibregl from "maplibre-gl";
import {
    MglMap,
    MglNavigationControl,
} from "@indoorequal/vue-maplibre-gl";

import { CENTER_BRASIL } from "~/lib/constants";
import { useMapStore } from "~/stores/map";

const mapStore = useMapStore();
const center = CENTER_BRASIL;
const zoom = 9;

const colorMode = useColorMode();

const style = computed(() =>
    colorMode.value === "dark"
        ? "/styles/dark.json"
        : "https://tiles.openfreemap.org/styles/liberty");
onMounted(() => {
    mapStore.init();
});
</script>

<template>
    <MglMap
        :map-style="style"
        :center="center"
        :zoom="zoom"
    >
        <MglNavigationControl />
        <MglMarker
            v-for="point in mapStore.mapPoints"
            :key="point.id"
            :coordinates="[point.lng, point.lat]"
        >
            <template #marker>
                <!-- <div :style="{ backgroundColor: 'red', width: '10px', height: '10px' }" /> -->
                <div class="tooltip tooltip-top" :data-tip="point.label">
                    <Icon
                        name="tabler:map-pin-filled"
                        size="24"
                        class="text-primary"
                    />
                </div>
            </template>
            <MglPopup>
                <h3 class="text-2xl">
                    {{ point.label }}
                </h3>
            </MglPopup>
        </MglMarker>
    </MglMap>
</template>
