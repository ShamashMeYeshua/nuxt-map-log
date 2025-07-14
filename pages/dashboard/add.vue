<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { InsertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();

const router = useRouter();
const loading = ref(false);
const submitted = ref(false);
const submitError = ref("");

const { handleSubmit, errors, meta, setErrors } = useForm({
    validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(async (values) => {
    try {
        submitError.value = "";
        loading.value = true;
        await $csrfFetch("/api/locations", {
            method: "POST",
            body: values,
        });
        submitted.value = true;
        navigateTo("/dashboard");
    }
    catch (err) {
        const error = err as FetchError;
        if (error.data?.data) {
            setErrors(error.data?.data);
        }
        submitError.value = error.statusMessage || "An error occurred while adding the location.";
    }
    // console.log('Form submitted:', submitError.value);
    loading.value = false;
});

onBeforeRouteLeave((to, from, next) => {
    if (!submitted.value && meta.value.dirty) {
        // eslint-disable-next-line no-alert
        const confirmLeave = confirm("You have unsaved changes. Are you sure you want to leave?");
        if (!confirmLeave) {
            return false;
        }
    }
    return next();
});
</script>

<template>
    <div class="container max-w-md mx-auto mt-4">
        <div class="my-4">
            <h1 class="text-lg">
                Add location
            </h1>
            <p class="text-sm text-gray-500">
                You can log every place that you have been, or desire to go, add photos and notes to remember (or plan) your experiences.
            </p>

            <div
                v-if="submitError"
                role="alert"
                class="alert alert-error"
            >
                <span>{{ submitError }}</span>
            </div>

            <form @submit.prevent="onSubmit">
                <AppFormField
                    name="name"
                    label="Name"
                    :error="errors.name"
                    :disabled="loading"
                />
                <AppFormField
                    name="description"
                    label="Description"
                    type="textarea"
                    :error="errors.description"
                    :disabled="loading"
                />
                <AppFormField
                    name="lat"
                    label="Latitude"
                    :error="errors.lat"
                    type="number"
                    :disabled="loading"
                />
                <AppFormField
                    name="lng"
                    label="Longitude"
                    :error="errors.lng"
                    type="number"
                    :disabled="loading"
                />
                <div class="flex justify-end gap-2">
                    <button
                        :disabled="loading"
                        type="button"
                        class="btn btn-outline"
                        @click="router.back()"
                    >
                        <Icon name="tabler:arrow-left" size="24" />Cancel
                    </button>
                    <button
                        :disabled="loading"
                        type="submit"
                        class="btn btn-primary"
                    >
                        Add
                        <span v-if="loading" class="loading loading-spinner loading-sm" />
                        <Icon
                            v-else
                            name="tabler:circle-plus-filled"
                            size="24 "
                        />
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
