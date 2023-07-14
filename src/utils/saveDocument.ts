export const saveDocumentByLink = ({
  link,
  name = "",
  format,
  useLowerCaseFormat,
}: {
  link: string;
  name?: string;
  format?: string;
  useLowerCaseFormat?: boolean;
}) => {
  const fileFormat = useLowerCaseFormat ? format?.toLowerCase() : format;

  let fileName = name;
  if (name && fileFormat) {
    fileName = `${name}.${fileFormat}`;
  }

  const targetLink = document.createElement("a");
  targetLink.download = fileName;
  targetLink.href = link;
  targetLink.click();
  targetLink.remove();
};