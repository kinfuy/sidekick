<template>
  <div class="link-go">
    <div class="link-content">
      <div class="m-b-1 flex align-center justify-between">
        <span>有效规则集:</span>
        <ElSwitch
          active-text="启用"
          inactive-text="禁用"
          inline-prompt
          :model-value="isAppActive('LinkGo')"
          @change="(value) => updateNotEffect('LinkGo', !value as boolean)"
        />
      </div>
      <ElTag v-for="rule in rules" :key="rule.value" class="m-r-1" type="info"
        >{{ `${rule.value}` }}
      </ElTag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLinkGoStore } from '@applications/link-go/store';
import { useApp } from '@store/useApp';
import { ElSwitch, ElTag } from 'element-plus';
const { rules } = useLinkGoStore();

const { isAppActive, updateNotEffect } = useApp();
</script>

<style lang="less" scoped>
.link-go {
  padding: 10px;
}
</style>
