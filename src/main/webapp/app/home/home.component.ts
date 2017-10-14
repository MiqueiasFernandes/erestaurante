import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {LoginService} from "../shared/login/login.service";
import {AutologinService} from "../shared/login/autologin.service";
import {CardapioService} from "../entities/cardapio/cardapio.service";
import {Cardapio} from "../entities/cardapio/cardapio.model";
import {Produto} from "../entities/produto/produto.model";
import {isNullOrUndefined} from "util";
import {VariaveisService} from "../shared/utils/variaveis.service";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit, AfterViewInit{
    account: Account;
    modalRef: NgbModalRef;
    modoCardapio :boolean = true;
    dia = '';
    dias :string[] = [];
    cardapio :Cardapio;
    hoje = (new Date().getDay());
    status = 1;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private autoLoginService :AutologinService,
        private cardapioService :CardapioService,
        private dataUtils: JhiDataUtils,
        private variaveis: VariaveisService
    ) {
        this.dias.push('Domingo');
        this.dias.push('Segunda');
        this.dias.push('Terça');
        this.dias.push('Quarta');
        this.dias.push('Quinta');
        this.dias.push('Sexta');
        this.dias.push('Sábado');
    }

    ngAfterViewInit(): void {
        if(!this.modoCardapio || !this.cardapio){
            this.autoLoginService.isAutoLogin().then((is) => {
               this.modoCardapio = is;
                if(this.modoCardapio) {
                    this.montaCardapio(this.hoje);
                    this.status = 3;
                } else {
                    this.status = 2;
                }
            });
        }
    }

    ngOnInit() {

        this.principal.identity().then((account) => {
            this.account = account;
            if (this.autoLoginService.accountIsAutologin(account)) {
                this.status = 3;
            } else {
                this.status = 2;
            }
        });

        this.registerAuthenticationSuccess();

        this.variaveis.cardapioObserver$.subscribe((dia) => {
            this.montaCardapio(dia);
        });
    }

    registerAuthenticationSuccess() {

        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                if(this.modoCardapio = this.autoLoginService.accountIsAutologin(account)) {
                    this.montaCardapio(this.hoje);
                    this.status = 3;
                } else {
                    this.status = 2;
                }
            });
        });

        this.eventManager.subscribe('autologin', (message) => {
            this.modoCardapio = (message && message.content && message.content.startsWith('true'));
            this.montaCardapio(this.hoje);
            this.status = 3;
        });

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
                } else {
                    this.cardapio = null;
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
