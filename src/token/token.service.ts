import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Token } from './entities/token.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: Model<Token>, // private readonly configService: ConfigService,
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.tokenModel
      .find()
      .select('-__v')
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset)
      .lean();
  }

  async findOne(arg: string) {
    let token: Token | null = null;
    // MongoID
    if (isValidObjectId(arg)) {
      token = await this.tokenModel.findById(arg);
    }
    // Name
    if (!token) {
      token = await this.tokenModel.findOne({ name: arg.toLowerCase().trim() });
    }
    if (!token)
      throw new NotFoundException(`Token with id or name "${arg}" not found`);
    return token;
  }
}
