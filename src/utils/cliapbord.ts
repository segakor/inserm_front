import { openNotificationWithIcon } from "./notification";

export const cliapbord = (text: string) => {
  navigator.clipboard.writeText(text)
  openNotificationWithIcon({
    type: "info",
    message: "",
    description: "Скопировано",
  })
}