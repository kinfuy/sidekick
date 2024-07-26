export const urlBlock = () => {
  const blockList = ['blog.csdn.net', 'cloud.tencent.com', 'www.aliyun.com'];
  const url = document.location.host;

  const ban_google = () => {
    const list = document.querySelectorAll('cite');
    Array.from(list).forEach((item) => {
      const urlText = item?.firstChild?.nodeValue;
      if (urlText) {
        const url = new URL(urlText).host;
        if (url) {
          if (blockList.includes(url)) {
            const card = item.closest('.MjjYud');
            const isBlock = card?.getAttribute('data-blocked');
            if (card && !isBlock) {
              const blickElement = document.createElement('div');
              blickElement.setAttribute(
                'style',
                'position: absolute; inset: 0; background: #f5f5f5; opacity: 0.9; z-index: 999; border-radius: 4px;',
              );
              blickElement.innerHTML = `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #999; font-weight: 700;">已屏蔽</div>`;
              card.setAttribute('style', 'position: relative;');
              card.setAttribute('data-blocked', 'true');
              card.appendChild(blickElement);
            }
          }
        }
      }
    });
  };

  const ban_bing = () => {};

  const ban_baidu = () => {};

  if (url.includes('www.google.com')) {
    ban_google();
  }

  if (url.includes('cn.bing.com')) {
    ban_bing();
  }

  if (url.includes('www.baidu.com')) {
    ban_baidu();
  }
};
