export class Account {
    constructor(
        public name: string,
        public avatar: string,
        public token: string,
        public email: string,
        public phone: string,
        public address: string,
        public roles: Array<string>
    ) {}
}
