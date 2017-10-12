import {Component, OnInit, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Produto } from './produto.model';
import { ProdutoService } from './produto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import {PreferenciasService} from "../preferencias.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'jhi-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit, OnDestroy {


    @ViewChild('tableH', {read: ViewContainerRef}) tableHeader;
    private modoTabela = false;
    private produtos: Produto[];
    private currentAccount: any;
    private eventSubscriber: Subscription;
    // private checksHeader :boolean[] = [];
    private hides :boolean[] = [];
    private modoProd :boolean[] = [];

    constructor(
        private produtoService: ProdutoService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private preferenciaService :PreferenciasService
    ) {
    }

    loadAll() {
        this.produtoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.produtos = res.json;
                this.produtos.forEach((p) => this.modoProd[p.id] = this.hides[p.id] = true);
                this.updateView();
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.preferenciaService.getPref('pt').subscribe(
            (pref :string) => this.modoTabela = (!isNullOrUndefined(pref) && pref.endsWith('T'))
        );

    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Produto) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInProdutos() {
        this.eventSubscriber = this.eventManager.subscribe('produtoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    setModoTabela() {
        this.modoTabela = !this.modoTabela;
        this.preferenciaService.setPreferencia('pt', (this.modoTabela ? 'T' : 'F'));
        if (!this.modoTabela) {
            if (!isNullOrUndefined(this.tableHeader)) {
                this.tableHeader.clear();
            }
            this.updateView();
        }
    }

    private updateView() {
        this.produtos.forEach((p) => {
            this.preferenciaService.isProdutoVisivel(p.id).subscribe(
                (ref :any) => {
                    this.hides[ref.id] = ref.visivel;
                    console.log(ref);
                }
            );
        });
    }

    hideProduto(produto: Produto, hide :boolean) {
        this.preferenciaService.storeProdPref(produto.id, hide);
        this.hides[produto.id] = hide;
    }

    salvarProduto(produto :Produto) {
        this.produtoService.update(produto).subscribe();
    }
}
