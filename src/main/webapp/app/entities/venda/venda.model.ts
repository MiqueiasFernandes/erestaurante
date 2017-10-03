import { BaseEntity } from './../../shared';

export class Venda implements BaseEntity {
    constructor(
        public id?: number,
        public data?: any,
        public quantidade?: number,
        public desconto?: number,
        public produto?: BaseEntity,
        public comanda?: BaseEntity,
    ) {
    }
}
