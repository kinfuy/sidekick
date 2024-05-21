<template>
  <ElDrawer v-model="drawer" :title="title">
    <ElForm ref="editFormRef" label-width="auto" :model="editForm">
      <ElFormItem label="平台" required prop="name">
        <ElInput v-model="editForm.name" placeholder="请输入平台名称" />
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
import type { WebInfo } from '@applications/dev-account/store';
import { ElButton, ElDrawer, ElForm, ElFormItem, ElInput } from 'element-plus';
import { computed, ref } from 'vue';

const emit = defineEmits(['save']);

const viewType = ref('add');

const title = computed(() => {
  return viewType.value === 'add' ? '新增平台' : '编辑平台';
});
const drawer = ref(false);

const editForm = ref({
  id: '',
  name: '',
  code: '',
});

const show = (row: WebInfo) => {
  viewType.value = row ? 'edit' : 'add';
  drawer.value = true;
  editForm.value.id = row?.id || '';
  editForm.value.name = row?.name || '';
  editForm.value.code = row?.code || '';
};

const editFormRef = ref<InstanceType<typeof ElForm>>();
const handleSave = () => {
  editFormRef.value?.validate().then(() => {
    drawer.value = false;
    emit('save', editForm.value);
  });
};

defineExpose({ show });
</script>

<style lang="less" scoped></style>
