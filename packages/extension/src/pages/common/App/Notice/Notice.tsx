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
          <span class="ui-filed-label" style="width:48px">
            {title}:
          </span>
          <input type="text" v-model={this.url} />
        </div>
      );
    };
    const NoticeView = () => {
      return (
        <div class="app-notice">
          <div class="ui-card m-t-1">
            <div class="m-b-1">{Filed('URL')}</div>
            <div>{Filed('提示词')}</div>
          </div>
        </div>
      );
    };

    return <NoticeView></NoticeView>;
  },
});
