import React from "react";
import { AccountType, FirebaseType, LikedOfPostType, LocationType, MediaOfMessageType, MediaOfPostType, PostType } from "../../../../types/types";
import { defaultPostConstant, modalPostConstant, onlyBodyPostConstant } from "../../../../core/constants/constantsPost";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { profileConstant } from "../../../../core/constants/constants";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import CollectionsIcon from "@mui/icons-material/Collections";
import MobileStepper from "@mui/material/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "../Post.module.scss";

interface BodyPostPropsType {
  account: AccountType | null;
  post: FirebaseType<PostType> | undefined;
  location: LocationType;
  kindOfPost: typeof defaultPostConstant | typeof modalPostConstant | typeof onlyBodyPostConstant;
  checkClickFavoriteBorder: LikedOfPostType | undefined;
  updatePostThunk: (post: PostType) => void;
}

interface MediasOfPostPropsType extends BodyPostPropsType {
  media?: MediaOfPostType;
}

const MediasOfPost = (props: MediasOfPostPropsType) => {
  return (
    <Button className={styles.button_image} variant="text">
      <div className={styles.bodyPhoto} title={!props.checkClickFavoriteBorder ? "Double-click if you liked the post" : "Double-click if you don't like the post"} onDoubleClick={() => (!props.checkClickFavoriteBorder ? props?.post && props?.updatePostThunk({ ...props?.post?.data(), liked: props?.post?.data()?.liked ? [...(props.post.data().liked as Array<any>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.post && props?.updatePostThunk({ ...props?.post?.data(), liked: props?.post?.data()?.liked ? props?.post?.data()?.liked?.filter((liked: LikedOfPostType) => liked?.id !== props?.account?.id) : [] }))} style={{ backgroundImage: `url(${props?.media?.media ? props?.media.media : props?.post?.data()?.medias[0]?.media})` }}></div>

      {props?.post && props?.post.data().medias?.length > 1 && props.location.pathname === profileConstant.path + "/" + props.location.pathname.split("/")[props.location.pathname.split("/").length - 1] ? <CollectionsIcon className={styles.collections_icon} /> : undefined}
    </Button>
  );
};

const BodyPost = (props: BodyPostPropsType) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.post?.data().medias.length || 0;

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
    <div className={styles.body}>
      {props?.post && props?.post.data().medias?.length > 1 && props.kindOfPost !== onlyBodyPostConstant ? (
        <>
          <SwipeableViews className={styles.wrapper_swipeable} axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
            {props.post?.data().medias.map((media: MediaOfMessageType, index: number) => (
              <MediasOfPost key={index} {...props} media={media} />
            ))}
          </SwipeableViews>

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
        </>
      ) : (
        <MediasOfPost {...props} />
      )}
    </div>
  );
};

export default BodyPost;
