export namespace Message {
  export namespace Form {
    /**
     * 注入脚本消息
     * @description 只能传递给content
     */
    export const INJECT_MESSAGE = 'INJECT_MESSAGE';
    /**
     *@description content脚本消息
     */
    export const CONTENT_MESSAGE = 'CONTENT_MESSAGE';
    /**
     *@description Popup脚本消息
     */
    export const POPUP_MESSAGE = 'POPUP_MESSAGE';

    /**
     *@description Sidepanel脚本消息
     */
    export const SIDEPANEL_MESSAGE = 'SIDEPANEL_MESSAGE';
    /**
     *@description Server worker消息
     */
    export const SERVERWORKER_MESSAGE = 'SERVERWORKER_MESSAGE';
  }

  export namespace Target {
    /**
     * 注入脚本
     */
    export const INJECT = 'INJECT';
    /**
     * 内容content
     */
    export const CONTENT = 'CONTENT';
    /**
     *  Popup
     */
    export const POPUP = 'POPUP';

    /**
     * Server Worker
     */
    export const SERVERWORKER = 'SERVERWORKER';
  }
}
