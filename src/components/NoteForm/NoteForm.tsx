import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";

interface NoteFormProps {
  onSuccess: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
  content: Yup.string().max(500, "Too long"),
  tag: Yup.string().required("Required"),
});

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      <Form className={css.form}>
        <div>
          <label>Title</label>
          <Field name="title" />
          <ErrorMessage name="title" component="span" />
        </div>

        <div>
          <label>Content</label>
          <Field name="content" as="textarea" />
          <ErrorMessage name="content" component="span" />
        </div>

        <div>
          <label>Tag</label>
          <Field name="tag" as="select">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" />
        </div>

        <button type="submit">Create note</button>
      </Form>
    </Formik>
  );
}
