import { defineComponent } from 'vue';
import Empty from '../Empty/Empty';

export default defineComponent({
  name: 'Notice',
  render() {
    const NoticeView = () => {
      return <div>NoticeView</div>;
    };
    return (
      <div>
        <NoticeView></NoticeView>
        <Empty></Empty>
      </div>
    );
  },
});
