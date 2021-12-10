import { RouterModule, Routes } from '@angular/router';

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
  {
    path: 'my-routes',
    loadChildren: () =>
      import('./pages/my-routes/my-routes.module').then(m => m.MyRoutesPageModule),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./pages/inventory/inventory.module').then(m => m.InventoryPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
