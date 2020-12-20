export class RegistRequest {
    public username: string;
    public password: string;
    public name: string;
    public email: string;
    public address: string;
    public  phone: string;
    private roles = ['ROLE_CUSTOMER']
    constructor(){};
}
