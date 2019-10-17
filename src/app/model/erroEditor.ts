import { Document, Collection} from './firestore/document';



@Collection("errosEditor")
export default class ErroEditor extends Document{

    id;
    submissaoId;

    constructor(id,submissaoId){
        super(id);
        this.submissaoId = submissaoId;
        
    }

    objectToDocument(){
        let document = super.objectToDocument();
        return document;
    }

   
   
   

   
 
}