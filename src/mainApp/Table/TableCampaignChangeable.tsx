/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Table,
  Typography,
  ConfigProvider,
  Empty,
  Button,
} from "antd";
import { Reviews } from "../../types";
import { cliapbord, tokenService, getDate } from "../../utils";
import { ButtonCopy } from "../Button/ButtonCopy";
import { useLocalState } from "../context/hooks";
import { usePerson } from "../hooks/usePerson";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { StatusSelect } from "../components/StatusSelect";
import { StatusComponent } from "../components/StatusComponent";
import { ModalCreateReview } from "../components/ModalCreateReview";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { UploadCVS } from "../components/UploadCVS";
import {
  SaveOutlined,
  DeleteOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ModalCreateCampaignReview } from "../components/ModalCreateReviewCampaign";

type Props = {
  reviews: ReviewsTableItem[] | undefined;
  isLoading: boolean;
  onUpdate: (project: string) => void;
  campaingId: string;
  cardId: string;
  link: string;
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
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const TableCampaignChangeable = ({
  reviews,
  isLoading,
  campaingId,
  onUpdate,
  cardId,
  link
}: Props) => {
  const [form] = Form.useForm();
  const tgFormField = Form.useWatch("tg", form);

  const [editingKey, setEditingKey] = useState("");
  const [dataSource, setDataSource] = useState(reviews);

  const state = useLocalState();
  const { personInfo } = state;
  usePerson();

  const { handleUpdateReview } = useUpdateReview();

  const { handleDeleteReview } = useDeleteReview();

  const isEditing = (record: ReviewsTableItem) => record.key === editingKey;

  const edit = (record: Partial<ReviewsTableItem> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
    form.resetFields();
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
        onUpdate(campaingId);
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

  const onDelete = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ReviewsTableItem;
      // @ts-ignore TODO:доделать!
      const newData = [...reviews];
      const index = newData.findIndex((item) => key === item.key);
      row.id = newData[index].id;
      console.log("row_save", row, index, newData[index]);
      handleDeleteReview({ id: row.id }).then(() => {
        onUpdate(campaingId);
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

  const onSelectStatus = (value: string, key: React.Key) => {
    // @ts-ignore TODO:доделать!
    const newData = [...reviews];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const inWorkDate = Math.floor(new Date().valueOf() / 1000);

      form.setFieldsValue({ status: value });

      if (value === "moderate") {
        form.setFieldsValue({ in_work: true });
        form.setFieldsValue({ date: inWorkDate });
        form.setFieldsValue({ host: personInfo?.first_name });
      }
    }
  };

  const role = tokenService.getRole();

  const isAdmin = role === "ADMIN" || role === "SUPERVISOR";

  const sendReviewToWork = (key: React.Key) => {
    // @ts-ignore TODO:доделать!
    const newData = [...reviews];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const inWorkDate = Math.floor(new Date().valueOf() / 1000);
      //togle
      form.setFieldsValue({ in_work: true });
      form.setFieldsValue({ date: inWorkDate });
      form.setFieldsValue({ host: personInfo?.first_name });
      form.setFieldsValue({ status: "moderate" });
    }
  };

  const columns = [
    {
      title: "№",
      dataIndex: "key",
      width: "6%",
      render: (record: string) => {
        return <div>{Number(record) + 1}</div>;
      },
    },
    /* {
      title: "Ссылка на отзыв",
      dataIndex: "link",
      width: "20%",
      editable: isAdmin,
      render: (text: string) => (
        <div style={{ display: "inline" }}>
          <a onClick={() => window.open(text, "_blank")}>{text}</a>
          <ButtonCopy onClick={() => cliapbord(text)} />
        </div>
      ),
    }, */
    {
      title: "Текст отзыва",
      dataIndex: "text",
      width: "20%",
      editable: isAdmin,
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
      render: (record: string | number) => {
        return (
          <>{typeof record === "number" ? getDate({ date: record }) : record}</>
        );
      },
    },
    {
      title: "Кто отдал отзыв",
      dataIndex: "host",
      width: "12%",
    },
    {
      title: "Ник в телеграм",
      dataIndex: "tg",
      width: "12%",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      width: "15%",
      render: (_: any, record: ReviewsTableItem) => {
        const editable = isEditing(record);
        return editable ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Link
              onClick={() => save(record.key)}
              disabled={role === "HOST" && !tgFormField}
              style={{ color: "green" }}
            >
              <SaveOutlined style={{ marginRight: 4 }} />
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>
              <CloseOutlined style={{ marginRight: 4 }} />
              Cancel
            </Typography.Link>
            {isAdmin && (
              <Typography.Link
                style={{ color: "red" }}
                onClick={() => onDelete(record.key)}
              >
                <DeleteOutlined style={{ marginRight: 4 }} />
                Delete
              </Typography.Link>
            )}
          </div>
        ) : (
          <Typography.Link
            disabled={
              editingKey !== "" || (role === "HOST" && record.status !== "wait")
            }
            onClick={() => {
              edit(record);
              if (role === "HOST") {
                sendReviewToWork(record.key);
              }
            }}
          >
            <EditOutlined style={{ marginRight: 4 }} />
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
    <>
      <Form form={form} component={false}>
        <ConfigProvider
          renderEmpty={() => (
            <Empty description="Отзывы в процессе написания, скоро они будут готовы" />
          )}
        >
          {isAdmin && (
            <div
              style={{
                display: "flex",
                marginBottom: 16,
                width: 300,
                gridGap: "8px",
              }}
            >
              <Button onClick={showModal} type="primary" style={{background:'black'}}>
                Добавить запись
              </Button>
              {/* <UploadCVS onUpdate={onUpdate} projectId={cardId} /> */}
            </div>
          )}
          {isModalOpen && (
            <ModalCreateCampaignReview
              onClose={closeModal}
              cardId={cardId}
              onUpdate={onUpdate}
              campaignId={campaingId}
              link={link}
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
            pagination={false}
            loading={isLoading}
            tableLayout={"fixed"}
            scroll={{ x: 1000 }}
            style={{ marginBottom: 30 }}
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
        <Form.Item name={"host"} hidden>
          <Input />
        </Form.Item>
        <Form.Item name={"tg"} hidden>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};
