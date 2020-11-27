export class District {
    constructor(
        public id: number,
        public name: string,
        public wards: Array<string>
    ) {}
}