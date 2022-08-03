import React from "react";
import { AccountType, MediaOfMessageType, MediaOfPostType, PostType } from "../../../types/types";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { getPictureBase64 } from "../../../core/methods/methods";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import MobileStepper from "@mui/material/MobileStepper";
import CreatePostReduxForm from "./CreatePostForm";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Backdrop from "@mui/material/Backdrop";
import styles from "./CreatePost.module.scss";
import Stepper from "@mui/material/Stepper";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { fb } from "../../../firebase";
import Step from "@mui/material/Step";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Media from "react-media";

interface CreatePostPropsType {
  account: AccountType | null;
  mediasOfPost: Array<MediaOfPostType>;
  open: boolean;
  handleClose: () => void;
  createPostThunk: (post: PostType) => void;
  setMediasOfPost: (medias: Array<MediaOfPostType>) => void;
}

interface SwipeableViewPropsType {
  mediasOfPost: Array<MediaOfPostType>;
  setMediasOfPost: (medias: Array<MediaOfPostType>) => void;
}

export interface CreatePostFormDataType {
  create_post: null;
}

const SwipeableView = (props: SwipeableViewPropsType) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.mediasOfPost.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
      <SwipeableViews className={styles.wrapper_swipeable} axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {props.mediasOfPost.map((media: MediaOfMessageType, index: number) => (Math.abs(activeStep - index) <= 2 ? <img key={index} className={styles.post_img} src={media.media} alt="" /> : null))}
      </SwipeableViews>

      {props.mediasOfPost.length > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          classes={{
            root: styles.mobile_stepper,
            dots: styles.dots,
            dot: styles.dot,
            dotActive: styles.dot_active,
          }}
          nextButton={
            activeStep !== maxSteps - 1 && (
              <IconButton className={styles.button_next} size="small" onClick={handleNext}>
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </IconButton>
            )
          }
          backButton={
            activeStep !== 0 && (
              <IconButton className={styles.button_back} size="small" onClick={handleBack}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </IconButton>
            )
          }
        />
      )}
    </>
  );
};

const CreatePost = (props: CreatePostPropsType) => {
  const hiddenFileInput = React.useRef<any>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [saveOwnerPost, setSaveOwnerPost] = React.useState<string | null>(null);
  const steps = ["Crop", "Edit", <Media query={{ maxWidth: 540 }}>{(matches) => (!matches ? "Create new post" : "Create")}</Media>];

  //
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (formData: CreatePostFormDataType) => {
    setSaveOwnerPost(formData?.create_post);
  };

  const handleGetFiles = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    if (props.mediasOfPost.length === 0) {
      getPictureBase64({ event }).then((image: string | undefined) => {
        image && props.setMediasOfPost([{ media: image }]);
      });
    }

    props.mediasOfPost?.map((media: MediaOfPostType) => {
      getPictureBase64({ event }).then((image: string | undefined) => {
        image && props.setMediasOfPost([...props.mediasOfPost, { media: image }]);
      });

      return media;
    });
  };

  // console.log(props.mediasOfPost);
  const isStepSkipped = (step: number) => {
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    hiddenFileInput.current.click();
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log(props.mediasOfPost);

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
          {props.mediasOfPost.length > 0 ? (
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
                      <SwipeableView mediasOfPost={props.mediasOfPost} setMediasOfPost={props.setMediasOfPost} />
                    </div>
                  </div>

                  <Box sx={{ transform: "translateZ(0px)" }}>
                    <SpeedDial ariaLabel="SpeedDial controlled open example" sx={{ position: "absolute", bottom: 16, right: 16 }} icon={<SpeedDialIcon />} onClose={handleClose} onOpen={handleOpen} open={open}>
                      <SpeedDialAction
                        icon={
                          <IconButton aria-label="upload picture" component="label">
                            <input hidden onChange={handleGetFiles} type="file" accept="image/*" multiple />
                            <PermMediaOutlinedIcon />
                          </IconButton>
                        }
                        tooltipTitle="add media"
                        onClick={handleClose}
                      />
                    </SpeedDial>
                  </Box>
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
                      <SwipeableView mediasOfPost={props.mediasOfPost} setMediasOfPost={props.setMediasOfPost} />
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
                              id: "",
                              accountId: props?.account?.id,
                              medias: props.mediasOfPost,
                              description: saveOwnerPost ? saveOwnerPost : "",
                              dateCreated: fb.Timestamp.now(),
                            });
                            props.handleClose();
                          }
                          handleNext();
                          handleReset();
                        }}>
                        {activeStep === steps.length - 1 ? "Share" : "Next"}
                      </Button>
                    </div>

                    <div className={styles.create_post_content}>
                      <div className={styles.content_media}>
                        <SwipeableView mediasOfPost={props.mediasOfPost} setMediasOfPost={props.setMediasOfPost} />
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
                  <input ref={hiddenFileInput} onChange={handleGetFiles} type="file" accept="image/*" multiple />
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
