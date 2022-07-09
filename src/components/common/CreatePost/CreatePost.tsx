import React from "react";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import { getPictureBase64 } from "../../../core/methods/methods";
import { AccountType } from "../../../types/types";
import CreatePostReduxForm from "./CreatePostForm";
import Backdrop from "@mui/material/Backdrop";
import styles from "./CreatePost.module.scss";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Step from "@mui/material/Step";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Media from "react-media";

interface CreatePostPropsType {
  account: AccountType | null;
  postPhoto: string | null;
  createPostThunk: any;
  open: any;
  handleClose: () => void;
  setPostPhoto: (postPhoto: string | null) => void;
}

export interface CreatePostFormDataType {
  create_post: null;
}

const CreatePost = (props: CreatePostPropsType) => {
  const [files, setFiles] = React.useState([]);
  const hiddenFileInput = React.useRef<any>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [saveOwnerPost, setSaveOwnerPost] = React.useState(null);
  const steps = ["Crop", "Edit", <Media query={{ maxWidth: 540 }}>{(matches) => (!matches ? "Create new post" : "Create")}</Media>];

  const onSubmit = (formData: CreatePostFormDataType) => {
    setSaveOwnerPost(formData?.create_post);
  };

  const handleGetFiles = (event: any) => {
    // setFiles([files, event.target.files]);

    getPictureBase64({ account: props.account, event: event, method: props.setPostPhoto, key: "postPhoto" });
  };

  const isStepSkipped = (step: any) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={() => {
        props.handleClose();
        handleReset();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade className={styles.create_new_post_container} in={props.open}>
        <Box className={styles.create_new_post_content}>
          {props.postPhoto ? (
            <>
              {activeStep === steps.length ? (
                <></>
              ) : activeStep === 0 ? (
                <React.Fragment>
                  <div className={styles.create_post_head}>
                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                    <Stepper activeStep={activeStep}>
                      <Step className={styles.head_title}>{activeStep ? steps[activeStep] : steps[0]}</Step>
                    </Stepper>
                    <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
                  </div>

                  <div className={styles.create_post_content}>
                    <div className={styles.content_media}>
                      <img className={styles.post_img} src={props.postPhoto} alt="" />
                    </div>
                  </div>

                  <input onChange={handleGetFiles} id="inputFile" type="file" accept="image/*" />
                </React.Fragment>
              ) : activeStep === 1 ? (
                <React.Fragment>
                  <div className={styles.create_post_head}>
                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                    <Stepper activeStep={activeStep}>
                      <Step className={styles.head_title}>{activeStep ? steps[activeStep] : steps[0]}</Step>
                    </Stepper>
                    <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
                  </div>

                  <div className={styles.create_post_content}>
                    <div className={styles.content_media}>
                      <img className={styles.post_img} src={props.postPhoto} alt="" />
                    </div>

                    <div className={styles.content_wrapper_content}>
                      <div className={styles.title}>Work in progress</div>
                      <div className={styles.subtitle}>Sorry, this content is not yet available</div>
                    </div>
                  </div>
                </React.Fragment>
              ) : activeStep === 2 ? (
                <React.Fragment>
                  <>
                    <div className={styles.create_post_head}>
                      <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                      </Button>
                      <Stepper activeStep={activeStep}>
                        <Step className={styles.head_title}>{activeStep ? steps[activeStep] : steps[0]}</Step>
                      </Stepper>
                      <Button
                        onClick={() => {
                          if (activeStep === steps.length - 1) {
                            props.createPostThunk({
                              accountId: props?.account?.id,
                              postPhoto: props.postPhoto,
                              description: saveOwnerPost,
                              dateCreated: new Date(),
                            });
                            props.handleClose();
                          }
                          handleNext();
                        }}>
                        {activeStep === steps.length - 1 ? "Share" : "Next"}
                      </Button>
                    </div>

                    <div className={styles.create_post_content}>
                      <div className={styles.content_media}>
                        <img src={props.postPhoto} alt="" />
                      </div>

                      <div className={styles.content_wrapper_content}>
                        <CreatePostReduxForm onChange={onSubmit} />
                      </div>
                    </div>
                  </>
                </React.Fragment>
              ) : (
                <></>
              )}
            </>
          ) : (
            <Box className={styles.create_new_post_content}>
              <div className={styles.head_title + " " + styles.head_title__default}>Create new post</div>

              <div className={styles.create_post_content + " " + styles.create_post_content__default}>
                <div className={styles.content_media_icon}>
                  <PermMediaOutlinedIcon />
                </div>
                <div className={styles.content_subtitle}>Drag photos and videos here</div>
                <div className={styles.content_wrapper_button}>
                  <Button className={styles.content_button} onClick={handleClick} variant="contained">
                    Select
                  </Button>
                  <input ref={hiddenFileInput} onChange={handleGetFiles} id="inputFile" type="file" accept="image/*" />
                </div>
              </div>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreatePost;
