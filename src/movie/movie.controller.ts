import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

@Controller()
export class MovieController {
  @Get()
  findAll(@Query() query: any) {
    console.log(query);
    return JSON.stringify(query);
  }

  @Post()
  create(@Body() body: { title: string; genre: string }) {
    return body;
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      headers: req.headers,
      url: req.url,
      query: req.query,
      params: req.params,
    };
  }
}
