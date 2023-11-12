import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputRef,
  Modal,
  Table,
} from "antd";
import { useCreateReview } from "../../hooks/useCreateReview";

const { TextArea } = Input;

type Props = {
  onClose: () => void;
  projectId: string;
  cardId?: string;
  onUpdate: (project: string) => void;
  type: "project" | "campaign";
};
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} обязательно.`,
          },
        ]}
      >
        <TextArea autoSize ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  text: string;
  link: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const ModalCreateReviews = ({
  onClose,
  projectId,
  cardId,
  onUpdate,
  type,
}: Props) => {
  const { handleCreateReview } = useCreateReview();

  const [dataSource, setDataSource] = useState<DataType[]>([
    { key: 0, text: "Текст отзыва...", link: "Ссылка на отзыв..." },
  ]);

  const [count, setCount] = useState(1);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "№",
      width: "7%",
      align: "center",
      dataIndex: "key",
      render: (record) => {
        return <>{dataSource.findIndex((item) => item.key === record) + 1}</>;
      },
    },
    {
      title: "Текст",
      dataIndex: "text",
      width: type === "campaign" ? "100%" : "50%",
      editable: true,
    },
    {
      title: "Ссылка",
      dataIndex: "link",
      editable: true,
      width: "50%",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <a onClick={() => handleDelete(record.key)}>Удалить</a>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      text: "Текст отзыва...",
      link: "Ссылка на отзыв...",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const mergedColumns =
    type === "campaign"
      ? columns.filter((col) => col.dataIndex !== "link")
      : columns;

  const onSave = () => {
    const targetValue = {
      reviews: dataSource,
      ...(type === "project" && { projectId }),
      ...(type === "campaign" && { cardId }),
    };
    handleCreateReview(targetValue).then(() => {
      onUpdate(projectId);
      onClose();
    });
  };

  return (
    <>
      <Modal
        title="Добавить запись"
        open
        onOk={onSave}
        onCancel={onClose}
        okText={"Сохранить"}
        cancelText={"Закрыть"}
        width={1024}
        okButtonProps={{ disabled: !dataSource.length }}
      >
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16, float: "right" }}
        >
          Еще
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={mergedColumns as ColumnTypes}
          pagination={false}
        />
      </Modal>
    </>
  );
};
