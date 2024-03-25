import { defineComponent } from 'vue';

import empty from '@assets/image/empty.svg';

export default defineComponent({
  name: 'Notice',
  render() {
    const Empty = () => {
      return (
        <div class="empty-view">
          <img
            class="empty-img"
            src={chrome.runtime.getURL(empty)}
            alt=""
            srcset=""
          />
          <span class="empty-text">暂无数据</span>
        </div>
      );
    };

    const NoticeView = () => {
      return <div>NoticeView</div>;
    };
    return (
      <div>
        <Empty></Empty>
        {/* <NoticeView></NoticeView> */}
      </div>
    );
  },
});
