import { AccountType } from "../../types/types";
import FileResizer from "react-image-file-resizer";

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      700,
      1200,
      "JPEG",
      80,
      0,
      (uri) => {
        // console.log("react-image-file-resizer", uri);
        resolve(uri);
      },
      "base64"
    );
  });

// get pictrue
type GetPictureBase64Type = {
  event: any;
  account?: AccountType | null;
  method: (...args: any[]) => void;
  key?: string;
};

export const getPictureBase64 = async (props: GetPictureBase64Type) => {
  if (props.event.target.files.length) {
    const file = props.event.target.files[0];
    const image = await resizeFile(file);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);

    // reader.onloadend = function () {
    props.method(props.account && props.key ? { ...props.account, [props.key]: image } : image);
    // };
  }
};

type RemovePictureType = {
  account: AccountType | null;
  method: (...args: any[]) => void;
  key: string;
};

// remove avatar
export const removePicture = (props: RemovePictureType) => props.method({ ...props.account, [props.key]: null });

type setIsOnlineToSessionStorageType = {
  value: "online";
};

// set value to session storage
export const setIsOnlineToSessionStorage = ({ value }: setIsOnlineToSessionStorageType) => {
  sessionStorage.setItem("isOnline", value);
};

// get value from session storage
export const getOnlineInSessionStorage = () => {
  const res = sessionStorage.getItem("isOnline");

  return res;
};

// remove value to session storage
export const removeOnlineInSessionStorage = () => {
  sessionStorage.removeItem("isOnline");
};
