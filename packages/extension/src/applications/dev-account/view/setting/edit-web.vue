<template>
  <ElDrawer v-model="drawer" :title="title">
    <ElForm ref="editFormRef" label-width="auto" :model="editForm">
      <ElFormItem label="平台" required prop="name">
        <ElInput v-model="editForm.name" placeholder="请输入平台名称" />
      </ElFormItem>
      <ElFormItem label="URL" prop="env.url" required>
        <ElInput v-model="editForm.env.url" placeholder="请输入url" />
      </ElFormItem>
      <ElFormItem label="验证码" prop="code">
        <ElInput v-model="editForm.code" placeholder="请输入验证码" />
      </ElFormItem>
      <ElFormItem>
        <div class="w-full flex justify-end align-center">
          <ElButton plain size="small" type="primary" @click="handleSave">
            保存
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script lang="ts" setup>
import type { WebEnv, WebInfo } from '@applications/dev-account/store';
import { uuid } from '@utils';
import { ElButton, ElDrawer, ElForm, ElFormItem, ElInput } from 'element-plus';
import { computed, ref } from 'vue';

const emit = defineEmits(['save']);

const viewType = ref('add');

const title = computed(() => {
  return viewType.value === 'add' ? '新增平台' : '编辑平台';
});
const drawer = ref(false);

const envs = ref<WebEnv[]>([]);
const editForm = ref({
  id: '',
  name: '',
  code: '',
  env: {
    id: '',
    name: '',
    alias: '',
    url: '',
  } as WebEnv,
});

const show = (row: WebInfo) => {
  envs.value = row?.envs || [];
  const env = row?.envs?.[0];
  viewType.value = row ? 'edit' : 'add';
  drawer.value = true;
  editForm.value.id = row?.id || '';
  editForm.value.name = row?.name || '';
  editForm.value.code = row?.code || '';
  editForm.value.env.id = env?.id || '';
  editForm.value.env.url = env?.url || '';
  editForm.value.env.name = env?.name || '';
};

const editFormRef = ref<InstanceType<typeof ElForm>>();
const handleSave = () => {
  editFormRef.value?.validate().then(() => {
    drawer.value = false;
    if (viewType.value === 'add') {
      editForm.value.env.id = uuid();
      editForm.value.env.name = editForm.value.name;
    }

    if (envs.value.some((item) => item.id === editForm.value.env.id)) {
      envs.value = envs.value.map((item) => {
        if (item.id === editForm.value.env.id) {
          return JSON.parse(JSON.stringify(editForm.value.env));
        }
        return item;
      });
    } else {
      envs.value.push(editForm.value.env);
    }
    emit('save', {
      id: editForm.value.id,
      name: editForm.value.name,
      code: editForm.value.code,
      envs: JSON.parse(JSON.stringify(envs.value)),
    });
  });
};

defineExpose({ show });
</script>

<style lang="less" scoped></style>
