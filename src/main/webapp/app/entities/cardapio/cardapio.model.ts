import { BaseEntity } from './../../shared';

export class Cardapio implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public periodo?: string,
        public disposicao?: string,
        public habilitar?: boolean,
        public produtos?: BaseEntity[],
    ) {
        this.habilitar = false;
    }
}
