import { useGetArchiveProject } from "../hooks/useGetArchiveProject";
import { ArchiveProject } from "./ArchiveProject";

type Props = {
  projectId: string;
}
export const ArchiveProjectList = ({ projectId }: Props) => {
  const { archiveProject } = useGetArchiveProject(projectId);

  return (
    <>
      {archiveProject?.map((item, index) => (
        <ArchiveProject {...item} key={index} />
      ))}
    </>
  )

}