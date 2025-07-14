<script setup lang="ts">
import { NuxtLink } from "#components";
// import AuthButton from '../auth-button.vue';
</script>

<template>
    <div class="navbar bg-primary text-primary-content">
        <div class="navbar-start">
            <NuxtLink to="/" class="btn btn-ghost text-xl">
                Map Log
            </NuxtLink>
        </div>
        <div class="navbar-end">
            <AppThemeToggle />
            <AuthButton />
        </div>
    </div>
</template>
