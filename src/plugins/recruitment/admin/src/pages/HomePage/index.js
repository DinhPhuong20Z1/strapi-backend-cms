/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { Box } from "@strapi/design-system/Box";
import { Layout, BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Typography } from "@strapi/design-system/Typography";

import axios from "axios";
import Trash from "@strapi/icons/Trash";
import Eye from "@strapi/icons/Eye";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import "./index.css";
import Modal from "../../components/Modal";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import Calendar from "@strapi/icons/Calendar";
import { Table, Input, Tag } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { Write } from '@strapi/icons';
import { Button } from '@strapi/design-system/Button';
// import ModalConfigEmail from "../../components/ConfigEmail";

const HomePage = () => {
  const [recruitmentList, setRecruitment] = useState([]);
  const [ModalVisible, SetModalVisible] = useState(false);
  const [seedetails, Seedetails] = useState({});
  const [pagination, setPagination] = useState([]);
  const [searchTextAll, setSearchTextAll] = useState("");
  const [modalConfigEmail, setModalConfigEmail] = useState(false);

  async function FetchRecruitment(
    page = "1",
    pageSize = "10",
    searchText = ""
  ) {
    const access_token =
      "e3ed0e1534fb05463347f39a9fd880238f7eb4e7644bd56d3487153a663361013d306c08b1843e19284dc02d2f20f74433a96c11f252ef74ecc21c2e178d6cd803a4ba0241905de6a353c49665765a91aa4e3a50fb87dfb0245e11989de817e8d9feedf39d15eff8a30fc975c0c76926fe04bc415e3754ef177d1e59175c655c";
    const { data } = await axios.get(
      `https://cms.volio.vn/api/recruitments?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=deep&_q=${searchText}&sort=createdAt:DESC`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );


    setPagination(data.meta);
    setRecruitment(data.data);
  }

  useEffect(() => {
    FetchRecruitment();
  }, []);

  const changePageList = (page, pageSize) => {
    FetchRecruitment(page, pageSize, searchTextAll);
  };

  const columns = [
    {
      title: "No.",
      width: "70px",
      render: (value, record, index) =>
        index +
        1 +
        (pagination &&
          pagination.pagination &&
          pagination.pagination.pageSize) *
          ((pagination && pagination.pagination && pagination.pagination.page) -
            1),
    },
    {
      title: "Name",
      children: [],
      dataIndex: "attributes",
      render: (text) => text.Name || "N/A",
      filterMode: "tree",
      filterSearch: true,
      width: "150px",
    },
    {
      title: "Email",
      dataIndex: "attributes",
      render: (text) => text.Email || "N/A",
      width: "150px",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "attributes",
      render: (text) => text.Phone || "N/A",
      width: "150px",
    },
    {
      title: "Files",
      dataIndex: "attributes",
      width: "200px",
      render: (value, record) => (
        <>
          {value &&
            value.Files.length > 0 &&
            value.Files.map((file) => {
              return (
                <>
                  {file.URL ? (
                    <>
                    <Tag color="green" className="title-file">
                    <a
                        target="_blank"
                        href={file.URL}
                        className=" max-width-recruitment"
                        textColor="neutral800"
                      >
                        {file.Title}
                      </a>
                  </Tag>

                    </>
                  ) : (
                    <>
                    <Tag color="geekblue" className="title-file" >
                    <Typography
                        className="max-width-recruitment"
                        textColor="neutral800"
                      >
                        {file.Title}
                      </Typography>
                  </Tag>

                    </>
                  )}
                </>
              );
            })}
        </>
      ),
    },
    {
      title: "Introduction",
      dataIndex: "attributes",
      render: (text) => text.Introduction || "N/A",
      width: "200px",
      ellipsis: true,
    },
    {
      title: "CareerTitle",
      dataIndex: "attributes",
      width: "200px",
      render: (text) => text.CareerTitle || "N/A",
    },
    {
      title: "CareerType",
      dataIndex: "attributes",
      width: "120px",
      render: (text) => text.CareerType || "N/A",
    },
    {
      title: "createdAt",
      dataIndex: "attributes",
      render: (value) => moment(value.createdAt).format("HH:mm DD/MM/YYYY "),
      showSorterTooltip: false,
      sorter: (a, b) => {
        return (
          moment(a.attributes.createdAt).utc() -
          moment(b.attributes.createdAt).utc()
        );
      },
      width: "120px",
    },
    {
      title: "Action",
      width: "100px",
      dataIndex: "attributes",
      render: (value, record) => (
        <Flex>
          <IconButton
            onClick={() => {
              Seedetails({
                id: value.id,
                name: value.Name,
                email: value.Email,
                phone: value.Phone,
                file: value.Files,
                introduction: value.Introduction,
                careerTitle: value.CareerTitle,
                careerType: value.CareerType,
                createdAt: value.createdAt,
              });
              SetModalVisible(true);
              // setIsEdit(true);
            }}
            className="btn-details"
            label="See details"
            icon={<Eye />}
          />
        </Flex>
      ),
      fixed: "right",
    },
  ];

  const onSearch = (e) => {
    let valueSearch = "";
    if (e.target) valueSearch = e.target.value;
    else valueSearch = e;
    setSearchTextAll(valueSearch);
    FetchRecruitment(1, 10, valueSearch);
  };

  return (
    <Box>
      <Layout>
        <Box background="neutral100">
          <BaseHeaderLayout
          // primaryAction={
          //   <Button
          //     variant="secondary"
          //     onClick={setModalConfigEmail}
          //     endIcon={<Write />}
          //   >
          //     Config Gmail
          //   </Button>
          // }
            title="Recruitment"
            subtitle={`${
              pagination && pagination.pagination && pagination.pagination.total
            } recruitment found`}
            as="h2"
          />
        </Box>
        <Box background="neutral100" padding={8}>
          <div className="py-3" />
          <Input.Search
            style={{ borderRadius: "10px", width: "50%", marginBottom: "30px" }}
            placeholder="Search name, email, phone, careerTitle, careerType"
            allowClear
            size="large"
            enterButton="Search"
            onPressEnter={onSearch}
            onSearch={onSearch}
          />
          {recruitmentList.length == 0 ? (
            <EmptyStateLayout
              icon={<Calendar />}
              content="You don't have any reminders yet..."
            />
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={recruitmentList}
                // onChange={onChange}
                pagination={{
                  current:
                    pagination &&
                    pagination.pagination &&
                    pagination.pagination.page,
                  total:
                    pagination &&
                    pagination.pagination &&
                    pagination.pagination.total,
                  onChange: (page) => {
                    changePageList(page, 10);
                  },
                  defaultPageSize: 10,
                }}
                scroll={{ x: "calc(700px + 50%)", y: 600 }}
                onRow={(record, rowIndex) => {
                  return {
                    onDoubleClick: (event) => {
                      Seedetails({
                        id: rowIndex.id,
                        name: record.attributes.Name,
                        email: record.attributes.Email,
                        phone: record.attributes.Phone,
                        file: record.attributes.Files,
                        introduction: record.attributes.Introduction,
                        careerTitle: record.attributes.CareerTitle,
                        careerType: record.attributes.CareerType,
                        createdAt: record.attributes.createdAt,
                      });
                      SetModalVisible(true);
                    }, // click row
                  };
                }}
              />
            </>
          )}
        </Box>
      </Layout>
      {ModalVisible && (
        <Modal setShowModal={SetModalVisible} dataSeedetails={seedetails} />
      )}
      {/* {modalConfigEmail && (
        <ModalConfigEmail setShowModal={setModalConfigEmail} />
      )} */}
    </Box>
  );
};

export default HomePage;
