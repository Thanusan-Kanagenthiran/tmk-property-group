import { Paper } from "@mui/material";

const AddFormContainer = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Paper elevation={2} sx={{ p: 4, my: 4 }}>
      {children}
    </Paper>
  );
};

export default AddFormContainer;
