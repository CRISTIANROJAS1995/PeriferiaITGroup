export class ProductSaleModel {

    Id: number;
    IdStatus: number;
    Name: string;
    UnitValue: number;
    Amount: number;
    TotalValue: number;
    CreatedDate: Date;
    UpdateDate: Date;
    Identification: number;

    constructor() {
        this.Id = 0;
        this.IdStatus = 0;
        this.Name = '';
        this.UnitValue = 0;
        this.Amount = 0;
        this.TotalValue = 0;
        this.CreatedDate = new Date();
        this.UpdateDate = new Date();
        this.Identification = 0;
    }

}