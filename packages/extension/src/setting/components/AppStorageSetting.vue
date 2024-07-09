<template>
  <div class="app-storage">
    <div class="app-storage-chart">
      <VChart class="chart" :option="option" autoresize />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useApp } from '@store/useApp';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { computed, onMounted, ref } from 'vue';
import { StorageKit } from '@core/store';
import { transformBytes } from '@utils/transform';

const { storeKeys } = useApp();

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const storeSize = ref<{ name: string; value: number }[]>([]);

const getStorageSize = () => {
  storeSize.value = [];
  storeKeys.value.forEach(async (item) => {
    if (Array.isArray(item.value)) {
      let count = 0;
      for (let i = 0; i < item.value.length; i++) {
        const res = await StorageKit.getStorageSize(item.value[i]);
        count += res;
      }
      storeSize.value.push({
        name: item.name,
        value: count,
      });
    } else {
      StorageKit.getStorageSize(item.value).then((res) => {
        storeSize.value.push({
          name: item.name,
          value: res,
        });
      });
    }
  });
};

const usedSize = computed(() => {
  let count = 0;
  storeSize.value.forEach((item) => {
    count += item.value;
  });
  return count;
});

const legends = computed(() => {
  return storeKeys.value.map((item) => {
    return item.name;
  });
});

onMounted(() => {
  getStorageSize();
});

const option = computed(() => {
  return {
    title: {
      text: `内存占用情况: ${transformBytes(usedSize.value)}`,
      left: 'right',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${params.name}: ${transformBytes(params.value)} (${
          params.percent
        }%)`;
      },
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      data: legends.value,
    },
    series: [
      {
        name: 'Storage',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: storeSize.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
});
</script>

<style lang="less" scoped>
.app-storage {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .app-storage-chart {
    width: 100%;
    height: 80%;
  }
}
</style>
