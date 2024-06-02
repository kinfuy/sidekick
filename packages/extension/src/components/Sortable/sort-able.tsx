import {
  type CSSProperties,
  Fragment,
  type PropType,
  type VNode,
  type VNodeArrayChildren,
  computed,
  defineComponent,
  isVNode,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

import './sortable.less';

export default defineComponent({
  name: 'Sortable',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: undefined,
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: '100%',
    },
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
    },
  },
  emits: ['sort'],
  setup(props, { emit }) {
    const prefix = 'sortable';
    const containerRef = ref<HTMLElement | null>(null);
    const ids = ref<(string | number | symbol)[]>([]);

    const geSource = (e: DragEvent) => {
      const target = e.target as Element;
      const container = containerRef.value!;
      if (!target || !container.contains(target) || target === container) {
        return null;
      }

      let node = container.firstElementChild;
      while (node) {
        if (node.contains(target)) {
          return node;
        }
        node = node.nextElementSibling;
      }

      return null;
    };

    let source: Element | null;
    let ghostElement: Node | null;
    let sourceIndex = 0;
    let startMousePos: number | null;
    let startPosition: number | null;
    let containerRect: DOMRect | null;
    let listRects: DOMRect[] = [];
    let targetIndex: number | null;
    let lastDragEvent: MouseEvent | null;
    let minDistance: number | null;
    let maxDistance: number | null;

    const sort = (index: number | null) => {
      if (!source) return;
      const items = ids.value;
      const newIndex = index !== null ? index : items.length;
      if (sourceIndex < 0 || newIndex < 0) return;
      if (sourceIndex === newIndex) return;
      const item = items.splice(sourceIndex, 1);
      items.splice(newIndex, 0, item[0]);
      emit('sort', items, item[0]);
    };

    const locate = (e: MouseEvent) => {
      const container = containerRef.value!;
      const sourceRect = listRects[sourceIndex];
      const clientPosKey =
        props.direction === 'vertical' ? 'clientY' : 'clientX';
      const scrollPosKey =
        props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
      const startPosKey = props.direction === 'vertical' ? 'top' : 'left';
      const endPosKey = props.direction === 'vertical' ? 'bottom' : 'right';
      const rangeKey = props.direction === 'vertical' ? 'height' : 'width';
      const sourceRange = sourceRect[rangeKey];
      const sourcePos = sourceRect[startPosKey] + sourceRect[rangeKey] / 2;
      let target = targetIndex || sourceIndex;
      const ghostPos =
        sourcePos + e[clientPosKey] + container[scrollPosKey] - startPosition!;
      // const ghostY = e.clientY;
      for (let i = 0; i < listRects.length; i++) {
        const rect = listRects[i];

        if (
          (i === 0 && ghostPos <= rect[startPosKey]) ||
          (ghostPos >= rect[startPosKey] && ghostPos <= rect[endPosKey]) ||
          (i === listRects.length - 1 && ghostPos >= rect[endPosKey])
        ) {
          target = i;
        }
        const node = container.children[i];

        if (ghostPos <= rect[endPosKey] && i < sourceIndex) {
          (node as any).style.transform = `translate${
            props.direction === 'vertical' ? 'Y' : 'X'
          }(${sourceRange}px)`;
        } else if (ghostPos >= rect[startPosKey] && i > sourceIndex) {
          (node as any).style.transform = `translate${
            props.direction === 'vertical' ? 'Y' : 'X'
          }(-${sourceRange}px)`;
        } else {
          (node as any).style.transform = `translate3d(0,0,0)`;
        }
      }

      return target;
    };

    let scrollTimer: any | null = null;
    const clearScroll = () => {
      if (scrollTimer) {
        clearInterval(scrollTimer);
        scrollTimer = null;
      }
    };

    const autoScroll = (event: MouseEvent) => {
      const container = containerRef.value!;
      const clientPosKey =
        props.direction === 'vertical' ? 'clientY' : 'clientX';
      const scrollPosKey =
        props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
      const startPosKey = props.direction === 'vertical' ? 'top' : 'left';
      const endPosKey = props.direction === 'vertical' ? 'bottom' : 'right';
      const scrollRangeKey =
        props.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth';
      if (
        containerRect![endPosKey] > event[clientPosKey] &&
        event[clientPosKey] > containerRect![startPosKey]
      ) {
        // 停止滚动
        clearScroll();
      } else if (!scrollTimer) {
        // 方向
        const step = event[clientPosKey] < containerRect![startPosKey] ? -3 : 3;
        scrollTimer = setInterval(() => {
          container[scrollPosKey] = Math.max(
            0,
            Math.min(container[scrollPosKey] + step, container[scrollRangeKey]),
          );
          targetIndex = locate(event);
        }, 10);
      }
    };

    const initListRects = () => {
      listRects = [];
      const container = containerRef.value!;
      let node = container.firstElementChild as HTMLDivElement;
      while (node) {
        (node as any).style = 'transition-duration:300ms; translate3d(0,0,0);';

        listRects.push(node.getBoundingClientRect());
        node = node.nextElementSibling as HTMLDivElement;
      }
    };

    const clearTransform = () => {
      const container = containerRef.value!;
      let node = container.firstElementChild as HTMLDivElement;
      while (node) {
        (node as any).style = undefined;
        node = node.nextElementSibling as HTMLDivElement;
      }
    };

    const drag = (e: MouseEvent) => {
      if (!source) return;
      // e.preventDefault();

      // 坐标一样不计算
      if (lastDragEvent) {
        if (
          lastDragEvent.clientX === e.clientX &&
          lastDragEvent.clientY === e.clientY
        ) {
          return;
        }
      }
      lastDragEvent = e;
      const clientPosKey =
        props.direction === 'vertical' ? 'clientY' : 'clientX';
      const moveDistance = Math.max(
        minDistance!,
        Math.min(maxDistance!, e[clientPosKey] - startMousePos!),
      );
      (ghostElement as any).style.transform = `translate${
        props.direction === 'vertical' ? 'Y' : 'X'
      }(${moveDistance}px)`;

      autoScroll(e);

      if (!scrollTimer) {
        targetIndex = locate(e);
      }
    };

    const dragEnd = (e: any) => {
      if (!source) return;
      e.preventDefault();
      source.classList.remove('is-dragging');
      const tempHidden = source.querySelector('.draging-hidden');
      if (tempHidden) {
        (tempHidden as any).style = '';
      }
      clearTransform();
      clearScroll();
      sort(targetIndex);
      document.body.removeChild(ghostElement!);
      startMousePos = null;
      ghostElement = null;
      source = null;
      targetIndex = null;
      lastDragEvent = null;
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', dragEnd);
    };

    const dragStart = (e: DragEvent) => {
      if (props.disabled) {
        return false;
      }
      e.preventDefault();
      e.stopImmediatePropagation();
      source = geSource(e);
      if (!source) {
        return false;
      }
      const tempHidden = source.querySelector('.draging-hidden');
      if (tempHidden) {
        (tempHidden as any).style.display = 'none';
      }
      const clientPosKey =
        props.direction === 'vertical' ? 'clientY' : 'clientX';
      const scrollPosKey =
        props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
      const startPosKey = props.direction === 'vertical' ? 'top' : 'left';
      const endPosKey = props.direction === 'vertical' ? 'bottom' : 'right';
      startMousePos = e[clientPosKey];
      startPosition = e[clientPosKey] + containerRef.value![scrollPosKey];

      const rect = source.getBoundingClientRect();
      sourceIndex = parseInt((source as HTMLDivElement).dataset.index!);

      ghostElement = source.cloneNode(true);
      (ghostElement as any).classList.add(`${prefix}-drag-ghost`);
      (ghostElement as any).style.top = `${rect.top}px`;
      (ghostElement as any).style.left = `${rect.left}px`;
      (ghostElement as any).style.width = `${rect.width}px`;
      (ghostElement as any).style.height = `${rect.height}px`;
      document.body.appendChild(ghostElement);
      initListRects();
      const sourceRect = listRects[sourceIndex];
      containerRect = containerRef.value!.getBoundingClientRect();
      minDistance = containerRect[startPosKey] - sourceRect[startPosKey];
      maxDistance = containerRect[endPosKey] - sourceRect[endPosKey];
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', dragEnd);
      source!.classList.add('is-dragging');

      return true;
    };

    onMounted(() => {
      containerRef.value?.addEventListener('dragstart', dragStart);
    });

    onUnmounted(() => {
      containerRef.value?.removeEventListener('dragstart', dragStart);
    });

    const containerStyle = computed(() => {
      const rst = {} as CSSProperties;
      if (props.height) {
        rst.height = `${props.height}px`;
        rst.overflowY = 'auto';
      }
      if (props.width) {
        rst.width =
          typeof props.width === 'number' ? `${props.width}px` : props.width;
        rst.overflowX = 'auto';
      }
      return rst;
    });

    const getContainer = () => {
      return containerRef.value;
    };

    return {
      prefix,
      getContainer,
      containerRef,
      containerStyle,
      ids,
    };
  },
  render() {
    let items: VNodeArrayChildren | null = null;
    const keys: (string | number | symbol)[] = [];
    let children: VNodeArrayChildren | undefined = this.$slots.default?.();
    if (children && isVNode(children[0]) && children[0].type === Fragment) {
      children = children[0].children as VNodeArrayChildren;
    }
    if (children && Array.isArray(children)) {
      items = children.map((child, index) => {
        const id = (child as VNode).key || index;
        keys.push(id);
        return (
          <div
            class={`${this.prefix}-item`}
            key={id}
            data-id={id}
            data-index={index}
          >
            {child}
          </div>
        );
      });
      this.ids = keys;
    }

    return (
      <div
        class={{
          [`${this.prefix}-container`]: true,
          [`${this.prefix}-container-horizontal`]:
            this.direction === 'horizontal',
        }}
        style={this.containerStyle}
        ref="containerRef"
      >
        {this.disabled ? this.$slots.default?.() : items}
      </div>
    );
  },
});
