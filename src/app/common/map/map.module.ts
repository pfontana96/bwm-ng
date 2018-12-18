import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from "@angular/platform-browser";

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';

@NgModule({
  declarations: [
      MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD2Wexii7MiVlFK0qZ_EfmQifjizZ8Z_Po'
    }),
    BrowserModule
  ],
  providers: [
    MapService,
    CamelizePipe
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
