import { Box } from "@mui/material";
import styles from "./home.module.scss";
import AppSpinner from "@/components/Common/AppSpinner";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          maxHeight: "100%",
          width: "100%"
        }}>
        <AppSpinner size={75} />
      </Box>
    </main>
  );
}
