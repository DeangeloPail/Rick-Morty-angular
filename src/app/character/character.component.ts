import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RickAndMortyResponse, Character } from '../models/modelo-datos';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  allCharacters: Character[] = [];
  filteredCharacters: Character[] = [];
  paginatedCharacters: Character[] = [];
  totalCharacters: number = 0;
  pageSize: number = 20;
  pageIndex: number = 0;
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchInitialData();
  }

  fetchInitialData(): void {
    this.apiService.getData(1).subscribe(
      (response: RickAndMortyResponse) => {
        this.totalCharacters = response.info.count;
        this.characters = response.results;
        this.filteredCharacters = this.characters;
        this.applyPagination();
        this.fetchAllPages(); // Pre-fetch all data for searching
      },
      (error) => {
        console.error('Error al consumir la API', error);
      }
    );
  }

  fetchAllPages(): void {
    const totalPages = Math.ceil(this.totalCharacters / this.pageSize);
    const requests = [];
    for (let i = 1; i <= totalPages; i++) {
      requests.push(this.apiService.getData(i));
    }
    forkJoin(requests).subscribe(
      (responses: RickAndMortyResponse[]) => {
        this.allCharacters = responses.flatMap((response) => response.results);
        this.applyFilter();
      },
      (error) => {
        console.error('Error al consumir la API', error);
      }
    );
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredCharacters = this.allCharacters.filter((character) =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCharacters = this.allCharacters;
    }
    this.applyPagination();
  }

  applyPagination(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCharacters = this.filteredCharacters.slice(start, end);
  }

  onSearch(term: string): void {
    this.searchTerm = term || '';
    this.pageIndex = 0;
    this.applyFilter(); // Filtrar y paginar los resultados
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.applyPagination();
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(
      this.filteredCharacters.length / this.pageSize
    );
    const currentPage = this.pageIndex + 1;
    const maxPagesToShow = 5;

    let startPage: number, endPage: number;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfMaxPages = Math.floor(maxPagesToShow / 2);
      if (currentPage <= halfMaxPages) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + halfMaxPages >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfMaxPages;
        endPage = currentPage + halfMaxPages;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  translateStatus(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'Vivo';
      case 'dead':
        return 'Muerto';
      case 'unknown':
        return 'Desconocido';
      default:
        return status;
    }
  }

  translateGender(gender: string): string {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'Macho';
      case 'female':
        return 'Mujer';
      case 'unknown':
        return 'Desconocido';
      default:
        return gender;
    }
  }
}
