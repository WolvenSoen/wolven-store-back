import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.loginService.login(email, password);
  }
}
