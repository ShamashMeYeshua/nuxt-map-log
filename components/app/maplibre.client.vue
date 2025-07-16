<script lang="ts" setup>
// import maplibregl from "maplibre-gl";
import {
    MglMap,
    MglNavigationControl,
} from "@indoorequal/vue-maplibre-gl";

import { CENTER_BRASIL } from "~/lib/constants";

const center = CENTER_BRASIL;
const zoom = 9;

const colorMode = useColorMode();

const style = computed(() =>
    colorMode.value === "dark"
        ? "/styles/dark.json"
        : "https://tiles.openfreemap.org/styles/liberty");
</script>

<template>
    <MglMap
        :map-style="style"
        :center="center"
        :zoom="zoom"
    >
        <MglNavigationControl />
    </MglMap>
</template>
