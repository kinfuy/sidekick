import { defineComponent, ref } from 'vue';
import Sinput from '@pages/common/Input';
export default defineComponent({
  name: 'Notice',

  setup() {
    const webNotice = ref({
      url: new URL(window.location.href).host,
      tips: '生产环境, 谨慎使用',
      style: {
        color: '#fa8919',
        fontSize: 48,
        animation: true,
      },
    });
    return {
      webNotice,
    };
  },
  render() {
    const NoticeView = () => {
      return (
        <div class="app-notice">
          <div class="p-l-1 thene-text-desc f-16">基础</div>
          <div class="ui-card m-t-1">
            <div class="m-b-1">
              <Sinput label="URL" v-model={this.webNotice.url} />
            </div>
            <div>
              <Sinput label="提示词" v-model={this.webNotice.tips} />
            </div>
          </div>
          <div class="p-l-1 thene-text-desc f-16">主题</div>
          <div class="ui-card m-t-1">
            <div class="m-b-1">
              <Sinput
                label="字号"
                type="number"
                style={{ width: '114px' }}
                v-model={this.webNotice.style.fontSize}
              />
            </div>
            <div>
              <Sinput
                type="color"
                label="颜色"
                style={{ width: '132px' }}
                v-model={this.webNotice.style.color}
              />
            </div>
          </div>
        </div>
      );
    };

    return <NoticeView></NoticeView>;
  },
});
