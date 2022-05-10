export const getUniqueGeneratedIdPost = (props) => {
  const result = props.account.id + "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (const i = 0; i < props.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const searchTheSameId = props.account && props.account.posts ? props.account.posts.find((post) => post.id === result) : undefined;

  if (!searchTheSameId) {
    return result;
  } else {
    return result + props.account.posts.length;
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
