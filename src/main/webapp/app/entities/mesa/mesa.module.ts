import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ERestauranteSharedModule } from '../../shared';
import {
    MesaService,
    MesaPopupService,
    MesaComponent,
    MesaDetailComponent,
    MesaDialogComponent,
    MesaPopupComponent,
    MesaDeletePopupComponent,
    MesaDeleteDialogComponent,
    mesaRoute,
    mesaPopupRoute,
} from './';
import { SelectComponent } from './select/select.component';

const ENTITY_STATES = [
    ...mesaRoute,
    ...mesaPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MesaComponent,
        MesaDetailComponent,
        MesaDialogComponent,
        MesaDeleteDialogComponent,
        MesaPopupComponent,
        MesaDeletePopupComponent,
        SelectComponent,
    ],
    entryComponents: [
        MesaComponent,
        MesaDialogComponent,
        MesaPopupComponent,
        MesaDeleteDialogComponent,
        MesaDeletePopupComponent,
        SelectComponent
    ],
    providers: [
        MesaService,
        MesaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteMesaModule {}
