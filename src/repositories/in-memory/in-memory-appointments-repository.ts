import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointment-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  // Criando o array de agendamentos que irá funcionar como um banco de dados para testes locais
  public items: Appointment[] = []

  // Criando um agendamento
  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  // Percorrendo o array de agendamentos e verificando se existe algum agendamento na mesma data
  async findOverlappingAppointment (startsAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find(appointment => {
      // Função da biblioteca date-fns que verifica se duas datas estão se sobrepondo
        // Recebe como primeiro parâmetro e segundo as duas datas a ser verificadas
        // inclusive: true é para contar o 'igual' da operação lógica também
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true })
    });

    // Se não existir nenhum agendamento sobreposto...
    if (!overlappingAppointment) {
      return null;
    }

    // Se existir, retorna o agendamento no qual deu a interferência
    return overlappingAppointment;
  }
}