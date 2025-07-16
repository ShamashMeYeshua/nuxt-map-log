<script>
import maplibregl from "maplibre-gl";

export default {
    mounted() {
        // eslint-disable-next-line no-new
        new maplibregl.Map({
            container: "map",
            style: "https://demotiles.maplibre.org/style.json",
            center: [-74.5, 40],
            zoom: 9,
        });
    },
};
</script>

<template>
    <div id="map" style="width: 100%; height: 400px;" />
</template>
