<script lang="ts" setup>
const style = "https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh";
const center = [-1.559482, 47.21322];
const zoom = 8;
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
