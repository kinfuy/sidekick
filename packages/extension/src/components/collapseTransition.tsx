import { Transition } from 'vue';
import type { App, SetupContext } from 'vue';

const transitionCss =
  '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out';

const TransitionEvents = {
  onBeforeEnter(el: any) {
    if (!el.dataset) el.dataset = {};
    // el.dataset.stylePaddingTop = getComputedStyle(el).paddingTop;
    // el.dataset.stylePaddingBottom = getComputedStyle(el).paddingBottom;
    el.style.transition = transitionCss;
    el.style.height = '0';
    // el.style.paddingTop = '0';
    // el.style.paddingBottom = '0';
  },

  onEnter(el: any) {
    el.dataset.styleOverflow = el.style.overflow;

    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
    } else {
      el.style.height = '';
    }
    // el.style.paddingTop = el.dataset?.stylePaddingTop || '0';
    // el.style.paddingBottom = el.dataset?.stylePaddingBottom || '0';
    el.style.overflow = 'hidden';
  },

  onAfterEnter(el: any) {
    el.style.transition = '';
    el.style.height = '';
    el.style.overflow = el.dataset?.styleOverflow || '';
  },

  onBeforeLeave(el: any) {
    if (!el.dataset) el.dataset = {};
    // el.dataset.stylePaddingTop = el.style.paddingTop;
    // el.dataset.stylePaddingBottom = el.style.paddingBottom;
    el.dataset.styleOverflow = el.style.overflow;

    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },

  onLeave(el: any) {
    if (el.scrollHeight !== 0) {
      el.style.transition = transitionCss;
      el.style.height = '0';
      // el.style.paddingTop = '0';
      // el.style.paddingBottom = '0';
    }
  },

  onAfterLeave(el: any) {
    el.style.transition = '';
    el.style.height = '';
    el.style.overflow = el.dataset?.styleHeight || '0';
    // el.style.paddingTop = el.dataset?.stylePaddingTop || '0';
    // el.style.paddingBottom = el.dataset?.stylePaddingBottom || '0';
  },
};

const CollapseTransition = (
  props: { appear: boolean },
  ctx: Omit<SetupContext, 'expose'>,
) => {
  return (
    <Transition {...TransitionEvents} appear={props.appear}>
      {ctx.slots.default?.()}
    </Transition>
  );
};
CollapseTransition.props = {
  appear: {
    type: Boolean,
    default: false,
  },
};

CollapseTransition.install = (app: App) => {
  app.component('CollapseTransition', CollapseTransition);
};

export default CollapseTransition;
