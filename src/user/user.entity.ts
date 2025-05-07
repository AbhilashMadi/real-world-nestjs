import { compare, genSalt, hash } from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Exclude()
  @Column()
  password: string;

  @BeforeInsert()
  private async hashPassword() {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return compare(candidatePassword, this.password);
  }
}
