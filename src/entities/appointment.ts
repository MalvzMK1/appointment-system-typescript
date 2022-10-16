// Definimos os tipos de 'atributos' dessa classe
export interface AppointmentProps {
  costumer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private props: AppointmentProps;

  get costumer() {
    return this.props.costumer;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  // Construtor da classe agendamentos
    // O construtor também faz algumas validações
  constructor(props: AppointmentProps) {

    // Desconstruindo os props para pegar somente as informações necessárias
    const { endsAt, startsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error("Invalid start date");
      
    }

    if (endsAt <= startsAt) {
        throw new Error("Invalid end date");
    }

    // Atribui os novos valores ao prop da classe
    this.props = props;
  }
}
