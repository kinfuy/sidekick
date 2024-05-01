import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'SInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    labelWidth: {
      type: String,
      default: '48px',
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'change', 'blur', 'focus'],
  setup(props, { emit }) {
    const stateValue = ref('');

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
      emit('change', stateValue.value);
    };

    const emitEvent = (event: 'blur' | 'focus') => {
      emit(event, stateValue.value);
    };

    return {
      stateValue,
      emitEvent,
      handleChange,
    };
  },
  render() {
    return (
      <div class="ui-filed">
        {this.label && (
          <span class="ui-filed-label" style={{ width: this.labelWidth }}>
            {this.label}:
          </span>
        )}
        <input
          type={this.type}
          v-model={this.stateValue}
          placeholder={this.placeholder}
          onBlur={this.emitEvent.bind(this, 'blur')}
          onFocus={this.emitEvent.bind(this, 'focus')}
          onChange={this.handleChange}
        />
      </div>
    );
  },
});
