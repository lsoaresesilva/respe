import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseConfiguracao } from 'src/environments/firebase';
import { DocumentModule } from '../../firestore/document.module';

import pageTracks_controle_positivo from '../../../../../json/pageTracks_controle_positivo.json';
import pageTracks_experimental from '../../../../../json/pageTracks_experimental.json';
import pageTracks_highPerforming from '../../../../../json/pagetrack_high_performing_2_ago_2022.json';
import pageTracks_lowPerforming from '../../../../../json/pagetrack_low_performing_2_ago_2022.json';


import submissoesEstudantes from '../../../../../json/submissoes_27_jan.json';
import Submissao from '../../submissao';
import AnalyticsProgramacao from '../../analytics/analyticsProgramacao';
import AtividadeGrupo from '../../cscl/atividadeGrupo';
import { Util } from '../../util';

import PageTrackRecord from '../../analytics/pageTrack';
import Grafo from '../../modelagem/grafo';
import { Assunto } from '../../questoes/assunto';
import Export from '../export';

const estudantesIgnorados = [
  'B3Xgj4IGEOQvjLKoTHI9',
  'JJ8zNeRZBDr4qTElmYJk',
  'xRSUKvyNAYV8Cmvn639q',
  'LYx978JlOUowgMgR7gq0',
  'BmIqbIXvbFLx0D4rqdvo',
  '1flzSjZxDqi7QmmoMRqG',
  'gxDZLmDyYSRoPOw1DkCJ',
  'mb7t9FEckyI2YEFHd8eH',
  'GvyxgiQu8w2UsUzeCZSV',

];

const estudantesGrupo1 = [
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

function excluirEstudante(estudanteId){
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
  ];

  if (estudantes_excluidos.includes(estudanteId)) {
    return true;
  }

  return false;
}

function incluirHighStudents(estudanteId) {
  let estudantesHighPerforming = [
    'WBN7iBrLgbtQQufUcHUl',
    'XV1Do4jBDAYR0x8DTKwh',
    'AClTuaxkU4QBNNYiFtjS',
    'fDELm9NgGHeDyGMNDdxq',
    'hESX6uYwfdfI8fdC0MLK',
    '9KcXtMtAIMyji0CUi4xM',
    '2qXDozyRLm09FsQa8Ss2',
    '5tw4w2xUn8YHBwzzN7go',
    '9ZndTz0PiLn3rSFbYCKN',
    'YUeSqIQKAv4ZBNzhRv37',
    'HkwZM3zhnEatlTSAZfv4',
    'giEygz2EC9Ioeb21HfBq',
    'ZE3AZqq9KN6uTjQAw8LS',
    'bBqzCttYCys2ykOAReoX',
    'kaprL0AVdVbHVZBCGhbn',
    'il4Zx5lpyPacSFo7c9Bz',
    'WX7vsrbbLyo6kTAa02j1',
    'mgrXUORVlo9woOIRqDrN',
    '0XQMMGnf8fO0v3ypOIxo',
    'fwvNcONxtaPLT1WnWVWa',
    'uqqsPnUvjguXc5nPAGtV',
    '0tXcE0JVbzGME4825VQp',
    'UZUlZT6N4iEPs0eyljVo',
    'miT2WXUYWMPTg7WBy5BY',
    'KuLmIQqoO2GHEW3luHFm',
    'SAh5KzQMmn44WrHcNWnu',
    'T7m08acxezz82QGk29rC',
    'afHpF5YD0yWO8O6A0ySZ',
    'j4pgzs4DpvDtVGZZKC24',
    'pqMtkIteoPd7ifSnhTL8',
    '24tTt0DoTXLyysO9sxDN',
    'M4bWBpDVzcX3F3U36iTW',
  ];
  if (estudantesHighPerforming.includes(estudanteId)) {
    return true;
  }

  return false;
}


describe('Testes para process mining', () => {
  let estudantesGrupo3 = [
    '0PsFCF7RPljJ0SAn1J5G',
    '0dV0X0EF0Rexfrj5nI8U',
    '24tTt0DoTXLyysO9sxDN',
    '3QY8EyDqvM19kb7okR9c',
    '9GrPLbDbfBtAda8xSofl',
    'Eb7rKqrrnaqwel4JoeGE',
    'FL7dGBw3G4Nb4E3Rzc9e',
    'HkwZM3zhnEatlTSAZfv4',
    'HpoIV24aeukWLKeeJxI8',
    'IQ5914tOM48ihWDnL65t',
    'M4bWBpDVzcX3F3U36iTW',
    'NAy1fZ1vOyMjytZipefC',
    'PFZxLh3TS6S43NTGv7xZ',
    'SAh5KzQMmn44WrHcNWnu',
    'UZUlZT6N4iEPs0eyljVo',
    'WsNiDCtNWnHLEMgIXg3Z',
    'XV1Do4jBDAYR0x8DTKwh',
    'aGYH6jayocWQuzNt8P9E',
    'afHpF5YD0yWO8O6A0ySZ',
    'fIzhRocFtYEI66vohDGk',
    'g3uJYOAIdwW7ivCdcbzi',
    'giEygz2EC9Ioeb21HfBq',
    'hESX6uYwfdfI8fdC0MLK',
    'il4Zx5lpyPacSFo7c9Bz',
    'j4pgzs4DpvDtVGZZKC24',
    '0x7ADeL2wiqASd3Hh4zz',
    'kaprL0AVdVbHVZBCGhbn',
    'vHW4tDiQ9IeKYQawCgfC',
    'vsDMwOOR05sbVQo2eVLt',
    'wQMGyoawsUaOOO5o0h3h',
    'x8kO6wUbv70VQVWrvd1U',
    'y5xsnvOkv4N0E7yXTPel',
    'zIatf4iwesH8hfLxmSnT',
    'C237gqDQZQlw3snj96JY',
    'bEsUIFQvM7fpGdUDAMOc',
    'bT0HYGprp7qG1tjuw502',
    'cc0dI1GyKeCdXB3jbDxa',
    'dk0lN6fFL1mTAXdHQr1o',
    'o1H9L7DEb1IPBEX0pLpW',
    'sBk3MRjGCcRAf22MkRb7',
    'tiaOUfNoGD0LJKsraNtj',
    'z321SrWJxdKZlLgMg7JT',
    ''

  ];



  let estudantesGrupo2 = [
    '139MdLNtSKa62Ip83e76',
    '62mDrZy9baANf8oiEYgV',
    '8Dj8zbKgaw2zCLB0u3s4',
    '9KcXtMtAIMyji0CUi4xM',
    'DQ5WX7Y8peXeqNSL4lh0',
    'EWdvX2ympgrHvMhkFWvE',
    'T7m08acxezz82QGk29rC',
    'WBN7iBrLgbtQQufUcHUl',
    'YUeSqIQKAv4ZBNzhRv37',
    'ZE3AZqq9KN6uTjQAw8LS',
    'bBqzCttYCys2ykOAReoX',
    'd6Qx0ydf7quJmGirnF35',
    'erEfwziVvlqZluGBA16Y',
    'f4JGIqpSqiurSdenJ9fi',
    'fwvNcONxtaPLT1WnWVWa',
    'g9zic1jMOnstBHQbf7NF',
    'nnquS2cCcfXWIt03eUEr',
    'tmvt3Irt6o1jmk3RYgRH',
    'uqqsPnUvjguXc5nPAGtV',
    'uwL18mtNF2M8Iy4DLFio',
    'y0c15f1wYbqZTrrC7IiR',
    'zVdKYtWtx1myxFvocXSy',
  ];

  let paginasExcluir = ['pedido-ajuda', 'atividade-grupo'];

  function ignorar(questaoId) {
    let questoesIgnoradas = [
      '947713cc-17bf-11eb-adc1-0242ac120002',
      '6012cdd4-3a9a-4865-9d3f-99a29d5bbe0c',
      '77016fcf-56d1-4a0e-bdd5-89f872c81e6c',
      '878ef656-32e7-4e12-9273-851cc28e5002',
      'a9fbc2c1-97f5-4136-a870-6c3e265e8fef',
      '057bb964-7f4d-4555-b432-bf1e1dea26fb',
      'd71b2ce8-2a29-4424-8f87-5eae8b37b3d9',
      'e1a534cf-06d3-4f33-9e51-72c48e06d0ae',
      'a985f95d-94c5-4675-a7ea-f33703c94caa',
    ];
    if (questoesIgnoradas.includes(questaoId)) {
      return true;
    }

    return false;
  }

  function imprimirMatrizTransicao(estudanteId, matriz, quantidadeSubmissoes) {
    let objeto = { id: estudanteId };
    matriz.forEach((frequenciaEventos, evento, map) => {
      frequenciaEventos.forEach((frequencia, e, map) => {
        objeto[evento + ' -> ' + e] = frequencia / quantidadeSubmissoes;
        //console.log(evento+" -> "+e+" : "+frequencia)
      });
    });

    return objeto;
  }

  let app: firebase.app.App;
  let afs: AngularFirestore;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
    TestBed.configureTestingModule({
      imports: [
        DocumentModule,
        AngularFireModule.initializeApp(FirebaseConfiguracao),
        AngularFirestoreModule, //.enablePersistence()
      ],
    });
    inject([FirebaseApp, AngularFirestore], (_app: firebase.app.App, _afs: AngularFirestore) => {
      app = _app;
      afs = _afs;
    })();
  });

  xit("Deve carregar usuários que não devem ter os dados coletados para análise de pagetrack", (done)=>{
    Export.getUsuariosExperimento().subscribe(usuarios=>{
      console.log(usuarios);
      done();
    })
  })

  xit("Deve carregar os pagetracks de high-performing", (done)=>{
    Export.getPageTracks(null).subscribe(pageTracks=>{
      done();
    })
  })

  it("Deve identificar os usuários que tiveram a interação registrada", (done)=>{
    let pageTracks = pageTracks_highPerforming.concat(pageTracks_lowPerforming);

    let estudantes = [];

    pageTracks.forEach(page=>{
      if(!estudantes.includes(page.estudante) && !excluirEstudante(page.estudante)){
        estudantes.push(page.estudante);
      }
    })

    let x = estudantes;
    console.log(estudantes);
    done();
  })

  xit('Deve gerar uma matriz de transição', () => {
    let pTrack: PageTrackRecord[] = [];

    let pageTracks = pageTracks_highPerforming;
    let pages = [];

    pageTracks.forEach(page => {
      if(!excluirEstudante(page.estudante)){
        pages.push(page)
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

    let g = new Grafo(pTrack);
    let m = g.criarMatrizSomada(pTrack);
    m.forEach((probabilidadeEventos, evento, map) => {
      console.log(evento);

      probabilidadeEventos.forEach((probabilidade, e, map) => {
        console.log(e + ' : ' + probabilidade);
      });
    });
  });

  xit('Deve identificar quantas atividades foram entregas no prazo pelos alunos', () => {
    /* 1. Pegar o grupo ok
          2. Pegar todas as submissoes de cada usuário associada à questãoId da atividade colaborativa. ok
          3. Verificar apenas as do dia limite da atividade Grupo ok
          4. Verificar se há alguma com status concluído */

    let submissoes = [];

    submissoesEstudantes['submissoes'].forEach((s) => {
      //if(ignorar(s["questaoId"])){
      let submissao = Submissao.fromJson(s);
      submissao['estudanteId'] = submissao.estudante.pk();
      submissoes.push(submissao);
      //}
    });

    let agrupado = Submissao.agruparPorEstudante(submissoes);

    let resultadoGrupoExperimental = new Map<string, any>();
    resultadoGrupoExperimental.set('curso2021b', { totalCorretas: 0, totalIncorretas: 0 });
    resultadoGrupoExperimental.set('2021a', { totalCorretas: 0, totalIncorretas: 0 });
    resultadoGrupoExperimental.set('curso2021j', { totalCorretas: 0, totalIncorretas: 0 });

    Assunto.getAll().subscribe((assuntos) => {
      AtividadeGrupo.getAll().subscribe((atividades) => {
        atividades.forEach((atividade) => {
          console.log('AtividadeId = ' + atividade.nome);

          //if(atividade.id == "cvMBP6aW7Qf32kFA6kmi"){
          if (atividade.turmaCodigo == '2021a') {
            let atividadeColaborativa = null;

            assuntos.forEach((assunto) => {
              let atvCL = assunto.getQuestaoColaborativaById(atividade.questaoColaborativaId);
              if (atvCL != null) {
                atividadeColaborativa = atvCL;
              }
            });

            let totalRespostasCertas = 0;
            let totalRespostasErradas = 0;

            atividade.grupos.forEach((grupo) => {
              let submissoesDessaAtividade = [];
              let isRespondida = false;
              grupo.estudantes.forEach((estudante) => {
                let submissoesDoEstudante = agrupado[estudante];
                if (submissoesDoEstudante != null) {
                  submissoesDoEstudante.forEach((submissaoEstudante) => {
                    if (
                      submissaoEstudante.questaoId ==
                      /* atividade.questaoColaborativaId */ atividadeColaborativa.questao.id
                    ) {
                      let dataA = submissaoEstudante.data;
                      let dataB = Util.firestoreDateToDate(atividade.dataExpiracao);
                      if (dataA <= dataB) {
                        submissoesDessaAtividade.push(submissaoEstudante);
                      }
                    }
                  });
                }

                submissoesDessaAtividade.forEach((sub) => {
                  if (sub.isFinalizada()) {
                    isRespondida = true;
                  }
                });

                //submissoesDessaAtividade = submissoesDessaAtividade.concat(agrupado[estudante]);
              });

              let resultadosTurma = resultadoGrupoExperimental.get(atividade.turmaCodigo);

              if (resultadosTurma != null) {
                if (isRespondida) {
                  resultadosTurma.totalCorretas += 1;
                } else {
                  resultadosTurma.totalIncorretas += 1;
                }
              }

              console.log('GrupoId = ' + grupo.id + ' Status = ' + isRespondida);
            });
          }
        });
        let x = resultadoGrupoExperimental;
      });
    });
  });

  xit("Deve exportar as submissões", (done)=>{
    /* Export.submissoes().subscribe(submissoes=>{
      console.log(submissoes);
      done();
    }) */

    let submissoes = [];

    submissoesEstudantes['submissoes'].forEach((s) => {
      let submissao = Submissao.fromJson(s);

       if(submissao.data.getDate() == 28 && submissao.data.getMonth() == 6)

          submissoes.push(submissao);
    });

    let x = submissoes;
  })

  xit('Deve gerar métricas para análise dos algoritmos', () => {
    function ignorarEstudantes(estudanteId) {


      if (estudantesIgnorados.includes(estudanteId)) {
        return true;
      }

      return false;
    }



    function incluirEstudantes(estudanteId) {
      let estudantes = estudantesGrupo2;

      if (estudantes.includes(estudanteId)) {
        return true;
      }

      return false;
    }

    let submissoesAgrupadasPosFiltro = {};

    let soma = 0;

    let submissoes = [];

    submissoesEstudantes['submissoes'].forEach((s) => {
      if (!ignorar(s['questaoId'])) {
        let submissao = Submissao.fromJson(s);
        submissao['estudanteId'] = submissao.estudante.pk();
        submissoes.push(submissao);
      }
    });

    let agrupado = Submissao.agruparPorEstudante(submissoes);

    Object.keys(agrupado).forEach((estudanteId) => {
      if (!ignorarEstudantes(estudanteId)) {
        if (agrupado[estudanteId].length >= 5) {
          /* if( !incluirHighStudents(estudanteId) ){ */
          if (incluirEstudantes(estudanteId)) {
            soma += agrupado[estudanteId].length;
            submissoesAgrupadasPosFiltro[estudanteId] = agrupado[estudanteId];
          }
          /* } */
        }
      }
    });

    let estatisticas = {};

    let estadosAlgoritmo = [];

    let jsons = [];

    Object.keys(submissoesAgrupadasPosFiltro).forEach((estudanteId) => {
      estatisticas[estudanteId] = {};
      estatisticas[estudanteId][
        'mediaErrosSintaxe'
      ] = AnalyticsProgramacao.calcularMediaErrosSintaxeProgramacao(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'totalQuestoesComErrosLogico'
      ] = AnalyticsProgramacao.calcularTotalErrosLogicos(submissoesAgrupadasPosFiltro[estudanteId]);
      estatisticas[estudanteId]['totalDesistencias'] = AnalyticsProgramacao.calcularDesistencias(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'mediaSubmissoesParaAcerto'
      ] = AnalyticsProgramacao.calcularMediaSubmissoesParaAcerto(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'mediaSubmissoesCorrecaoErro'
      ] = AnalyticsProgramacao.calcularMediaSubmissoesCorrigirErro(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId]['totalExecucoes'] = AnalyticsProgramacao.calcularExecucoes(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'tentativasQuestoes'
      ] = AnalyticsProgramacao.calculaTentativasQuestoes(submissoesAgrupadasPosFiltro[estudanteId]);
      estatisticas[estudanteId][
        'mediaComentarios'
      ] = AnalyticsProgramacao.calcularCodigosComentados(submissoesAgrupadasPosFiltro[estudanteId]);
      estatisticas[estudanteId][
        'totalQuestoesCorretas'
      ] = AnalyticsProgramacao.calcularTotalQuestoesCorretas(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'totalRefatoramentos'
      ] = AnalyticsProgramacao.identificarMelhoriasSubmissaoAposConclusao(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estatisticas[estudanteId][
        'mediaQuestoesPorSemana'
      ] = AnalyticsProgramacao.calcularMediaQuestoesSemana(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      let estadosEstudante = AnalyticsProgramacao.identificarSequenciaEstados(
        submissoesAgrupadasPosFiltro[estudanteId]
      );
      estadosAlgoritmo = estadosAlgoritmo.concat(estadosEstudante);
      let matriz = AnalyticsProgramacao.criarMatrizTransicao(estadosEstudante);
      //console.log("Estudante: "+estudanteId);
      jsons.push(
        imprimirMatrizTransicao(
          estudanteId,
          matriz,
          submissoesAgrupadasPosFiltro[estudanteId].length
        )
      );
    });

    //console.log("JSON")
    //console.log(JSON.stringify(jsons));

    let matriz = AnalyticsProgramacao.criarMatrizTransicao(estadosAlgoritmo);
    let matrizProbabilidade = AnalyticsProgramacao.calcularProbabilidadesMatriz(matriz);

    matrizProbabilidade.forEach((probabilidadeEventos, evento, map) => {
      console.log(evento);

      probabilidadeEventos.forEach((probabilidade, e, map) => {
        console.log(e + ' : ' + probabilidade);
      });
    });

    console.log(JSON.stringify(matrizProbabilidade));
  });
});
