export class TransactionModel {

    Id: number;
    IdStatus: number;
    IdTransactionType: number;
    IdClient: number;
    IdProduct: number;
    Amount: number;
    UnitValue: number;
    TotalValue: number;
    CreatedDate: Date;
    UpdateDate: Date;
    IdUser: number;

    constructor() {
        this.Id = 0;
        this.IdStatus = 0;
        this.IdTransactionType = 0;
        this.IdClient = 0;
        this.IdProduct = 0;
        this.Amount = 0;
        this.UnitValue = 0;
        this.TotalValue = 0;
        this.CreatedDate = new Date();
        this.UpdateDate = new Date();
        this.IdUser = 0;
    }

}