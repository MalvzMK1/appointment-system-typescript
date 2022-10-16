import { expect, test } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment';

/**
 * Com o vitest, podemos testar se o nosso backend está funcionando, usando os métodos de teste (test('') ou it(''))
 */

// Tentando criar um agendamento (deve dar certo)
test('create an appointment', () => {
  const startsAt = getFutureDate('2022-08-10');
  const endsAt = getFutureDate('2022-08-11');
  
  const appointment = new Appointment({
    costumer: 'John Doe',
    startsAt,
    endsAt
  });

  // Espera-se que o agendamento seja uma instância da classe Agendamento
  expect(appointment).toBeInstanceOf(Appointment);
  // Espera-se que o nome do cliente seja igual 'John Doe'
  expect(appointment.costumer).toEqual('John Doe');
});

// Tentando criar um agendamento com uma data final menor que a data inicial (O que deve retornar um erro)
test('cannot create an appointment with end date before start date', () => {
  const startsAt = getFutureDate('2022-08-10');
  const endsAt = getFutureDate('2022-08-09');
  
  // Espera-se que a criação da instância dê erro por conta da data sendo informada de forma errônea
  expect(() => {
    return new Appointment({
      costumer: 'John Doe',
      startsAt,
      endsAt
    });
  }).toThrow();
  // o método toThrow() vai fazer com que retorne a mensagem de erro que está presente na classe do agendamento
});

// Tentando criar um agendamento com uma data inicial antes da data atual (O que deve retornar um erro)
test('cannot create an appointment with start date before now', () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() -1);
  endsAt.setDate(endsAt.getDate() + 3);
  
  // Espera-se um erro por conta das datas erradas
  expect(() => {
    return new Appointment({
      costumer: 'John Doe',
      startsAt,
      endsAt
    });
  }).toThrow();
});