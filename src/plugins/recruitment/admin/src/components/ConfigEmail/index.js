import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from "@strapi/design-system";
import { DatePicker } from "@strapi/design-system/DatePicker";
import { Textarea } from "@strapi/design-system/Textarea";
import { Box } from "@strapi/design-system/Box";
import { GridLayout } from "@strapi/design-system/Layout";
import {
  TabGroup,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@strapi/design-system/Tabs";

export default function ModalConfigEmail({ setShowModal }) {
  const [localStorage, SetLocalStorage] = useState({});

  return (
    <>
      <ModalLayout
        onClose={() => setShowModal(false)}
        labelledBy="title"
        as="form"
      >
        <ModalHeader>
          <Typography
            fontWeight="bold"
            textColor="neutral800"
            as="h2"
            id="title"
          >
            Config Gmail
          </Typography>
        </ModalHeader>

        <ModalBody>
          {/* <TextInput
                placeholder="Name"
                label="Name"
                name="text"
                value={dataSeedetails.name}
              />
              <TextInput
                placeholder="Email"
                label="Email"
                name="text"
                value={dataSeedetails.email}
              />
              <TextInput
                placeholder="Phone"
                label="Phone"
                name="text"
                value={dataSeedetails.phone}
              />

              <TextInput
                placeholder="CareerTitle"
                label="CareerTitle"
                name="CareerTitle"
                value={dataSeedetails.careerTitle}
              />
              <TextInput
                placeholder="CareerType"
                label="CareerType"
                name="CareerType"
                value={dataSeedetails.careerType}
              />

              <DatePicker
                name="datepicker"
                label="CreatedAt"
                selectedDate={new Date(date)}
                onChange={setDate}
                selectedDateLabel={(formattedDate) =>
                  `Date picker, current is ${formattedDate}`
                }
                disabled
              />

              <Textarea
                size="S"
                placeholder="Introduction"
                label="Introduction"
                name="Introduction"
              >
                {dataSeedetails.introduction}
              </Textarea>

              <div>
                <Typography
                  className="title-file max-width-recruitment"
                  textColor="neutral800"
                >
                  List File
                </Typography>

              </div> */}

          <TabGroup
            label="Some stuff for the label"
            id="tabs"
            onTabChange={(selected) => console.log(selected)}
          >
            <Tabs>
              <Tab>Config from email</Tab>
              <Tab>Config content</Tab>
            </Tabs>
            <TabPanels>
              <TabPanel>
                <Box color="neutral800" padding={4} background="neutral0">
                  <GridLayout>
                    <TextInput
                      placeholder="From Email"
                      label="From Email"
                      name="fromEmail"
                      onChange={(e) =>
                        SetLocalStorage({ ...localStorage, fromEmail: e.target.value })
                      }
                      value={localStorage.fromEmail}
                    />
                    <TextInput
                      placeholder="Cc Email"
                      label="Cc Email"
                      name="ccEmail"
                      onChange={(e) =>
                        SetLocalStorage({ ...localStorage, ccEmail: e.target.value })
                      }
                      value={localStorage.ccEmail}
                    />
                    <TextInput
                      placeholder="Bcc Email"
                      label="Bcc Email"
                      name="bccEmail"
                      onChange={(e) =>
                        SetLocalStorage({ ...localStorage, bccEmail: e.target.value })
                      }
                      value={localStorage.bccEmail}
                    />
                    <TextInput
                      placeholder="replyTo Email"
                      label="ReplyTo Email"
                      name="replyToEmail"
                      onChange={(e) =>
                        SetLocalStorage({ ...localStorage, replyToEmail: e.target.value })
                      }
                      value={localStorage.replyToEmail}
                    />
                  </GridLayout>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box color="neutral800" padding={4} background="neutral0">
                  <GridLayout>
                  <TextInput
                      placeholder="Công ty TNHH Volio Việt Nam"
                      label="Title Subject Email Jobs"
                      name="titleJobEmail"
                      onChange={(e) =>
                        SetLocalStorage({ ...localStorage, titleJobEmail: e.target.value })
                      }
                      value={localStorage.titleJobEmail}
                    />
                    <TextInput
                      placeholder="Công ty TNHH Volio Việt Nam"
                      label="Title Subject Contact Jobs"
                      name="titleContactEmail"
                      onChange={(e) =>
                        SetLocalStorage({ ...localStorage, titleContactEmail: e.target.value })
                      }
                      value={localStorage.titleContactEmail}
                    />
                    <Textarea
                      size="S"
                      placeholder="Content To Email Job"
                      label="Content To Email Job"
                      name="contentToJobs"
                      onChange={(e) =>
                        SetLocalStorage({ ...localStorage, contentToJobs: e.target.value })
                      }
                    >
                      {localStorage.contentToJobs}
                    </Textarea>

                    <Textarea
                      size="S"
                      placeholder="Content To Email Contact"
                      label="Content To Email Contact"
                      name="contentToContact"
                      onChange={(e) =>
                        SetLocalStorage({ ...localStorage, contentToContact: e.target.value })
                      }
                    >
                      {localStorage.contentToContact}
                    </Textarea>
                  </GridLayout>
                </Box>
              </TabPanel>
            </TabPanels>
            {console.log(localStorage, 'localStorage')}
          </TabGroup>
        </ModalBody>

        <ModalFooter
          startActions={
            <Button onClick={() => setShowModal(false)} variant="tertiary">
              Cancel
            </Button>
          }
          endActions={<Button type="submit">Update Config Email</Button>}
        />
      </ModalLayout>
    </>
  );
}
