import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YoutubeRoom-front';
  theme = 'custom-theme';

  constructor(private themeService: NbThemeService) {
    this.themeService.onThemeChange()
      .subscribe((theme: any) => {
        console.log(`Theme changed to ${theme.name}`);
      });
  }

  toggleTheme() {
    this.theme = this.theme === 'custom-theme' ? 'custom-theme-dark' : 'custom-theme';
    this.themeService.changeTheme(this.theme);
  }
}
