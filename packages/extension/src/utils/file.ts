// 生成下载文件
export const loadFile = (fileName: string, content: string) => {
  const aLink = document.createElement('a');
  const blob = new Blob([content], {
    type: 'text/plain',
  });
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
  URL.revokeObjectURL(blob.toString());
};
