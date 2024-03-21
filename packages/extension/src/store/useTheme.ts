import { ref } from 'vue';

const theme = ref('light');

export const useTheme = () => {
  const setTheme = (val: string) => {
    theme.value = val;
  };
  return {
    theme,
    setTheme,
  };
};
