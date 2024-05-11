import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity() // 激活码
export class Activation {
     //作为主键且创建时自动生成，默认自增
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     code: string;

     @Column()
     effective: boolean; // 是否有效

     @Column() // 激活码类型 1: 月卡 2：季卡 3：年卡 4：周体验卡 99：永久
     type: number;

     @CreateDateColumn({ type: 'timestamp' })
     createTime: Date;
   
     @UpdateDateColumn({ type: 'timestamp' })
     updateTime: Date;
}
