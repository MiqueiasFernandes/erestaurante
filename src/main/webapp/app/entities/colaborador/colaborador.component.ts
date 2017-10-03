import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Colaborador } from './colaborador.model';
import { ColaboradorService } from './colaborador.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-colaborador',
    templateUrl: './colaborador.component.html'
})
export class ColaboradorComponent implements OnInit, OnDestroy {
colaboradors: Colaborador[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private colaboradorService: ColaboradorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.colaboradorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.colaboradors = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInColaboradors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Colaborador) {
        return item.id;
    }
    registerChangeInColaboradors() {
        this.eventSubscriber = this.eventManager.subscribe('colaboradorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
