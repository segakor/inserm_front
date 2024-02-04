import { useEffect, useState } from "react";
import { Table, ConfigProvider, Empty, Form, Input, Grid } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Reviews } from "../../types";
import { getDate } from "../../utils";
import { StatusComponent } from "../components/StatusComponent";
import { ButtonChangeRow } from "../Button/ButtonChangeRow";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { ListOfReviews } from "../components/ReviewItem";

const { useBreakpoint } = Grid;

type ReviewsTableItem = Reviews & {
  key: string;
};

type Props = {
  reviews: ReviewsTableItem[] | undefined;
  isLoading: boolean;
  withoutLink?: boolean;
};

const { TextArea } = Input;

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
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const TableProject = ({ reviews, isLoading, withoutLink }: Props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const [dataSource, setDataSource] = useState(reviews);

  useEffect(() => {
    setDataSource(reviews);
  }, [reviews]);

  const { handleUpdateReviewByClient } = useUpdateReview();

  const isEditing = (record: ReviewsTableItem) => record.key === editingKey;

  const onEdit = (record: Partial<ReviewsTableItem> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const onCancel = () => {
    setEditingKey("");
    form.resetFields();
  };

  const onSave = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ReviewsTableItem;
      // @ts-ignore TODO:доделать!
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      row.id = newData[index].id;
      console.log("row_save", row, index, newData[index]);
      handleUpdateReviewByClient({ id: Number(row.id), text: row.text });
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns: ColumnsType<ReviewsTableItem> = [
    {
      title: "№",
      dataIndex: "key",
      width: "6%",
      align: "center",
      render: (record: string) => {
        return <>{Number(record) + 1}</>;
      },
    },
    {
      title: "Ссылка на отзыв",
      dataIndex: "link",
      key: "link",
      ellipsis: true,
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (text) => (
        <a onClick={() => window.open(text, "_blank")}>{text}</a>
      ),
      width: "20%",
    },
    {
      title: "Текст отзыва",
      width: "45%",
      render: (record) => {
        const editable = isEditing(record);
        return (
          <>
            {!editable && record.text}
            <Form.Item
              name={"text"}
              initialValue={record.text}
              hidden={!editable}
              style={{ width: "100%" }}
            >
              <TextArea maxLength={1000} autoSize showCount />
            </Form.Item>
            <div
              style={{ float: "right", marginTop: editable ? "24px" : "8px" }}
            >
              {record.status === "wait" && (
                <ButtonChangeRow
                  isEdit={editable}
                  onClick={() => {
                    onEdit(record);
                  }}
                  onClickCancel={onCancel}
                  onClickSave={() => onSave(record.key)}
                />
              )}
            </div>
          </>
        );
      },
    },
    {
      title: "Статус отзыва",
      dataIndex: "status",
      width: "15%",
      align: "center",
      render: (status: string) => <StatusComponent status={status} />,
    },
    {
      title: "Дата размещения",
      dataIndex: "date",
      width: "10%",
      align: "center",
      render: (record: string | number) => {
        return (
          <>{typeof record === "number" ? getDate({ date: record }) : record}</>
        );
      },
    },
  ];

  const columnsT = !withoutLink
    ? columns
    : columns.filter((item) => item.key !== "link");

  const screens = useBreakpoint();
  const isMobile = !!screens.xs || (!screens.lg && screens);

  if (isMobile === true) {
    return <ListOfReviews data={reviews || []} />;
  }

  return (
    <Form form={form} component={false}>
      <ConfigProvider
        renderEmpty={() => (
          <Empty description="Отзывы в процессе написания, скоро они будут готовы" />
        )}
      >
        <Table
          columns={columnsT}
          dataSource={dataSource}
          size="small"
          bordered
          pagination={false}
          style={{ marginBottom: 30, whiteSpace: "pre-line" }}
          loading={isLoading}
          tableLayout={"fixed"}
          scroll={{ x: 1000 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </ConfigProvider>
    </Form>
  );
};
