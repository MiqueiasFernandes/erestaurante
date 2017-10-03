import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Imposto } from './imposto.model';
import { ImpostoService } from './imposto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-imposto',
    templateUrl: './imposto.component.html'
})
export class ImpostoComponent implements OnInit, OnDestroy {
impostos: Imposto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private impostoService: ImpostoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.impostoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.impostos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInImpostos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Imposto) {
        return item.id;
    }
    registerChangeInImpostos() {
        this.eventSubscriber = this.eventManager.subscribe('impostoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
