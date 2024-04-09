import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Setting',
  setup() {
    return {};
  },
  render() {
    const NoticeView = () => {
      return (
        <div class="app-setting">
          <div class="ui-card m-t-1"></div>
        </div>
      );
    };

    return <NoticeView></NoticeView>;
  },
});
