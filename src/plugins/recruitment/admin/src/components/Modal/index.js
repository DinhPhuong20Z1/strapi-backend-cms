import React, { useState, useEffect } from "react";

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

import { Input, Form } from "antd";


const { TextArea } = Input;
export default function Modal({ setShowModal, dataSeedetails }) {
  const [date, setDate] = useState(dataSeedetails.createdAt);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      introduction: dataSeedetails.introduction,
    });
  },[])

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
            See details Jobs
          </Typography>
        </ModalHeader>

        <ModalBody>
          <GridLayout>
            <TextInput
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

            <Form form={form}>
              <Form.Item
                name="introduction"
                label="Introduction"
                className="introduction-input"
              >
                <TextArea
                  rows={6}
                  placeholder="Introduction"
                  maxLength={10}
                />
              </Form.Item>
            </Form>

            <div>
              <Typography
                className="title-file max-width-recruitment"
                textColor="neutral800"
              >
                List File
              </Typography>
              <div className="List-file">
                {dataSeedetails &&
                  dataSeedetails.file.length > 0 &&
                  dataSeedetails.file.map((file) => {
                    return (
                      <>
                        {file.URL ? (
                          <>
                            <a
                              target="_blank"
                              href={file.URL}
                              className="title-file"
                              textColor="neutral800"
                            >
                              {file.Title}
                            </a>
                          </>
                        ) : (
                          <>
                            <Typography
                              className="title-file"
                              textColor="neutral800"
                            >
                              {file.Title}
                            </Typography>
                          </>
                        )}
                      </>
                    );
                  })}
              </div>
            </div>
          </GridLayout>
        </ModalBody>

        <ModalFooter
          startActions={
            <Button onClick={() => setShowModal(false)} variant="tertiary">
              Cancel
            </Button>
          }
        />
      </ModalLayout>
    </>
  );
}
