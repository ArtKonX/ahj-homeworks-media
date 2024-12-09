import validator from "../../utils/validator";

describe("Тестирование функции validator", () => {
  test.each([
    { coords: "51.50851, -0.12572" },
    { coords: "51.50851,-0.12572" },
    { coords: "[51.50851, -0.12572]" },
  ])('"$coords" - успех', ({ coords }) => {
    expect(validator(coords)).toEqual({ lat: 51.50851, long: -0.12572 });
  });

  test.each([
    { coords: "" },
    { coords: "X51.50851,-0.12572" },
    { coords: "(51.50851, -0.12572)" },
  ])('"$coords" - false', ({ coords }) => {
    expect(() => validator(coords)).toThrow(new Error("Неверные координаты:("));
  });
});
