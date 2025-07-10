<script setup lang="ts">
import AuthButton from '~/components/auth-button.vue';

</script>

<template>
    <div class="hero bg-base-300 container mx-auto mt-4">
        <div class="hero-content text-center min-h-96">
            <div class="max-w-md">
            <h1 class="text-5xl font-bold">Map Log</h1>
            <p class="py-6">
                Keep track of your adventures with Map Log, the ultimate tool for logging your journeys and exploring new places. Whether you're hiking, biking, or just wandering, Map Log helps you remember every step of the way.
            </p>
            <AuthButton />
            </div>
        </div>
    </div>
</template>