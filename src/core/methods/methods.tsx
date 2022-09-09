import FileResizer from "react-image-file-resizer";
import { AccountType } from "../../types/types";

const resizeFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    FileResizer.imageFileResizer(
      file,
      700,
      1200,
      "JPEG",
      80,
      0,
      (uri) => {
        const image = uri as string;

        try {
          resolve(image);
        } catch (error) {
          reject(error);
        }
      },
      "base64"
    );
  });

// get pictrue
type getPictureBase64Type = { event: any };

export const getPictureBase64 = async ({ event }: getPictureBase64Type) => {
  if (event.target.files.length) {
    const file = event.target.files[0];
    const image = await resizeFile(file);

    return image;
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

// copy to clipboard
export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
};
