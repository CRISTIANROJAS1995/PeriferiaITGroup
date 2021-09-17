export class ClientModel {

    Id: number;
    IdStatus: number;
    FirstName: string;
    LastName: string;
    Identification: string;
    PhoneNumber: string;
    CreatedDate: Date;
    UpdateDate: Date;

    constructor() {
        this.Id = 0;
        this.IdStatus = 0;
        this.FirstName = '';
        this.LastName = '';
        this.Identification = '';
        this.PhoneNumber = '';
        this.CreatedDate = new Date();
        this.UpdateDate = new Date();
    }

}