import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Character, Location, LocationResponse } from '../models/modelo-datos'; 

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://rickandmortyapi.com/api/location/';

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<LocationResponse>(this.apiUrl).pipe(
      switchMap(response => this.getAllLocationsRecursive(response.info.next, response.results))
    );
  }

  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}${id}`);
  }

  getCharacters(urls: string[]): Observable<Character[]> {
    const requests = urls.map(url => this.http.get<Character>(url));
    return forkJoin(requests);
  }

  private getAllLocationsRecursive(url: string | null, locations: Location[]): Observable<Location[]> {
    if (!url) {
      return of(locations);
    }
    return this.http.get<LocationResponse>(url).pipe(
      switchMap(response => {
        const combinedLocations = [...locations, ...response.results];
        return this.getAllLocationsRecursive(response.info.next, combinedLocations);
      }),
      catchError(error => {
        console.error('Error fetching locations', error);
        return of(locations);
      })
    );
  }
}
