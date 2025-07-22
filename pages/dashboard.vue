<script setup lang="ts">
import { CURRENT_LOCATION_PAGES, EDIT_PAGES, LOCATION_PAGES } from "~/lib/constants";
import { useSidebarStore } from "~/stores/sidebar";

const route = useRoute();
const isSideBarOpen = ref(true);
const sidebarStore = useSidebarStore();
const locationsStore = useLocationStore();
const mapStore = useMapStore();

const { currentLocation, currentLocationStatus } = storeToRefs(locationsStore);

if (LOCATION_PAGES.has(route.name?.toString() || "")) {
    await locationsStore.refreshLocations();
}

if (CURRENT_LOCATION_PAGES.has(route.name?.toString() || "")) {
    await locationsStore.refreshCurrentLocation();
}

onMounted(() => {
    isSideBarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

effect(() => {
    if (LOCATION_PAGES.has(route.name?.toString() || "")) {
        sidebarStore.sidebarTopItems = [{
            id: "link-dashboard",
            label: "Locations",
            href: "/dashboard",
            icon: "tabler:map",
        }, {
            id: "link-location-add",
            label: "Add Location",
            href: "/dashboard/add",
            icon: "tabler:circle-plus-filled",
        }];
    }
    else if (CURRENT_LOCATION_PAGES.has(route.name?.toString() || "")) {
        sidebarStore.sidebarTopItems = [{
            id: "link-dashboard",
            label: "Back to Locations",
            href: "/dashboard",
            icon: "tabler:arrow-left",
        }, {
            id: "link-dashboard",
            label: currentLocationStatus.value === "pending" || !currentLocation.value ? "Loading..." : currentLocation.value.name,
            to: {
                name: "dashboard-location-slug",
                params: {
                    slug: route.params.slug,
                },
            },
            icon: "tabler:map",
        }, {
            id: "link-location-edit",
            label: "Edit Location",
            to: {
                name: "dashboard-location-slug-edit",
                params: {
                    slug: route.params.slug,
                },
            },
            icon: "tabler:map-pin-cog",
        }, {
            id: "link-location-add",
            label: "Add Location Log",
            to: {
                name: "dashboard-location-slug-add",
                params: {
                    slug: route.params.slug,
                },
            },
            icon: "tabler:circle-plus-filled",
        }];
    }
});

function toggleSideBar() {
    isSideBarOpen.value = !isSideBarOpen.value;
    localStorage.setItem("isSidebarOpen", isSideBarOpen.value.toString());
}
</script>

<template>
    <div class="flex-1 flex">
        <div
            class="bg-base-100 transition-all duration-300 shrink-0"
            :class="{ 'w-64': isSideBarOpen, 'w-16': !isSideBarOpen }"
            transition-all
        >
            <div
                class="flex hover:cursor-pointer hover:bg-base-200 p-2"
                :class="{ 'justify-center': !isSideBarOpen, 'justify-end': isSideBarOpen }"
                @click="toggleSideBar"
            >
                <Icon
                    v-if="isSideBarOpen"
                    name="tabler:chevron-left"
                    size="32"
                />
                <Icon
                    v-else
                    name="tabler:chevron-right"
                    size="32"
                />
            </div>
            <div class="flex flex-col">
                <SidebarButton
                    v-for="item in sidebarStore.sidebarTopItems"
                    :key="item.id"
                    :show-label="isSideBarOpen"
                    :to="item.to"
                    :label="item.label"
                    :icon="item.icon"
                    :href="item.href"
                />
                <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />
                <div v-if="sidebarStore.loading" class="px-4">
                    <div class="skeleton h-4 w-full" />
                </div>
                <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length" class="flex flex-col">
                    <SidebarButton
                        v-for="item in sidebarStore.sidebarItems"
                        :key="item.id"
                        :show-label="isSideBarOpen"
                        :to="item.to"
                        :label="item.label"
                        :icon="item.icon"
                        :icon-color="isPointSelected(item.mapPoint, mapStore.selectedPoint) ? 'text-accent' : undefined"
                        @mouseenter="mapStore.selectedPoint = item.mapPoint ?? null"
                        @mouseleave="mapStore.selectedPoint = null"
                    />
                </div>
                <div class="divider" />
                <SidebarButton
                    :show-label="isSideBarOpen"
                    to="/sign-out"
                    label="Sign Out"
                    icon="tabler:logout-2"
                />
            </div>
        </div>
        <div class="flex-1 overflow-auto bg-base-200">
            <div class="flex size-full" :class="{ 'flex-col': !EDIT_PAGES.has(route.name?.toString() || '') }">
                <NuxtPage
                    :class="{
                        'shrink-0': EDIT_PAGES.has(route.name?.toString() || ''),
                        'w-96': EDIT_PAGES.has(route.name?.toString() || ''),
                    }"
                />
                <div class="flex-1">
                    <AppMap />
                </div>
            </div>
        </div>
    </div>
</template>
