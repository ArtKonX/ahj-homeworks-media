export default function validator(coords) {
  const coordsList = coords.replace("[", "").replace("]", "").trim().split(",");

  const res = /^(\[)?(\d+\.?\d+)\s?,\s?(-|−)?(\d+\.?\d+)(\])?$/.test(coords);

  if (res && parseFloat(coordsList[0]) && parseFloat(coordsList[1])) {
    return {
      lat: parseFloat(coordsList[0]),
      long: parseFloat(coordsList[1]),
    };
  }

  throw new Error("Неверные координаты:(");
}
