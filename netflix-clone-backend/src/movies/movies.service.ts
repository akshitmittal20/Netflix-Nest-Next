import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async fetchPopularMovies(): Promise<AxiosResponse<any>> {
    const response = this.httpService.get('https://imdb8.p.rapidapi.com/title/get-most-popular-movies', {
      params: {
        homeCountry: 'US',
        purchaseCountry: 'US',
        currentCountry: 'US',
      },
      headers: {
        'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      },
    });
    return firstValueFrom(response);
  }

  async fetchMovieDetails(id: string): Promise<AxiosResponse<any>> {
    const response = this.httpService.get(`https://imdb8.p.rapidapi.com/title/v2/get-details`, {
      params: {
        tconst: id,
        country: 'US',
        language: 'en-US',
      },
      headers: {
        'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      },
    });
    return firstValueFrom(response);
  }
}
