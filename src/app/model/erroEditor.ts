import { Document, Collection} from './database/document';



@Collection("errosEditor")
export default class ErroEditor extends Document{


    constructor(public id, public submissaoId){
        super(id);

    }

    objectToDocument(){
        let document = super.objectToDocument();
        return document;
    }







}
