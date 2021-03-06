import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProdutoComponent } from './produto.component';
import { ProdutoDetailComponent } from './produto-detail.component';
import { ProdutoPopupComponent } from './produto-dialog.component';
import { ProdutoDeletePopupComponent } from './produto-delete-dialog.component';

export const produtoRoute: Routes = [
    {
        path: 'produto',
        component: ProdutoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'produto/:id',
        component: ProdutoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const produtoPopupRoute: Routes = [
    {
        path: 'produto-new',
        component: ProdutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'produto/:id/edit',
        component: ProdutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'produto/:id/delete',
        component: ProdutoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eRestauranteApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
