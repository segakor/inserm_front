export const checkCSV = (data: { text: string; link: string }[]) => {
  let hasError = false;

  data.forEach(function (item) {
    for (var key in item) {
      if (key !== "text" && key !== "link") {
        console.log(`ошибка при валидации файла, недопустимое свойство ${key}`);
        hasError = true;
      }
    }
  });

  return hasError
};
