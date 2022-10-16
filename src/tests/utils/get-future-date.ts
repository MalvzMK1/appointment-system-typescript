import { setYear, parseISO } from 'date-fns'

/**
 * Receives: 2022-08-10
 * Returns: 2023-08-10
 */
export function getFutureDate(date: string): Date {
  // parseISO transforma uma data em tipo string para tipo data
  // No segundo parametro do método setYear é passado a alteração que será feita na data
    // Nesse caso a alteração é: Soma 1 ano à data recebida
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}