import { Category } from '../../categories/shared/category.model';
export class Entry{
    constructor(
        public id?: number,
        public nome?:string,
        public description?:string,
        public type?:string,
        public amount?: number,
        public date?: string,
        public paid?:boolean,
        public categoriaId?: number,
        public categoria?:Category){}

        static types = {
            expense : 'Despesa',
            renevue: 'Receita'
        }

        get paidText():string{
            return this.paid ? 'Pago' : 'Pedente';
        }
}