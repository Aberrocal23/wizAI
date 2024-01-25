import { RouterModule, Routes } from "@angular/router";
import { DatagridComponent } from "./datagrid.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: DatagridComponent
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
export class DatagridRoutingModule { }