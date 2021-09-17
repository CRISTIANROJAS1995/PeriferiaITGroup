export class ProductModel {

    Id: number;
    IdStatus: number;
    Name: string;
    UnitValue: number;
    CreatedDate: Date;
    UpdateDate: Date;

    constructor() {
        this.Id = 0;
        this.IdStatus = 0;
        this.Name = '';
        this.UnitValue = 0;
        this.CreatedDate = new Date();
        this.UpdateDate = new Date();
    }

}