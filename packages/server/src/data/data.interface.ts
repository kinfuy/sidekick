export interface Follower {
  followers: number;
  username: string;
  nickname: string;
  avatar_url: string;
}

export interface Icon {
  // Icon(desc: "小红书", value: "redbook", catalog: "社交", tags: [],themeColor: "#ff2e4d"),
  desc: string;
  value: string;
  catalog: string;
  tags: string[];
  themeColor: string;
}
