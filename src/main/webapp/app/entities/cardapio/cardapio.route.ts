import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CardapioComponent } from './cardapio.component';
import { CardapioDetailComponent } from './cardapio-detail.component';
import { CardapioPopupComponent } from './cardapio-dialog.component';
import { CardapioDeletePopupComponent } from './cardapio-delete-dialog.component';

export const cardapioRoute: Routes = [
    {
        path: 'cardapio',
        component: CardapioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cardapio/:id',
        component: CardapioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardapioPopupRoute: Routes = [
    {
        path: 'cardapio-new',
        component: CardapioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cardapio/:id/edit',
        component: CardapioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cardapio/:id/delete',
        component: CardapioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.cardapio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
