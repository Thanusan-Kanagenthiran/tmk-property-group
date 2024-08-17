import { Box } from "@mui/material";
import styles from "./AppSpinner.module.scss";

const AppSpinner = ({ size = 150 }: { size?: number }) => {
  return (
    <Box
      className={styles.loader}
      sx={{
        width: `${size}px`,
        height: `${size}px`
      }}>
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className={styles.path1} d="M200 400C89.5556 400 0 310.444 0 200H200V400Z" fill="#703BF7" />
        <path className={styles.path2} d="M0 0C110.444 0 200 89.5556 200 200H0V0Z" fill="#14B8A6" />
        <path className={styles.path3} d="M200 400C310.444 400 400 310.444 400 200H200V400Z" fill="#14B8A6" />
        <path className={styles.path4} d="M400 200C400 89.5556 310.444 0 200 0V200H400Z" fill="#4F46E5" />
      </svg>
    </Box>
  );
};

export default AppSpinner;
