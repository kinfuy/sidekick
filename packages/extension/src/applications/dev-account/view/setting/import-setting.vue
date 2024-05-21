<template>
  <ElDrawer v-model="drawer" title="导入" @close="resetForm">
    <ElForm ref="editFormRef" label-width="auto" :model="editForm">
      <ElFormItem label="配置文件:" required :error="fileError">
        <label id="importFile" class="import-operate">
          <div class="import-input">
            <span v-if="editForm.fileName">{{ editForm.fileName }}</span>
            <span v-else class="import-placeholder">请选择配置文件</span>
          </div>
          <div class="import-operate-btn">选择</div>
          <input
            id="importFile"
            type="file"
            name="importFile"
            class="import-file"
            @change="importData($event)"
          />
        </label>
      </ElFormItem>
      <ElFormItem
        v-if="editForm.fileName && editForm.type"
        prop="type"
        label="导入模式:"
        required
      >
        <ElRadioGroup v-model="editForm.type">
          <ElRadioButton value="replace" size="small">覆盖</ElRadioButton>
          <ElRadioButton value="update" size="small">更新</ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem v-if="editForm.version" label="导入版本:">
        <div class="import-result">{{ editForm.version }}</div>
      </ElFormItem>
      <ElFormItem label="本地版本:">
        <div class="import-result">{{ version || '-' }}</div>
      </ElFormItem>
      <ElFormItem v-if="editForm.webs.length" label="导入项目:">
        <div class="tag-wraper">
          <ElTag
            v-for="web in editForm.webs"
            :key="web.id"
            class="el-tag"
            closable
            @close="handleDelete(web)"
            >{{ web.name }}</ElTag
          >
        </div>
      </ElFormItem>
      <ElFormItem>
        <div class="w-full flex justify-end align-center">
          <ElButton plain size="small" type="primary" @click="submitForm">
            保存
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script lang="ts" setup>
import {
  type WebInfo,
  useDevAccountStore,
} from '@applications/dev-account/store';
import {
  ElButton,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElMessage,
  ElRadioButton,
  ElRadioGroup,
  ElTag,
} from 'element-plus';
import { ref } from 'vue';

const { version, importConfig } = useDevAccountStore();

const drawer = ref(false);

const editForm = ref({
  fileName: '',
  version: '',
  type: 'update' as 'update' | 'replace',
  webs: [] as WebInfo[],
});

const fileError = ref('');

const show = (row: WebInfo) => {
  drawer.value = true;
};

const importData = async (e: any) => {
  editForm.value = { fileName: '', version: '', type: 'update', webs: [] };
  fileError.value = '';
  const file = e.target.files[0];
  editForm.value.fileName = file.name;
  e.target.value = '';
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = async function (data: ProgressEvent<FileReader>) {
    if (!data.target) return;
    let config;
    try {
      config = JSON.parse(data.target.result as string);
    } catch (error) {
      fileError.value = '请使用本插件导出文件!';
    }
    if (config.key !== 'EasySwitchPro' && config.key !== 'DevAccount') {
      fileError.value = '请使用本插件导出文件!';
    }
    if (config.key === 'DevAccount') {
      editForm.value.webs = config.webs;
      editForm.value.version = config.version;
    } else if (config.key === 'EasySwitchPro') {
      if (!Array.isArray(config.systemList))
        config.systemList = [config.systemList];
      editForm.value.webs = config;
    }
  };
};

const handleDelete = (web: WebInfo) => {
  editForm.value.webs = editForm.value.webs.filter(
    (item) => item.id !== web.id,
  );
};

const resetForm = () => {
  drawer.value = false;
  editForm.value = {
    fileName: '',
    version: '',
    type: 'update',
    webs: [],
  };
};

const submitForm = () => {
  if (!editForm.value.webs.length) fileError.value = '暂无可导入的项目';
  importConfig(
    {
      version: editForm.value.version,
      webs: editForm.value.webs,
    },
    editForm.value.type,
  );
  ElMessage.success('导入成功');
  resetForm();
};

defineExpose({ show });
</script>

<style lang="less" scoped>
.import-file {
  display: none;
  width: 0;
  height: 0;
  opacity: 0;
}

.import-operate {
  display: flex;
  cursor: pointer;
  border-radius: 4px;

  .import-input {
    width: calc(100% - 40px);
    height: 24px;
    border: 1px solid #eee;
    padding: 0 4px;
    line-height: 24px;

    .import-placeholder {
      color: #ccc;
    }
  }

  .import-operate-btn {
    height: 24px;
    width: 40px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    background-color: var(--primary-color);
    cursor: pointer;

    &:hover {
      background-color: var(--primary-color-tint-20);
      color: #fff;
    }
  }
}

.import-result {
  background-color: #f4f4f4;
  padding: 0 10px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.tag-wraper {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;

  .el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
