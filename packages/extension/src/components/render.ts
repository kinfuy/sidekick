import type { App, PropType, VNode } from 'vue';

const Render = (props: { render: () => VNode[] | JSX.Element }) => {
  return props.render();
};

Render.props = {
  render: {
    type: Function as PropType<() => VNode[] | JSX.Element | null>,
  },
};

Render.install = (app: App) => {
  app.component('Render', Render);
};

export default Render;
