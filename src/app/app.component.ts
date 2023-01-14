import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';

  constructor(private translateService: TranslateService){
    // fallback when translation not found in current lang
    this.translateService.setDefaultLang('en');
    // current language to use
    this.translateService.use('en');
  }

  changeLanguage(lang: string){
    this.translateService.use(lang);
  }
}
