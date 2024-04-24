const transfornNode = (
  site: chrome.bookmarks.BookmarkTreeNode[],
  top: chrome.bookmarks.BookmarkTreeNode[],
) => {
  const temp = [] as chrome.bookmarks.BookmarkTreeNode[];
  site.forEach((x) => {
    if (x.url) {
      temp.push(x);
    } else {
      if (x.children && x.children.length > 0) {
        const parent = {
          ...x,
          children: [] as chrome.bookmarks.BookmarkTreeNode[],
        };
        parent.children.push(...transfornNode(x.children, top));
        top.push(parent);
      }
    }
  });
  return temp;
};

const pure = (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => {
  const rst = [] as chrome.bookmarks.BookmarkTreeNode[];
  bookmarks.forEach((book) => {
    if (book.title) {
      if (book.children && book.children.length > 0) {
        rst.push(book);
      }
    } else {
      if (book.children && book.children.length > 0) {
        rst.push(...pure(book.children));
      }
    }
  });
  return rst;
};
export const transformBookMarks = (
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
) => {
  const websites = [] as chrome.bookmarks.BookmarkTreeNode[];
  websites.push(...transfornNode(pure(bookmarks), websites));
  return websites;
};
