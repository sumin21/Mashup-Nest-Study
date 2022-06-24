import { EntityRepository, Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  //유저 생성
  async onCreate(createUserDto: CreateUserDto): Promise<boolean> {
    const { email, password, name, age, gender } = createUserDto;

    const user = await this.save({
      email,
      password,
      name,
      age,
      gender,
    });

    return user ? true : false;
  }

  //모든 유저 조회
  async findAll(): Promise<User[]> {
    return await this.find();
  }

  //단일 유저 조회
  async findById(userID: number): Promise<User> {
    const user = await this.findOne(userID);

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return user;
  }

  //단일 유저 수정
  async onChnageUser(
    userID: number,
    updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    const { name, age, gender } = updateUserDto;

    const chnageUser = await this.update({ userID }, { name, age, gender });

    if (chnageUser.affected !== 1) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return true;
  }

  //유저 삭제
  async onDelete(userID: number): Promise<boolean> {
    /**
     * remove() & delete()
     * - remove: 존재하지 않는 아이템을 삭제하면 404 Error가 발생합니다.
     * - delete: 해당 아이템이 존재 유무를 파악하고 존재하면 삭제하고, 없다면 아무 에러도 발생하지 않는다.
     */
    const deleteUser = await this.delete(userID);

    if (deleteUser.affected === 0) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return true;
  }
}
