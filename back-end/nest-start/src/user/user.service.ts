import { Injectable } from '@nestjs/common';
import { UserMongoRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserMongoRepository) {}
  login(): string {
    this.userRepository.getAllUser();

    return 'login';
  }
}
