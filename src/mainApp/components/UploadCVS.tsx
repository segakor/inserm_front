import React, { useState } from "react";
import { Button } from "antd";
import Papa from "papaparse";
import { UploadOutlined, FileTextOutlined } from "@ant-design/icons";
import { useCreateReview } from "../hooks/useCreateReview";
import { checkCSV } from "../../utils/checkCSV";

type Props = {
  onUpdate: (projectId: string) => void;
  projectId: string;
};

export const UploadCVS = ({ onUpdate, projectId }: Props) => {
  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const { handleCreateReviewList } = useCreateReview();

  const changeHandler = (event: any) => {
    setFile(event.target.files[0]);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      encoding: "UTF-8",
      complete: function (results) {
        console.log(results.data);
        const hasError = checkCSV(results.data as { text: string; link: string }[]);
        if(!hasError)  setData(results.data)
      },
    });
  };

  const onUpload = () => {
    handleCreateReviewList({ projectId: projectId, reviews: data }).then(() => {
      onUpdate(projectId);
      setData(null);
      setFile(null);
    });
  };

  return (
    <>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "none" }}
        id="fileUpload"
      />
      {!file && (
        <Button
          icon={<FileTextOutlined />}
          // @ts-ignore
          onClick={() => document.getElementById("fileUpload").click()}
        >
          Импорт csv
        </Button>
      )}
      {file && (
        <Button icon={<UploadOutlined />} onClick={onUpload} disabled={!data}>
          {file?.name}
        </Button>
      )}
    </>
  );
};
