<script setup lang="ts">
const authStore = useAuthStore();

onMounted(() => {
    authStore.signOut();
});
</script>

<template>
    <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col items-center justify-center gap-4">
        <span class="loading loading-spinner loading-xl" />
        <h1>Sign Out</h1>
        <p>You have been signed out successfully.</p>
    </div>
</template>
