export enum NivelConfianca{
    pouco = 1,
    normal = 2,
    alto = 3,
}

export function getLabelNivelConfianca(nivelConfianca) {
    if (nivelConfianca != null) {
      if (nivelConfianca == NivelConfianca.pouco) {
        return "Pouco confiante";
      } else if (nivelConfianca == NivelConfianca.normal) {
        return "Confiante";
      } else if (nivelConfianca == NivelConfianca.alto) {
        return "Muito confiante"
      }
    }
  
    return null;
  }
  