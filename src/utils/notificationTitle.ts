export const notificationTitle = (notifyCount: number) => {
  notifyCount
    ? (document.title = `(${notifyCount}) INSERM | Сервис для заказа отзывов`)
    : (document.title = "INSERM | Сервис для заказа отзывов");
};
