<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
    to?: RouteLocationRaw;
    href?: string;
    label?: string;
    icon?: string;
    showLabel?: boolean;
    iconColor?: "text-accent" | "text-primary" | "text-secondary";
}>();

const route = useRoute();
</script>

<template>
    <div class="tooltip tooltip-right" :data-tip="showLabel ? undefined : props.label">
        <NuxtLink
            :class="{ 'bg-base-200': route.path === props.to, 'justify-center': !showLabel, 'justify-start': showLabel }"
            class="flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer"
            :to="props.to || props.href"
        >
            <Icon
                :name="props.icon ?? ''"
                size="24"
                :class="iconColor"
            />
            <Transition name="grow">
                <span v-if="props.showLabel">{{ props.label }}</span>
            </Transition>
        </NuxtLink>
    </div>
</template>

<style scoped>
/* we will explain what these classes do next! */
.grow-enter-active {
    animation: grow 0.2s ease;
}
.grow-leave-active {
    animation: grow 0.2s reverse;
}

@keyframes grow {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
</style>
