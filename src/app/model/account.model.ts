export class Account {
    constructor(
        public name: string,
        public avatar: string,
        public token: string,
        public roles: Array<string>
    ) {}
}
