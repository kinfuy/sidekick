<template>
  <div class="dev-account">
    <div class="operate-list">
      <ElButton size="small" @click="() => handleEdit()">添加平台</ElButton>
      <ElButton size="small">导入</ElButton>
      <ElButton size="small">导出</ElButton>
    </div>
    <ElTable :data="webs" style="width: 100%">
      <ElTableColumn prop="name" label="平台" width="120" />
      <ElTableColumn prop="env" label="环境">
        <template #default="{ row }">
          <span>
            <ElLink
              v-for="env in row.envs"
              :key="env.name"
              type="primary"
              class="env-tag"
            >
              {{ env.name }}
            </ElLink>
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="user" label="用户">
        <template #default="{ row }">
          <span
            v-for="user in row.users"
            :key="user.name"
            class="user-tag"
            type="primary"
          >
            {{ user.name }}
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="autoLogin" label="自动登录" width="80">
        <template #default="{ row }">
          <ElSwitch :model-value="row.autoLogin" size="small"></ElSwitch>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="isActive" label="状态" width="80">
        <template #default="{ row }">
          <ElSwitch :model-value="row.isActive" size="small"></ElSwitch>
        </template>
      </ElTableColumn>
      <ElTableColumn fixed="right" label="操作" width="220">
        <template #default="{ row }">
          <ElButton
            link
            type="primary"
            size="small"
            @click="() => handleEdit(row)"
          >
            编辑
          </ElButton>
          <ElButton link type="danger" size="small">删除</ElButton>
          <ElButton
            link
            type="info"
            size="small"
            @click="() => handleSupper(row)"
          >
            高级配置
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <EditWeb ref="editWebRef" />
  </div>
</template>

<script lang="ts" setup>
import type { WebInfo } from '@applications/dev-account/store';
import { useDevAccountStore } from '@applications/dev-account/store';
import {
  ElButton,
  ElLink,
  ElSwitch,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import { ref } from 'vue';
import EditWeb from './edit-web.vue';

const editWebRef = ref();
const { webs } = useDevAccountStore();
const handleEdit = (row?: WebInfo) => {
  editWebRef.value.show(row);
};
const handleSupper = (row?: WebInfo) => {
  editWebRef.value.show(row);
};
</script>

<style lang="less" scoped>
.operate-list {
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-end;
  .btn-text {
    margin-right: 10px;
  }
}
.env-tag {
  margin-right: 10px;
}
.user-tag {
  margin-right: 10px;
}
</style>
