import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

// Testando se a função está funcionando
test('increases date with one year', () => {
  const year = new Date().getFullYear()

  expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(2023)
})