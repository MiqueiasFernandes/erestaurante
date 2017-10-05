import {
    Directive,
    ElementRef,
    ComponentFactoryResolver,
    ViewContainerRef,
    AfterViewInit,
    Input, ViewChild
} from '@angular/core';

import {TableheaderComponent} from "../../layouts/tableheader/tableheader.component";

@Directive({
    selector: '[jhiTableheader]'
})
export class TableheaderDirective implements AfterViewInit{

    factory = this.componentFactoryResolver.resolveComponentFactory(TableheaderComponent);

    colunas :string[] = [];
    checksHeader :boolean[] = [];
    switches :string[] = [];
    colunasRef :ElementRef[][] = [];
    tableHeaderInstance :TableheaderComponent;

    ngAfterViewInit(): void {
        const thread :Element[]  = this._elementRef.nativeElement
            .getElementsByTagName("THEAD");

        if (thread && thread.length > 0) {

            const tr :NodeListOf<Element>  = thread[0].getElementsByTagName("TR");

            if (tr && tr.length > 0) {
                const th :NodeListOf<Element>  = tr[0].getElementsByTagName('TH');

                if (th && th.length > 0) {

                    for (let i=0; i < th.length; i++) {
                        const el = th[i].getElementsByTagName("SPAN");

                        if (el[1]) {
                            const elref = new ElementRef(el[1]);
                            elref.nativeElement.style.backgroundColor = 'red';
                            const coluna :string =  elref.nativeElement.innerText

                            this.colunas.push(coluna);
                            this.checksHeader[coluna] = true;
                            this.colunasRef[coluna] = [new ElementRef(th[i])];
                            this.switches.push(
                                coluna +
                                ': <label class="switch">\n' +
                                '      <input type="checkbox" id="jhiTableheader-' + this.switches.length + '">\n' +
                                '           <span class="slider round"></span>\n' +
                                '  </label>');
                        }
                    }

                    this.importCampos();

                    if (this.tableHeaderInstance) {
                        this.tableHeaderInstance.createSwitches(this.colunas, this.colunasRef);
                    }

                }
            }
        }
    }


    private importCampos() {

        const trs :NodeListOf<Element>  =
            this._elementRef
            .nativeElement.getElementsByTagName("TR");

        for(let i =0; i<trs.length; i++) {

            if(trs[i]) {
                const tds :NodeListOf<Element>  = trs[i].getElementsByTagName('TD');
                if (tds && tds.length > 0) {
                    this.colunas.forEach((v, i) => {
                        this.colunasRef[v].push(new ElementRef(tds[i]));
                    });
                }
            }
        }

    }

    @Input()
    set jhiTableheader(tabela :ViewContainerRef) {
        const ref = tabela.createComponent(this.factory);
        this.tableHeaderInstance = ref.instance;
        ref.changeDetectorRef.detectChanges();
    }

    constructor(
        private _elementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}


}
