import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    ERestauranteSharedLibsModule,
    ERestauranteSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    JhiTrackerService,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent, AutologinService
} from './';
import {TableheaderDirective} from "./utils/tableheader.directive";
import {VariaveisService} from "./utils/variaveis.service";

@NgModule({
    imports: [
        ERestauranteSharedLibsModule,
        ERestauranteSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        TableheaderDirective
    ],
    providers: [
        AutologinService,
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        UserService,
        DatePipe,
        VariaveisService
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        ERestauranteSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        TableheaderDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ERestauranteSharedModule {}
