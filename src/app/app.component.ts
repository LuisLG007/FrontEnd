import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GamePlanetSPA';

  @HostBinding('class') componentCSS: any;

  constructor( public overlayContainer: OverlayContainer ) {}

  public onSetTheme( theme: string):void 
  {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCSS = theme;
  }
}
