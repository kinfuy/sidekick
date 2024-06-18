import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ICardTemplate } from "../card.interface";

@Entity() 
export class Template {
     //作为主键且创建时自动生成，默认自增
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;

     @Column()
     type: number;

     @Column("simple-json")
     content: ICardTemplate;

     @Column()
     isDelete: boolean;

     @CreateDateColumn({ type: 'datetime' })
     createTime: Date;
   
     @UpdateDateColumn({ type: 'datetime' })
     updateTime: Date;

}