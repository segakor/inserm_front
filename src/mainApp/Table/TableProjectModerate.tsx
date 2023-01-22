/* eslint-disable jsx-a11y/anchor-is-valid */
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
} from "antd";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { Reviews } from "../../type";
import { getDate } from "../../utils/getDate";
import { ButtonCopy } from "../Button/ButtonCopy";
import { cliapbord } from "../../utils/cliapbord";
import { useLocalState } from "../context/hooks";
import { usePerson } from "../hooks/usePerson";
import { StatusSelect } from "../components/StatusSelect";
import { StatusComponent } from "../components/StatusComponent";

type Props = {
  reviews: ReviewsTableItem[] | undefined;
  isLoading: boolean;
  onUpdate: () => void;
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

export const TableProjectModerate = ({
  reviews,
  isLoading,
  onUpdate,
}: Props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [dataSource, setDataSource] = useState(reviews);

  const state = useLocalState();
  const { personInfo } = state;
  usePerson();

  const { handleUpdateReview } = useUpdateReview();

  const isEditing = (record: ReviewsTableItem) => record.key === editingKey;

  const edit = (record: Partial<ReviewsTableItem> & { key: React.Key }) => {
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
      handleUpdateReview(row).then(() => onUpdate());
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
    if (index > -1) {
      const item = newData[index];
      const inWorkDate = Math.floor(new Date().valueOf() / 1000);
      //togle
      item.in_work = !item.in_work;
      form.setFieldsValue({ in_work: item.in_work });
      form.setFieldsValue({ date: item.in_work ? inWorkDate : null });
      form.setFieldsValue({
        host: item.in_work ? personInfo?.first_name : null,
      });
    }
  };

  const onSelectStatus = (value: string, key: React.Key) => {
    // @ts-ignore TODO:доделать!
    const newData = [...reviews];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      /* const item = newData[index]; */
      form.setFieldsValue({ status: value });
    }
  };

  const columns = [
    {
      title: "№",
      dataIndex: "key",
      width: "4%",
      render: (record: string) => {
        return <>{Number(record) + 1}</>;
      },
    },
    {
      title: "Ссылка на отзыв",
      dataIndex: "link",
      width: "12%",
      render: (text: string) => (
        <div style={{ display: "inline" }}>
          <a onClick={() => window.open(text, "_blank")}>{text}</a>
          <ButtonCopy onClick={() => cliapbord(text)} />
        </div>
      ),
    },
    {
      title: "Текст отзыва",
      dataIndex: "text",
      width: "20%",
      render: (text: string) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <div>
          <span>{text}</span>
          <ButtonCopy onClick={() => cliapbord(text)} />
        </div>
      ),
    },
    {
      title: "Статус отзыва",
      dataIndex: "status",
      width: "15%",
      ellipsis: true,
      render: (status: string, record: ReviewsTableItem) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
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
      render: (record: string | number) => {
        return (
          <>{typeof record === "number" ? getDate({ date: record }) : record}</>
        );
      },
    },
    {
      title: "Кто отдал отзыв",
      dataIndex: "host",
      width: "10%",
      editable: true,
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
      width: "6%",
      render: (_: any, record: ReviewsTableItem) => {
        /* const editable = isEditing(record); */
        return (
          <>
            <Checkbox
              disabled={record.in_work}
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

  return (
    <Form form={form} component={false}>
      <ConfigProvider renderEmpty={() => <Empty description="Отзывы в процессе написания, скоро они будут готовы" />}>
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
          tableLayout={"fixed"}
        />
      </ConfigProvider>
      <Form.Item name={"in_work"} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={"status"} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={"date"} hidden>
        <Input />
      </Form.Item>
    </Form>
  );
};
