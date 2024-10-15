import { Component, OnInit } from '@angular/core';
import { Episode } from '../models/modelo-datos'; // Importa la interfaz desde tu modelo
import { EpisodeService } from '../services/episode.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  episodes: Episode[] = [];
  filteredEpisodes: Episode[] = [];

  constructor(private episodeService: EpisodeService) { }

  ngOnInit(): void {
    this.episodeService.getAllEpisodes().subscribe(data => {
      this.episodes = data;
      this.filteredEpisodes = data; 
    });
  }

  onSearch(searchTerm: string): void {
    this.filteredEpisodes = this.episodes.filter(episode =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
