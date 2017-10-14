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
import {MesaSelectPopupComponent, SelectComponent} from './select/select.component';

import { QrScannerModule } from 'angular2-qrscanner';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

const ENTITY_STATES = [
    ...mesaRoute,
    ...mesaPopupRoute,
];

@NgModule({
    imports: [
        ERestauranteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        QrScannerModule
    ],
    declarations: [
        MesaComponent,
        MesaDetailComponent,
        MesaDialogComponent,
        MesaDeleteDialogComponent,
        MesaPopupComponent,
        MesaDeletePopupComponent,
        SelectComponent,
        MesaSelectPopupComponent
    ],
    entryComponents: [
        MesaComponent,
        MesaDialogComponent,
        MesaPopupComponent,
        MesaDeleteDialogComponent,
        MesaDeletePopupComponent,
        SelectComponent,
        MesaSelectPopupComponent
    ],
    providers: [
        MesaService,
        MesaPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ERestauranteMesaModule {}
