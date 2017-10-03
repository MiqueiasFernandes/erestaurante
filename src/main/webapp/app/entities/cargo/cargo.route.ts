import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CargoComponent } from './cargo.component';
import { CargoDetailComponent } from './cargo-detail.component';
import { CargoPopupComponent } from './cargo-dialog.component';
import { CargoDeletePopupComponent } from './cargo-delete-dialog.component';

export const cargoRoute: Routes = [
    {
        path: 'cargo',
        component: CargoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cargo/:id',
        component: CargoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cargoPopupRoute: Routes = [
    {
        path: 'cargo-new',
        component: CargoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cargo/:id/edit',
        component: CargoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cargo/:id/delete',
        component: CargoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
