import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Mesa} from "../../entities/mesa/mesa.model";
import {Comanda} from "../../entities/comanda/comanda.model";

import { LocalStorageService } from 'ng2-webstorage';
import {isNullOrUndefined} from "util";
import {MesaService} from "../../entities/mesa/mesa.service";
import {ComandaService} from "../../entities/comanda/comanda.service";
import {Observable} from "rxjs/Observable";
import {toBase64String} from "@angular/compiler/src/output/source_map";

@Injectable()
export class VariaveisService {

    expires :number = 1000 * 3600 * 5;

    private observeMesaComanda = new Subject<{mesa: Mesa, comanda: Comanda}>();
    public mesaComandaObserver$ = this.observeMesaComanda.asObservable();
    private observeCardapio = new Subject<number>();
    public cardapioObserver$ = this.observeCardapio.asObservable();

    constructor(
        private $localStorage: LocalStorageService,
        private mesaService :MesaService,
        private comandaService :ComandaService
    ) {
    }

    public setCardapioDay(dia: number) {
        this.observeCardapio.next(dia);
    }

    public getMesa() :Observable<Mesa>{
        const id = this.getMesaIdFromstorage();
        if (isNullOrUndefined(id)) {
            return Observable.of(undefined);
        }
        return this.mesaService.find(id);
    }

    public getComanda() :Observable<Comanda> {
        const id = this.getMesaIdFromstorage();
        if (isNullOrUndefined(id)) {
            return Observable.of(undefined);
        }
        return this.comandaService.findByMesa(id);
    }

    public setMesa(mesa :Mesa) {
        this.storeData('mesa',mesa.id + '');
        this.update();
    }

    public update() {
        this.getMesa().subscribe( (mesa) => {
            this.getComanda().subscribe( (comanda) => {
                this.observeMesaComanda.next({
                    mesa:mesa,
                    comanda:comanda
                });
            }, (e) => {
                this.observeMesaComanda.next({
                    mesa:mesa,
                    comanda:undefined
                });
            });
        });
    }

    public hasMesa() :boolean{
        return !isNullOrUndefined(this.getMesaIdFromstorage());
    }

    private getMesaIdFromstorage() :number {

        let id: number = undefined;
        const mesaD =  this.$localStorage.retrieve('mesa');

        if (isNullOrUndefined(mesaD)) {
            return id;
        }

        try {

            const time: number = mesaD.time;
            id = mesaD.data;

            if (new Date().getTime() > (time + this.expires)) {
                this.limparOnStorage('mesa');
                return undefined;
            }

        } catch (e) {
            console.log('Erro variaveisService:59 ' + e);
            return undefined;
        }

        return id;
    }


    private storeData(id :string, data :string) {
        this.limparOnStorage(id);
        this.$localStorage.store(id, {time : new Date().getTime(), data : data});
    }

    private limparOnStorage(id :string) {
        this.$localStorage.clear(id);
    }









    //
    // mesa :Mesa;
    //
    // private observeMesa = new Subject<Mesa>();
    // public mesaObserver$ = this.observeMesa.asObservable();
    // private observeComanda = new Subject<Comanda>();
    // public comandaObserver$ = this.observeComanda.asObservable();
    //
    //
    //
    //
    // public getMesa() {
    //     return this.mesaObserver$;
    // }
    //
    // public getComanda() {
    //     return this.comandaObserver$;
    // }
    //
    // public getComandaDaMesa() :Observable<Comanda> {
    //     return Observable.of(undefined);
    //     // return this.comandaService.findByMesa(this.mesa.id);
    // }
    //
    // public setMesa(mesa :Mesa) {
    //     this.mesa = mesa;
    //     this.storeData('mesa', 'id:' + mesa.id);
    //     this.updateMesa();
    // }
    //
    // public hasMesa() :boolean {
    //
    //     const mesaD =  this.$localStorage.retrieve('mesa');
    //
    //     if (isNullOrUndefined(mesaD)) {
    //         return false;
    //     }
    //     const time :number = mesaD.time;
    //
    //     if (new Date().getTime() > (time + this.expires) ) {
    //         this.limpar('mesa');
    //         return false;
    //     }
    //
    //     return isNullOrUndefined(
    //         this.setMesaByID(this.getData(mesaD.data))
    //     ) ? false : true;
    // }
    //
    // private setMesaByID(id :string) :string {
    //     if (!isNullOrUndefined(id)) {
    //         this.mesaService.find(parseInt(id)).subscribe(
    //             (mesa) => this.updateMesa(mesa)
    //         );
    //     }
    //     return id;
    // }
    //
    // public hasComanda() :Observable<boolean> {
    //     if (isNullOrUndefined(this.mesa) && !this.hasMesa()){
    //        return Observable.of(false);
    //     }
    //
    //     console.log('mesa');
    //     console.log(this.mesa);
    //
    //     // if (this.mesa)
    //
    //         return Observable.of(false);
    //
    //     // return this.comandaService.findByMesa(this.mesa.id).map((res) => !isNullOrUndefined(res));
    // }
    //
    // private getData(data :string) :string{
    //     return isNullOrUndefined(data) ? undefined :
    //         (data.indexOf(':') > 0 ?
    //             data.split(':')[1] : undefined);
    // }
    //
    //
    //
    // private updateMesa(mesa? :Mesa) {
    //     if (!isNullOrUndefined(mesa)) {
    //         this.mesa = mesa;
    //     }
    //     if (!isNullOrUndefined(this.mesa)) {
    //         this.observeMesa.next(this.mesa);
    //     }
    //     this.updateComanda();
    // }
    //
    // private updateComanda() {
    //     if (isNullOrUndefined(this.mesa)) {
    //         this.observeComanda.next(undefined);
    //     }
    //     this.getComandaDaMesa().subscribe( c => this.observeComanda.next(c));
    // }
    //
    // public getMesaAndComanda() :Observable<{mesa :Mesa, comanda :Comanda}> {
    //     const ret = {mesa : undefined, comanda: undefined};
    //
    //     if (isNullOrUndefined(this.mesa)) {
    //         return Observable.from(null);
    //     }
    //
    //     return this.getComanda().map( (c) => ({mesa : this.mesa, comanda : c}));
    // }

    // public sendMesaAndComanda() {
    //     this.updateMesa();
    // }

}
