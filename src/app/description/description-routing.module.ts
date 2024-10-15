import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { EpisodeComponent } from './episode/episode.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  { path: 'character/:id', component: CharacterComponent },
  { path: 'episode/:id', component: EpisodeComponent },
  { path: 'location/:id', component: LocationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescriptionRoutingModule {}
