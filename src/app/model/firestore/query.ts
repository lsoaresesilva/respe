export default class Query{
    
    column;
    operator;
    value;

    constructor(column, operator, value){
        this.column = column;
        this.operator = operator;
        this.value = value;
    }
}