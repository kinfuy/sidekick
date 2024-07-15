<template>
  <ElDrawer v-model="drawer" title="用户管理" @close="handleClose">
    <div class="user-header">
      <span>用户库</span>
      <ElButton link type="primary" @click="addUser">新增用户</ElButton>
    </div>
    <div class="user-list">
      <ElTag
        v-for="user in webUsers"
        :key="user.name"
        type="info"
        closable
        @close="() => handleDelete(user)"
        @click="editUser(user)"
        >{{ user.name }}</ElTag
      >
    </div>

    <div v-if="viewType" class="user-form">
      <ElDivider></ElDivider>
      <div class="user-title">{{ title }}</div>
      <ElForm ref="editFormRef" label-width="auto" :model="editForm">
        <ElFormItem label="账户" required prop="name">
          <ElInput v-model="editForm.name" placeholder="请输入登录账户" />
        </ElFormItem>
        <ElFormItem label="密码" required prop="password">
          <ElInput
            v-model="editForm.password"
            show-password
            type="password"
            placeholder="请输入登录密码"
          />
        </ElFormItem>
        <ElFormItem label="角色">
          <ElInput v-model="editForm.role" placeholder="请输入角色" />
        </ElFormItem>
        <ElFormItem label="默认用户">
          <ElSwitch v-model="editForm.isDefault" />
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
import type { WebInfo, WebUser } from '@applications/dev-account/store';
import { uuid } from '@utils';
import {
  ElButton,
  ElDivider,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElTag,
} from 'element-plus';
import { computed, ref } from 'vue';

const emit = defineEmits(['save']);

const viewType = ref();

const title = computed(() => {
  return viewType.value === 'add' ? '新增用户' : '编辑用户';
});
const drawer = ref(false);

const editForm = ref({
  id: '',
  name: '',
  role: '',
  isDefault: false,
  password: '',
});

const editFormRef = ref<InstanceType<typeof ElForm>>();

const reset = () => {
  editForm.value.id = '';
  editForm.value.name = '';
  editForm.value.role = '';
  editForm.value.isDefault = false;
  editForm.value.password = '';
  editFormRef.value?.resetFields();
};

const addUser = () => {
  reset();
  viewType.value = 'add';
};

const editUser = (user: WebUser) => {
  reset();
  viewType.value = 'edit';
  editForm.value.id = user.id;
  editForm.value.name = user.name;
  editForm.value.role = user.role || '';
  editForm.value.isDefault = user.isDefault || false;
  editForm.value.password = user.password;
};

const webId = ref('');
const webUsers = ref<WebUser[]>([]);
const show = (row: WebInfo) => {
  drawer.value = true;
  webUsers.value = row?.users || [];
  webId.value = row?.id || '';
};

const handleSave = () => {
  editFormRef.value?.validate().then(() => {
    if (editForm.value.id) {
      webUsers.value = webUsers.value.map((item) => {
        if (item.id === editForm.value.id) {
          return JSON.parse(JSON.stringify(editForm.value));
        }
        return item;
      });
    } else {
      webUsers.value.push({
        ...editForm.value,
        id: uuid(),
      });
    }
    emit('save', {
      id: webId.value,
      users: JSON.parse(JSON.stringify(webUsers.value)),
    });
    reset();
  });
};
const handleDelete = (env: WebUser) => {
  webUsers.value = webUsers.value.filter((item) => item.id !== env.id);
  emit('save', {
    id: webId.value,
    users: JSON.parse(JSON.stringify(webUsers.value)),
  });
};

const handleClose = () => {
  drawer.value = false;
  viewType.value = '';
};

defineExpose({ show });
</script>

<style lang="less" scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;

  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-form {
  margin-top: 12px;

  .user-title {
    margin-bottom: 12px;
  }
}
</style>
