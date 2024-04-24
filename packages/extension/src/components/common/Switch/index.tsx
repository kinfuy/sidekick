import { defineComponent, ref, watch } from 'vue';
import './index.less';

export default defineComponent({
  name: 'SSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const stateValue = ref(false);

    watch(
      () => props.modelValue,
      (value) => {
        stateValue.value = value;
      },
      {
        immediate: true,
      },
    );

    const handleChange = () => {
      emit('update:modelValue', stateValue.value);
    };

    return {
      stateValue,
      handleChange,
    };
  },
  render() {
    return <div class="ui-switch">开关</div>;
  },
});
