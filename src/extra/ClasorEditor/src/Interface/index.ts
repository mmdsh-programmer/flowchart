import { EImageAlign } from '../Enum';

export interface IRefClasorEditor {
  getData: () => {
    content: string;
    outline: string;
  };
}

export interface ClasorEditorProps {
  mode: 'EDIT' | 'PREVIEW';
  content: string;
  outline?: string;
  podSpaceServer: string;
  frontendServer?: string;
  token?: string;
  userGroupHash?: string;
  userInfo?: IUserInfo;
  inline?: boolean;
  handleError?: (error: Error) => void;
  handleShareFile?: (
    fileHash: string,
    userGroupHash: string
  ) => Promise<boolean>;
  handleRefreshToken?: () => Promise<string>;
  onChange?: (content: string) => void;
  getEditorValue?: () => string;
  ref?: React.MutableRefObject<IRefClasorEditor | null>;
}

export type InitialStateType = Omit<
  ClasorEditorProps,
  | 'handleError'
  | 'handleShareFile'
  | 'handleRefreshToken'
  | 'mode'
  | 'getEditorValue'
  | 'ref'
  | 'inline'
  | 'userInfo'
  | 'onChange'
> & { userInfo?: string };

export declare interface ILevelObject {
  id: string;
  tag: string;
  level: number;
  text?: string;
}
export declare interface IOutline extends ILevelObject {
  children: IOutline[];
}

export interface IHashDialog {
  dialog: boolean;
  codeHash: string | null;
}

export enum EDialogType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  FILE = 'FILE',
  EXTERNAL = 'EXTERNAL',
}

export enum ERoles {
  USER_ROLE = 'USER_ROLE',
  USER_GROUP_MANAGER_ROLE = 'USER_GROUP_MANAGER_ROLE',
  ADMIN_ROLE = 'ADMIN_ROLE',
}

export interface IUser {
  avatar: string;
  name: string;
  roles: ERoles[];
  ssoId: number;
  username: string;
}

export interface IFile {
  hash: string;
  name: string;
  type: string;
  parentHash: string;
  owner: IUser;
  uploader: IUser;
  attributes: string[];
  created: number;
  updated: number;
  extension: string;
  size: number;
  metaData: string;
  version: number;
  thumbnail: 'WAITING_FOR_THUMBNAIL' | string;
  uploadTime?: number;
  abort?: () => void;
  progress?: number;
  folderHash?: string;
  uploadState?: 'SUCCESS' | 'ERROR' | 'START';
  shouldDelete?: boolean;
  cancelUpload?: boolean;
  success?: boolean;
  error?: boolean;
}

export interface IRepo {
  id: number;
  name: string;
  description: string;
  bookmark: boolean;
  createdAt: string;
  lastAccessDate: string;
  imageFileHash: string;
  roleName: ERoles;
  updatedAt: string;
  userGroupHash: string;
  chatThreadId?: number;
  owner?: {
    userName: string;
    name: string;
    ssoId: number;
    img: string;
  };
}

export interface IImageProps {
  height?: number;
  width?: number;
  alignment: EImageAlign;
  hasCaption: boolean;
  alt?: string;
}

export interface IItemProps {
  id: string | null;
  type: 'nodes' | 'connectors' | null;
  strokeWidth: number;
  fontSize: number;
  fontColor: string;
  strokeColor: string;
  fillColor: string;
  tooltip?: string;
}

export interface IUserInfo {
  id: number;
  name: string | null;
  isOwner: boolean;
}
