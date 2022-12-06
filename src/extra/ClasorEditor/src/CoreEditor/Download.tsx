import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

declare interface IFileDetail {
  name: string;
  type: string;
  extension: string;
}

declare interface IProps {
  fileDetails: IFileDetail;
  downloadApiAddress?: string;
  fileContent?: string;
  children: JSX.Element;
}

let unmounted = false;
const Download = (props: IProps) => {
  const { fileDetails, fileContent } = props;
  const [disableDownloadButton, setDisableDownloadButton] = useState(false);
  const downloadRef = useRef(null);

  const startDownload = async (alive: boolean) => {
    let blob;

    if (disableDownloadButton) {
      return;
    }
    setDisableDownloadButton(true);
    try {
      if (props.downloadApiAddress) {
        let response = await fetch(props.downloadApiAddress, {
          headers: {
            Authorization:
              'Bearer ' + window.localStorage.getItem('CLASOR:ACCESS_TOKEN'),
          },
        });
        if (
          response &&
          response.body &&
          response.headers &&
          response.status === 200
        ) {
          const reader = response.body.getReader();
          //const contentLength = +(response.headers.get('Content-Length') || 0);

          let receivedLength = 0; // received that many bytes at the moment
          let chunks: (string | Uint8Array | undefined)[] = []; // array of received binary chunks (comprises the body)

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            chunks = [...chunks, value];
            receivedLength += value ? value.length : 0;
            // setProgress(receivedLength / contentLength);
          }

          let chunksAll = new Uint8Array(receivedLength);
          let position = 0;
          for (let chunk of chunks) {
            chunksAll.set(chunk as Uint8Array, position);
            position += (chunk as Uint8Array).length;
          }
          blob = new Blob([chunksAll], { type: fileDetails.type });
        } else {
          toast.error('دانلود فایل با خطا مواجه شد.');
          setDisableDownloadButton(false);
        }
      } else if (fileContent) {
        blob = new Blob([fileContent], { type: fileDetails.type });
      }

      if (downloadRef && !alive && blob) {
        const href = window.URL.createObjectURL(blob);
        const aTag = downloadRef.current as HTMLAnchorElement | null;
        if (aTag) {
          aTag.download = fileDetails.name + '.' + fileDetails.extension;
          aTag.href = href;
          aTag.click();
          URL.revokeObjectURL(href);
          aTag.href = '';
        }
        setDisableDownloadButton(false);
      } else {
        setDisableDownloadButton(false);
        console.log('Unexpected Error');
      }
    } catch (error) {
      console.log(error);
      toast.error('دانلود فایل با خطا مواجه شد.');
      setDisableDownloadButton(false);
    }
  };

  useEffect(() => {
    unmounted = false;
    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <>
      <div onClick={() => startDownload(unmounted)}>
        <button
          style={{ width: '100%', padding: 0 }}
          disabled={disableDownloadButton}
          className="clasor-btn"
        >
          {props.children}
        </button>
      </div>
      <a ref={downloadRef} download />
    </>
  );
};

export default Download;
