<script lang="ts" setup>
const locationsStore = useLocationStore();
const { locations, locationStatus } = storeToRefs(locationsStore);
const mapStore = useMapStore();

onMounted(() => {
    locationsStore.refreshLocations();
});
</script>

<template>
    <div class="p-4 min-h-64">
        <h2 class="text-2x1">
            Locations
        </h2>
        <div v-if="locationStatus === 'pending'">
            <span class="loading loading-spinner loading-xl" />
        </div>
        <div v-else-if="locations && locations.length > 0" class="flex flex-nowrap mt-4 gap-2 overflow-auto">
            <NuxtLink
                v-for="location in locations"
                :key="location.id"
                class="card card-compact bg-base-300 border-2 h-40 w-72 mb-2 shrink-0 hover:cursor-pointer"
                :class="{
                    'border-accent': isPointSelected(location, mapStore.selectedPoint),
                    'border-transparent': !isPointSelected(location, mapStore.selectedPoint),
                }"
                :to="{ name: 'dashboard-location-slug', params: { slug: location.slug } }"
                @mouseenter="mapStore.selectedPoint = createMapPointFromLocation(location)"
                @mouseleave="mapStore.selectedPoint = null"
            >
                <div class="card-body">
                    <h3 class="text-xl">
                        {{ location.name }}
                    </h3>
                    <p>{{ location.description }}</p>
                </div>
            </NuxtLink>
        </div>
        <div v-else class="flex flex-col gap-2 mt-4">
            <NuxtLink
                to="/dashboard/add"
                class="btn btn-primary w-40"
            >
                Add location
                <Icon name="tabler:circle-plus-filled" size="24" />
            </NuxtLink>
        </div>
    </div>
</template>
