import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TokenService } from './token.service';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  findAll(@Query() queryParameters: PaginationDto) {
    return this.tokenService.findAll(queryParameters);
  }

  @Get(':arg')
  findOne(@Param('arg') arg: string) {
    return this.tokenService.findOne(arg);
  }
}
