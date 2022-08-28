
import pageTracks_highPerforming from '../../../../json/pagetrack_high_performing_2_ago_2022.json';
import pageTracks_lowPerforming from '../../../../json/pagetrack_low_performing_2_ago_2022.json';

import PageTrackRecord from '../analytics/pageTrack';

export default class AnalyticsUsoSistema{

  static excluirEstudante(estudanteId){
    let estudantes_excluidos = [
      'B3Xgj4IGEOQvjLKoTHI9',
      'JJ8zNeRZBDr4qTElmYJk',
      'xRSUKvyNAYV8Cmvn639q',
      'LYx978JlOUowgMgR7gq0',
      'BmIqbIXvbFLx0D4rqdvo',
      '1flzSjZxDqi7QmmoMRqG',
      'gxDZLmDyYSRoPOw1DkCJ',
      'mb7t9FEckyI2YEFHd8eH',
      'GvyxgiQu8w2UsUzeCZSV', // Fim usuários leonardo
      '0tXcE0JVbzGME4825VQp',
      '1flzSjZxDqi7QmmoMRqG',
      '2FFjne8UUYTrdG1PpJqZ',
      '3Bwxn6PXZXHcTVxmszxR',
      '5tw4w2xUn8YHBwzzN7go',
      '7W3FZQKLlw4QP4Zy8fFv',
      '7djJPWQ14hNLNM5rWyKG',
      'AClTuaxkU4QBNNYiFtjS',
      'Eyn9kNCBC0zgcXi1ZloQ',
      'GvyxgiQu8w2UsUzeCZSV',
      'KCWXxsAXPj0jIby8yShA',
      'KuLmIQqoO2GHEW3luHFm',
      'L9UcVg4rzsLA4xH91iDE',
      'QtZMOAXgaEVGrepNmtJO',
      'RLqOdc9gqATmpTNIS3F3',
      'WGUtX1rqhbqdFAzCXVvM',
      'WX7vsrbbLyo6kTAa02j1',
      'YrNsFFXnCD97g7kB0yT7',
      'Z2Id4vvBxRVB6xX7tBnu',
      'cX2S56rhGKbL0rMimcwS',
      'd0mp7zBNmlOxX0BY8NzA',
      'dcAkK8jDXvT8JK35DMku',
      'e8Gf0bMXaz9JfkPtC0Qg',
      'fDELm9NgGHeDyGMNDdxq',
      'kQ519RbPEsSUAVf1DMIw',
      'mgrXUORVlo9woOIRqDrN',
      'miT2WXUYWMPTg7WBy5BY',
      'nWFIXHvTbrgxMQO91lnm',
      'nXj96K70H00UWIXSBLZd',
      'pqMtkIteoPd7ifSnhTL8',
      'qIwjgwELLkCzT2K5YaJr',
      'sKAIsfb52vrEVIq6AWUY',
      'sTw92uPpePll3oxj6spe',
      'tVCnwCcm3laQQ3KEQcuh',
      'thlkAsdAb01cWTe88wmq',
      'yH7TlbWSPe9JBkdQAlGa',
      'zwCRM7eJnA5OzcJnj5j4',
      '1c8RIeoywI5WQVdtehei',
      '37XfMQYMOyUszeeJKvsq',
      '4Lp24XzRMgMHOZvbTxQe',
      '7kVwSznCyNNFX01fowtI',
      '9JAqWNioLUC3xohsk7JW',
      '9d8AWC5E40VtgvpOBcyR',
      'DiAvaZqqS46odlwJvwlI',
      'GFUCnyERATC8GOj0aqCg',
      'Gee99sdJaNqLYpKkmqIH',
      'Jc64w0CLn07Jv7SbQfD9',
      'L3FMWPNOb3j2W08k7238',
      'NruNhsOzNQACW4xXhhrN',
      'Oqk8GKqSbfeBMFzCshYp',
      'Po0SsxCHU0vUoEQV6k9P',
      'VyqkALFJG8lXdSW501IG',
      'Xqwy12iiwSfYd27o50jT',
      'YmZPmTdQ96eNPoDgDDy9',
      'c2GO6l4I0rKCdpbXRuHg',
      'cdNkDDWAdjGbYlNqkWdy',
      'egJD23JyppACNqDfNmwz',
      'giIfXErI58PNxyPG3uAh',
      'iKYDFwDFJYSaqFHNxQzk',
      'iWdE8e3RzOuMHR2Pd23I',
      'mn2fSxZQrR53srmYekQf',
      'rk2zpvKHhYQ36SKSXKqU',
      'sracWnp06PBQdK9qvjmq',
      'vzEnSs42T6s25WBOBkOa',
      'xoEyp0Wl7mHTDKQcJZRd',
      'y58GIWhEoOXOPE00bLIg',
      'B3Xgj4IGEOQvjLKoTHI9',
      'BmIqbIXvbFLx0D4rqdvo',
      'JJ8zNeRZBDr4qTElmYJk',
      'g7yVrT1HMGD4y1llr7El',
      'q8IvsJdoIsc5fk6FRKBR',
      't9D7htlu50iNyhNz3X5E',
      'xRSUKvyNAYV8Cmvn639q',
      '1eyJE7tLSz55rJ3TnHTz',
      '4DRhVVyRiqR0ir2HcWON',
      '4YagqYbRs6UKOLiul9dY',
      '6GsyVOXxwFhoHVZrJLhX',
      'ARmOrsemScAQffnSCHXN',
      'AbhkE5gb21Ilf0MU0IYE',
      'B4hnHkJdvPgaMa63Ud24',
      'BLshTrN3finZJRWPfkn1',
      'E3jEkBQ7FcCpnXhrMKcM',
      'EmAOnD4N5X48iIH1RWWC',
      'Ffa9l1DF5QFsXINoruMR',
      'JHQiroTbasvEQNtmzH9R',
      'LFghgzaoxLsPZCUdm45w',
      'LUcvpR23R6lGZgTphijH',
      'NLgFLOxY564bx8arrfBS',
      'QXAtcNmbUp2SPJc7aEuA',
      'Qn6zHj1aKhAQPi40P1dF',
      'QnsA2K2QvUw24mfuemxj',
      'RGKBEdTz6zwi9du880kk',
      'XxTqbbHgD4RGC0lpe5Jq',
      'Y2xcOroeaShqiZ8YrJWB',
      'YpDzw0RnA2llpuQoARrr',
      'ZRDrnotM3iWfLzeA46kc',
      'asstXAlF0iGS5POEVHzF',
      'hi4WbPPEDQDNtRzuQ8fR',
      'kAXcnWJLbDAFEpIYBS3K',
      'kpS1QIKHHODKMS3NptIQ',
      'lKlsFID5xynyNsXaQ7KM',
      'lpMfnSun87UnVDXB6nzq',
      'sNmdv23YkBgiwnStwA5I',
      'umTO90L0g1PNtDY6BORM',
      '20idyOjnqpmsgAMZFdks',
      '2NnaKJsmgJ4FHJz10JVc',
      '3MKsU1aA1eH6Kz4b9vwe',
      '5Ay3nNBQJArCfwww4uFc',
      '6hWen5hfBEjQjNAs40RK',
      '9GrPLbDbfBtAda8xSofl',
      'Ao7vO4ago7bsaci4BgdJ',
      'DUtJVHCzho2ifoDzgxrS',
      'Eobb93vNpkhYjGLhMzuh',
      'FDFERBLU10XmQ35HhBie',
      'FPg1ZPVHdfYSphph0vc9',
      'GMLdFEsbGPCQ4Aqk6vXw',
      'Gc3Y4aGPBe3e4qhzoBEY',
      'GnU7VlS9lrqnrtIWS3T8',
      'II4MZAvbhAfrdC6pR6dp',
      'J9GdMnyotIMDQizZO7ZD',
      'LHpX21qhQ8uVczDWxIrd',
      'M00W0CJ0MnG95LqoB1sf',
      'M0FSeMKMebqI8kdYsxpl',
      'NPUzVoBbxxi6QQtOTQJc',
      'NtllxoJMlhZueLHFVBTa',
      'ODeMW88JcoKSzZbRAfUW',
      'R6hwLR08pxUdnUE7R7sT',
      'RiWUrnksMW60YUgSGmfR',
      'Rqz5zgYDNUKGde9jqBYG',
      'T55vVkdYagAFl18vKaNK',
      'UMGp1reTrLPYlYhb2jLe',
      'Uc0Q6730sqdzjfOaB4se',
      'VmMD6ALrLR2tN7O9qylU',
      'WYBU50HmrYipTg56XWxK',
      'XCTlq9qAarroxOJJ2MGb',
      'Y5bewk1JGkyDc101pkMC',
      'YQvodPsAWHjXKVFzuPZc',
      'ZaiYiEP1b16FXoGuvAic',
      'aH8urmCjl9ps2OgDSsoM',
      'dNlxscodWi8gQX0iAnS8',
      'esBsnSKOejZHZEMh3SGG',
      'fUTShLfBO4rJ6nQ5n3Oh',
      'gfmqlGAb8hJehfiwwQ7i',
      'hOhZppUErIYfP22HMXew',
      'icaNDih2i3Opi9ianTEV',
      'kLTH2PPpOl2SNzKgNMnj',
      'kTCcAV2Z9OaJKGjIaG4x',
      'kdM9UL2fiNSXFOQLhUwk',
      'l0oN6Jifqk0xPA2a8bGn',
      'l7r3kRo8chrQ3YlFYe4f',
      'la2QOgtCPrOIc4gtkimu',
      'm9HI0F3IjpHMHSq9WayO',
      'mRPlGRQLSLPlzrW90RhD',
      'mkzo87kx1VDlx9xh1eIl',
      'njmYsIzLWXAbPQvVcZol',
      'oom9WfO9yKCqYNMKApZK',
      'pqp7E1XZaWbaJ78zQO52',
      'q8W1Ooukx670yBwomDti',
      'qGn1ISQeRVMPnaVXwW9s',
      'qgeTmd1mUwhWPKSdvZ5J',
      'r3qMsTUQRZ09ekPmd28O',
      'tP7Pn9pgU89Bws9XZr77',
      'tq3kX743iNY3rsULvKdL',
      'uJDPJQuKulzeB0kPZBMx',
      'uX88XXlPtnEWKRvIBT5f',
      'vhnU1UU2x2Xta7reYdow',
      'wFabIK2HbtEag2q7ZU90',
      'wSRBtADr6uhunYaNJSo2',
      'xzlolNzbE87va71Nkbpr',
      'yFplzZ1Z2XehxMBCzm2W',
      'yWeglSUGqr4nmNVwqf3i',
      'yliVgD5IMXz63ZlAeP23',
      'z2JHnup3tLexJdoCFuKy',
      'zCHv7YB1DE8lpCRGhXHi',
      '0XQMMGnf8fO0v3ypOIxo',
      '2qXDozyRLm09FsQa8Ss2',
      '5o6GNh9PdPN9f82TEtSV',
      '8dgnvQf2IgB3L3QTZO6N',
      '9ZndTz0PiLn3rSFbYCKN',
      '9yG9rhPGga6y1i48EMeD',
      'AeFCdCf5Lh09SqEK7LIZ',
      'AhNklPXW5frwhbfNk4wq',
      'BrTdU25dIGthOD5F3AJO',
      'EHorZ4oxCghTk2ET4JR0',
      'IPMSWpt6pPxleO3WgoYs',
      'Jlt7fyOfIifJcSzN6wIF',
      'KVePdVi12Z0yyhsyeJZj',
      'KlSqKQaDVT2pJMN2VrBo',
      'LOzY47ukclxo1TZeoyho',
      'MG39ooRSTROty2l4JMXz',
      'PrMduzZVapo27Hh5n9RT',
      'PvgC9DoAE22LNKbA6J38',
      'RbopZ1tVWYa6PfyMhXEc',
      'f5EUeaMFlyX61Gc9Tg0Q',
      'fEbjYqw1Olhy2TJ5P7XL',
      'fIz3KIhEmOIKmD9Phpx9',
      'l1weAjIenJGiyqSlVyXv',
      'mUZAWAEIw0tThUgWkYAd',
      'oydATGc5WTmc4qCz4iDF',
      'qI2hgvGSvIQdgIJcSfsn',
      'qhRMCVMbAaVUt6eo1H69',
      'tilWucbR0HcZau7LPGVz',
      'vMSHBJ1uaGdWVcPJvCIZ',
      'y2QdxjdMI6CuD8tGqP4d',
      'yPRQAMD0lmAmNgph113l',
      'z6kOtjIYSOnSzJDlnoOH',
      'zdGG20O1BkfgkPg2lwyK',
      '3DMP89y4o0ZSM9O8FEx5',
      '4jMzcY7wg8eFWTgRbdQ2',
      '7wue4zSD8jSpw8gJyNee',
      '82oOReg3lhmYZsqvXSFk',
      'JGs2lY6n7WhDRWR94Vn0',
      'LALyqop0IG4YFRcv2EcJ',
      'VnlBQt7qMS7F4Enrc81N',
      'ZnPFKy6knmMJ1TUbW3Qo',
      'gcQTbcw2Be5tf2c8q5oD',
      'pwZKDuaMWQ30VNcQ0lGz',
      'sfFZsw0HHHGLNr3zMcvl',
      'ySrGEuabxsdijjvyyzWf',
      '0npvUbfpv0NGm2Qygsle', // Notas zero em diante
      '51xHcVJjkJahMNou585J',
      '72ujSKR5eWQb2EBH153a',
      '8kt98F8K8S9eqdvXMAzV',
      'BH9d7wLIT2kcIsxKPaNW',
      'abEQJVTbrIDda0JcS1vA',
      'cUWtC94swhooOsrvJqq4',
      'fb8NSHbXlfRL4SyjZC0j',
      'u41xggoH8CxLArHKThz1',
      'wYeL4oSePVLmKjV5TrlY',
      'zNsn70uG0G2h0P3C1jLH',
      'CB6SOLMOQdK7WE1TCFty',
      '7cHRr38nfTuktJb923pl',
      'IGC8OHOWte7OFGlJdgrr',
      'ILOLafEsHYJZyJFLMRq0',
      'KHM3o2MtGrR7hXWSo8VS',
      'OmkR7ZhrSPrpBSLwMsTU',
      'YgQKNtf4OvJFD721cw2p',
      'ZoXDbgpA4FuL1VVi8NpI',
      'abfpvuu6X7ydyNC3ElEW',
      'd7mSNbHv1HAajFxrYQHm',
      'msB788e9gWTZx0wA3U7B',
      'oIpNwbs0wOsTUrLgGbYr',
      'w1QreULZkDZAYnoFLw9G',
      'wjfYKLfrckfxtRyJEEI6',
      'wkUxdWbw0ZLKyr7xA0MI',
      'yPcosoNBtNjU40GCOlHP'

    ];

    if (estudantes_excluidos.includes(estudanteId)) {
      return true;
    }

    return false;
  }

static  incluirEstudantesSetentaPorcento(estudanteId){
    let estudantes =[
"0PsFCF7RPljJ0SAn1J5G",
"0dV0X0EF0Rexfrj5nI8U",
"FL7dGBw3G4Nb4E3Rzc9e",
"HkwZM3zhnEatlTSAZfv4",
"PFZxLh3TS6S43NTGv7xZ",
"q1gk7XrXK21MxZ21eRbL",
"vHW4tDiQ9IeKYQawCgfC",
"vsDMwOOR05sbVQo2eVLt",
"y5xsnvOkv4N0E7yXTPel",
"iLdani9C389FBJHei011",
"oUNUBvREDvNJSKopXsXg",
"DQ5WX7Y8peXeqNSL4lh0",
"d6Qx0ydf7quJmGirnF35",
"uwL18mtNF2M8Iy4DLFio",
"zVdKYtWtx1myxFvocXSy",
"KVePdVi12Z0yyhsyeJZj",
""

]

return estudantes.includes(estudanteId);
  }

  static identificarEstudantesPelasTracks(tracks){
    let estudantes_permitidos = [];

    tracks.forEach(track=>{
      if(!estudantes_permitidos.includes(track.estudante.id)){
        estudantes_permitidos.push(track.estudante.id)
      }
    })

    return estudantes_permitidos;
  }

  static gerarTracks(performance){
    let pTrack: PageTrackRecord[] = [];

    let pageTracks;

    if(performance == "high"){
      pageTracks = pageTracks_highPerforming;
    }else if(performance == "low"){
      pageTracks = pageTracks_lowPerforming;
    }

    let pages = [];

    pageTracks.forEach(page => {
      if(!AnalyticsUsoSistema.excluirEstudante(page.estudante)){
        if(performance == "low"){
          if(AnalyticsUsoSistema.incluirEstudantesSetentaPorcento(page.estudante)){
            pages.push(page)
          }
        }
      }
    })

    pages.forEach((p) => {
      if (p.pagina == 'visualizacao-assunto') {
        p.pagina = 'visualizar-assunto';
      }

      if (p.pagina == 'listagem-assuntos') {
        p.pagina = 'listar-assuntos';
      }

      if (p.pagina == 'self-instruction-editor') {
        p.pagina = 'self-instruction';
      }

      if (
        p.pagina != 'atividade-grupo' &&
        p.pagina != 'pedido-ajuda' &&
        p.pagina != 'responder-questao-correcao' &&
        p.pagina != 'visualizar-documentacao-projeto'
      ) {
        pTrack.push(PageTrackRecord.fromJson(p));
      }
    });

    return pTrack;
  }
}
