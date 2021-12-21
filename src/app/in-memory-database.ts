
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Category } from "./pages/categories/shared/category.model";
export class InMemoryDataBase implements InMemoryDbService{

    createDb() {
        const categories: Category[] = [
            {id: 1, name: "Moradia", description: 'Pagamentos de Contas de casa'},
            {id: 2, name: "Saúde", description: 'Plano de Saúde e Remédios'},
            {id: 3, name: "Lazer", description: 'Cinema, parques, praia, etc'},
            {id: 4, name: "Sálario", description: 'Recebimento de salário'},
            {id: 5, name: "Freelas", description: 'Trabalhos como freelancer'},
        ];
        return categories;
    }
    
}