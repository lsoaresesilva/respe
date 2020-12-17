
export default class TipAutorregulacao{

    constructor(public texto){
    }

    static fromJson(jsonString){
        //let usuario = new Usuario();
        if(jsonString != null && typeof jsonString == "string"){
            let json = JSON.parse(jsonString);
            if(json.fields.texto){
                let tip = new TipAutorregulacao(json.fields.texto);
                return tip;
            }
            
        }   

        return null;
    }

}