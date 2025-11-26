import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordService } from './password.interface';

@Injectable()
export class PasswordService implements IPasswordService {
  private readonly logger = new Logger(PasswordService.name);
  private readonly saltRounds = 10;

  async createHash(password: string): Promise<string> {
    this.logger.log(`Criando hash da senha`);
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    this.logger.log(`Validando senha`);
    return bcrypt.compare(password, hashedPassword);
  }
}
