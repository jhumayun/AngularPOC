export class ColumnDefinition {

    public columnLabel:string;
    public attributeName:string;
    public isSortable: boolean;

    constructor(label:string, attribute:string, isSortable: boolean) {
        this.columnLabel = label;
        this.attributeName = attribute;
        this.isSortable = isSortable;
    } 
}

export const enum SortDirection {
    ASC = 0,
    DESC = 1
}

export class SortSate {
    public column: ColumnDefinition;
    public sortDirection: SortDirection;

    constructor(column: ColumnDefinition, sortDir: SortDirection){
        this.column = column;
        this.sortDirection = sortDir;
    }
}