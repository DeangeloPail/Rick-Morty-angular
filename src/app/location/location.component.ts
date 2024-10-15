import { Component, OnInit } from '@angular/core';
import { Location } from '../models/modelo-datos';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations: Location[] = [];
  filteredLocations: Location[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((data) => {
      this.locations = data;
      this.filteredLocations = data; // Inicialmente mostramos todas las locaciones
    });
  }

  onSearch(searchTerm: string): void {
    this.filteredLocations = this.locations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
