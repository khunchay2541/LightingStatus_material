import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path:'dashbord',component: DashbordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
