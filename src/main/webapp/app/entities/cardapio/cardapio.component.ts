import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Cardapio } from './cardapio.model';
import { CardapioService } from './cardapio.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-cardapio',
    templateUrl: './cardapio.component.html'
})
export class CardapioComponent implements OnInit, OnDestroy {
cardapios: Cardapio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cardapioService: CardapioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cardapioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cardapios = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCardapios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cardapio) {
        return item.id;
    }
    registerChangeInCardapios() {
        this.eventSubscriber = this.eventManager.subscribe('cardapioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
