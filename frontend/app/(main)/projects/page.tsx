"use client"
import { useUser } from "@auth0/nextjs-auth0"
import { TextField } from "@uicommon/Inputs"
import * as yup from "yup"
import { Form, Formik } from "formik"
import * as BackendApi from "./commands"

//ui components
import { Box, Button, Card } from "@mui/material"
// Components
import Typography from "@ui/common/DataDisplay/Typography"

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  notes: yup.string().optional(),
  address: yup.object().shape({
    line1: yup.string().required("Street Address is required"),
    line2: yup.string().optional(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup.string().required("Postal Code is required"),
  }),
})

interface Values {
  name: string
  notes: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
  }
}

const initialValues: Values = {
  name: "",
  notes: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  },
}

const ProjectCreateForm = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const handleSubmit = async (values: Values) => {
    const {
      name,
      notes,
      address: { line1, line2, city, state, zip },
    } = values
    const userId = user?.sub
    if (!userId) return
    const address = { line1, line2, city, state, zip }
    await BackendApi.createProject({
      name: name,
      user: userId,
      notes,
      address,
    }).then(() => alert("success"))
  }

  return (
    user && (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          submitForm,
          isSubmitting,
          handleChange,
          values,
        }) => (
          <Form>
            <Box sx={{ width: "75%" }}>
              <Typography>%title%</Typography>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  width: "75%",
                  flexDirection: "column",
                }}
              >
                <Typography>%name%</Typography>
                <TextField
                  id="name"
                  fieldName="name"
                  onChange={handleChange}
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                />
                <Typography>%notes%</Typography>
                <TextField
                  id="notes"
                  fieldName="notes"
                  onChange={handleChange}
                  value={values.notes}
                  error={touched.notes && Boolean(errors.notes)}
                />
                <Typography>%address%</Typography>
                <Typography>%line1%</Typography>
                <TextField
                  id="address.line1"
                  fieldName="address.line1"
                  onChange={handleChange}
                  value={values.address.line1}
                  error={
                    touched.address?.line1 && Boolean(errors.address?.line1)
                  }
                />
                <Typography>%line2%</Typography>
                <TextField
                  id="address.line2"
                  fieldName="address.line2"
                  onChange={handleChange}
                  value={values.address.line2}
                  error={
                    touched.address?.line2 && Boolean(errors.address?.line2)
                  }
                />
                <Typography>%city%</Typography>
                <TextField
                  id="address.city"
                  fieldName="address.city"
                  onChange={handleChange}
                  value={values.address.city}
                  error={touched.address?.city && Boolean(errors.address?.city)}
                />
                <Typography>%state%</Typography>
                <TextField
                  id="address.state"
                  fieldName="address.state"
                  onChange={handleChange}
                  value={values.address.state}
                  error={
                    touched.address?.state && Boolean(errors.address?.state)
                  }
                />
                <Typography>%zip%</Typography>
                <TextField
                  id="address.zip"
                  fieldName="address.zip"
                  onChange={handleChange}
                  value={values.address.zip}
                  error={touched.address?.zip && Boolean(errors.address?.zip)}
                />
                <Button
                  type="submit"
                  onClick={submitForm}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Card>
            </Box>
          </Form>
        )}
      </Formik>
    )
  )
}
export default ProjectCreateForm
