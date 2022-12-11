import React, { ChangeEvent, useEffect, useState } from "react";
import { getErrorHandler,
  getHandleRefreshToken,
  getHandleShareFile,
  getValue,
  setValue } from "../Store";
import { ClasorModal } from "../Modal";
import { IFile, IImageProps } from "../Interface";
import { EImageAlign } from "../Enum";
import { fileTypeIs } from "../Helper/Utils";
import ImageDetail from "./ImageDetail";
import PodSpaceFolder from "pod-space-folder";

declare interface IProps {
  handlePublicUrl?: (url: string) => void;
  handleClose: () => void;
  handleSelect: (file: IFile, imageProperties?: IImageProps) => void;
}

const expression = /[\w#%+.:=@~-]{1,256}\.[\d()a-z]{1,6}\b([\w#%&()+./:=?@~-]*)?/gi;
const urlRegex = new RegExp(expression);
let timeout: number;
const FileManagementDialog = (props: IProps) => {
  const handleError = getErrorHandler();

  const userToken = getValue("token");
  const [imageProperties, setImageProperties] = useState<IImageProps>({
    alignment: EImageAlign.NONE,
    hasCaption: false,
  });
  const userGroupHash = getValue("userGroupHash");
  const podSpaceServer = getValue("podSpaceServer");
  const handleShareFile = getHandleShareFile();
  const handleRefresh = getHandleRefreshToken()!;

  const { handleClose, handleSelect, handlePublicUrl } = props;
  const [file, setFile] = useState<IFile | null>(null);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);

  const onSelect = (file: IFile) => {
    setFile(file);
  };

  const handleSelectFileBtn = () => {
    if (!file) {
      return;
    }
    handleSelect(file, imageProperties);
  };

  const handleSelectPublicUrl = () => {
    if (!publicUrl || !handlePublicUrl) return;
    handlePublicUrl(publicUrl);
  };

  const handlePublicUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      const { value } = event.target;
      if (value.match(urlRegex)) {
        setPublicUrl(value);
      } else {
        setPublicUrl(null);
      }
    }, 100);
  };

  const refreshToken = async () => {
    const token = await handleRefresh();
    setValue("token", token);
    return token;
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ClasorModal title="مدیریت فایل" open onClose={handleClose}>
      <>
        {handlePublicUrl ? (
          <div style={{
            display: "flex", marginTop: "10px",
          }}
          >
            <input
              placeholder="مسیر فایل عمومی"
              onChange={handlePublicUrlChange}
              name="fileName"
              className="clasor-input"
            />
            <button
              onClick={handleSelectPublicUrl}
              disabled={!publicUrl}
              className="clasor-btn"
            >
              تایید
            </button>
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            marginBottom: "25px",
          }}
        >
          <input
            disabled
            placeholder="نام فایل انتخاب شده"
            value={(file && `${file.name}.${file.extension}`) || ""}
            name="fileName"
            className="clasor-input"
          />
          <button
            onClick={handleSelectFileBtn}
            disabled={!file}
            className="clasor-btn"
          >
            تایید
          </button>
        </div>
        <div style={{
          display: "flex", width: "100%", height: "100%",
        }}
        >
          <div style={{
            width: "100%", height: "100%", flex: 1,
          }}
          >
            <PodSpaceFolder
              userToken={userToken!}
              userGroupHash={userGroupHash!}
              handleError={handleError}
              onSuccess={
                handleShareFile as (
                  hash: string,
                  userGroupHash: string
                ) => Promise<boolean>
              }
              podspaceApi={podSpaceServer!}
              onRefresh={refreshToken}
              onSelect={onSelect}
            />
          </div>

          {file && fileTypeIs(file.extension) === "IMAGE" && (
            <ImageDetail
              properties={imageProperties}
              setImageProperties={setImageProperties}
            />
          )}
        </div>
      </>
    </ClasorModal>
  );
};

export default FileManagementDialog;
