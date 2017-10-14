import {Component, AfterViewChecked, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MesaService} from "../mesa.service";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {Mesa} from "../mesa.model";
import { MesaPopupService } from '../mesa-popup.service';

import { JhiAlertService } from 'ng-jhipster';
import {isNullOrUndefined} from "util";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VariaveisService} from "../../../shared/utils/variaveis.service";


@Component({
    selector: 'jhi-select',
    templateUrl: './select.component.html',
    styleUrls: ['../../../layouts/tableheader/tableheader.component.scss']
})
export class SelectComponent implements OnInit, AfterViewChecked{


    mesa: Mesa;
    mesas: Mesa[];
    codigo = '';
    codigos = [];
    autocomplete = null;
    espelhado = false;
    auto = false;
    fechar = function () {};
    // http://localhost:9000/#/(popup:mesa/ms1/set)


    constructor(
        private variaveis: VariaveisService,
        private jhiAlertService: JhiAlertService,
        private activeModal: NgbActiveModal,
        private mesaService :MesaService) {
    }

    ngOnInit(): void {
        if(!isNullOrUndefined(this.mesa) && !isNullOrUndefined(this.mesa.codigo)){
            this.setMesa(false);
            this.fechar = this.close;
        } else {
            this.auto = true;
            this.loadAll();
        }
    }

    ngAfterViewChecked(): void {
       this.fechar();
    }

    loadAll() {
        this.mesaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.mesas = res.json;
                this.codigos = this.mesas.map(m => m.codigo);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    atualizar(){
        this.autocomplete = this.codigos.find(cd => isNullOrUndefined(cd) ? false : cd.startsWith(this.codigo));
    }

    setCodigo(codigo :string) {
        this.mesa = this.mesas.find(m => m.codigo === (this.codigo = codigo));
    }

    close() {
        this.activeModal.close(this.mesa);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    setMesa(close) {
        this.variaveis.setMesa(this.mesa);
        if(close) {
            this.close();
        }
    }

    decodedOutput($event){
        this.setCodigo($event);
        if (!isNullOrUndefined(this.mesas) &&
            !isNullOrUndefined(this.mesa.codigo) &&
            (this.mesa.codigo === this.codigo)) {
            this.setMesa(true);
        }
    }

    trocar() {
        this.auto = false;
        this.espelhado = !this.espelhado;
        setTimeout(()=> {this.auto = true}, 500);
    }
}

@Component({
    selector: 'jhi-mesa-select-popup',
    template: ''
})
export class MesaSelectPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mesaPopupService: MesaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mesaPopupService
                    .open(SelectComponent as Component, params['id']);
            } else {
                this.mesaPopupService
                    .open(SelectComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
