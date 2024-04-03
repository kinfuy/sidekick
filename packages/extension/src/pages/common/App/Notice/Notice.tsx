import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Notice',

  setup() {
    const url = new URL(window.location.href).host;
    return {
      url,
    };
  },
  render() {
    const Filed = (title: string) => {
      return (
        <div class="ui-filed">
          <span class="ui-filed-label">{title}:</span>
          <span>{this.url}</span>
        </div>
      );
    };
    const NoticeView = () => {
      return (
        <div class="app-notice">
          <div class="ui-card m-t-1">{Filed('地址')}</div>
        </div>
      );
    };

    return <NoticeView></NoticeView>;
  },
});
