// src/movies/movies.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  async getPopularMovies() {
    return this.moviesService.fetchPopularMovies();
  }

  @Get(':id')
  async getMovieDetails(@Param('id') id: string) {
    return this.moviesService.fetchMovieDetails(id);
  }
}
