import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Episode, EpisodeResponse, Character } from '../models/modelo-datos';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode/';

  constructor(private http: HttpClient) { }

  getAllEpisodes(): Observable<Episode[]> {
    return this.http.get<EpisodeResponse>(this.apiUrl).pipe(
      switchMap(response => this.getAllEpisodesRecursive(response.info.next, response.results))
    );
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}${id}`);
  }

  getCharacters(urls: string[]): Observable<Character[]> {
    const requests = urls.map(url => this.http.get<Character>(url));
    return forkJoin(requests);
  }

  private getAllEpisodesRecursive(url: string | null, episodes: Episode[]): Observable<Episode[]> {
    if (!url) {
      return of(episodes);
    }
    return this.http.get<EpisodeResponse>(url).pipe(
      switchMap(response => {
        const combinedEpisodes = [...episodes, ...response.results];
        return this.getAllEpisodesRecursive(response.info.next, combinedEpisodes);
      }),
      catchError(error => {
        console.error('Error fetching episodes', error);
        return of(episodes);
      })
    );
  }
}
