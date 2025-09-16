import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';

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

  @Get('response')
  getResponse(@Res() res: Response) {
    return res.status(201).json({ message: 'hello' });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }
}
