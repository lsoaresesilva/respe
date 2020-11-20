import QuestaoFechada from '../questoes/questaoFechada';

describe('Testes de questão fechada', () => {
  let questao = new QuestaoFechada(
    null,
    'bla',
    "bla bla bla\r'''python\rx = 2\r'''\rble ble ble",
    1,
    1,
    null,
    ''
  );

  it('Deve retornar o texto de uma questão que contém código de programação', () => {
    let resultado = questao.extrairTextoComCodigo();
    expect(resultado.length).toBe(3);
    expect(resultado[0]).toBe('bla bla bla');
    expect(resultado[1]).toBe('x = 2');
    expect(resultado[2]).toBe('ble ble ble');
  });

  it('Deve retornar o código de uma questão que contém código de programação', () => {
    let resultado = questao.extrairCodigo();
    expect(resultado.length).toBe(1);
    expect(resultado[0]).toBe('x = 2');
  });

  it('Deve indicar que o texto possui código', () => {
    let resultado = questao.hasCode();
    expect(resultado).toBeTruthy();
  });

  it('Deve indicar que o texto não possui código', () => {
    let questaoSemCodigo = new QuestaoFechada(
      null,
      'bla',
      'bla bla bla\rble ble ble',
      1,
      1,
      null,
      ''
    );
    let resultado = questaoSemCodigo.hasCode();
    expect(resultado).toBeFalsy();
  });
});
