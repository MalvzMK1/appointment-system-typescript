import { describe, it, expect} from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointment } from "./create-appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe('Create Appointment', () => {
  // it = forma mais semântica de escrever o 'test'
  it('should be able to create an appointment', () => {
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-11');

    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
    
    expect(createAppointment.execute({
      costumer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment);
  });

  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-15');

    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    await createAppointment.execute({
      costumer: 'John Doe',
      startsAt,
      endsAt
    });

    // Espera-se que se começar durante e terminar depois, dê erro
    expect(createAppointment.execute({
      costumer: 'John Doe',
      startsAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-17')
    })).rejects.toBeInstanceOf(Error);

    // Espera-se que se começar antes e terminar durante, dê erro
    expect(createAppointment.execute({
      costumer: 'John Doe',
      startsAt: getFutureDate('2022-08-05'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error);

    // Espera-se que se começar antes e terminar depois, dê erro
    expect(createAppointment.execute({
      costumer: 'John Doe',
      startsAt: getFutureDate('2022-08-05'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error);

    // Espera-se que se começar durante e terminar durante, dê erro
    expect(createAppointment.execute({
      costumer: 'John Doe',
      startsAt: getFutureDate('2022-08-11'),
      endsAt: getFutureDate('2022-08-14')
    })).rejects.toBeInstanceOf(Error);
  });
});