import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, } from '../../../../../../modules/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  user$: Observable<any>;
  langs = languages;
  userData:any;
  roleName:string;
  role:any
  AllRolesTypess: any[] = [
    { id: 1, name: 'Agent' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Admin' },
    { id: 4, name: 'SuperAdmin' },
  ];
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private translationService: TranslationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {    
    var uData = this.authService.userValue;
  if(uData != null){
  this.userData= JSON.parse(uData);
  }
  this.role = this.AllRolesTypess.filter((x: any) => {
    return x.id == this.userData.roleId;
  });
    this.roleName=this.role[0].name;
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

 
  logout() {
    localStorage.removeItem('user');
        this.auth.userSubject.next(null);
    localStorage.removeItem('userToken');
    this.auth.companySettingSubject.next(null);
    localStorage.removeItem('companySetting');
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
];
