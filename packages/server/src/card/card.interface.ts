export interface ICard {
  id: number;
  title: string;
  refresh: {
    /**
     * 1: 接口更新  2：手动更新  3：自定义接口
     */
    type: number; 
    api?: string;
  };
}

export interface ISocialCard extends ICard {
  unit: string;
  logo: string;
  color: string;
}

export interface IDaysMatterCard extends ICard {
  logo: string;
  color: string;
  startTime: string;
  endTime: string;
  content: string;
}

export interface ICardTemplate {
  id: number;
  name: string;
  type: number;
  content: ISocialCard | IDaysMatterCard;
  createdAt: string;
  updatedAt: string;
}
