
export interface ISocialCard {
     title: string
     unit: string
     logo: string
     color: string
}


export interface IDaysMatterCard {
    title: string;
    logo: string;
    color: string;
    startTime: string;
    endTime: string;
    content: string;
}

export interface ICardTemplate {
    id: number
    name: string
    type: number
    content: ISocialCard | IDaysMatterCard
    createdAt: string
    updatedAt: string
}