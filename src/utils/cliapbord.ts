import { openNotificationWithIcon } from "./notification";

export const cliapbord = (text: string) => {
  navigator.clipboard.writeText(text)
  openNotificationWithIcon({
    type: "success",
    message: "",
    description: "Скопировано",
  })
}