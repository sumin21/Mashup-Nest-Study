import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  // 최소 8자 및 최대 16자, 하나 이상의 대문자, 하나의 소문자, 하나의 숫자 및 하나의 특수 문자
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message: '비밀번호 양식에 맞게 작성하세요.',
    },
  )
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  readonly name: string;

  @IsNumber()
  readonly age?: number;

  @IsBoolean()
  readonly gender?: boolean;
}
