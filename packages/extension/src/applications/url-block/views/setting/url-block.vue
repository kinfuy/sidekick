<template>
  <div class="url-block">
    <div class="operate-list">
      <ElButton size="small" @click="() => handleEdit()">添加规则</ElButton>
    </div>
    <ElTable :data="blackList" style="width: 100%">
      <ElTableColumn prop="title" label="规则名称" :min-width="80" />
      <ElTableColumn prop="value" label="url" :min-width="160" />
      <ElTableColumn prop="enable" label="状态" :min-width="60">
        <template #default="{ row }">
          <ElSwitch
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
            :model-value="row.enable"
            size="small"
          ></ElSwitch>
        </template>
      </ElTableColumn>
      <ElTableColumn fixed="right" label="操作" :width="80">
        <template #default="{ row }">
          <ElButton
            link
            type="primary"
            size="small"
            @click="() => handleEdit(row)"
          >
            编辑
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <UrlSetting ref="editFormRef" @save="handleSave" />
  </div>
</template>

<script lang="ts" setup>
import type { BlockUrl } from '@applications/url-block/store';
import { useUrlBlockStore } from '@applications/url-block/store';
import { ElButton, ElSwitch, ElTable, ElTableColumn } from 'element-plus';
import { ref } from 'vue';
import { uuid } from '@utils';
import UrlSetting from './url-setting.vue';
const { blackList, update } = useUrlBlockStore();

const editFormRef = ref<InstanceType<typeof UrlSetting>>();
const handleEdit = (row?: BlockUrl) => {
  editFormRef.value?.show(row);
};

const handleSave = (block: BlockUrl) => {
  if (!block.id) {
    block.id = uuid();
  }
  update(block);
};
</script>

<style lang="less" scoped>
.operate-list {
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-end;

  .btn-text {
    margin-right: 10px;
  }
}
</style>
