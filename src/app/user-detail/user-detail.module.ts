import { NgModule } from "@angular/core";
import { UserDetailComponent } from "./user-detail.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserDetailRoutingModule } from "./user-detail-routing.module";

@NgModule({
    declarations: [UserDetailComponent],
    imports: [
        CommonModule,
        UserDetailRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [UserDetailComponent]
})
export class UserDetailModule{
}