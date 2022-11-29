import React, { useState } from "react";
import { Table, Modal, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import useBreakpoint from "use-breakpoint";
import { StatusComponent } from "./StatusComponent";
import styled from "styled-components";
import { Title } from "./Typography";

const { TextArea } = Input;

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

interface DataType {
  id: string;
  href: string;
  text: string;
  status: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
    width: 30,
  },
  {
    title: "Ссылка на отзыв",
    dataIndex: "href",
    key: "href",
    render: (text) => <a onClick={() => window.open(text, "_blank")}>{text}</a>,
    width: 230,
    ellipsis: true,
  },
  {
    title: "Текст отзыва",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "Статус отзыва",
    dataIndex: "status",
    key: "status",
    render: (status: string) => <StatusComponent status={status} />,
    width: 150,
  },
  {
    title: "Дата размещения",
    dataIndex: "date",
    key: "date",
    width: 150
  },
];


const data: DataType[] = [
  {
    id: "1",
    href: "https://market.yandex.ru/pro111111111111111111111111111111111111111111",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum purus a leo cursus bibendum. Donec nisl neque, rutrum a nisl et, accumsan tempor arcu. Donec tempus magna urna, non tempus quam eleifend ullamcorper. Nulla viverra convallis condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In sollicitudin quam tellus, a fringilla dolor faucibus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "Опубликовано",
    date: "01.09.2022",
  },
  {
    id: "2",
    href: "https://market.yandex.ru/pro",
    text: "Nullam vitae efficitur sem, sit amet blandit dui. Morbi et sapien lobortis, pretium dui in, scelerisque lectus. In imperdiet quis urna at accumsan. Phasellus eu mollis lorem, id pretium odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus dignissim nulla nec volutpat dapibus. Vivamus quis mauris finibus, congue dolor eget, consequat risus. Sed a dignissim libero.",
    status: "На модерации",
    date: "01.09.2022",
  },
  {
    id: "3",
    href: "https://market.yandex.ru/pro",
    text: "Quisque ultrices auctor hendrerit. Proin suscipit, eros et fermentum commodo, orci tortor laoreet felis, id imperdiet elit elit a mi. In hac habitasse platea dictumst. Phasellus scelerisque velit eget augue consequat aliquam. Sed aliquet, tellus non cursus posuere, arcu tellus porttitor dolor, non lacinia eros nibh ac dui. Aliquam posuere faucibus sem sed tristique. Vivamus sem ex, iaculis facilisis efficitur in, posuere at orci. Cras tellus ipsum, consectetur sit amet dictum ac, porta quis sem. Praesent placerat sollicitudin dolor non auctor. Nunc lectus erat, varius eu nulla quis, finibus consectetur ex. Nunc eget pellentesque massa.",
    status: "Не прошло",
    date: "01.09.2022",
  },
  {
    id: "4",
    href: "https://market.yandex.ru/pro",
    text: "Suspendisse quis lorem purus. Nullam luctus cursus velit non dictum. Fusce at aliquet arcu, et viverra magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse porta sem nibh, vel dapibus odio lobortis vitae. Suspendisse semper eu sapien ac dignissim. Quisque consectetur dolor augue, sit amet aliquam augue elementum ut. Cras velit enim, dictum ac dictum eget, maximus et diam. Cras eu augue ac urna pharetra elementum sed id purus. Mauris eu vestibulum enim. Vestibulum porta ipsum accumsan orci dictum, nec rutrum nisl euismod. Morbi ac suscipit ante.",
    status: "Удалено",
    date: "01.09.2022",
  },
  {
    id: "5",
    href: "https://market.yandex.ru/pro",
    text: "Fusce vitae purus ut nisi mollis sagittis. Praesent ut vestibulum enim, ut placerat nunc. Nulla sodales diam eget sapien ultricies fermentum. Nunc vulputate risus malesuada mi egestas, vitae semper nunc faucibus. Duis cursus leo at justo lacinia finibus. Suspendisse eu nulla diam. Donec bibendum sapien in est vulputate vulputate. In tortor metus, feugiat vitae porta id, aliquet convallis orci. Ut viverra velit et commodo efficitur. Pellentesque vel orci diam. Curabitur risus mauris, blandit ac ipsum quis, facilisis volutpat justo. Aenean volutpat mollis justo, eget pulvinar mi maximus mattis. Quisque a finibus dui. Aenean vel pulvinar ex.",
    status: "В очереди",
    date: "01.09.2022",
  },
];

export const TableProject = () => {
  const [form] = Form.useForm();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataType | undefined>();

  const handleOpen = (row: any) => {
    setIsModalOpen(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedRow(undefined);
  };

  const mobileColumns: ColumnsType<DataType> = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 30,
    },
    {
      title: "Ссылка на отзыв",
      dataIndex: "href",
      key: "href",
      render: (text) => <a onClick={() => window.open(text, "_blank")}>{text}</a>,
      width: 200,
      ellipsis: true,
    },
    {
      title: "Детали",
      key: "details",
      render: (row) => <a onClick={() => handleOpen(row)}>Смотреть</a>,
    },
  ];

  return (
    <>
      <Table
        columns={breakpoint === "mobile" ? mobileColumns : columns}
        dataSource={data}
        size="small"
        bordered
      />
      <Modal
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        footer={null}
        width={1000}
        bodyStyle={{ overflowY: 'auto' }}
      >
        <Form layout={"vertical"} form={form} >
          <Form.Item label={<Title level={5}>Детали</Title>}>
            <TextArea autoSize value={selectedRow?.text} style={{ minHeight: 200 }} />
          </Form.Item>
        </Form>
        <div style={{ marginBottom: '24px' }}>
          <Title level={5}>Статус отзыва</Title>
          <StatusComponent status={selectedRow?.status || ''} />
        </div>
        <div>
          <Title level={5}>Дата размещения</Title>
          <p>{selectedRow?.date}</p>
        </div>
      </Modal>
    </>
  );
};
