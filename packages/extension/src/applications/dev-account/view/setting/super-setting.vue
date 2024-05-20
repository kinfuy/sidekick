<template>
  <ElDrawer v-model="drawer" title="高级配置" @close="handleClose">
    <ElForm label-width="auto" :model="editForm">
      <ElFormItem label="平台">
        <ElRadioGroup v-model="ruleType" size="small">
          <ElRadioButton label="账户" value="account" />
          <ElRadioButton label="密码" value="password" />
          <ElRadioButton label="登录按钮" value="loginBtn" />
          <ElRadioButton label="验证码" value="validate" />
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="css选择器">
        <ElInput
          v-model="editForm[ruleType].cssSeletor"
          placeholder="多个用英文逗号分隔"
        />
      </ElFormItem>
      <ElFormItem v-if="ruleType !== 'loginBtn'" label="占位符">
        <ElInput
          v-model="editForm[ruleType].placeholder"
          placeholder="多个用英文逗号分隔"
        />
      </ElFormItem>
      <ElFormItem label="xpath">
        <ElInput
          v-model="editForm[ruleType].xpath"
          placeholder="多个用英文逗号分隔"
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
import type { MatchRule, WebInfo } from '@applications/dev-account/store';
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

const emit = defineEmits(['save']);
const drawer = ref(false);
const ruleType = ref<'account' | 'password' | 'loginBtn' | 'validate'>(
  'account',
);

const editForm = ref({
  account: {
    placeholder: '',
    xpath: '',
    cssSeletor: '',
  },
  password: {
    placeholder: '',
    xpath: '',
    cssSeletor: '',
  },
  validate: {
    placeholder: '',
    xpath: '',
    cssSeletor: '',
  },
  loginBtn: {
    placeholder: '',
    xpath: '',
    cssSeletor: '',
  },
});
const superConfig = ref({
  id: '',
});

const transform = (rule: MatchRule) => {
  return {
    placeholder: rule.placeholder.join(','),
    xpath: rule.xpath.join(','),
    cssSeletor: rule.cssSeletor.join(','),
  };
};

const recover = (options: any): MatchRule => {
  return {
    placeholder: options.placeholder.split(','),
    xpath: options.xpath.split(','),
    cssSeletor: options.cssSeletor.split(','),
  };
};

const show = (row: WebInfo) => {
  drawer.value = true;
  superConfig.value.id = row?.id || '';
  editForm.value.account = transform(row.match.account || {});
  editForm.value.password = transform(row.match.password || {});
  editForm.value.validate = transform(row.match.validate || {});
  editForm.value.loginBtn = transform(row.match.loginBtn || {});
};

const handleSave = () => {
  emit('save', {
    id: superConfig.value.id,
    match: {
      account: recover(editForm.value.account),
      password: recover(editForm.value.password),
      validate: recover(editForm.value.validate),
      loginBtn: recover(editForm.value.loginBtn),
    },
  });
  drawer.value = false;
};

const handleClose = () => {
  drawer.value = false;
  superConfig.value.id = '';
  editForm.value = {
    account: {
      placeholder: '',
      xpath: '',
      cssSeletor: '',
    },
    password: {
      placeholder: '',
      xpath: '',
      cssSeletor: '',
    },
    validate: {
      placeholder: '',
      xpath: '',
      cssSeletor: '',
    },
    loginBtn: {
      placeholder: '',
      xpath: '',
      cssSeletor: '',
    },
  };
  ruleType.value = 'account';
};

defineExpose({ show });
</script>

<style lang="less" scoped></style>
