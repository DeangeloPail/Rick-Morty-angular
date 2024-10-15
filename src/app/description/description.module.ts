import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescriptionRoutingModule } from './description-routing.module';
import { LocationComponent } from './location/location.component';
import { CharacterComponent } from './character/character.component';
import { EpisodeComponent } from './episode/episode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LocationComponent,
    CharacterComponent,
    EpisodeComponent
  ],
  imports: [
    CommonModule,
    DescriptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class DescriptionModule { }
