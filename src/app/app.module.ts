import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaygroundComponent } from './components/playground/playground.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NextItemsComponent } from './components/next-items/next-items.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { BlockService } from './services/block.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    NavigationComponent,
    NextItemsComponent,
    PlayerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [BlockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
