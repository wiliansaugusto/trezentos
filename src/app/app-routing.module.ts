import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { CeifadoresComponent } from './ceifadores/ceifadores.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"registrar",component:RegistrarComponent},
  {path:"ceifadores",component:CeifadoresComponent},
  {path:"**", component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
