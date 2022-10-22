import React from "react";
import styles from "./StepperPerformance.module.scss";
// import VideoLabelIcon from "@mui/icons-material/VideoLabel";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import { StepIconProps } from "@mui/material/StepIcon";
// import StepLabel from "@mui/material/StepLabel";
// import { styled } from "@mui/material/styles";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
// import MobileStepper from "@mui/material/MobileStepper";
// import Button from "@mui/material/Button";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import WallpaperIcon from "@mui/icons-material/Wallpaper";
// import SwipeableViews from "react-swipeable-views";
import { AccountType } from "../../../types/types";

interface StepperPerformancePropsType {
  account: AccountType | null;
}

// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
//     borderRadius: 1,
//   },
// }));

// const ColorlibStepIconRoot = styled("div")<{
//   ownerState: { completed?: boolean; active?: boolean };
// }>(({ theme, ownerState }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
//   zIndex: 1,
//   color: "#fff",
//   width: 50,
//   height: 50,
//   display: "flex",
//   borderRadius: "50%",
//   justifyContent: "center",
//   alignItems: "center",
//   ...(ownerState.active && {
//     backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
//     boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
//   }),
//   ...(ownerState.completed && {
//     backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
//   }),
// }));

// function ColorlibStepIcon(props: StepIconProps) {
//   const { active, completed, className } = props;

//   const icons: { [index: string]: React.ReactElement } = {
//     1: <AddPhotoAlternateIcon />,
//     2: <WallpaperIcon />,
//     3: <VideoLabelIcon />,
//     4: <GroupAddIcon />,
//   };

//   return (
//     <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
//       {icons[String(props.icon)]}
//     </ColorlibStepIconRoot>
//   );
// }

// const steps = ["Add avatar", "Add cover", "Create an ad", "test"];

const StepperPerformance: React.FunctionComponent<StepperPerformancePropsType> = ({ account }) => {
  // const theme = useTheme();
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStepChange = (step: number) => {
  //   setActiveStep(step);
  // };

  return (
    <>
      <div className={styles.title}>Upgrade your profile and watch your performance</div>

      {/* <Stepper alternativeLabel activeStep={activeStep} connector={null}>
        <SwipeableViews style={{ width: "100%" }} axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
          <Stepper alternativeLabel activeStep={activeStep} connector={null}>

          {steps.map((label, index) => (
            <Step key={label + index}>{Math.abs(activeStep - index) <= 2 ? <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel> : null}</Step>
          ))}
          </Stepper>
        </SwipeableViews>
      </Stepper> */}

      {/* <MobileStepper
        variant="text"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === steps.length - 1}>
            Next
            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      /> */}
    </>
  );
};

export default StepperPerformance;
