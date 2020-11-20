import { getLabelPorCategoriaNumero } from '../errors/enum/labelCategoriasErro';

export enum ConhecimentoProgramacao {
  nenhum = 1,
  pouco = 2,
  medio = 3,
  programador = 4,
}

export function getLabelPorConhecimento(conhecimento) {
  if (conhecimento == ConhecimentoProgramacao.nenhum) {
    return 'Nenhum';
  } else if (conhecimento == ConhecimentoProgramacao.pouco) {
    return 'Pouco';
  } else if (conhecimento == ConhecimentoProgramacao.medio) {
    return 'Médio';
  } else if (conhecimento == ConhecimentoProgramacao.programador) {
    return 'Programador';
  }
}
