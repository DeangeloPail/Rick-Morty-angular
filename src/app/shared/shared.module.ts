import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SearchComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
