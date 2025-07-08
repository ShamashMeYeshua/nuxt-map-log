<script setup lang="ts">
import { NuxtLink } from '#components';

</script>

<template>
    <div class="navbar bg-primary text-primary-content">
        <div class="navbar-start">
            <NuxtLink to="/" class="btn btn-ghost text-xl">Map Log</NuxtLink>
        </div>
        <div class="navbar-end">
            <AppThemeToggle />
            <a class="btn btn-accent">Sign In with Github
                <Icon name="grommet-icons:github" size="24" /></a>
        </div>
    </div>
    
</template>