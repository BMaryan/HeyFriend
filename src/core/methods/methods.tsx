import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { AccountType } from "../../types/types";

// type GetUniqueGeneratedIdPostType = {
//   posts: Array<PostType>
//   length: number
// }

// export const getUniqueGeneratedIdPost = (props:GetUniqueGeneratedIdPostType ) => {
//   let result = props.posts?.length ? props.posts?.length : 0 ;
//   let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let charactersLength = characters.length;

//   for (let i = 0; i < props.length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }

//   const searchTheSameId = props.posts ? props.posts.find((post: PostType) => post.id === result) : undefined;

//   if (!searchTheSameId) {
//     return result;
//   } else {
//     return result + props.posts.length;
//   }
// };

type GetPictureBase64Type = {
  event: any;
  account: AccountType | null;
  method: (...args: any[]) => void;
  key: string;
};

export const getPictureBase64 = (props: GetPictureBase64Type) => {
  if (props.event.target.files.length) {
    const file = props.event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      props.method(reader.result);
      // props.method(props.account && props.key ? { ...props.account, [props.key]: reader.result } : reader.result);
    };
  }
};

type RemovePictureType = {
  account: AccountType | null;
  method: (...args: any[]) => void;
  key: string;
};

export const removePicture = (props: RemovePictureType) => props.method({ ...props.account, [props.key]: null });
