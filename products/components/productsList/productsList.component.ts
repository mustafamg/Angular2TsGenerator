
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ProductService } from 'app/services/product.service';
import { Router } from '@angular/router';

@Component({
    selector: 'nga-prouctslist-component',
    templateUrl: './prouctsList.component.html',
    providers: [ProductService],
})

export class ProuctsListComponent implements OnInit {

    gridView: Observable<GridDataResult>;
    state: State = {
        skip: 0,
        take: 10,
    };

    limitationInfo: any;
    addedProductList = new Array();
    itemType: number;
    companyId: string = 'c';
    searchText: string = '';
    responseMessage: string;
    errorMessage: string;
    opened: boolean = false;
    openConfirmation: boolean = false;

    constructor(private router: Router,
        private service: ProductService) {
       
    }
    ngOnInit() {
        this.loadItems('');
        this.GetItemLimiataion();
          }
    loadItems(value: string): void {        
        this.gridView = this.service.queryProucts(this.state, '');
    }

    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridView = this.service.queryProucts(this.state, 
            this.searchText);
    }

    getClick(checked: any, itemData: any): void {
        this.responseMessage = null;
        if (checked) {
            this.addedProductList.push(<string>itemData.productId);
        } else {
            console.info(this.addedProductList);
            const index = this.addedProductList.indexOf(itemData.productId, 0);
            if (index > -1) {
                this.addedProductList.splice(index, 1);
            }
            console.info(this.addedProductList);
        }
    }

    GetItemLimiataion() {
        this.service.GetItemLimitation(this.companyId)
        .subscribe(allData => {
            // this.allData = allData;
            console.info(allData);
            this.limitationInfo = allData;
        });
    }

    Save() {
        if (this.addedProductList.length > (this.limitationInfo.maxCompanyLimitation
            - this.limitationInfo.selectedItemsCount)) {
            this.opened = true;
        } else {
            this.openConfirmation = true;
        }
    }

    closeExceed(confirm: any): void {
        if (confirm === 'deselect' || confirm === 'cancel') {
            this.opened = false;
        } else {

            this.opened = false;
            this.router.navigateByUrl('pages/proucts/search');
        }
    }

    closeConfirmation(confirm: any): void {
        if (confirm === 'No' || confirm === 'cancel') {
            this.openConfirmation = false;
        } else {
            this.openConfirmation = false;

            let arrayDelimiters = '';
            this.addedProductList.forEach(element => {
                arrayDelimiters = `${element},`;
            });

            console.info(arrayDelimiters);

            this.service.addProuctstoCompany(this.companyId, arrayDelimiters).subscribe(response => {
                this.responseMessage = response;
                console.info(response);
                this.loadItems(this.searchText);
                this.GetItemLimiataion();
            },
                error => this.errorMessage = <any>error);

            this.addedProductList = [];
        }
    }

    isChecked(dataItem): boolean {

        /*   var index = this.addedProductList.indexOf(dataItem.productId);      
           if (index > -1) {
           return true;
           } */
        return false;

    }

    Navigate() {
        this.router.navigateByUrl('pages/proucts/search');
    }

    anyItemChecked(): boolean {
        return (this.addedProductList.length < 1);
    }
}
