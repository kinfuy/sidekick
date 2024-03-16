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

<style lang="less" shadow>
.sidekick-fluorescence {
  position: fixed;
  position: fixed;
  border-radius: 50%;
  width: 128px;
  height: 128px;
  background-image: linear-gradient(-180deg, #e79e0d 50%, #299cdf 50%);
  filter: blur(72px);
}

.left-mode {
  .sidekick-fluorescence {
    top: 50%;
    left: 0;
    transform: translate(-20%, -50%);
  }
}

.right-mode {
  .sidekick-fluorescence {
    top: 50%;
    right: 0;
    transform: translate(20%, -50%);
  }
}

.top-mode {
  .sidekick-fluorescence {
    top: 0;
    left: 50%;
    transform: translate(-50%, -20%);
  }
}

.bottom-mode {
  .sidekick-fluorescence {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 20%);
  }
}
.sidekick-diffuse {
  width: 288px;
  height: 288px;
  filter: blur(80px);
  transition: all 2s;
}
</style>
