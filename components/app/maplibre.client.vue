<script lang="ts" setup>
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";
import type { LngLat } from "maplibre-gl";

// import maplibregl from "maplibre-gl";
import {

    MglMap,
    MglNavigationControl,
} from "@indoorequal/vue-maplibre-gl";

import { CENTER_ATLANTICO } from "~/lib/constants";
import { useMapStore } from "~/stores/map";

const mapStore = useMapStore();
const center = CENTER_ATLANTICO;
const zoom = 9;

const colorMode = useColorMode();

const style = computed(() =>
    colorMode.value === "dark"
        ? "/styles/dark.json"
        : "https://tiles.openfreemap.org/styles/liberty");

function updateAddedPoint(location: LngLat) {
    if (mapStore.addedPoint) {
        mapStore.addedPoint.lat = location.lat;
        mapStore.addedPoint.lng = location.lng;
    }
}

function onDoubleClick(event: MglEvent<"dblclick">) {
    if (mapStore.addedPoint) {
        mapStore.addedPoint.lat = event.event.lngLat.lat;
        mapStore.addedPoint.lng = event.event.lngLat.lng;
    }
}

onMounted(() => {
    mapStore.init();
});
</script>

<template>
    <MglMap
        :map-style="style"
        :center="center"
        :zoom="zoom"
        @map:dblclick="onDoubleClick"
    >
        <MglNavigationControl />
        <MglMarker
            v-if="mapStore.addedPoint"
            :coordinates="[mapStore.addedPoint.lng, mapStore.addedPoint.lat]"
            draggable
            @update:coordinates="updateAddedPoint"
        >
            <template #marker>
                <div
                    class="tooltip tooltip-top tooltip-open hover:cursor-pointer"
                    data-tip="Drag to your desired location"
                    draggable
                >
                    <Icon
                        name="tabler:map-pin-filled"
                        size="35"
                        class="text-warning"
                    />CENTER_ATLANTICO
                </div>
            </template>
        </MglMarker>
        <MglMarker
            v-for="point in mapStore.mapPoints"
            :key="point.id"
            :coordinates="[point.lng, point.lat]"
        >
            <template #marker>
                <div
                    class="tooltip tooltip-top hover:cursor-pointer"
                    :data-tip="point.name"
                    :class="{
                        'tooltip-open': mapStore.selectedPoint === point,
                    }"
                >
                    <Icon
                        name="tabler:map-pin-filled"
                        size="24"
                        :class="mapStore.selectedPoint === point ? 'text-accent' : 'text-primary'"
                    />
                </div>
            </template>
            <MglPopup>
                <h3 class="text-2xl">
                    {{ point.name }}
                </h3>
                <p v-if="point.description">
                    {{ point.description }}
                </p>
            </MglPopup>
        </MglMarker>
    </MglMap>
</template>
CENTER_ATLANTICO
