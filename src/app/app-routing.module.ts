import { AuthGuard } from './_guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './_guards/intro.guard';
import { AutoLoginGuard } from './_guards/auto-login.guard';
 
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./_pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard] // Check if we should show the introduction or forward to inside
  },
  {
    path: 'intro',
    loadChildren: () => import('./_pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
