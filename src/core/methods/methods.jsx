export const getUniqueGeneratedIdPost = (props) => {
  let result = props.posts?.length ? props.posts?.length : 0 + "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;

  for (let i = 0; i < props.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const searchTheSameId = props.posts ? props.posts.find((post) => post.id === result) : undefined;

  if (!searchTheSameId) {
    return result;
  } else {
    return result + props.posts.length;
  }
};

export const getPictureBase64 = (props) => {
  if (props.event.target.files.length) {
    const file = props.event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      props.method(props.account && props.key ? { ...props.account, [props.key]: reader.result } : reader.result);
    };
  }
};

export const removePicture = (props) => props.method({ ...props.account, [props.key]: null });
