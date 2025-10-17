import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entity/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly moviePosterRepository: Repository<MoviePosterEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: {
        isAvailable: false,
      },
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['actors'],
    });

    if (!movie) {
      throw new NotFoundException('Фильм не найден!');
    }

    return movie;
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException('Один или несколько актеров не найдены!');
    }

    let poster: MoviePosterEntity | null = null;

    if (imageUrl) {
      poster = this.moviePosterRepository.create({ imageUrl });
      await this.moviePosterRepository.save(poster);
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    });

    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);

    Object.assign(movie, dto);
    await this.movieRepository.save(movie);

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);

    return true;
  }
}
