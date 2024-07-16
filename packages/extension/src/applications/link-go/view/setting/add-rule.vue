<template>
  <ElDrawer v-model="drawer" title="新增规则" @close="handleClose">
    <ElForm ref="editFormRef" label-width="auto" :model="editForm">
      <ElFormItem label="类型" required prop="type">
        <ElRadioGroup v-model="editForm.type">
          <ElRadioButton label="string">字符串</ElRadioButton>
          <ElRadioButton label="regex">正则表达式</ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="规则" prop="value" required>
        <ElInput v-model="editForm.value" placeholder="请输入规则">
          <template v-if="editForm.type === 'regex'" #append> / </template>
          <template v-if="editForm.type === 'regex'" #prepend> / </template>
        </ElInput>
        <div v-if="editForm.type === 'regex'" class="rule-tips">
          正则表达式需要在group中使用返回target:
          <span class="m-l-1"> {{ 'transfer?(?\<target\>.+)' }}</span>
        </div>
      </ElFormItem>
      <ElFormItem>
        <div class="w-full flex justify-end align-center">
          <ElButton plain size="small" type="primary" @click="handleSave">
            保存
          </ElButton>
        </div>
      </ElFormItem>
      <ElDivider />
      <ElFormItem label="测试地址" prop="testUrl">
        <ElInput v-model="testUrl" placeholder="请输入测试地址"></ElInput>
        <div class="test-content">
          <span class="test-label">转换结果: </span>
          <span :class="transFormResult ? 'test-success' : 'test-fail'">{{
            transFormResult || '--'
          }}</span>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script lang="ts" setup>
import { type LinkRule, useLinkGoStore } from '@applications/link-go/store';
import {
  ElButton,
  ElDivider,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElRadioButton,
  ElRadioGroup,
} from 'element-plus';
import { computed, ref, watchEffect } from 'vue';

const emit = defineEmits(['save']);

const { addRule, parseUrl } = useLinkGoStore();

const drawer = ref(false);

const testUrl = ref('www://www.xxx.cn?url=devtester.kinfuy.cn');

const editForm = ref<LinkRule>({
  type: 'string',
  value: '',
  description: '',
});

const show = () => {
  drawer.value = true;
};

const transFormResult = computed(() => {
  return parseUrl(testUrl.value, editForm.value);
});

watchEffect(() => {
  if (transFormResult.value) {
    editForm.value.description = `${testUrl.value} -> ${transFormResult.value}`;
  } else {
    editForm.value.description = '';
  }
});

const editFormRef = ref<InstanceType<typeof ElForm>>();
const handleSave = () => {
  editFormRef.value?.validate().then(() => {
    if (editForm.value.type === 'regex') {
      editForm.value.value = `/${editForm.value.value}/`;
    }
    const successFunc = () => {
      addRule(editForm.value).then((success) => {
        if (!success) {
          ElMessage.error('该规则已存在');
          return;
        }
        emit('save');
        drawer.value = false;
      });
    };

    if (!editForm.value.description) {
      ElMessageBox.confirm('该规则还没有测试通过是否保存', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        successFunc();
      });
    } else {
      successFunc();
    }
  });
};

const handleClose = () => {
  drawer.value = false;
  editFormRef.value?.resetFields();
};

defineExpose({ show });
</script>

<style lang="less" scoped>
.rule-tips {
  color: #999;
  margin-top: 4px;
  font-size: 12px;
}

.test-content {
  font-size: 12px;

  .test-label {
    color: #999;
  }

  .test-success {
    color: green;
  }

  .test-fail {
    color: red;
  }
}
</style>
