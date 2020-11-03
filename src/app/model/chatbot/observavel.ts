import Observador from './observador';

export default interface Observavel {
  observadores: Observador[];

  attach(observador: Observador);
  //dettach(observador: Observador);
  notify();
}
