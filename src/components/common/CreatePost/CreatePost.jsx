import React from "react";
import styles from "./CreatePost.module.css";
import Box from "@mui/material/Box";
import CreatePostReduxForm from "../../common/CreatePost/CreatePostForm";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { getPictureBase64 } from "../../../core/methods/methods";

const CreatePost = props => {
	let [saveOwnerPost, setSaveOwnerPost] = React.useState(null);
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const steps = ["Crop", "Edit", "Create new post"];
	const hiddenFileInput = React.useRef(null);

	let onSubmit = formData => {
		setSaveOwnerPost(formData.create_post);
	};

	const isStepSkipped = step => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep(prevActiveStep => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleClick = event => {
		hiddenFileInput.current.click();
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
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
										<Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
											Back
										</Button>
										<Stepper activeStep={activeStep}>
											<Step className={styles.head_title}>
												{console.log(steps[activeStep])}
												{activeStep ? steps[activeStep] : steps[0]}
											</Step>
										</Stepper>
										<Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
									</div>

									<div className={styles.create_post_content}>
										<div className={styles.content_media}>
											<img className={styles.post_img} src={props.postPhoto} alt='' />
										</div>
									</div>
								</React.Fragment>
							) : activeStep === 1 ? (
								<React.Fragment>
									<div className={styles.create_post_head}>
										<Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
											Back
										</Button>
										<Stepper activeStep={activeStep}>
											<Step className={styles.head_title}>{activeStep ? steps[activeStep] : steps[0]}</Step>
										</Stepper>
										<Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
									</div>

									<div className={styles.create_post_content}>
										<div className={styles.content_media}>
											<img className={styles.post_img} src={props.postPhoto} alt='' />
										</div>

										<div className={styles.content_wrapper_content}>
											<div>
												Lorem, ipsum dodam doloremque adipisci eius rerum, error, possimus maxime at dolorum culpa neque
												itaque ad animi sed vero saepe odit hic! Doloremque, autem commodi? Ad laboriosam accusantium magni.
											</div>
										</div>
									</div>
								</React.Fragment>
							) : activeStep === 2 ? (
								<React.Fragment>
									<>
										<div className={styles.create_post_head}>
											<Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
												Back
											</Button>
											<Stepper activeStep={activeStep}>
												<Step className={styles.head_title}>
													{console.log(steps[activeStep])}
													{activeStep ? steps[activeStep] : steps[0]}
												</Step>
											</Stepper>
											<Button
												onClick={() => {
													if (activeStep === steps.length - 1) {
														props.setProfilePosts({
															id: props.getUniqueGeneratedIdPost({ length: 11, account: props.account }),
															photo: props.postPhoto,
															likes: [],
															comments: [],
															dateCreated: "01.01.01",
															description: saveOwnerPost,
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
												<img src={props.postPhoto} alt='' />
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
									<Button className={styles.content_button} onClick={handleClick} variant='contained'>
										Select
									</Button>
									<input
										ref={hiddenFileInput}
										onChange={event => getPictureBase64({ event: event, method: props.setPostPhoto })}
										id='inputFile'
										type='file'
										accept='image/*'
									/>
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
