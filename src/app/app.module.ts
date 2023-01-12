import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaygroundComponent } from './components/playground/playground.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TetrisService } from './services/tetris.service';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GameBannerComponent } from './components/game-banner/game-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    NavigationComponent,
    GameInfoComponent,
    GameBannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [TetrisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
