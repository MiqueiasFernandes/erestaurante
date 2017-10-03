import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MesaComponent } from './mesa.component';
import { MesaDetailComponent } from './mesa-detail.component';
import { MesaPopupComponent } from './mesa-dialog.component';
import { MesaDeletePopupComponent } from './mesa-delete-dialog.component';

export const mesaRoute: Routes = [
    {
        path: 'mesa',
        component: MesaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.mesa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mesa/:id',
        component: MesaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.mesa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mesaPopupRoute: Routes = [
    {
        path: 'mesa-new',
        component: MesaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.mesa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mesa/:id/edit',
        component: MesaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.mesa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mesa/:id/delete',
        component: MesaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.mesa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
