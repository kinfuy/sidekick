import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity() //默认带的 entity
export class User {
    //作为主键且创建时自动生成，默认自增
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: null })
    name?: string;

    @Column({ unique: true })
    email: string
  
    @Column({ default: null })
    sex: number;
  
    @Column({ default: null }) 
    mobile: string;
  
    @Column({ select: false, length: 100 }) 
    password: string;
  
    @Column({ select: false, default: false }) 
    isDelete: boolean;
  
    @CreateDateColumn({ type: 'datetime' })
    createTime: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updateTime: Date;
  }
  