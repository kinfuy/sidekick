<template>
  <div class="sidekick-tool btn" :class="{ 'tool-active': active }">
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
  active: {
    type: Boolean,
  },
});
</script>
