import { defineComponent } from 'vue';
import empty from '@assets/image/empty.svg';

export default defineComponent({
  name: 'Empty',
  props: {
    img: {
      type: String,
      default: chrome.runtime.getURL(empty),
    },
    onlyText: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '暂无数据',
    },
  },
  render() {
    return (
      <div class="empty-view">
        {!this.onlyText ? <img class="empty-img" src={this.img} /> : null}
        {this.text ? <span class="empty-text">{this.text}</span> : null}
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
