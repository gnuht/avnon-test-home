import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'form',
    children: [
      {
        path: 'builder',
        loadChildren: () => import('./modules/builder/builder.module').then(m => m.BuilderModule)
      },
      {
        path: 'answers',
        loadChildren: () => import('./modules/answers/answers.module').then(m => m.AnswersModule)
      },
      {
        path: '',
        redirectTo: 'builder',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
