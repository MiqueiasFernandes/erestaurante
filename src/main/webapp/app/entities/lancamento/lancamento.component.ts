import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Lancamento } from './lancamento.model';
import { LancamentoService } from './lancamento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-lancamento',
    templateUrl: './lancamento.component.html'
})
export class LancamentoComponent implements OnInit, OnDestroy {
lancamentos: Lancamento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private lancamentoService: LancamentoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.lancamentoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.lancamentos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLancamentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Lancamento) {
        return item.id;
    }
    registerChangeInLancamentos() {
        this.eventSubscriber = this.eventManager.subscribe('lancamentoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
