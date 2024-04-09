<template>
  <div class="sidekick-tool btn">
    <img class="sidekick-tool-logo" :src="logo" :title="title" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  logo: {
    type: String,
  },
});
</script>
