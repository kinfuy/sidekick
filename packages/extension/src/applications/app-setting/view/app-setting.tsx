import { computed, defineComponent } from 'vue';
import { useTheme } from '@store/useTheme';
import { useAuth } from '@store/useAuth';
import dark from '@assets/image/dark.svg';
import light from '@assets/image/light.svg';
export default defineComponent({
  name: 'AppSetting',
  setup() {
    const { theme, direction, setTheme, setDirection, clear } = useTheme();

    const { user } = useAuth();

    const themeIcon = computed(() => {
      if (theme.value === 'light') {
        return chrome.runtime.getURL(light);
      }
      return chrome.runtime.getURL(dark);
    });

    const handleSwitch = () => {
      if (theme.value === 'light') {
        setTheme('dark');
      } else if (theme.value === 'dark') {
        setTheme('light');
      }
    };

    const handleDirection = () => {
      if (direction.value === 'left') {
        setDirection('right');
      } else if (direction.value === 'right') {
        setDirection('left');
      }
    };

    const directionText = computed(() => {
      if (direction.value === 'left') return '左侧';
      return '右侧';
    });

    const clearStore = async () => {
      clear();
    };
    return {
      user,
      theme,
      themeIcon,
      directionText,
      handleSwitch,
      handleDirection,
      clearStore,
    };
  },
  render() {
    const Title = (title: string) => {
      return <div class="setting-title theme-text-desc f-16">{title}</div>;
    };

    const Theme = () => {
      return (
        <>
          <div class="setting-theme">
            <span class="theme-text">主题</span>
            <img
              class="setting-icon"
              src={this.themeIcon}
              onClick={() => this.handleSwitch()}
            />
          </div>
          <span class="line" />
          <div class="setting-theme">
            <span class="theme-text">布局</span>
            <span
              class="theme-text btn-text"
              onClick={() => this.handleDirection()}
            >
              {this.directionText}
            </span>
          </div>
          <span class="line" />
          <div class="setting-theme">
            <span></span>
            <span
              class="btn btn-small btn-border"
              onClick={() => this.clearStore()}
            >
              清除缓存
            </span>
          </div>
        </>
      );
    };

    const User = () => {
      return <div class="setting-user">{this.user?.name}</div>;
    };

    const SettingView = () => {
      return (
        <div class="app-setting">
          {Title('用户')}
          <div class="ui-card m-t-1">
            <User />
          </div>
          {Title('基础')}
          <div class="ui-card m-t-1">
            <Theme />
          </div>
        </div>
      );
    };

    return <SettingView />;
  },
});
