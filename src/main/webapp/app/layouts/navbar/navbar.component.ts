import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService, VariaveisService } from '../../shared';

import { VERSION, DEBUG_INFO_ENABLED } from '../../app.constants';
import {PrivilegiosService} from "../../entities/privilegios.service";
import { JhiEventManager } from 'ng-jhipster';
import {AutologinService} from "../../shared/login/autologin.service";
import {Comanda} from "../../entities/comanda/comanda.model";
import {Mesa} from "../../entities/mesa/mesa.model";
import {SelectComponent} from "../../entities/mesa/select/select.component";
import {isNullOrUndefined} from "util";
@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    permissoes :string[] = [];
    autoLogin = false;
    dia = 0;
    comanda :Comanda;
    mesa :Mesa;
    isOpen = false;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private autoLoginService: AutologinService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private privilegios :PrivilegiosService,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private variaveis :VariaveisService
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.dia= new Date().getDay();
    }

    ngOnInit() {

        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().subscribe((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.eventManager.subscribe('logout', (message) => {
            this.atualizar();
        });

        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.atualizar();
        });

        this.eventManager.subscribe('autologin', (message) => {
            this.autoLogin = message && message.content && message.content.startsWith('true');
            this.atualizar();
        });

        this.autoLoginService.isAutoLogin().then((is) => {this.autoLogin = is});

        this.variaveis.mesaComandaObserver$.subscribe(
            (mesaEcomanda :{mesa :Mesa, comanda :Comanda}) => {
            this.mesa = mesaEcomanda.mesa;
            this.comanda = mesaEcomanda.comanda;
        });

        this.atualizar();
    }

    atualizar() {

        if (this.isAuthenticated()) {
            this.privilegios.hasPermissao('produto', 'view', true).subscribe(
                (res: { has: boolean, privs: string[][] }) => {
                    Object.keys(res.privs).forEach(k => {
                        if (res.privs[k].length > 0) {
                            this.permissoes.push(k);
                            this.permissoes[k] = true;
                        }
                    });
                }
            );
        }

        this.variaveis.update();
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout(nonotify? :boolean) {
        this.collapseNavbar();
        this.loginService.logout(nonotify);
        this.router.navigate(['']);
        if (nonotify) {
            this.login();
        }
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }


    getMesa() :string {
        if(!isNullOrUndefined(this.mesa)){
            return '(' + this.mesa.codigo + ')';
        }

        return '';
    }

    getComanda() :string {
        if(!isNullOrUndefined(this.comanda)){
            return '( R$ ' + this.comanda.total + ' )';
        }
        return '';
    }

    updateComanda() {
        this.variaveis.update();
    }

    setMesa() {
        this.open();
        if (!this.variaveis.hasMesa()) {
        } else {
            this.variaveis.update();
        }
    }

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(SelectComponent, {
            container: 'nav'
        });
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }

}
