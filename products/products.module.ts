
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule , NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing } from './Proucts.routing';
import { ProuctsComponent } from './Proucts.component';
import { ProductCompanySearchComponent } from './components/productCompanySearch/productCompanySearch.component';
import { ProuctsListComponent } from './components/ProuctsList/ProuctsList.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { SliderModule } from '@progress/kendo-angular-inputs';
import { StargateAPIService } from 'app/services/StargateAPI.Service';
import { ProuctsService } from 'app/services/product.service';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview/src';
import { PopupModule } from '@progress/kendo-angular-popup';
import { SharedModule } from 'App/pages/sharedComponents/sharedModule';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    routing,
    GridModule,
    SliderModule,
    NgbModalModule,
    JsonpModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    FormsModule,
    TreeviewModule.forRoot(),
    PopupModule,
    SharedModule,
  ],
  entryComponents: [
  
  ],
  declarations: [
   ProuctsComponent,
   ProuctsListComponent,
  ],
   providers: [   
    StargateAPIService,
    ProuctsService,
  ],
})
export class ProuctsModule {
}
