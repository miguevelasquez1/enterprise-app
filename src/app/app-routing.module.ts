
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rutas',
    loadChildren: () => import('./pages/home/pages/rutas-list/rutas-list.module').then( m => m.RutasListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rutas-form',
    loadChildren: () => import('./pages/home/pages/rutas-form/rutas-form.module').then( m => m.RutasFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pay',
    loadChildren: () => import('./pages/home/pages/pay/pay.module').then( m => m.PayPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventario-form',
    loadChildren: () => import('./pages/home/pages/inventario-form/inventario-form.module').then( m => m.InventarioFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/home/pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'welcome-slide',
    loadChildren: () => import('./pages/welcome-slide/welcome-slide.module').then( m => m.WelcomeSlidePageModule)
  },
  {
    path: 'choose-category',
    loadChildren: () => import('./pages/choose-category/choose-category.module').then( m => m.ChooseCategoryPageModule)
  },
  {
    path: 'set-email',
    loadChildren: () => import('./pages/set-email/set-email.module').then( m => m.SetEmailPageModule)
  },
  {
    path: 'put-your-phone',
    loadChildren: () => import('./pages/put-your-phone/put-your-phone.module').then( m => m.PutYourPhonePageModule)
  },
  {
    path: 'enterprise-name',
    loadChildren: () => import('./pages/enterprise-name/enterprise-name.module').then( m => m.EnterpriseNamePageModule)
  },
  {
    path: 'select-your-service',
    loadChildren: () => import('./pages/select-your-service/select-your-service.module').then( m => m.SelectYourServicePageModule)
  },
  {
    path: 'type-a-password',
    loadChildren: () => import('./pages/type-a-password/type-a-password.module').then( m => m.TypeAPasswordPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
