import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class CardTemplate {
  //作为主键且创建时自动生成，默认自增
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: number;

  @Column({
    type: 'text',
    transformer: {
      to: (val: string) => JSON.stringify(val),
      from: (val: string) => JSON.parse(val),
    },
  })
  content: CardTemplate;
  @Column()
  isDelete: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createTime: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updateTime: Date;
}
