
import { Document, Collection } from './document'

@Collection("person")
export class Person extends Document{
  
  name;
  idade;

  constructor(id){
    super(id);
  }
}



