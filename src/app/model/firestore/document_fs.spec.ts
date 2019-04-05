import ResultadoTestCase from "../resultadoTestCase";
import { Document, Collection } from './document';
import { AngularFirestore, AngularFirestoreModule, PersistenceSettingsToken } from '@angular/fire/firestore';
import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { DocumentModule } from './document.module';
import { FireStoreDocument } from './firestoreDocument';
import { Person } from './models';
import { forkJoin } from 'rxjs';
import Query from './query';

describe("Document testing", () => {

  let app: firebase.app.App;
  let afs: AngularFirestore;


  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
    TestBed.configureTestingModule({
      imports: [
        DocumentModule,
        AngularFireModule.initializeApp(FirebaseConfiguracao),
        AngularFirestoreModule//.enablePersistence()
      ]
    });
    inject([FirebaseApp, AngularFirestore], (_app: firebase.app.App, _afs: AngularFirestore) => {

      app = _app;
      afs = _afs;
    })();

  });

  afterEach((done)=>{
    Person.deleteAll().subscribe(resultado=>{
      done();
    })
  })
  
  it("deve criar um plain object a partir de um objeto javascript", () => {
    let p = new Person(null);
    p.name = "Leonardo"
    expect(p.objectToDocument()).toEqual({ name: "Leonardo" });
  })

  it("deve criar um nome para a collection de uma classe", () => {
    let p = new Person(null);
    p.name = "Leonardo"
    expect(p.constructor["__name"]).toBe("person")
  })

  // TESTES DO SAVE
  // TODO: Migrar para um describe próprio

  it("deve falhar ao tentar salvar um Document sem nome de coleção", () => {
    class UmaClasse extends Document {

    }
    let c = new UmaClasse(null);

    expect(function () {
      c.save();
    }).toThrow();

    @Collection("outraclass")
    class OutraClasse extends Document {

    }

    let oc = new OutraClasse(null);
    expect(function () {
      oc.save();
    }).not.toThrow();
  })

  it("deve falhar ao tentar salvar um Document sem uma instância de AngularFireStore", () => {
    let p = new Person(null);
    p["db"] = null;
    expect(function () {
      p.save();
    }).toThrow();
  })

  it('deve salvar um documento', done => {
    let p = new Person(null);
    p.save().subscribe(result => {

      expect(result.id).toBeDefined();
      done()

    });
  });


  it("deve carregar um document corretamente", (done) => {

    let p = new Person(null);
    p.name = "Leonardo";
    p.save().subscribe(resultado => {
      Person.get(p.pk()).subscribe(resultado => {
        expect(resultado instanceof Person).toBeTruthy();
        expect(resultado["id"]).toBeTruthy();
        expect(resultado["id"]).toBe(p.pk())
        expect(resultado["name"]).toBe(p.name);
        done();
      })
    })

  })

  

  it("deve falhar ao carregar um documento sem informar o id", () => {

    expect(function () {
      Person.get(null);
    }).toThrow();
  })

  it("deve falhar ao tentar carregar um Document sem uma instância de AngularFireStore", () => {
    let getAngularFS = Person.getAngularFirestore;
    Person.getAngularFirestore = function () {
      return null;
    }

    expect(function () {
      Person.get(1);
    }).toThrow();

    Person.getAngularFirestore = getAngularFS;
  })

  it("deve falhar ao tentar carregar um Document sem nome de coleção", () => {
    let oldName = Person["__name"]
    Person["__name"] = null;

    expect(function () {
      Person.get(1);
    }).toThrow();

    Person["__name"] = oldName;
  })


  it('deve disparar um erro ao tentar carregar um documento que não existe', done => {
    Person.get(1).subscribe(resultado => {

    }, err => {
      expect(err).toBeDefined();
      expect(err.message).toBe("O firestore document passado como parâmetro não é válido.");
      done();
    })

  });


    it("deve falhar ao tentar carregar todos os Documents sem uma instância de AngularFireStore", () => {
      let getAngularFS = Person.getAngularFirestore;
      Person.getAngularFirestore = function () {
        return null;
      }

      expect(function () {
        Person.getAll();
      }).toThrow();
      Person.getAngularFirestore = getAngularFS;
    })
    
    it("deve falhar ao tentar carregar todos os Document sem nome de coleção", () => {
      let oldName = Person["__name"]
      Person["__name"] = null;

      expect(function () {
        Person.getAll();
      }).toThrow();

      Person["__name"] = oldName;
    })

    it("deve retornar um array vazio para uma collection que não existe", (done) => {
      let oldName = Person["__name"]
      Person["__name"] = "collectionInexistente";

      Person.getAll().subscribe(resultado=>{
        expect(resultado.length).toBe(0);
        Person["__name"] = oldName;
        done();
      });
    })

    it("deve carregar todos documents corretamente", (done) => {

      
      Person.getAll().subscribe(resultado => {
        expect(resultado.length).toBeGreaterThan(1)
        done();
      })
      
    })

    it("deve carregar todos documents corretamente a partir de uma query", (done) => {

      let p = new Person(null);
      p.name = "Apu";
      p.save().subscribe(resultado=>{
        Person.getAll(new Query("name", "==", "Apu")).subscribe(resultado => {
          expect(resultado.length).toBe(1);
          done();
        })
      })
      
      
    })
      

    // Testes de delete


    it("deve falhar ao tentar deletar um document sem uma instância de AngularFireStore", (done) => {
      
      let getAngularFS = Person.getAngularFirestore;
      Person.getAngularFirestore = function () {
        return null;
      }

      expect(function () {
        Person.delete(1);
        
      }).toThrow();
      Person.getAngularFirestore = getAngularFS;
      done();
      
    })
    
    it("deve falhar ao tentar deletar um document sem sem nome de coleção", (done) => {
      
      let oldName = Person["__name"]
      Person["__name"] = null;
      expect(function () {
       Person.delete(1);
        
      }).toThrow();

      Person["__name"] = oldName
      done();
      
    })

    it("deve retornar TRUE ao deletar um document", (done) => {
      
    
      let p = new Person(null);
      p.name = "Leonardo";
      p.save().subscribe(resultado=>{
        Person.delete(p.pk()).subscribe(resultado=>{
          expect(resultado).toBeTruthy();
          done();
        })
        
      })
     
      
    })
    

    


    

    // Testes de deleteAll
    
    it("deve falhar ao tentar deletar todos os Documents sem uma instância de AngularFireStore", (done) => {
      let getAngularFS = Person.getAngularFirestore;
      Person.getAngularFirestore = function () {
        return null;
      }

      expect(function () {
        Person.deleteAll();
        
      }).toThrow();
      Person.getAngularFirestore = getAngularFS;
      done();
    })
    
    it("deve retornar um contador = 0 para uma collection que não existe", (done) => {
      let oldName = Person["__name"]
      Person["__name"] = "collectionInexistente";

      Person.deleteAll().subscribe(resultado=>{
        expect(resultado).toBe(0);
        Person["__name"] = oldName;
        done();
      });
    })

    
    it("deve falhar ao tentar deletar todos os Document sem nome de coleção", (done) => {
      let oldName = Person["__name"]
      Person["__name"] = null;

      expect(function () {
        Person.deleteAll();
        
      }).toThrow();
      Person["__name"] = oldName;
      done();
      
    })

    
    it("deve retornar um contador = 3 para três documentos que existíam e foram apagados", (done) => {
      
      // Fazer uma classe específica para isso

      @Collection("cars")
      class Car extends Document{
        name;

        constructor(id){
          super(id);
        }
      }

      let c = new Car(null);
      c.name = "l";
      
      let c2 = new Car(null);
      c2.name = "a"

      let c3 = new Car(null);
      c3.name = "d"

      forkJoin([c.save(), c2.save(), c3.save()]).subscribe(resultado=>{
        Car.deleteAll().subscribe(resultado=>{
          expect(resultado).toBe(3);
          done();
        });
      })

      
    })
    
  

  // INÍCIO DOS TESTES DE FIRESTORE DOCUMENT
  
  it("deve validar true para um firestore document válido", (done) => {
    try{
      let document: any = afs.doc<any>("assunto/dFfoRKSwBjEN1aJWVkgr");
      document.get({ source: "server" }).subscribe(result => {
        let f = new FireStoreDocument(result);
        expect(f.validate(result)).toBeTruthy();
        done();
      });
    }catch(e){
      console.log(e)
    }
   
  })
  

  it("deve disparar um erro para um firestore document inválido/não existente", (done) => {
    let document: any = afs.doc<any>("ClassRoom/1234");
    document.get({ source: "server" }).subscribe(result => {
      expect(function () {
        let f = new FireStoreDocument(result);


      }).toThrow();
      done();
    });
  })


  it("deve construir um firestore document a partir de uma consulta no firestore", (done) => {

    let p = new Person(null);
    p.name = "Leonardo"
    p.save().subscribe(resultado => {
      let document: any = afs.doc<any>(Person["__name"] + "/" + p.pk());
      document.get({ source: "server" }).subscribe(result => {
        let document = new FireStoreDocument(result);
        expect(document).toBeDefined();
        expect(document.id).toBe(p.pk());
        expect(document.data["name"]).toBe("Leonardo");
        done();
      });
    })

  })

  it("deve retornar os dados presentes em um firestore document", (done) => {
    let p = new Person(null);
    p.name = "Leonardo"
    p.save().subscribe(resultado => {
      let document: any = afs.doc<any>(Person["__name"] + "/" + p.pk());
      document.get({ source: "server" }).subscribe(result => {
        let document = new FireStoreDocument(result);
        let data = document.primitiveData()
        expect(data["id"]["value"]).toBe(p.pk())
        expect(data["name"]["value"]).toBe(p.name);
        done();
      });
    })
  }
  )

  it("deve retornar null para um conjunto de propriedades inválidas", (done) => {
    let p = new Person(null);
    p.name = "Leonardo"
    p.save().subscribe(resultado => {
      let document: any = afs.doc<any>(Person["__name"] + "/" + p.pk());
      document.get({ source: "server" }).subscribe(result => {
        let document = new FireStoreDocument(result);
        document.primitiveData = function () {
          return null;
        }
        expect(function () {
          document.toObject(Person.prototype)
        }).toThrow();

        done();
      });
    })
  })

  it("deve construir um objeto a partir de dados do firestore document", (done) => {
    let p = new Person(null);
    p.name = "Leonardo"
    p.save().subscribe(resultado => {
      let document: any = afs.doc<any>(Person["__name"] + "/" + p.pk());
      document.get({ source: "server" }).subscribe(result => {
        let document = new FireStoreDocument(result);
        let object = document.toObject(Person.prototype);
        expect(object instanceof Person).toBeTruthy();
        expect(object["id"]).toBeTruthy();
        expect(object["id"]).toBe(p.pk())
        expect(object["name"]).toBe(p.name);
        done();
      });
    })
  })

  it('deve verificar se dois documents possuem nomes de collections diferentes', () => {
    expect(Person["__name"]).toEqual("person")

    @Collection("outraclass")
    class OutraClasse extends Document {

    }

    expect(OutraClasse["__name"]).toEqual("outraclass");
  });

  it("", () => {

  })






  // FIM DOS TESTES DE FIRESTORE DOCUMENT

})