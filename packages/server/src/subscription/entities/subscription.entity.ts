import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity() //默认带的 entity
export class Subscription {
     //作为主键且创建时自动生成，默认自增
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ default: null })
     email: string; // 用户id

     @Column() // 1: 激活码 2：付费用户
     form: number;

     @Column() // 激活码类型 1: 月卡 2：周卡 3：年卡 99：永久
     type: number;

     @CreateDateColumn({ type: 'datetime' })
     startTime: Date; // 初次续期日期

     @CreateDateColumn({ type: 'datetime' })
     lastTime: Date; // 上次续期时间

     @UpdateDateColumn({ type: 'datetime' })
     endTime: Date; // 有效日期

     @CreateDateColumn({ type: 'datetime' })
     createTime: Date;
   
     @UpdateDateColumn({ type: 'datetime' })
     updateTime: Date;
}
