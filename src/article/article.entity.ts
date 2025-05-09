import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagEntity } from '~/tag/tag.entity';
import { UserEntity } from '~/user/user.entity';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column('text')
  body: string;

  @ManyToMany(() => TagEntity, { cascade: true, eager: true })
  @JoinTable({
    name: 'article_tags',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: TagEntity[];

  @Column({ default: false })
  favorited: boolean;

  @Column({ default: 0 })
  favoritesCount: number;

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
