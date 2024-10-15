import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Info, Character, RickAndMortyResponse } from '../models/modelo-datos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _url='https://rickandmortyapi.com/api/character/';
  
  constructor(private http : HttpClient) { }

  public datosInfo$!: Observable<Info>;

  public getData(page: number): Observable<RickAndMortyResponse> {
    return this.http.get<RickAndMortyResponse>(`${this._url}?page=${page}`);
  }
  
  public getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this._url}${id}`);
  }
  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this._url}${id}`);
  }
}

