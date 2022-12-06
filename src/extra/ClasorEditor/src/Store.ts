import { CKEditorInstance } from 'ckeditor4-react';
import { InitialStateType } from './Interface';

const initial: InitialStateType = {
  podSpaceServer: '',
  frontendServer: '',
  content: '',
  outline: '[]',
};

let inline = false;

let handleError = (error: any) => {
  console.log('>>>>>>>>>>>>>>>>>>>>> clasor default handle error');
  console.log(error);
  console.log('>>>>>>>>>>>>>>>>>>>>>');
};

let handleShareFile:
  | ((fileHash: string, userGroupHash: string) => Promise<boolean>)
  | null = null;

let handleRefreshToken: (() => Promise<string>) | null = null;
let onChange: ((content: string) => void) | null;

export const setInitData = (data: InitialStateType) => {
  if (data.token) {
    data.content = data.content.replace(
      new RegExp(/(Authorization=)(.{32})(&)/g),
      `Authorization=${data.token}&`
    );
  }

  Object.keys(data).forEach((v) => {
    const value = data[v as keyof typeof initial];
    if (value) {
      initial[v as keyof typeof initial] = value;
    }
  });
};

export const getValue = (key: keyof InitialStateType) => {
  return initial[key];
};

export const setValue = (key: keyof InitialStateType, value: string) => {
  initial[key] = value;
};

export const getErrorHandler = () => {
  return handleError;
};

export const getHandleShareFile = () => {
  return handleShareFile;
};

export const getHandleRefreshToken = () => {
  return handleRefreshToken;
};

export const getInlineEditor = () => {
  return inline;
};

export const setInlineEditor = (isInline: boolean) => {
  inline = isInline;
};

export const setErrorHandler = (handler: (error: any) => void) => {
  handleError = handler;
};

export const setHandleShareFile = (
  handler: (fileHash: string, userGroupHash: string) => Promise<boolean>
) => {
  handleShareFile = handler;
};

export const setHandleRefreshToken = (handler: () => Promise<string>) => {
  handleRefreshToken = handler;
};

let editorInstance: CKEditorInstance | null = null;
export const setCkeditorInstance = (editor: CKEditorInstance) => {
  editorInstance = editor;
};

export const getEditorInstance = (): CKEditorInstance => {
  return editorInstance;
};

export const setHandleOnChane = (handler: (content: string) => void) => {
  onChange = handler;
};

export const getHandleChange = () => {
  return onChange;
};
