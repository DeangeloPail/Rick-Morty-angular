import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/modelo-datos';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit {
  characterId?: number;
  character?: Character;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.characterId = +idParam;
        this.fetchCharacter(this.characterId);
      } else {
        console.error("ID parameter is null");
      }
    });
  }

  fetchCharacter(id: number): void {
    this.apiService.getCharacterById(id).subscribe(data => {
      this.character = data;
    });
  }

  translateStatus(status: string): string {
    switch(status.toLowerCase()) {
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
    switch(gender.toLowerCase()) {
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
