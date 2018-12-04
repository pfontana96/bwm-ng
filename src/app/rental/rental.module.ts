import { NgModule } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { BrowserModule } from "@angular/platform-browser";

import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

const routes: Routes = [
    {path:'rentals', component: RentalComponent,
    children: [
        {path:'', component:RentalListComponent},
        {path:':rentalId', component:RentalDetailComponent}
    ]}
  ]


@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent
    ],
    imports: [BrowserModule,
    RouterModule.forChild(routes)],
    providers: [RentalService]
})
export class RentalModule {}