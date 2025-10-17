import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Получить список фильмов',
    description: 'Получение списка фильмов',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильмы найдены',
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Получить фильм по ИД',
    description: 'Инфо о фильме',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильмы найден',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Фильм не найден',
  })
  /*  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id фильма',
  })*/
  @ApiHeader({
    name: 'X-Auth-token',
    description: 'Токен авторизации',
  })
  @ApiQuery({
    name: 'year',
    description: 'Года фильма',
    required: false,
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({
    summary: 'Создать фильм',
    description: 'Создание фильма',
  })
  /*  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Fight Night' },
      },
    },
  }) */
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
