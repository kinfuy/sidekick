<template>
  <div class="dev-account">
    <div class="operate-list">
      <ElButton size="small" @click="() => handleEdit()">添加平台</ElButton>
      <ElButton size="small">导入</ElButton>
      <ElButton size="small">导出</ElButton>
    </div>
    <ElTable :data="webs" style="width: 100%">
      <ElTableColumn prop="name" label="平台" :min-width="120" />
      <ElTableColumn prop="env" label="环境">
        <template #default="{ row }">
          <span>
            <ElLink
              v-for="env in row.envs"
              :key="env.name"
              type="primary"
              class="env-tag"
              @click="() => handleOpen(env)"
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
          <ElSwitch
            :model-value="row.autoLogin"
            size="small"
            @change="
              (val) => handleUpdate({ id: row.id, autoLogin: val as boolean })
            "
          ></ElSwitch>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="isActive" label="状态" width="80">
        <template #default="{ row }">
          <ElSwitch
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
            :model-value="row.isActive"
            size="small"
            @change="
              (val) => handleUpdate({ id: row.id, isActive: val as boolean })
            "
          ></ElSwitch>
        </template>
      </ElTableColumn>
      <ElTableColumn fixed="right" label="操作" width="280">
        <template #default="{ row }">
          <ElButton
            link
            type="primary"
            size="small"
            @click="() => handleUser(row)"
          >
            用户
          </ElButton>
          <ElButton
            link
            type="primary"
            size="small"
            @click="() => handleEnv(row)"
          >
            环境
          </ElButton>
          <ElButton
            link
            type="primary"
            size="small"
            @click="() => handleEdit(row)"
          >
            编辑
          </ElButton>
          <ElButton link type="danger" size="small" @click="handleDelete(row)"
            >删除</ElButton
          >
          <ElButton
            link
            type="info"
            size="small"
            @click="() => handleSupper(row)"
          >
            高级
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <EditWeb ref="editWebRef" @save="handleUpdate" />
    <UserSetting ref="userSettingRef" @save="handleUpdate" />
    <EnvSetting ref="envSettingRef" @save="handleUpdate" />
    <SurperSetting ref="surperSettingRef" @save="handleUpdate" />
  </div>
</template>

<script lang="ts" setup>
import type { WebEnv, WebInfo } from '@applications/dev-account/store';
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
import UserSetting from './user-setting.vue';
import EnvSetting from './env-setting.vue';
import SurperSetting from './super-setting.vue';

const editWebRef = ref();
const userSettingRef = ref();
const envSettingRef = ref();
const surperSettingRef = ref();
const { webs, addOrUpdateWeb, removeWeb } = useDevAccountStore();
const handleEdit = (row?: WebInfo) => {
  editWebRef.value.show(row);
};

const handleUser = (row: WebInfo) => {
  userSettingRef.value.show(row);
};

const handleEnv = (row: WebInfo) => {
  envSettingRef.value.show(row);
};

const handleOpen = (web: WebEnv) => {
  window.open(`http://${web.url}`, '_blank');
};

const handleSupper = (row?: WebInfo) => {
  surperSettingRef.value.show(row);
};
const handleUpdate = (update: Partial<WebInfo>) => {
  addOrUpdateWeb(update);
};

const handleDelete = (row: WebInfo) => {
  removeWeb(row.id);
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
