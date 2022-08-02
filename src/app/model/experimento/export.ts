import { Observable, forkJoin } from 'rxjs';
import Submissao from '../submissao';

import submissoesEstudantes from '../../../../json/submissoes_29_mai.json';
import ErroCompilacaoFactory from '../errors/analise-compilacao/erroCompilacaoFactory';
import NameError from '../errors/analise-compilacao/nameError';
import ErroSintaxeVariavel from '../errors/analise-pre-compilacao/erroSintaxeVariavel';
import PageTrackRecord from '../analytics/pageTrack';
import Usuario from '../usuario';
import Query from '../firestore/query';

export default class Export {

  static excluidos = ['B3Xgj4IGEOQvjLKoTHI9', 'JJ8zNeRZBDr4qTElmYJk', 'xRSUKvyNAYV8Cmvn639q', 'LYx978JlOUowgMgR7gq0', 'BmIqbIXvbFLx0D4rqdvo', "1flzSjZxDqi7QmmoMRqG"];
  static paginasExcluir = ['criar-atividade-grupo', 'editor-regex', 'cadastrar-postagem', 'entrar-grupo', 'editor-programacao', 'visualizar-postagem', 'listagem-atividades-grupo', 'minha-turma', "listar-videos", "visualizacao-video", 'visualizacao-turma', 'listar-turmas', 'listagem-diarios-professor', 'visualizacao-estudante']

  static estudantesIgnorados = [
    'B3Xgj4IGEOQvjLKoTHI9',
    'JJ8zNeRZBDr4qTElmYJk',
    'xRSUKvyNAYV8Cmvn639q',
    'LYx978JlOUowgMgR7gq0',
    'BmIqbIXvbFLx0D4rqdvo',
    '1flzSjZxDqi7QmmoMRqG',
    'gxDZLmDyYSRoPOw1DkCJ',
    'mb7t9FEckyI2YEFHd8eH',
    'GvyxgiQu8w2UsUzeCZSV', // Fim usuários leonardo

  ];

  static estudantes_excluidos = ["0tXcE0JVbzGME4825VQp","1flzSjZxDqi7QmmoMRqG","2FFjne8UUYTrdG1PpJqZ","3Bwxn6PXZXHcTVxmszxR","5tw4w2xUn8YHBwzzN7go","7W3FZQKLlw4QP4Zy8fFv","7djJPWQ14hNLNM5rWyKG","AClTuaxkU4QBNNYiFtjS","Eyn9kNCBC0zgcXi1ZloQ","GvyxgiQu8w2UsUzeCZSV","KCWXxsAXPj0jIby8yShA","KuLmIQqoO2GHEW3luHFm","L9UcVg4rzsLA4xH91iDE","QtZMOAXgaEVGrepNmtJO","RLqOdc9gqATmpTNIS3F3","WGUtX1rqhbqdFAzCXVvM","WX7vsrbbLyo6kTAa02j1","YrNsFFXnCD97g7kB0yT7","Z2Id4vvBxRVB6xX7tBnu","cX2S56rhGKbL0rMimcwS","d0mp7zBNmlOxX0BY8NzA","dcAkK8jDXvT8JK35DMku","e8Gf0bMXaz9JfkPtC0Qg","fDELm9NgGHeDyGMNDdxq","kQ519RbPEsSUAVf1DMIw","mgrXUORVlo9woOIRqDrN","miT2WXUYWMPTg7WBy5BY","nWFIXHvTbrgxMQO91lnm","nXj96K70H00UWIXSBLZd","pqMtkIteoPd7ifSnhTL8","qIwjgwELLkCzT2K5YaJr","sKAIsfb52vrEVIq6AWUY","sTw92uPpePll3oxj6spe","tVCnwCcm3laQQ3KEQcuh","thlkAsdAb01cWTe88wmq","yH7TlbWSPe9JBkdQAlGa","zwCRM7eJnA5OzcJnj5j4","1c8RIeoywI5WQVdtehei","37XfMQYMOyUszeeJKvsq","4Lp24XzRMgMHOZvbTxQe","7kVwSznCyNNFX01fowtI","9JAqWNioLUC3xohsk7JW","9d8AWC5E40VtgvpOBcyR","DiAvaZqqS46odlwJvwlI","GFUCnyERATC8GOj0aqCg","Gee99sdJaNqLYpKkmqIH","Jc64w0CLn07Jv7SbQfD9","L3FMWPNOb3j2W08k7238","NruNhsOzNQACW4xXhhrN","Oqk8GKqSbfeBMFzCshYp","Po0SsxCHU0vUoEQV6k9P","VyqkALFJG8lXdSW501IG","Xqwy12iiwSfYd27o50jT","YmZPmTdQ96eNPoDgDDy9","c2GO6l4I0rKCdpbXRuHg","cdNkDDWAdjGbYlNqkWdy","egJD23JyppACNqDfNmwz","giIfXErI58PNxyPG3uAh","iKYDFwDFJYSaqFHNxQzk","iWdE8e3RzOuMHR2Pd23I","mn2fSxZQrR53srmYekQf","rk2zpvKHhYQ36SKSXKqU","sracWnp06PBQdK9qvjmq","vzEnSs42T6s25WBOBkOa","xoEyp0Wl7mHTDKQcJZRd","y58GIWhEoOXOPE00bLIg","B3Xgj4IGEOQvjLKoTHI9","BmIqbIXvbFLx0D4rqdvo","JJ8zNeRZBDr4qTElmYJk","g7yVrT1HMGD4y1llr7El","q8IvsJdoIsc5fk6FRKBR","t9D7htlu50iNyhNz3X5E","xRSUKvyNAYV8Cmvn639q","1eyJE7tLSz55rJ3TnHTz","4DRhVVyRiqR0ir2HcWON","4YagqYbRs6UKOLiul9dY","6GsyVOXxwFhoHVZrJLhX","ARmOrsemScAQffnSCHXN","AbhkE5gb21Ilf0MU0IYE","B4hnHkJdvPgaMa63Ud24","BLshTrN3finZJRWPfkn1","E3jEkBQ7FcCpnXhrMKcM","EmAOnD4N5X48iIH1RWWC","Ffa9l1DF5QFsXINoruMR","JHQiroTbasvEQNtmzH9R","LFghgzaoxLsPZCUdm45w","LUcvpR23R6lGZgTphijH","NLgFLOxY564bx8arrfBS","QXAtcNmbUp2SPJc7aEuA","Qn6zHj1aKhAQPi40P1dF","QnsA2K2QvUw24mfuemxj","RGKBEdTz6zwi9du880kk","XxTqbbHgD4RGC0lpe5Jq","Y2xcOroeaShqiZ8YrJWB","YpDzw0RnA2llpuQoARrr","ZRDrnotM3iWfLzeA46kc","asstXAlF0iGS5POEVHzF","hi4WbPPEDQDNtRzuQ8fR","kAXcnWJLbDAFEpIYBS3K","kpS1QIKHHODKMS3NptIQ","lKlsFID5xynyNsXaQ7KM","lpMfnSun87UnVDXB6nzq","sNmdv23YkBgiwnStwA5I","umTO90L0g1PNtDY6BORM","20idyOjnqpmsgAMZFdks","2NnaKJsmgJ4FHJz10JVc","3MKsU1aA1eH6Kz4b9vwe","5Ay3nNBQJArCfwww4uFc","6hWen5hfBEjQjNAs40RK","9GrPLbDbfBtAda8xSofl","Ao7vO4ago7bsaci4BgdJ","DUtJVHCzho2ifoDzgxrS","Eobb93vNpkhYjGLhMzuh","FDFERBLU10XmQ35HhBie","FPg1ZPVHdfYSphph0vc9","GMLdFEsbGPCQ4Aqk6vXw","Gc3Y4aGPBe3e4qhzoBEY","GnU7VlS9lrqnrtIWS3T8","II4MZAvbhAfrdC6pR6dp","J9GdMnyotIMDQizZO7ZD","LHpX21qhQ8uVczDWxIrd","M00W0CJ0MnG95LqoB1sf","M0FSeMKMebqI8kdYsxpl","NPUzVoBbxxi6QQtOTQJc","NtllxoJMlhZueLHFVBTa","ODeMW88JcoKSzZbRAfUW","R6hwLR08pxUdnUE7R7sT","RiWUrnksMW60YUgSGmfR","Rqz5zgYDNUKGde9jqBYG","T55vVkdYagAFl18vKaNK","UMGp1reTrLPYlYhb2jLe","Uc0Q6730sqdzjfOaB4se","VmMD6ALrLR2tN7O9qylU","WYBU50HmrYipTg56XWxK","XCTlq9qAarroxOJJ2MGb","Y5bewk1JGkyDc101pkMC","YQvodPsAWHjXKVFzuPZc","ZaiYiEP1b16FXoGuvAic","aH8urmCjl9ps2OgDSsoM","dNlxscodWi8gQX0iAnS8","esBsnSKOejZHZEMh3SGG","fUTShLfBO4rJ6nQ5n3Oh","gfmqlGAb8hJehfiwwQ7i","hOhZppUErIYfP22HMXew","icaNDih2i3Opi9ianTEV","kLTH2PPpOl2SNzKgNMnj","kTCcAV2Z9OaJKGjIaG4x","kdM9UL2fiNSXFOQLhUwk","l0oN6Jifqk0xPA2a8bGn","l7r3kRo8chrQ3YlFYe4f","la2QOgtCPrOIc4gtkimu","m9HI0F3IjpHMHSq9WayO","mRPlGRQLSLPlzrW90RhD","mkzo87kx1VDlx9xh1eIl","njmYsIzLWXAbPQvVcZol","oom9WfO9yKCqYNMKApZK","pqp7E1XZaWbaJ78zQO52","q8W1Ooukx670yBwomDti","qGn1ISQeRVMPnaVXwW9s","qgeTmd1mUwhWPKSdvZ5J","r3qMsTUQRZ09ekPmd28O","tP7Pn9pgU89Bws9XZr77","tq3kX743iNY3rsULvKdL","uJDPJQuKulzeB0kPZBMx","uX88XXlPtnEWKRvIBT5f","vhnU1UU2x2Xta7reYdow","wFabIK2HbtEag2q7ZU90","wSRBtADr6uhunYaNJSo2","xzlolNzbE87va71Nkbpr","yFplzZ1Z2XehxMBCzm2W","yWeglSUGqr4nmNVwqf3i","yliVgD5IMXz63ZlAeP23","z2JHnup3tLexJdoCFuKy","zCHv7YB1DE8lpCRGhXHi","0XQMMGnf8fO0v3ypOIxo","2qXDozyRLm09FsQa8Ss2","5o6GNh9PdPN9f82TEtSV","8dgnvQf2IgB3L3QTZO6N","9ZndTz0PiLn3rSFbYCKN","9yG9rhPGga6y1i48EMeD","AeFCdCf5Lh09SqEK7LIZ","AhNklPXW5frwhbfNk4wq","BrTdU25dIGthOD5F3AJO","EHorZ4oxCghTk2ET4JR0","IPMSWpt6pPxleO3WgoYs","Jlt7fyOfIifJcSzN6wIF","KVePdVi12Z0yyhsyeJZj","KlSqKQaDVT2pJMN2VrBo","LOzY47ukclxo1TZeoyho","MG39ooRSTROty2l4JMXz","PrMduzZVapo27Hh5n9RT","PvgC9DoAE22LNKbA6J38","RbopZ1tVWYa6PfyMhXEc","f5EUeaMFlyX61Gc9Tg0Q","fEbjYqw1Olhy2TJ5P7XL","fIz3KIhEmOIKmD9Phpx9","l1weAjIenJGiyqSlVyXv","mUZAWAEIw0tThUgWkYAd","oydATGc5WTmc4qCz4iDF","qI2hgvGSvIQdgIJcSfsn","qhRMCVMbAaVUt6eo1H69","tilWucbR0HcZau7LPGVz","vMSHBJ1uaGdWVcPJvCIZ","y2QdxjdMI6CuD8tGqP4d","yPRQAMD0lmAmNgph113l","z6kOtjIYSOnSzJDlnoOH","zdGG20O1BkfgkPg2lwyK","3DMP89y4o0ZSM9O8FEx5","4jMzcY7wg8eFWTgRbdQ2","7wue4zSD8jSpw8gJyNee","82oOReg3lhmYZsqvXSFk","JGs2lY6n7WhDRWR94Vn0","LALyqop0IG4YFRcv2EcJ","VnlBQt7qMS7F4Enrc81N","ZnPFKy6knmMJ1TUbW3Qo","gcQTbcw2Be5tf2c8q5oD","pwZKDuaMWQ30VNcQ0lGz","sfFZsw0HHHGLNr3zMcvl","ySrGEuabxsdijjvyyzWf"];
  static high_performer
  static estudantesGrupo1 = [
    'WGUtX1rqhbqdFAzCXVvM',
    '0tXcE0JVbzGME4825VQp',
    '1flzSjZxDqi7QmmoMRqG',
    '3Bwxn6PXZXHcTVxmszxR',
    '5tw4w2xUn8YHBwzzN7go',
    '7djJPWQ14hNLNM5rWyKG',
    'AClTuaxkU4QBNNYiFtjS',
    'Eyn9kNCBC0zgcXi1ZloQ',
    'KCWXxsAXPj0jIby8yShA',
    'KuLmIQqoO2GHEW3luHFm',
    'WX7vsrbbLyo6kTAa02j1',
    'Z2Id4vvBxRVB6xX7tBnu',
    'fDELm9NgGHeDyGMNDdxq',
    'mgrXUORVlo9woOIRqDrN',
    'miT2WXUYWMPTg7WBy5BY',
    'pqMtkIteoPd7ifSnhTL8',
    'qIwjgwELLkCzT2K5YaJr',
    'sKAIsfb52vrEVIq6AWUY',
    'tVCnwCcm3laQQ3KEQcuh',
    'thlkAsdAb01cWTe88wmq',
    'zwCRM7eJnA5OzcJnj5j4',
  ];

  static submissoes() {
    return new Observable((observer) => {
      Submissao.exportToJsonFiltroData().subscribe((submissoes) => {
        observer.next(submissoes);
        observer.complete();
      });
    });
  }

  static deveIncluir(estudantes){

  }

  static getUsuariosExcluidos(){
    return new Observable(observer=>{
      let consultas = [];
      let usr = [];
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', 'curso2021b')))
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', 'turmasetembro')))
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', '12345')))
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', 'rafael')))
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', 'maio')))
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', 'turma1')))
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', 'tiago1')))
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', 'eugenio')))
      consultas.push(Usuario.getAll(new Query('codigoTurma', '==', 'abril')))

      forkJoin(consultas).subscribe(usuarios_todos=>{
        usuarios_todos.forEach(usuarios=>{
          usuarios["forEach"](usuario=>{
            usr.push(usuario["pk"]());
          });
        });

        observer.next(JSON.stringify(usr));
        observer.complete();
      })
    })


  }

  static getPageTracks(estudante:Usuario | null=null){
    return new Observable((observer) => {

      function getTracks(estudantes){
        PageTrackRecord.getAllByEstudantes(estudantes, true, "array").subscribe(pageTracks=>{
          let arrayJson = [];
          pageTracks.forEach(pTrack => {
            if(!Export.paginasExcluir.includes(pTrack.pagina)){
              arrayJson.push(pTrack.toJson());
            }

          });

          console.log(JSON.stringify(arrayJson));
          observer.next(JSON.stringify(pageTracks));
          observer.complete();
        })
      }

      if(estudante == null){
        Usuario.getAll(new Query("codigoTurma", "==", "curso2021j")).subscribe(estudantes=>{
          let estudantesFiltrados = estudantes.filter((estudante)=>{
            if(estudante.grupoExperimento == 4){
              return false;
            }

            if (Export.excluidos.includes(estudante.pk())) {
              return false;
            }

            return true;
          });

          getTracks(estudantesFiltrados);

        })
      }else{
        Usuario.get(estudante.pk()).subscribe(estudante=>{
          getTracks([estudante]);
        })
      }
    });
  }

  static filtrarEstudantes(submissoesJson) {
    let submissoes = [];
    submissoesEstudantes['submissoes'].forEach((s) => {
      if (!Export.excluidos.includes(s['estudante'])) {
        submissoes.push(s);
      }
    });

    return submissoes;
  }

  static calcularErrosVariaveis() {
    let errosSyntax = [];

    /*  let quantidade = submissoesEstudantes["submissoes"].length;
        console.log(quantidade); */

    let submissoes = Export.filtrarEstudantes(submissoesEstudantes);

    let estudantes = []

    submissoes.forEach((s) => {
      if (s['erro'] != null && s['erro']['traceback'] != null) {
        if(!estudantes.includes(s["estudante"])){
            estudantes.push(s["estudante"]);
        }
        let categoria = ErroCompilacaoFactory.construir(s['erro']['traceback']);
        if (categoria instanceof NameError || categoria instanceof SyntaxError) {
          let submissao: Submissao = new Submissao(null, s['codigo'], null, null, null);
          let erros = ErroSintaxeVariavel.erros(submissao.linhasAlgoritmo());
          if (erros.length != 0) {

            errosSyntax.push(erros);
          }
        }
      }
    });

    console.log("Total: "+estudantes.length);

    let resultado = ErroSintaxeVariavel.exportar(errosSyntax);
    return JSON.stringify(resultado);
  }
}
