<template>
  <ElDrawer v-model="drawer" title="环境管理" @close="handleClose">
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
import { uuid } from '@utils';
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
  id: '',
  name: '',
  url: '',
});

const reset = () => {
  editForm.value.name = '';
  editForm.value.url = '';
  editForm.value.id = '';
};

const addEnv = () => {
  reset();
  viewType.value = 'add';
};

const editEnv = (env: WebEnv) => {
  reset();
  viewType.value = 'edit';
  editForm.value.id = env.id;
  editForm.value.name = env.name;
  editForm.value.url = env.url;
};

const webId = ref('');
const webEnvs = ref<WebEnv[]>([]);
const show = (row: WebInfo) => {
  drawer.value = true;
  webId.value = row?.id || '';
  webEnvs.value = row?.envs || [];
};

const handleSave = () => {
  if (editForm.value.id) {
    webEnvs.value = webEnvs.value.map((item) => {
      if (item.id === editForm.value.id) {
        return JSON.parse(JSON.stringify(editForm.value));
      }
      return item;
    });
  } else {
    webEnvs.value.push({
      ...editForm.value,
      id: uuid(),
    });
  }
  emit('save', {
    id: webId.value,
    envs: JSON.parse(JSON.stringify(webEnvs.value)),
  });
  reset();
};

const handleDelete = (env: WebEnv) => {
  webEnvs.value = webEnvs.value.filter((item) => item.id !== env.id);
  emit('save', {
    id: webId.value,
    envs: JSON.parse(JSON.stringify(webEnvs.value)),
  });
};

const handleClose = () => {
  drawer.value = false;
  viewType.value = '';
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
