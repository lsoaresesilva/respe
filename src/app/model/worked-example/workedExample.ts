import { Assunto } from '../assunto';
import { WorkedExampleTrecho } from './workedExampleTrecho';

export class WorkedExample {
  constructor(
    public id,
    public trechos: WorkedExampleTrecho[],
    public enunciado,
    public assunto: Assunto
  ) {}

  ordernarTrechos() {}
}
