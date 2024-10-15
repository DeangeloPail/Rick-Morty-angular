import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { EpisodeComponent } from './episode/episode.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path: 'description',
    loadChildren: () =>
      import('./description/description.module').then(
        (m) => m.DescriptionModule
      ),
  },
  { path: '', component: CharacterComponent, pathMatch: 'full' },
  { path: 'episode', component: EpisodeComponent },
  { path: 'location', component: LocationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
