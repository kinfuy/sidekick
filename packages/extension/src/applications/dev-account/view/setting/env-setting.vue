<template>
  <ElDrawer v-model="drawer" title="环境管理">
    <div class="env-header">
      <span>环境库</span>
      <ElButton link type="primary" @click="addEnv">新增环境</ElButton>
    </div>
    <div class="env-list">
      <ElTag
        v-for="env in webEnvs"
        :key="env.name"
        type="info"
        closable
        @close="() => handleDelete(env)"
        @click="editEnv(env)"
        >{{ env.name }}</ElTag
      >
    </div>

    <div v-if="viewType" class="env-form">
      <ElDivider></ElDivider>
      <div class="env-title">{{ title }}</div>
      <ElForm label-width="auto" :model="editForm">
        <ElFormItem label="名称">
          <ElInput v-model="editForm.name" placeholder="请输入环境名称" />
        </ElFormItem>
        <ElFormItem label="URL">
          <ElInput v-model="editForm.url" placeholder="请输入url" />
        </ElFormItem>
        <ElFormItem>
          <div class="w-full flex justify-end align-center">
            <ElButton plain size="small" type="primary" @click="handleSave">
              保存
            </ElButton>
          </div>
        </ElFormItem>
      </ElForm>
    </div>
  </ElDrawer>
</template>

<script lang="ts" setup>
import type { WebEnv, WebInfo } from '@applications/dev-account/store';
import {
  ElButton,
  ElDivider,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInput,
  ElTag,
} from 'element-plus';
import { computed, ref, toRaw } from 'vue';

const emit = defineEmits(['save']);

const viewType = ref();

const title = computed(() => {
  return viewType.value === 'add' ? '新增环境' : '编辑环境';
});
const drawer = ref(false);

const editForm = ref({
  name: '',
  url: '',
});

const reset = () => {
  editForm.value.name = '';
  editForm.value.url = '';
};

const addEnv = () => {
  reset();
  viewType.value = 'add';
};

const editEnv = (env: WebEnv) => {
  reset();
  viewType.value = 'edit';
  editForm.value.name = env.name;
  editForm.value.url = env.url;
};

const webName = ref('');
const webEnvs = ref<WebEnv[]>([]);
const show = (row: WebInfo) => {
  drawer.value = true;
  webName.value = row?.name || '';
  webEnvs.value = row?.envs || [];
};

const handleSave = () => {
  webEnvs.value.push({
    ...editForm.value,
  });
  emit('save', webName.value, { envs: toRaw(webEnvs.value) });
};

const handleDelete = (env: WebEnv) => {
  webEnvs.value = webEnvs.value.filter((item) => item.name !== env.name);
  emit('save', webName.value, { envs: toRaw(webEnvs.value) });
};

defineExpose({ show });
</script>

<style lang="less" scoped>
.env-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;

  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}

.env-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.env-form {
  margin-top: 12px;

  .env-title {
    margin-bottom: 12px;
  }
}
</style>
