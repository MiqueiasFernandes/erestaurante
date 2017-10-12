import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {LoginService} from "../shared/login/login.service";
import {AutologinService} from "../shared/login/autologin.service";
import {CardapioService} from "../entities/cardapio/cardapio.service";
import {Cardapio} from "../entities/cardapio/cardapio.model";
import {Produto} from "../entities/produto/produto.model";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    modoCardapio :boolean = true;
    dia = '';
    dias :string[] = [];
    cardapio :Cardapio;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private autoLoginService :AutologinService,
        private cardapioService :CardapioService,
        private dataUtils: JhiDataUtils,
    ) {
        this.dias.push('Domingo');
        this.dias.push('Segunda');
        this.dias.push('Terça');
        this.dias.push('Quarta');
        this.dias.push( 'Quinta');
        this.dias.push('Sexta');
        this.dias.push('Sábado');
        this.montaCardapio(new Date().getDay());
    }

    ngOnInit() {

        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {

        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });

        this.eventManager.subscribe('autologin', (message) => {
            this.modoCardapio = message && message.content && message.content.startsWith('true');
        });

        this.autoLoginService.isAutoLogin().then((is) => {this.modoCardapio = is});
    }


    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    montaCardapio( day :number) :void {
        this.cardapioService.getCardapioOfDay(this.dia = this.dias[day]).subscribe(
            (cardapio :Cardapio) => {
                if (!isNullOrUndefined(cardapio) &&
                    !isNullOrUndefined(cardapio.produtos) &&
                    cardapio.produtos.length > 0) {
                    this.cardapio = cardapio;
                }
            }
        );
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }
}
