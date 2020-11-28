import { Assunto } from '../assunto';

export class WorkedExampleTrecho {
  constructor(
    public id,
    public url: string,
    public comentario,
    public algoritmo,
    public sequencia: number
  ) {}
}
