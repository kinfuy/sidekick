import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity() //默认带的 entity
export class Icon {
    //作为主键且创建时自动生成，默认自增
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    desc: string;

    @Column()
    catalog: string;

    @Column()
    tags: string;

    @Column({ select: false, default: false }) 
    isDelete: boolean;
  
    @CreateDateColumn({ type: 'datetime' })
    createTime: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updateTime: Date;
  }
  