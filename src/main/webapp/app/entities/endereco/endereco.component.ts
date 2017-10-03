import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Endereco } from './endereco.model';
import { EnderecoService } from './endereco.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-endereco',
    templateUrl: './endereco.component.html'
})
export class EnderecoComponent implements OnInit, OnDestroy {
enderecos: Endereco[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private enderecoService: EnderecoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.enderecoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.enderecos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEnderecos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Endereco) {
        return item.id;
    }
    registerChangeInEnderecos() {
        this.eventSubscriber = this.eventManager.subscribe('enderecoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
