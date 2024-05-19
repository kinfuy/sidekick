<template>
  <ElDrawer v-model="drawer" :title="title">
    <el-form label-width="auto" :model="editForm">
      <el-form-item label="平台">
        <el-input v-model="editForm.name" placeholder="请输入平台名称" />
      </el-form-item>
      <el-form-item label="环境">
        <el-input v-model="editForm.envs" />
      </el-form-item>
      <el-form-item label="用户">
        <el-input v-model="editForm.users" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="editForm.code" placeholder="请输入验证码" />
      </el-form-item>
    </el-form>
  </ElDrawer>
</template>

<script lang="ts" setup>
import type { WebInfo } from '@applications/dev-account/store';
import { ElDrawer } from 'element-plus';
import { computed, ref } from 'vue';

const viewType = ref('add');

const title = computed(() => {
  return viewType.value === 'add' ? '新增平台' : '编辑平台';
});
const drawer = ref(false);

const editForm = ref({
  name: '',
  envs: [],
  users: [],
  autoLogin: false,
  isActive: false,
  code: '',
});
const show = (row: WebInfo) => {
  viewType.value = row ? 'edit' : 'add';
  drawer.value = true;
};

defineExpose({ show });
</script>

<style lang="less" scoped></style>
