<script lang="ts" setup>

const route = useRoute();
const error = route.query.error || "An unexpected error occurred. Please try again later."; 

</script>
<template>
    <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col items-center justify-center gap-4">
        <div role="alert" class="alert alert-error min-w-1/2 text-center">
            <span>{{ error }}</span>
        </div>
        <NuxtLink to="/" class="btn btn-primary">Home
            <Icon name="tabler:arrow-left" size="32" />
        </NuxtLink>

    </div>

</template>