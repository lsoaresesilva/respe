export interface DocumentSalvo{
  nomeColecao: string;
  id: string;
}

export default class DocumentTest{
  documentsSalvos:any[] = [];

  incluirDocument(documentSalvo:DocumentSalvo){
    this.documentsSalvos.push({
      documentSalvo
    });
  }
}
