<script lang="ts" setup>
const authStore = useAuthStore();

</script>

<template>
    <div v-if="!authStore.loading && authStore.user" class="dropdown dropdown-end dropdown-hover">
        <div tabindex="0" role="button" class="btn m-1">
            <div v-if="authStore.user.image" class="avatar">
                <div class="w-8 rounded-xl">
                    <img :src="authStore.user.image" :alt="authStore.user.name || authStore.user.email"/>
                </div>
            </div>
            {{ authStore.user.name || authStore.user.email }}
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><NuxtLink to="/sign-out">
                <Icon name="tabler:logout-2" size="24" />
                Sign Out
                
            </NuxtLink></li>
        </ul>
    </div>
    <button v-else
        :disabled="authStore.loading" 
        @click="authStore.signIn" 
        class="btn btn-accent">Sign In with Github
        <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
        <Icon v-else name="grommet-icons:github" size="24" />
    </button>
</template> 