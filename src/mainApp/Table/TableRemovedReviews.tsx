import { Divider, Form, Input, InputNumber, Radio, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RemovedReviews } from "../../types";
import { cliapbord, getDate } from "../../utils";
import { useGetReviewsRemoved } from "../hooks/useGetReviewsRemoved";
import { statusRemovedReviews } from "../../constants";
import { useState } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { StatusSelect } from "../components/StatusSelect";
import { ButtonCopy } from "../Button/ButtonCopy";
import { useNavigate } from "react-router-dom";

type TableItem = RemovedReviews & {
  key: string;
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: TableItem;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const TableRemovedReviews = () => {
  const [status, setStatus] = useState("wait");

  const { data, isLoading, handleUpdateStatus } = useGetReviewsRemoved(status);

  const navigation = useNavigate();
  
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: TableItem) => record.key === editingKey;

  const edit = (record: Partial<TableItem> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TableItem;
      // @ts-ignore TODO:доделать!
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      row.id = newData[index].id;
      handleUpdateStatus({ requestId: row.id, status: row.status });
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onSelectStatus = (value: string, key: React.Key) => {
    // @ts-ignore TODO:доделать!
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      form.setFieldsValue({ status: value });
    }
  };

  const columns: ColumnsType<TableItem> = [
    {
      width: "10%",
      title: "Дата",
      render: (record: RemovedReviews) => {
        return <>{getDate({ date: record.date })}</>;
      },
    },
    {
      title: "Проект",
      render: (record: RemovedReviews) => {
        return <a onClick={()=>navigation(`/app/admin/campaign/${record.campaignId}`)}>{record.name}</a>;
      },
    },
    {
      title: "Текст",
      render: (record: RemovedReviews) => {
        return (
          <div>
            {record.text}{" "}
            <ButtonCopy
              onClick={() => cliapbord(record.text)}
              style={{ marginLeft: 10 }}
            />
          </div>
        );
      },
    },
    {
      title: "Ссылка на отзыв",
      render: (record: RemovedReviews) => {
        return (
          <a onClick={() => window.open(record.link, "_blank")}>
            {record.link}
          </a>
        );
      },
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (status: string, record: TableItem) => {
        const editable = isEditing(record);
        const targetStatus = statusRemovedReviews.find(
          (item) => item.status === status
        );
        return (
          <>
            {editable ? (
              <StatusSelect
                defaultValue={status}
                isRemoved
                onSelect={(e) => onSelectStatus(e, record.key)}
              />
            ) : (
              <Tag color={targetStatus?.color}>{targetStatus?.label}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "",
      width: "15%",
      render: (_: any, record: TableItem) => {
        const editable = isEditing(record);
        return editable ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ color: "green" }}
            >
              <CheckOutlined style={{ marginRight: 4 }} />
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>
              <CloseOutlined style={{ marginRight: 4 }} />
              Cancel
            </Typography.Link>
          </div>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => {
              edit(record);
            }}
          >
            <EditOutlined style={{ marginRight: 4 }} />
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
       <Radio.Group
        onChange={({ target: { value } }) => {
          setStatus(value);
        }}
        value={status}
      >
        <Radio value="wait">На рассмотрении</Radio>
        <Radio value="all">Все</Radio>
      </Radio.Group>
      <Divider />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={columns}
        dataSource={data}
        bordered
        loading={isLoading}
        pagination={false}
        tableLayout={"fixed"}
        locale={{ emptyText: "Нет данных" }}
        scroll={{ x: 900 }}
      />
      <Form.Item name={"status"} hidden>
        <Input />
      </Form.Item>
    </Form>
  );
};
