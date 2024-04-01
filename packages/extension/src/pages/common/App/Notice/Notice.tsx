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
    const UrlFiled = () => {
      return (
        <div>
          <span>Url</span>
          <input v-model={this.url} type="text" />
        </div>
      );
    };
    const NoticeView = () => {
      return (
        <div>
          <UrlFiled></UrlFiled>
        </div>
      );
    };

    return <NoticeView></NoticeView>;
  },
});
