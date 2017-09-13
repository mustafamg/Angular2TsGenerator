import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ServiceBaseService } from 'app/services/service-base.Service';
import { SuggestedItem } from 'app/pages/products/components/productSuggest/suggestedItem';
import { LimitationInfo } from 'app/pages/products/components/productCompanySearch/limitationInfo';
import { ResultSet } from 'app/models/resultSet';

export abstract class ProductDataService extends ServiceBaseService {
    private companyUrl: string = 'company';

    constructor(protected http: Http, protected baseUrl: string) {
        super(http, baseUrl);
    }

    getCompanyProducts(companyID: string, searchtext: string, state: any): Observable<GridDataResult> {
        const params: any = {
            'companyID': companyID,
            'take': state.take,
            'skip': state.skip,
            'searchtext': searchtext,
        };
      
        return this.queryAction<ResultSet>('company', params)
            .map(response => (<GridDataResult>{
                data: response.list,
                total: response.totalCount,
            }));
    }

    queryProducts(state: any, searchtext: string) {
        const params: any = {
            // 'companyID': companyId, // todo: change that to Company Id
            'skip': state.skip,
            'take': state.take,
            'searchtext': searchtext,
        };
      
        return this.query<ResultSet>(params)
            .map(response => (<GridDataResult>{
                data: response.list,
                total: response.totalCount,
            }));
    }
    GetItemLimitation(companyID: string): Observable<LimitationInfo> {
        const params: any = {
            'companyID': companyID,
        };
      
        return this.queryAction<LimitationInfo>('limitation', params);
      }

    deleteCompanyProduct(companyId: string, productId: string): Observable<string> {
        const params: any = { 
            productId,
            companyId,
           };
        return this.deleteDetail(this.companyUrl, params)
            .catch(this.handleErrorObservable);
    }

    addProductstoCompany(companyId: string, productIds: string): Observable<string> {
        const params: any = { 
            productIds,
            companyId,
           };
        return this.addDetail(this.companyUrl, params)
            .map(response => (<string>response))
            .catch(this.handleErrorObservable);
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
@Injectable()
export class ProductService extends ProductDataService {
    constructor(http: Http) { super(http, 'http://localhost:8457/api/products' ); }
}
