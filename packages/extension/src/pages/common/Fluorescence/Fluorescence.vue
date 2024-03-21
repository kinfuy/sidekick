<template>
  <div
    class="sidekick-fluorescence"
    :class="{ 'sidekick-diffuse': isDiffuse }"
  ></div>
</template>

<script lang="ts" setup>
defineProps({
  isDiffuse: {
    type: Boolean,
    default: false,
  },
});
</script>
