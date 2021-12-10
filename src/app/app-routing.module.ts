import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'welcome-slide',
    loadChildren: () =>
      import('./pages/welcome-slide/welcome-slide.module').then(m => m.WelcomeSlidePageModule),
  },
  {
    path: 'choose-category',
    loadChildren: () =>
      import('./pages/choose-category/choose-category.module').then(
        m => m.ChooseCategoryPageModule,
      ),
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
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
