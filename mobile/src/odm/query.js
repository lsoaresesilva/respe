import { firestore } from 'firebase/app';

export default class Query{
    
    column;
    operator;
    value;
    
    

    constructor(column, operator, value){

        if(column == undefined || operator == undefined || value == undefined)
            throw new Error("Invalid parameters for Firestore Query");
        
        // TODO: garantir que operador seja um dos operadores válidos
        this.column = column;
        this.operator = operator;
        this.value = value;

        
    }

    static build(ref, query){

        if(query == undefined || query == null){
            throw new Error("Not possible to build a query with empty queries");
        }

        if(query != null && query.length != null){
            return Query.buildMultipleQuery(ref, query);
        }else{
            return ref.where(query.column, query.operator, query.value)
        }
    }

    static buildMultipleQuery(ref, queries){

        if(queries.length == 0){
            throw new Error("Not possible to build a query with empty queries");
        }

        let query;

        query = ref.where(queries[0].column, queries[0].operator, queries[0].value);

        for(let i = 1; i < queries.length; i++){
            query = query.where(queries[i].column, queries[i].operator, queries[i].value);
        }

        return query;
    }
}