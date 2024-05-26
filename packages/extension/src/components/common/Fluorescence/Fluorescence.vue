<template>
  <div class="dev-tester-fluorescence-container">
    <div
      class="dev-tester-fluorescence"
      :class="{ 'dev-tester-diffuse': isDiffuse }"
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
