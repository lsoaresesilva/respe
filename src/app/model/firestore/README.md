# Introduction

AngularFire Document Mapper is a library designed to reduce the AngularFire's boilplate code used to manipulate Firestore's database.
Every operation on database with AngularFire is a tedious and repetitive task. The aim of this project is to ease this process.

This project is based on the Active Record pattern (https://www.martinfowler.com/eaaCatalog/activeRecord.html), and uses a class to wrap CRUD operations. You just use this class in your project as a base class for your Document's Class which will be persisted on Firestore.

It is easy as:

```javascript
let person = new Person("Leonardo");
person.save().subscribe(result=>{});
Person.getAll().subscribe(personsFromFireStore=>{});
```


# Instalation

Clone the repository as a submodule to your Angular project: git submodule add https://github.com/lsoaresesilva/angularfire-document-mapper.git

# Usage

1. Create a class to represent a Firestore's Document and extends from Document

```javascript

import {Document, Collection} from './angularfire-document-mapper/document';

@Collection("person") // collection's name
class Person extends Document{

  name;

  constructor(id, name){
    super(id); // must be called
    this.name = name;
  }

}
```

2. Configure your Firebase account, install AngularFire2 and import AngularFirestore, AngularFireModule to your project's module, as suggested in: https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md

3. Run the library's tests: npm test

4. In your app.module or any other module, import DocumentModule:

```javascript

import { DocumentModule } from './angularfire-document-mapper/document.module';


  imports: [
    DocumentModule,
   ]
```

5. Use your Person's object insided a component:

```javascript
@Component({})
class Component{

     constructor(){
     
        // to save:
     
        let person = new Person(null, "Leonardo");
        person.save().subscribe(savedPerson=>{
            // object saved with success.
        }, err=>{
            // error while saving 
        });
        
        // to get:
        
        Person.get("your-document-id").subscribe(aPerson=>{
            // aPerson is a instance of Person.
        })
        
        // to get all:
        
        Person.getAll().subscribe(listOfPersons=>{
            // listOfPersons is a array of Person.
        })
        
        // to get all with query. PS: should import Query.
        
        Person.getAll(new Query("name", "==", "Leonardo")).subscribe(listOfPersons=>{
            // listOfPersons is a array of Person.
        })
        
        // to delete
        
        Person.delete("your-document-id").subscribe(result=>{
            // result is a boolean with true if operation was success or false.
        })
        
        // to delete all
        
        Person.deleteAll().subscribe(count=>{
            // count represents the number of objects deleted
        })
     }
}
```
6. It is also possible to work with relationships (experimental support):

I'm working to support automatic relationships, for example, when saving/geting an object, its relationship will be saved/get as well.

```javascript

@Collection("dog")
class Dog extends Document{

    name;
    @oneToOne({name:"personId", type:Person)
    person:Person;
    
    constructor(id, person){
      super(id); // must be called
      this.person = person;
    }
    

}

@Collection("persons")
class Person extends Document{

  name;

  constructor(id, name){
    super(id); // must be called
    this.name = name;
  }

}


@Component({})
class Component{

  constructor(){
    let p = new Person(null, "Leonardo");
    let d = new Dog(null, p);
    p.save().subscribe(result=>{
      // person is saved, lets save Dog.
      d.save().subscribe(dogResult=>{
        // dog is saved and has a column name personId with the person's ID.
      }) 
     })
     
   // When loading a dog, a person will 

}
```

# Using order by

You can specify the order of documents by using the attribute orderBy in getAll. It accepts an string with the name of the document's property to order.

```javascript
@Collection("persons")
class Person extends Document{

  name;
  age;

  constructor(id, name){
    super(id); // must be called
    this.name = name;
  }

}

Person.getAll(null, "age").subscribe(results=>{
    // results are ordered by age.
});
``` 

# Multiple queries

Suppose you want to retrieve a document from collection based on two attributes, we call it multiple queries.

```javascript
@Collection("persons")
class Person extends Document{

  constructor(id, public name, public age){
    super(id); // must be called
  }

}

@Component({})
class Component{

  constructor(){
  
    let queryOne = new Query("name", "==", "Leonardo");
    let queryTwo = new Query("age", "==", "32");
    let queries = [queryOne, queryTwo];
    Person.getAll(queries).subscribe(result=>{
      // Will query for a Person who has name Leonardo and age 32.
    })
  
  }

}


```

# Ignoring fields

It is possible to not persist some fields of your class, just use the @ignore decorator:

```javascript

import { Document, Collection, ignore } from './firestore/document';

@Collection("persons")
class Person extends Document{

  name;
  @ignore()
  secretField;

  constructor(id, name){
    super(id); // must be called
    this.name = name;
  }

}
```

# Date field

To use Firebase's server timestamp as a date time you can use @date decorator:

```javascript

import { Document, Collection, date } from './firestore/document';

@Collection("persons")
class Person extends Document{

  @date()
  dateAdded;

  constructor(id, public name){
    super(id); // must be called
  }

}
```

# Tracking changes in the document

It is possible to track any change to a document, which is useful to update the client.

```javascript

@Collection("persons")
class Person extends Document{

  constructor(id, public name, public age){
    super(id); // must be called
  }

}

...

function main(){

  let callback = new Subject(); // Subject class from RxJS
  callback.subscribe( documentUpdated => {
  
    // documentUpdated holds the document with new data.
  
  });
  
  Person.onDocumentUpdate("12345", callback); // 12345 is the id of the document in which we are interested to receive updates.

}


```

# License

MIT
