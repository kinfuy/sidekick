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
  
    @Column()
    name: string;

    @Column({ default: null })
    email: string
  
    @Column()
    sex: number;
  
    @Column({ default: null }) 
    mobile: string;
  
    @Column({ select: false, length: 30 }) 
    password: string;
  
    @Column({ select: false }) 
    isDelete: boolean;
  
    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updateTime: Date;
  }
  