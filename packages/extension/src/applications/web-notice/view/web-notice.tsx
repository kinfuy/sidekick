import { defineComponent, ref, watch } from 'vue';
import { useWebNoticeStore } from '../store';
import { initNotice } from '../content';
import Sinput from '@/components/common/Input';
export default defineComponent({
  name: 'WebNotice',
  setup() {
    const { current, updateWeb } = useWebNoticeStore();

    const webNotice = ref({
      active: true,
      url: new URL(window.location.href).host,
      tips: '生产环境, 谨慎使用',
      style: {
        color: '#fa8919',
        fontSize: 48,
        animation: true,
        borderWidth: 4,
      },
    });

    watch(
      () => current.value,
      () => {
        webNotice.value.tips = current.value?.tips || '生产环境，谨慎操作';
        webNotice.value.url =
          current.value?.url || new URL(window.location.href).host;
        webNotice.value.active = current.value?.active || false;
        webNotice.value.style = {
          color: current.value?.style?.color || '#fa8919',
          animation: current.value?.style?.animation ?? true,
          fontSize: current.value?.style?.fontSize || 48,
          borderWidth: current.value?.style?.borderWidth || 4,
        };
      },
      {
        deep: true,
        immediate: true,
      },
    );

    const handleOpen = () => {
      webNotice.value.active = !webNotice.value.active;
      updateWeb(webNotice.value);
      setTimeout(() => {
        initNotice();
      }, 500);
    };

    const handleChange = () => {
      updateWeb(webNotice.value);
    };

    return {
      webNotice,
      handleOpen,
      handleChange,
    };
  },
  render() {
    const NoticeView = () => {
      return (
        <div class="app-notice">
          <div class="p-l-1 theme-text-desc f-16">设置</div>
          <div class="flex justify-between ui-card m-t-1">
            <span class="theme-text">状态</span>
            <span
              class="flex align-center cursor"
              onClick={() => this.handleOpen()}
            >
              <span
                class={`dot m-r-1 ${
                  this.webNotice.active ? 'dot-success' : ''
                }`}
              ></span>
              <span class="theme-text btn-text">
                {this.webNotice.active ? '开启' : '关闭'}
              </span>
            </span>
          </div>

          <div class="p-l-1 theme-text-desc f-16">基础</div>
          <div class="ui-card m-t-1">
            <div class="m-b-1">
              <Sinput
                onChange={this.handleChange}
                label="URL"
                v-model={this.webNotice.url}
              />
            </div>
            <div>
              <Sinput
                onChange={this.handleChange}
                label="提示词"
                v-model={this.webNotice.tips}
              />
            </div>
          </div>
          <div class="p-l-1 theme-text-desc f-16">主题</div>
          <div class="ui-card m-t-1">
            <div class="m-b-1">
              <Sinput
                label="字号"
                onChange={this.handleChange}
                type="number"
                style={{ width: '114px' }}
                v-model={this.webNotice.style.fontSize}
              />
            </div>
            <div class="m-b-1">
              <Sinput
                type="color"
                onChange={this.handleChange}
                label="颜色"
                style={{ width: '132px' }}
                v-model={this.webNotice.style.color}
              />
            </div>
            <div>
              <Sinput
                label="边框"
                onChange={this.handleChange}
                type="number"
                style={{ width: '114px' }}
                v-model={this.webNotice.style.borderWidth}
              />
            </div>
          </div>
        </div>
      );
    };

    return <NoticeView></NoticeView>;
  },
});
