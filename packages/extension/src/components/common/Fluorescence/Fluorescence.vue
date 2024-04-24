<template>
  <div class="sidekick-fluorescence-container">
    <div
      class="sidekick-fluorescence"
      :class="{ 'sidekick-diffuse': isDiffuse }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isDiffuse: {
    type: Boolean,
    default: false,
  },
});
</script>
