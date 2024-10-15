import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EpisodeService } from '../../services/episode.service';
import { ActivatedRoute } from '@angular/router';
import { Episode, Character } from '../../models/modelo-datos';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  episodeId?: number;
  episode?: Episode;
  characters: Character[] = [];
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  constructor(private route: ActivatedRoute, private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.episodeId = +idParam;
        this.fetchEpisode(this.episodeId);
      } else {
        console.error("ID parameter is null");
      }
    });
  }

  fetchEpisode(id: number): void {
    this.episodeService.getEpisodeById(id).subscribe(data => {
      this.episode = data;
      this.fetchCharacters(this.episode.characters);
    });
  }

  fetchCharacters(urls: string[]): void {
    this.episodeService.getCharacters(urls).subscribe(data => {
      this.characters = data;
    });
  }
}
