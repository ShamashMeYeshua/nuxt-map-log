<script setup lang="ts">
const isSideBarOpen = ref(true);

onMounted(() => {
    isSideBarOpen.value = localStorage.getItem('isSidebarOpen') === "true";
});


function toggleSideBar() {
    isSideBarOpen.value = !isSideBarOpen.value;
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSideBarOpen.value));
}
</script>
<template>
    <div class="flex-1 flex">
        <div class="bg-base-100 transition-all duration-300" :class="{'w-64': isSideBarOpen, 'w-16': !isSideBarOpen}" transition-all>
            <div class="flex hover:cursor-pointer hover:bg-base-200 p-2" @click="toggleSideBar" :class="{'justify-center': !isSideBarOpen, 'justify-end': isSideBarOpen}">
                <Icon v-if="isSideBarOpen" name="tabler:chevron-left" size="32" />
                <Icon v-else name="tabler:chevron-right" size="32" />
            </div>
            <div class="flex flex-col">
                <SidebarButton :show-label="isSideBarOpen" to="/dashboard" label="Locations" icon="tabler:map" />
                <SidebarButton :show-label="isSideBarOpen" to="/dashboard/add" label="Add Location" icon="tabler:circle-plus-filled" />
                <div class="divider"></div>
                <SidebarButton :show-label="isSideBarOpen" to="/sign-out" label="Sign Out" icon="tabler:logout-2" />
            </div>
        </div>
        <div class="flex-1">
            <NuxtPage />
        </div>
    </div>
</template>