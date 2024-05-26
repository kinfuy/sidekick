<template>
  <div class="dev-tester-tool btn" :class="{ 'tool-active': active }">
    <img class="dev-tester-tool-logo" :src="logo" :title="title" />
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
