import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserDetailComponent } from "./user-detail.component";

const routes: Routes = [
    {
        path: '',
        component: UserDetailComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserDetailRoutingModule { }