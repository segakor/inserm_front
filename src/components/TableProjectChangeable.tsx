import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Table,
  Typography,
  Checkbox,
  ConfigProvider,
  Empty,
  Button,
} from "antd";
import { StatusComponent } from "./StatusComponent";
import { StatusSelect } from "./StatusSelect";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { Reviews } from "../type";
import { ModalAddReview } from "./ModalAddReview";

type Props = {
  reviews: ReviewsTableItem[] | undefined;
  isLoading: boolean;
  onUpdate: (project: string) => void;
  projectId: string;
};

type ReviewsTableItem = Reviews & {
  key: string;
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: ReviewsTableItem;
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
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
        /*  rules={[
         {
           required: true,
           message: `Please Input ${title}!`,
         },
       ]} */
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const TableProjectChangeable = ({
  reviews,
  isLoading,
  projectId,
  onUpdate,
}: Props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [dataSource, setDataSource] = useState(reviews);

  const { handleUpdateReview } = useUpdateReview();

  const isEditing = (record: ReviewsTableItem) => record.key === editingKey;

  const edit = (record: Partial<ReviewsTableItem> & { key: React.Key }) => {
    /* form.setFieldsValue({ name: "", age: "", address: "", ...record }); */
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ReviewsTableItem;
      // @ts-ignore TODO:доделать!
      const newData = [...reviews];
      const index = newData.findIndex((item) => key === item.key);
      row.id = newData[index].id;
      console.log("row_save", row, index, newData[index]);
      handleUpdateReview(row).then(() => {
        onUpdate(projectId);
      });
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

  const onCheckBoxWork = (key: React.Key) => {
    // @ts-ignore TODO:доделать!
    const newData = [...reviews];
    const index = newData.findIndex((item) => key === item.key);
    console.log(newData, index);
    if (index > -1) {
      const item = newData[index];
      //togle
      item.in_work = !item.in_work;
      form.setFieldsValue({ in_work: item.in_work });
      console.log(item);
    }
  };

  const onSelectStatus = (value: string, key: React.Key) => {
    // @ts-ignore TODO:доделать!
    const newData = [...reviews];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      form.setFieldsValue({ status: value });
      console.log(item);
    }
  };

  const { role } = useAuthCheck();

  const isAdmin = role === "ADMIN" || role === "SUPERVISOR";

  const columns = [
    {
      title: "№",
      dataIndex: "key",
      width: "2%",
    },
    {
      title: "Ссылка на отзыв",
      dataIndex: "link",
      width: "15%",
      editable: isAdmin,
    },
    {
      title: "Текст отзыва",
      dataIndex: "text",
      width: "20%",
      editable: isAdmin,
    },
    {
      title: "Статус отзыва",
      dataIndex: "status",
      width: "10%",
      render: (status: string, record: ReviewsTableItem) => {
        const editable = isEditing(record);
        return (
          <>
            {editable && isAdmin ? (
              <StatusSelect
                defaultValue={status}
                onSelect={(e) => onSelectStatus(e, record.key)}
              />

            ) : (
              <StatusComponent status={status} />
            )}
          </>
        );
      },
    },
    {
      title: "Дата размещения",
      dataIndex: "date",
      width: "10%",
    },
    {
      title: "Кто отдал отзыв",
      dataIndex: "host",
      width: "10%",
      editable: isAdmin,
    },
    {
      title: "Имя в телеграм",
      dataIndex: "tg",
      width: "10%",
      editable: true,
    },
    {
      title: "В работе",
      dataIndex: "in_work",
      width: "8%",
      align: "center" as const,
      render: (_: any, record: ReviewsTableItem) => {
        const editable = isEditing(record);
        return (
          <>
            <Checkbox
              disabled={
                (record.in_work && record.status !== "moderate") || !editable
              }
              /* checked={record.isWork} */
              {...(record.in_work && { checked: true })}
              onClick={() => onCheckBoxWork(record.key)}
            />
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_: any, record: ReviewsTableItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>Cancel</Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ReviewsTableItem) => ({
        record,
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    setDataSource(reviews);
  }, [reviews]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Form form={form} component={false}>
      <ConfigProvider renderEmpty={() => <Empty description="Нет данных" />}>
        {isAdmin && (
          <Button
            onClick={showModal}
            type="primary"
            style={{ marginBottom: 16, width: 150 }}
          >
            Добавить запись
          </Button>
        )}
        {isModalOpen && (
          <ModalAddReview
            onClose={closeModal}
            projectId={projectId}
            onUpdate={onUpdate}
          />
        )}
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          loading={isLoading}
        />
      </ConfigProvider>
      <Form.Item name={"in_work"} style={{ visibility: "hidden" }}>
        <Input />
      </Form.Item>
      <Form.Item name={"status"} style={{ visibility: "hidden" }}>
        <Input />
      </Form.Item>
    </Form>
  );
};
