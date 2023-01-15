# angular-app

## introduction

a simple example to show how to add internationalization to an angular app using the ngx-translate library

### terms
- **internationalization** (i18n) is the process of designing and preparing your project for use in different locales around the world 
- **localization** (l10n) is the process of building different versions of your project for different locales
- **locale** is a region where people speak a particular language or language variant

### process
- to internationalize our angular application, we need to localize it first. localization requires separating the content that is configurable and can be translated
- by creating key value pairs in the languages our application would support, we can localize the application to use different translation (JSON) files. e.g. **en.json** for English, **fr.json** for French, **ar.json** for Arabic etc.
- internationalization is setting up the app’s module to use the translation files. we will do this with the help of a third-party library [ngx-translate](https://github.com/ngx-translate/core) e.g. <label> {{ ‘phone’ | **translate** }} </label>
- once set up, all fields/validation messages/button text in our application’s HTML pages won’t be hardcoded. they will be replaced with a translate pipe. for any text that needs to be configured, the key’s value would have to be updated in the translation files which would then reflect on frontend

### benefits
- **web accessibility**: internationalizing your application makes it accessible to users from any culture, region or language 
- **code abstraction**: change in one place (key-value pairs file) reflects in all places used
- **supports bidirectional text**: helpful when translating from left to right languages like English to right to left languages like Arabic

## setup workspace
**1. install or upgrade node version**

- to install: https://nodejs.org/en/download/


- to check version, run in terminal:

```
node -v  
npm --version
```

- to upgrade (on mac), run in terminal:

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

**2. install angular cli**

```
sudo npm install -g @angular/cli
```

**3. create workspace** 

```
ng new angular-app
cd angular-app
ng serve
```

**4. install ngx-translate**  
since we need the npm modules for translation and for loading translation files through http, run in terminal:  

```
npm i @ngx-translate/core
npm i @ngx-translate/http-loader
```

**5. create i18n folder**  
create a folder called i18n within the assets folder. this will hold json files for different translations as key-value pairs. 
```
/*
src > assets > i18n > en.json, ar.json, fr.json, hi.json
en.json could be 
*/
```
```json
{
  "hello": "Hello",
  "descr": "This is a test"
}
```

## setup app module 
1. in app.module.ts, import the following packages to use ngx-translate library

```ts
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
```

2. in app.module.ts, create a custom TranslateLoader which needs to be an export function for AoT compilation
```ts
  export function HttpLoaderFactory(http: HttpClient){
	  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
```

3. in app.module.ts, import TranslateModule (and HttpClientModule if not already done so) in @NgModule with the loader specs shown below
```ts
@NgModule{
imports: [
// ...
HttpClientModule,
TranslateModule.forRoot({
	loader: {
		provide: TranslateLoader,
		useFactory: HttpLoaderFactory,
		deps: [HttpClient]
	}
})
],
// ...
```

## setup app component 

1. in app.component.ts, import the TranslateService API
```ts
import { TranslateService } from "@ngx-translate/core";
```

2. add parameter to constructor and set default language to English
```ts
constructor(private translateService: TranslateService){
	// fallback when translation not found in current lang
	this.translateService.setDefaultLang('en');
	// current language to use
	this.translateService.use('en');
}
```

## how to use 

1. in html, translation values can be pulled using the translate pipe 
so if en.json was
```json
{
  "hello": "Hello"
}
```
then passing the key through the translate pipe in html elements retrieves the translation value
```html
<h1>{{ 'hello' | translate }}</h1>
```

2. to support multiple translations, add a function in app.component.ts to change the language currently being used
```ts
changeLanguage(lang: string){
	this.translateService.use(lang);
}
```
and then add buttons to switch between languages in app.component.html
```html
<buttton (click)="changeLanguage('hi')">Hindi</button>
<buttton (click)="changeLanguage('en')">English</button>
```

3. results when english/hindi buttons are clicked
 
<img width="308" alt="english-test" src="https://user-images.githubusercontent.com/39142854/212488539-f8e13cfe-35b8-4355-a772-afcbde6c59f2.png">

<img width="286" alt="hindi-test" src="https://user-images.githubusercontent.com/39142854/212488560-c07ddd4b-e54b-47ea-8728-f1590fc1f9ac.png">


## references
https://angular.io/guide/i18n-overview  
https://github.com/ngx-translate/core  
https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate-new  
https://www.digitalocean.com/community/tutorials/angular-ngx-translate  
https://medium.com/@mustafasaeed007/angular-localization-to-support-right-to-left-languages-7225a6c71eef
