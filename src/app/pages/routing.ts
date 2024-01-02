import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard';
import { ListingViewComponent } from './listing/listing-view/listing-view.component';

const Routing: Routes = [
  {
    path: 'admin/company-setup',
    canActivate: [AuthGuard],
    data: {id:7},
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    data: { id: 1 },
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    data: { id: 1 },
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    data: {id:3},
    loadChildren: () =>
      import('./contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'listings',
    canActivate: [AuthGuard],
    data: { id: "2" },
    loadChildren: () =>
      import('./listing/listing.module').then((m) => m.ListingModule),
  },
  {
    path: 'listings/view',
    pathMatch: 'full',
    data: { id: "2" },
    component:ListingViewComponent,
  },
  {
    path: 'leads',
    canActivate: [AuthGuard],
    data: {id:4},
    loadChildren: () =>
      import('./leads/leads.module').then((m) => m.LeadModule),
  },
  {
    path: 'viewings',
    canActivate: [AuthGuard],
    data: {id:6},
    loadChildren: () =>
      import('./viewings/viewings.module').then((m) => m.ViewingsModule),
  },
  {
    path: 'deals',
    canActivate: [AuthGuard],
    data: {id:5},
    loadChildren: () =>
      import('./deals/deals.module').then((m) => m.DealModule),
  },
  {
    path: 'settings/company',
    canActivate: [AuthGuard],
    data: {id:7},
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'settings/users',
    canActivate: [AuthGuard],
    data: {id:8},
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'reports/listings',
    canActivate: [AuthGuard],
    data: {id:9},
    loadChildren: () =>
      import('./reports/listings/listings.module').then((m) => m.ListingsModule),
  },
  {
    path: 'reports/leads',
    canActivate: [AuthGuard],
    data: {id:9},
    loadChildren: () =>
      import('./reports/leads/leads.module').then((m) => m.LeadsModule),
  },
  {
    path: 'reports/viewings',
    canActivate: [AuthGuard],
    data: {id:9},
    loadChildren: () =>
      import('./reports/viewings/viewings.module').then((m) => m.ViewingsModule),
  },
  {
    path: 'reports/deals',
    canActivate: [AuthGuard],
    data: {id:9},
    loadChildren: () =>
      import('./reports/deals/deals.module').then((m) => m.DealsModule),
  },
  {
    path: 'reports/agent-leaderboard',
    canActivate: [AuthGuard],
    data: {id:9},
    loadChildren: () =>
      import('./reports/agent-leaderboard/agent-leaderboard.module').then((m) => m.AgentLeaderboardModule),
  },
  
  {
    path: 'crafted/pages/wizards',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    data: { layout: 'light-header' },
  },

  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  }
];

export { Routing };
