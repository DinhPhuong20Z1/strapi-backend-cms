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

export default function Modal({ setShowModal, dataSeedetails }) {
  const [date, setDate] = useState(dataSeedetails.createdAt);

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
                <div className="List-file">
                  {dataSeedetails &&
                    dataSeedetails.file.length > 0 &&
                    dataSeedetails.file.map((file) => {
                      return (
                        <>
                          {file.LinkFile ? (
                            <>
                              <a
                                target="_blank"
                                href={file.LinkFile}
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
