/*
 *
 * HomePage
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { Box } from "@strapi/design-system/Box";
import { Layout } from "@strapi/design-system/Layout";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from '@strapi/design-system/Typography';

const HomePage = () => {
  return (
    <Box>
      <Layout>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Reminder name</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">date</Typography>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {reminderList.map((k) => {
              return (
                <Tr>
                  <Td>
                    <Typography textColor="neutral800">{k.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {k.remindername}
                    </Typography>
                  </Td>
                  <Td>
                    <DatePicker
                      selectedDate={new Date(k.date)}
                      label="date"
                      name="datepicker"
                      selectedDateLabel={(formattedDate) =>
                        `Date picker, current is ${formattedDate}`
                      }
                      disabled
                    />
                  </Td>
                  <Flex>
                    <IconButton
                      onClick={() => {
                        setEditedVal({
                          id: k.id,
                          date: k.date,
                          remindername: k.remindername,
                        });
                        setIsEdit(true);
                      }}
                      label="Edit"
                      noBorder
                      icon={<Pencil />}
                    />
                    <Box paddingLeft={1}>
                      <IconButton
                        onClick={() => DeleteReminders(k.id)}
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                      />
                    </Box>
                  </Flex>
                </Tr>
              );
            })} */}
          </Tbody>
        </Table>
      </Layout>
    </Box>
  );
};

export default HomePage;
