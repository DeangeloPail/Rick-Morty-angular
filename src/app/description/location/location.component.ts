import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute } from '@angular/router';
import { Location, Character } from '../../models/modelo-datos';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locationId?: number;
  location?: Location;
  characters: Character[] = [];
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.locationId = +idParam;
        this.fetchLocation(this.locationId);
      } else {
        console.error('ID parameter is null');
      }
    });
  }

  fetchLocation(id: number): void {
    this.locationService.getLocationById(id).subscribe((data) => {
      this.location = data;
      this.fetchCharacters(this.location.residents);
    });
  }

  fetchCharacters(urls: string[]): void {
    this.locationService.getCharacters(urls).subscribe((data) => {
      this.characters = data;
    });
  }

  scroll(direction: string): void {
    const scrollAmount = 200; 
    if (this.carousel && this.carousel.nativeElement) {
      if (direction === 'prev') {
        this.carousel.nativeElement.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth',
        });
      } else {
        this.carousel.nativeElement.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  }
}
