import { ref } from 'vue';
export const useTheme = () => {
  const theme = ref('light');

  const setTheme = (val: string) => {
    theme.value = val;
  };
  return {
    theme,
    setTheme,
  };
};
