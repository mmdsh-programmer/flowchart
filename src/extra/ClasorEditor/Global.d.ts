declare module 'clasor-editor' {
  export interface ClasorEditorProps {
    mode: 'EDIT' | 'PREVIEW';
    content: string;
    outline: string;
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

  export interface IRefClasorEditor {
    getData: () => {
      content: string;
      outline: string;
    };
  }

  export interface IRefClasor extends IRefClasorEditor {}
  const ClasorEditor: (
    props: ClasorEditorProps,
    ref: Ref<IRefClasor>
  ) => JSX.Element;
  export default ClasorEditor;
}
