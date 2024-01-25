import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatagridComponent } from "./datagrid.component";
import { UserCardComponent } from "../user-card/user-card.component";
import { DatagridRoutingModule } from "./datagrid-routing.module";

@NgModule({
    declarations: [
        DatagridComponent,
        UserCardComponent
    ],
    imports: [
        CommonModule,
        DatagridRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        DatagridComponent,
        UserCardComponent
    ]
})
export class DatagridModule{
}