import React from "react";
import { Box, Fade, Modal, Backdrop } from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from "./Modal.module.scss";

interface ModalPropsType {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  className?: string;
  handleClose: () => void;
}

const CustomModal = (props: ModalPropsType) => {
  return (
    <Modal
      className={styles.modal}
      open={props.open}
      closeAfterTransition
      onClose={props.handleClose}
      BackdropComponent={() => <Backdrop classes={{ root: styles.backdrop }} open={props.open} onClick={props.handleClose} />}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={props.open}>
        <Box className={`${styles.box} ${props.className}`}>
          {props.title && (
            <Typography color="text.primary" variant="body1" component="div">
              {props.title}
            </Typography>
          )}

          {props.children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
