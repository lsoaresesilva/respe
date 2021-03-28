export enum Motivacao{
    nenhuma = 1,
    pouco = 2,
    normal = 3,
    motivado = 4,
    muitoMotivado = 5
}

export function getLabelNivelMotivacao(nivelMotivacao) {
    if (nivelMotivacao != null) {
      if (nivelMotivacao == Motivacao.nenhuma) {
        return "Não estou";
      } else if (nivelMotivacao == Motivacao.pouco) {
        return "Pouco";
      } else if (nivelMotivacao == Motivacao.normal) {
        return "Normal"
      }else if (nivelMotivacao == Motivacao.motivado) {
        return "Estou motivado"
      }else if (nivelMotivacao == Motivacao.muitoMotivado) {
        return "Estou muito motivado"
      }
    }
  
    return null;
  }
  