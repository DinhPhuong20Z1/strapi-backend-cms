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
import { DatePicker } from '@strapi/design-system/DatePicker';

export default function EditModal({ setShowModal, updateReminder,id,dateGiven,nameGiven }) {
  const [name, setName] = useState(nameGiven);
  const [date,setDate]=useState(dateGiven);
  const today=new Date()
  
  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();
    try {
      await updateReminder(id,{ remindername: name,date:date });
      setShowModal(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getError = () => {
    // Form validation error

    if (name.length > 40) {
      return "Content is too long";
    }

    return null;
  };

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add Reminder
        </Typography>
      </ModalHeader>

      <ModalBody>
        <TextInput
          placeholder="Reminder"
          label="Name"
          name="text"
          hint="Max 40 characters"
          error={getError()}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <DatePicker onChange={setDate} selectedDate={new Date(date)} minDate={new Date()} placeholder={`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`} label="Date picker" name="datepicker" clearLabel={'Clear the datepicker'} onClear={() => setDate(undefined)} selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`} />
          <div style={{
      marginLeft: '500px'
    }}></div>
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Update Reminder</Button>}
      />
    </ModalLayout>
  );
}