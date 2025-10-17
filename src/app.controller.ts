import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';
import { ResponseInterceptor } from './common/interceptors/response.interseptor';

@Controller()
export class AppController {
  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie: ${title}`;
  }

  @UseInterceptors(ResponseInterceptor)
  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      email: 'vebtech@vebtech.com',
      userAgent,
    };
  }
}
