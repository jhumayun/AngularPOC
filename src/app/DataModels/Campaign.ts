export class Campaign {
    public id!: number;
    public name!: string;
    public startDate!: Date;
    public endDate!: Date;
    
    constructor(name: string, startDate: Date, endDate: Date){
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
}