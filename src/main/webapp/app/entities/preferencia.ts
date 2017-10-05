
import {Observable} from "rxjs/Observable";
import {Colaborador} from "./colaborador/colaborador.model";


export class Preferencia {

    preferencia :string[] = [];
    colunas :boolean[][] = [];

    ////  padrao , separa preferencias
    ////         : separa nome
    /////////////////////////  para colunas
    /////      ; separa entidades
    /////      - nome da entidades
    /////      . separa colnas
    /////      T/F diz se esta ativada ou nao
    ////exemplo:

    //// cor:azul,colunas:colaborador-1T.2F;cargo-1F.2T

    constructor(private pref: string) {


      if (pref != null && pref.length > 0)   {
       this.preferencia.concat( pref.split(","));
      }

      this.preferencia.forEach( (pref: string) => {
          if (pref.startsWith("colunas:")) {
             pref.substring(8).split(";")
                 .forEach( (ent: string) => {

                   const data: string[] =  ent.split("-");
                   const nome =  data[0];
                   const bools :boolean[] = [];

                     this.colunas[nome] = bools;
                         data[1].split(".")
                       .forEach((col: string) => {
                           const col2  = col.substring(0, col.length -1);
                           this.colunas[nome][col2] = col.endsWith("T");
                       });
                 });
          }
      })

    }


    public isColnaAtivada(entidade: string, index: string) :boolean {
        return this.colunas[entidade] ? this.colunas[entidade][index] : false;
    }

    public getPreferencias(colaborador: Observable<Colaborador>): Observable<Preferencia> {
        return colaborador.map(
            colaborador  => new Preferencia(colaborador.preferencia)
        );
    }

}
