import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column({ type: 'varchar', length: 100, comment: '유저 이메일' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '유저 비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 30, comment: '유저 이름' })
  name: string;

  @Column({ type: 'tinyint', comment: '유저 나이', nullable: true })
  age: number;

  @Column({ comment: '유저 성별', nullable: true })
  gender: boolean;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
