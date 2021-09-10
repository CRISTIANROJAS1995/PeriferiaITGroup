export class UserModel {

    Id: number;
    IdRole: number;
    IdCountry: number;
    IdStatus: number;
    Email: String;
    Password: String;
    UserName: String;
    FullName: String;
    PhoneNumber: String;
    Address: String;
    City: String;
    Zip: String;
    BirthDate: Date;
    CreatedDate: Date;
    UpdateDate: Date;
    Photo: String;
    RequestToBeEmployed: boolean;
    CheckActivate?: number;

    constructor() {
        this.Id = 0;
        this.IdRole = 0;
        this.IdCountry = 0;
        this.IdStatus = 0;
        this.Email = '';
        this.Password = '';
        this.UserName = '';
        this.FullName = '';
        this.PhoneNumber = '';
        this.Address = '';
        this.City = '';
        this.Zip = '';
        this.BirthDate = new Date();
        this.CreatedDate = new Date();
        this.UpdateDate = new Date();
        this.Photo = '';
        this.RequestToBeEmployed = false;
        this.CheckActivate = 0;
    }

}