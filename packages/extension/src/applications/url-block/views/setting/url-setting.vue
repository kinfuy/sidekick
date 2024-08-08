<template>
  <ElDrawer v-model="drawer" :title="title">
    <ElForm ref="editFormRef" label-width="auto" :model="editForm">
      <ElFormItem label="规则名称" required prop="title">
        <ElInput v-model="editForm.title" placeholder="请输入规则名称" />
      </ElFormItem>
      <ElFormItem label="规则类型" prop="type" required>
        <ElRadioGroup v-model="editForm.type" size="small">
          <ElRadioButton label="字符匹配" value="string" />
          <ElRadioButton label="正则匹配" value="regex" />
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="规则集" prop="value">
        <ElInput
          v-model="editForm.value"
          type="textarea"
          placeholder="请输入规则集,多个用英文逗号隔开"
          @change="transform"
        />
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
import {
  ElButton,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioButton,
  ElRadioGroup,
} from 'element-plus';
import { computed, ref } from 'vue';
import type { BlockUrl } from '@applications/url-block/store';
import { transformUrl } from '@utils';

const emit = defineEmits(['save']);

const viewType = ref('add');

const title = computed(() => {
  return viewType.value === 'add' ? '新增网站' : '编辑网站';
});
const drawer = ref(false);

const initModel = () => {
  return {
    id: '',
    title: '',
    type: 'string',
    value: '',
    enable: true,
  };
};

const editForm = ref(initModel());

const show = (row?: BlockUrl) => {
  viewType.value = row ? 'edit' : 'add';
  editForm.value = initModel();
  drawer.value = true;
  if (row) {
    editForm.value.id = row.id;
    editForm.value.title = row.title;
    editForm.value.type = row.type;
    editForm.value.value = Array.isArray(row.value)
      ? row.value.join(',')
      : row.value;
    editForm.value.enable = row.enable;
  }
};

const editFormRef = ref<InstanceType<typeof ElForm>>();
const handleSave = () => {
  editFormRef.value?.validate().then(() => {
    drawer.value = false;
    emit('save', editForm.value);
  });
};

const transform = (value: string) => {
  if (editForm.value.type !== 'string') return;
  editForm.value.value = value
    .split(',')
    .map((item) => transformUrl(item))
    .filter((item) => !!item)
    .join(',');
};

defineExpose({ show });
</script>

<style lang="less" scoped></style>
