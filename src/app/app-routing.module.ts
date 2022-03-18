import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { IsEnterpriseGuard } from './guards/is-enterprise/is-enterprise.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome-slide',
    loadChildren: () =>
      import('./pages/welcome-slide/welcome-slide.module').then(m => m.WelcomeSlidePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'choose-category',
    loadChildren: () =>
      import('./pages/choose-category/choose-category.module').then(
        m => m.ChooseCategoryPageModule,
      ),
      canActivate: [IsEnterpriseGuard]
  },
  {
    path: 'set-email',
    loadChildren: () =>
      import('./pages/set-email/set-email.module').then(m => m.SetEmailPageModule),
  },
  {
    path: 'put-your-phone',
    loadChildren: () =>
      import('./pages/put-your-phone/put-your-phone.module').then(m => m.PutYourPhonePageModule),
  },
  {
    path: 'enterprise-name',
    loadChildren: () =>
      import('./pages/enterprise-name/enterprise-name.module').then(
        m => m.EnterpriseNamePageModule,
      ),
  },
  {
    path: 'select-your-service',
    loadChildren: () =>
      import('./pages/select-your-service/select-your-service.module').then(
        m => m.SelectYourServicePageModule,
      ),
  },
  {
    path: 'type-a-password',
    loadChildren: () =>
      import('./pages/type-a-password/type-a-password.module').then(m => m.TypeAPasswordPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'company-name',
    loadChildren: () => import('./pages/company-name/company-name.module').then( m => m.CompanyNamePageModule)
  },
  {
    path: 'login-options',
    loadChildren: () => import('./pages/login-options/login-options.module').then( m => m.LoginOptionsPageModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
