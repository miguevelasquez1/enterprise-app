import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'inventario',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/inventario/inventario.module').then( m => m.InventarioPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'rutas',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/misrutas-list/misrutas-list.module').then( m => m.MisrutasListPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'rutas-form',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/rutas-form/rutas-form.module').then( m => m.RutasFormPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'charts',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/charts/charts.module').then( m => m.ChartsPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: '',
        redirectTo: '/home/account',
        pathMatch: 'full'
      },
      {
        path: 'personal-data',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/personal-data/personal-data.module').then( m => m.PersonalDataPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: '',
        redirectTo: '/home/personal-data',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
