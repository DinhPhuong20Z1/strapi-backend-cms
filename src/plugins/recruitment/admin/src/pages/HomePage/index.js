/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { Box } from "@strapi/design-system/Box";
import { Layout } from "@strapi/design-system/Layout";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";

// import RecruitmentApiHandler from '../../api/recruitment';
import axios from "axios";
import Trash from "@strapi/icons/Trash";
import Eye from "@strapi/icons/Eye";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import "./index.css";
import Modal from "../../components/Modal";

const HomePage = () => {
  const [recruitmentList, setRecruitment] = useState([]);
  const [ModalVisible, SetModalVisible] = useState(false);
  const [seedetails, Seedetails] = useState({});
  let Title = [
    "Id",
    "Name",
    "Email",
    "Phone",
    "File",
    "Introduction",
    "CareerTitle",
    "CareerType",
    "createdAt",
    "See details",
  ];

  async function FetchRecruitment() {
    // const recruitment = await RecruitmentApiHandler.getAllRecruitment();
    const { data } = await axios.get(
      "https://cms.volio.vn/api/recruitments?populate=deep"
    );

    setRecruitment(data.data);
    // console.log("recruitmentList",recruitmentList);
  }

  useEffect(() => {
    FetchRecruitment();
  }, []);

  return (
    <Box>
      <Layout>
        <Table>
          <Thead>
            <Tr>
              {Title.map((k, index) => {
                return (
                  <>
                  <Th>
                    <Typography variant="sigma">{k}</Typography>
                  </Th>
                </>
                )

              })}
            </Tr>
          </Thead>
          <Tbody>
            {recruitmentList.map((i) => {
              return (
                <Tr
                className="tr-click"
                onClick={() => {
                  Seedetails({
                    id: i.id,
                    name: i.attributes.Name,
                    email: i.attributes.Email,
                    phone: i.attributes.Phone,
                    file: i.attributes.Files,
                    introduction: i.attributes.Introduction,
                    careerTitle: i.attributes.CareerTitle,
                    careerType: i.attributes.CareerType,
                    createdAt: i.attributes.createdAt,
                  });
                  SetModalVisible(true)
                  // setIsEdit(true);
                }}
                >
                  <Td>
                    <Typography textColor="neutral800">{i.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {i.attributes.Name}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {i.attributes.Email}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {i.attributes.Phone}
                    </Typography>
                  </Td>

                  <Td>
                    {i.attributes &&
                      i.attributes.Files.length > 0 &&
                      i.attributes.Files.map((file) => {
                        return (
                          <>
                            {file.LinkFile ? (
                              <>
                                <a
                                  target="_blank"
                                  href={file.LinkFile}
                                  className="title-file max-width-recruitment"
                                  textColor="neutral800"
                                >
                                  {file.Title}
                                </a>
                              </>
                            ) : (
                              <>
                                <Typography
                                  className="title-file max-width-recruitment"
                                  textColor="neutral800"
                                >
                                  {file.Title}
                                </Typography>
                              </>
                            )}
                          </>
                        );
                      })}
                  </Td>
                  <Td>
                    <Typography
                      className="max-width-recruitment"
                      textColor="neutral800"
                    >
                      {i.attributes.Introduction}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {i.attributes.CareerTitle}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {i.attributes.CareerType}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {i.attributes.createdAt}
                    </Typography>
                  </Td>
                  <Td>
                  <Flex>
                    <IconButton
                      onClick={() => {
                        Seedetails({
                          id: i.id,
                          name: i.attributes.Name,
                          email: i.attributes.Email,
                          phone: i.attributes.Phone,
                          file: i.attributes.Files,
                          introduction: i.attributes.Introduction,
                          careerTitle: i.attributes.CareerTitle,
                          careerType: i.attributes.CareerType,
                          createdAt: i.attributes.createdAt,
                        });
                        SetModalVisible(true)
                        // setIsEdit(true);
                      }}
                      className="btn-details"
                      label="See details"
                      icon={<Eye />}
                    />
                  </Flex>
                  </Td>


                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Layout>
      {ModalVisible && (
        <Modal setShowModal={SetModalVisible} dataSeedetails={seedetails} />
      )}
    </Box>
  );
};

export default HomePage;
