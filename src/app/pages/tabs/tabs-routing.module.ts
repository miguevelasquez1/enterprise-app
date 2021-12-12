import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/inventory/inventory.module').then(m => m.InventoryPageModule),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'my-routes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/my-routes/my-routes.module').then(m => m.MyRoutesPageModule),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/account/account.module').then(m => m.AccountPageModule),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'charts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/charts/charts.module').then(m => m.ChartsPageModule),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'my-routes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/my-routes/my-routes.module').then(m => m.MyRoutesPageModule),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/inventory/inventory.module').then(m => m.InventoryPageModule),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: '',
        redirectTo: '/account',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
