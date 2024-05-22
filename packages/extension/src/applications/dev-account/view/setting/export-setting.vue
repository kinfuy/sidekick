<template>
  <ElDrawer v-model="drawer" title="导出" @close="resetForm">
    <ElForm ref="editFormRef" size="small" :model="editForm" :rules="rules">
      <ElFormItem prop="fileName" label="文件名:" required>
        <ElInput v-model="editForm.fileName" placeholder="请输入文件名" />
      </ElFormItem>
      <ElFormItem prop="type" label="导出方式:" required>
        <ElRadioGroup v-model="editForm.type">
          <ElRadioButton value="whole">整体</ElRadioButton>
          <ElRadioButton value="part">部分</ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem
        v-if="editForm.type === 'part'"
        prop="webs"
        label="平台:"
        required
      >
        <ElSelect
          v-model="editForm.webs"
          multiple
          placeholder="请选择需要导出的项目"
        >
          <ElOption
            v-for="web in webs"
            :key="web.id"
            :label="web.name"
            :value="web.id"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem prop="version" label="版本号:" required>
        <ElInput
          v-model="editForm.version"
          placeholder="请输入版本号"
          @input="versionChange"
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
  type WebInfo,
  useDevAccountStore,
} from '@applications/dev-account/store';
import { loadFile } from '@utils';
import {
  ElButton,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadioButton,
  ElRadioGroup,
  ElSelect,
} from 'element-plus';
import { ref } from 'vue';

const emit = defineEmits(['save']);

const { webs, version } = useDevAccountStore();
const drawer = ref(false);

const editForm = ref({
  fileName: `DevAccount-V${version.value}`,
  version: '',
  webs: [] as string[],
  type: 'whole',
});

const show = (row: WebInfo) => {
  drawer.value = true;
  editForm.value.fileName = `DevAccount-V${version.value}`;
};

const rules = {
  version: [
    {
      validator: (rule: any, value: string, callback: (val?: any) => void) => {
        if (!value) {
          callback();
          return;
        }
        const reg = /^[0-9]\d?(\.(0|[1-9]\d?)){2}$/;
        if (!reg.test(value)) {
          callback(new Error('版本号仅支持xx.xx.xx格式'));
          return;
        }
        callback();
      },
    },
  ],
};

const editFormRef = ref<InstanceType<typeof ElForm>>();
const handleSave = () => {
  if (!editFormRef.value) return;
  editFormRef.value.validate().then(() => {
    let data: WebInfo[] = [];
    if (editForm.value.type === 'whole') {
      data = webs.value;
    } else {
      data = webs.value.filter((x) => {
        return editForm.value.webs?.includes(x.id);
      });
    }
    const json = {
      key: 'DevAccount',
      version: editForm.value.version,
      webs: data,
      type: editForm.value.type,
    };
    loadFile(`${editForm.value.fileName}.json`, JSON.stringify(json));
  });
};

const versionChange = (val: string) => {
  editForm.value.fileName = `DevAccount-V${val}`;
};

const resetForm = () => {
  drawer.value = false;
  editForm.value = {
    fileName: '',
    version: '',
    type: 'whole',
    webs: [],
  };
};

defineExpose({ show });
</script>

<style lang="less" scoped></style>
