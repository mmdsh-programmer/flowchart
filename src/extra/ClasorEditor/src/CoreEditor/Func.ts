import { toast } from "react-toastify";
import { fileTypeIs } from "../Helper/Utils";
import { EDialogType,
  IFile,
  IImageProps,
  ILevelObject,
  IOutline } from "../Interface";
import { getValue } from "../Store";
import https from "node:https";
import { v4 as uuidv4 } from "uuid";

export const removeExtraElements = (content: string): string => {
  // remove extra elements such as edit and delete btns

  const htmlObject = document.createElement("div");

  htmlObject.innerHTML = content;
  const btnArray = htmlObject.querySelectorAll(".clasor-tag-btn");
  for (const elemnt of btnArray) {
    elemnt.remove();
  }
  return htmlObject.innerHTML;
};

export const checkForCustomAttachedFiles = () => {
  const editor = getEditor();

  if (!editor) {
    return;
  }
  const attachedFiles = editor.querySelectorAll(".clasor-attach-file");
  if (attachedFiles && attachedFiles.length) {
    for (const attachedFile of attachedFiles) {
      if (
        Object.hasOwn(attachedFile!.dataset, "content")
        && attachedFile.innerHTML.length
          < attachedFile!.dataset.content!.length
      ) {
        // user try to remove tag
        attachedFile.remove();
      }
    }
  }
};

export const handleSelectFileDialog = (
  file: IFile,
  dialog: EDialogType,
  properties?: IImageProps,
) => {
  window.sessionStorage.setItem("data-clasor-hash", file.hash);

  switch (dialog) {
    case EDialogType.AUDIO: {
      if (fileTypeIs(file.extension) !== "AUDIO") {
        toast.error("فایل انتخاب شده از نوع صوتی نمی باشد!");
        return;
      }

      const audioDialog = document.querySelectorAll(".clasor-audio-dialog");
      if (!audioDialog || !audioDialog[0]) {
        return;
      }
      const audioInput = audioDialog[0].querySelectorAll(".ckeditor-audio-src");
      if (!audioInput || !audioInput[0]) {
        return;
      }

      const audioSrc = audioInput[0].querySelectorAll("input");
      if (!audioSrc || !audioSrc[0]) {
        return;
      }
      const podspace = getValue("podSpaceServer");
      audioSrc[0].value = `${podspace}files/${
        file.hash
      }?checkUserGroupAccess=true&Authorization=${window.localStorage.getItem(
        "CLASOR:ACCESS_TOKEN",
      )}&time=${Date.now()}`;

      const confirmBtn = audioDialog[0].querySelectorAll(
        ".cke_dialog_ui_button_ok",
      ) as HTMLCollectionOf<HTMLButtonElement>;
      if (!confirmBtn || !confirmBtn[0]) {
        return;
      }
      if ([...confirmBtn][0]) {
        [...confirmBtn][0].click();
      }

      break;
    }
    case EDialogType.VIDEO: {
      if (fileTypeIs(file.extension) !== "VIDEO") {
        toast.error("فایل انتخاب شده از نوع ویدیو نمی باشد!");
        return;
      }
      const videoDialog = document.querySelectorAll(".clasor-video-dialog");
      if (!videoDialog || !videoDialog[0]) {
        return;
      }
      const videoInput = videoDialog[0].querySelectorAll(".ckeditor-video-src");
      if (!videoInput || !videoInput[0]) {
        return;
      }

      const videoSrc = videoInput[0].querySelectorAll("input");
      if (!videoSrc || !videoSrc[0]) {
        return;
      }
      const podspace = getValue("podSpaceServer");
      videoSrc[0].value = `${podspace}files/${
        file.hash
      }?checkUserGroupAccess=true&Authorization=${window.localStorage.getItem(
        "CLASOR:ACCESS_TOKEN",
      )}&time=${Date.now()}`;

      const confirmBtn = videoDialog[0].querySelectorAll(
        ".cke_dialog_ui_button_ok",
      ) as HTMLCollectionOf<HTMLButtonElement>;
      if (!confirmBtn || !confirmBtn[0]) {
        return;
      }
      if ([...confirmBtn][0]) {
        [...confirmBtn][0].click();
      }

      break;
    }
    case EDialogType.IMAGE: {
      if (fileTypeIs(file.extension) !== "IMAGE") {
        toast.error("فایل انتخاب شده از نوع تصویر نمی باشد!");
        return;
      }
      const imageDialog = document.querySelectorAll(".clasor-custom-image");
      if (!imageDialog || !imageDialog[0]) {
        return;
      }
      const imageSrcInput = imageDialog[0].querySelectorAll(
        ".ckeditor-clasor-image-src",
      );
      if (!imageSrcInput || !imageSrcInput[0]) {
        return;
      }
      const imageAltInput = imageDialog[0].querySelectorAll(
        ".ckeditor-clasor-image-alt",
      );
      const imageWidthInput = imageDialog[0].querySelectorAll(
        ".ckeditor-clasor-image-width",
      );
      const imageHeightInput = imageDialog[0].querySelectorAll(
        ".ckeditor-clasor-image-height",
      );
      const imageAlignInput = imageDialog[0].querySelectorAll(
        ".ckeditor-clasor-image-align",
      );
      const imageHasCaptionInput = imageDialog[0].querySelectorAll(
        ".ckeditor-clasor-image-has-caption",
      );

      const imageSrc = imageSrcInput[0].querySelectorAll("input");
      if (!imageSrc || !imageSrc[0]) {
        return;
      }
      const podSpaceServer = getValue("podSpaceServer");
      imageSrc[0].value = `${podSpaceServer}files/${
        file.hash
      }?checkUserGroupAccess=true&Authorization=${window.localStorage.getItem(
        "CLASOR:ACCESS_TOKEN",
      )}&time=${Date.now()}`;

      const imageAlt = imageAltInput[0]?.getElementsByTagName("input");
      if (imageAlt && imageAlt[0] && properties && properties.alt) {
        imageAlt[0].value = properties.alt;
      }

      const imageWidth = imageWidthInput[0]?.getElementsByTagName("input");
      if (imageWidth && imageWidth[0] && properties && properties.width) {
        imageWidth[0].value = properties.width.toString();
      }

      const imageHeight = imageHeightInput[0]?.getElementsByTagName("input");
      if (imageHeight && imageHeight[0] && properties && properties.height) {
        imageHeight[0].value = properties.height.toString();
      }

      const imageAlign = imageAlignInput[0]?.getElementsByTagName("input");
      if (imageAlign && properties && properties.alignment) {
        for (const imageAlignItem in imageAlign) {
          if (imageAlign[imageAlignItem].value === properties.alignment) {
            imageAlign[imageAlignItem].checked = true;
            break;
          }
        }
      }

      const imageCaption = imageHasCaptionInput[0]?.getElementsByTagName("input");
      if (
        imageCaption
      && imageCaption[0]
      && properties
      && properties.hasCaption
      ) {
        imageCaption[0].checked = true;
      }
      const confirmBtn = imageDialog[0].querySelectorAll(
        ".cke_dialog_ui_button_ok",
      ) as HTMLCollectionOf<HTMLButtonElement>;
      if (!confirmBtn || !confirmBtn[0]) {
        return;
      }
      confirmBtn[0].click();

      break;
    }
    case EDialogType.FILE: {
      const fileDialog = document.querySelectorAll(
        ".clasor-custom-attach-file-dialog",
      );
      if (!fileDialog || !fileDialog[0]) {
        return;
      }

      sessionStorage.setItem("ckeditor-file-hash", file.hash);
      sessionStorage.setItem("ckeditor-file-name", file.name);
      sessionStorage.setItem("ckeditor-file-extension", file.extension);

      const confirmBtn = fileDialog[0].querySelectorAll(
        ".cke_dialog_ui_button_ok",
      ) as HTMLCollectionOf<HTMLButtonElement>;
      if (!confirmBtn || !confirmBtn[0]) {
        return;
      }
      confirmBtn[0].click();

      break;
    }
  // No default
  }
};

export const handlePublicUrl = (url: string) => {
  const imageDialog = document.querySelectorAll(".clasor-custom-image");
  if (!imageDialog || !imageDialog[0]) {
    return;
  }
  const imageInput = imageDialog[0].querySelectorAll(".ckeditor-image-src");
  if (!imageInput || !imageInput[0]) {
    return;
  }

  const imageSrc = imageInput[0].querySelectorAll("input");
  if (!imageSrc || !imageSrc[0]) {
    return;
  }
  imageSrc[0].value = url;

  const confirmBtn = imageDialog[0].querySelectorAll(
    ".cke_dialog_ui_button_ok",
  ) as HTMLCollectionOf<HTMLButtonElement>;
  if (!confirmBtn || !confirmBtn[0]) {
    return;
  }
  confirmBtn[0].click();
};

export const checkForCodeSnippet = (
  editCallBack: (hash: string) => void,
  deleteCallBack: () => void,
) => {
  const editListener = (element: any) => {
    const { target } = element;
    if (!target) {
      return;
    }

    const hash = target.dataset.clasorHash;
    if (!hash) {
      return;
    }
    editCallBack(hash);
  };
  const deleteListener = (element: any) => {
    const editor = getEditor();

    if (!editor) {
      return;
    }

    const { target } = element;
    if (!target) {
      return;
    }

    const hash = target.dataset.clasorHash;
    if (!hash) {
      return;
    }

    const parentNode = editor.getElementsByClassName(`clasor-code-${hash}`);
    if (!parentNode || !parentNode[0]) {
      return;
    }
    parentNode[0].remove();
    deleteCallBack();
  };

  return setTimeout(() => {
    const editor = getEditor();

    if (!editor) {
      return;
    }
    const codes = editor.querySelectorAll(".clasor-code-snippet");
    if (codes && codes.length) {
      for (const docElement of codes) {
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "ویرایش";
        editBtn.dataset.clasorHash = docElement.dataset.clasorHash || "";
        editBtn.setAttribute("class", "btn clasor-tag-btn");
        editBtn.setAttribute(
          "style",
          `
                    display: inline-block;
                    width: 65px;
                    height: 30px;
                    cursor: pointer;
                    background: #38a7ff;
                    border-radius: 3px;
                    border: 1px solid #38a7ff;
                    outline: none;
                    color: #FFF;
                    z-index: 1000;
                    position: absolute;
                    bottom: 5px;
                    left: 5px;
                `,
        );
        editBtn.addEventListener("click", editListener);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "حذف";
        deleteBtn.dataset.clasorHash = docElement.dataset.clasorHash || "";
        deleteBtn.setAttribute("class", "btn clasor-tag-btn");
        deleteBtn.setAttribute(
          "style",
          `
                    display: inline-block;
                    width: 65px;
                    height: 30px;
                    cursor: pointer;
                    background: #ff4d89;
                    border-radius: 3px;
                    border: 1px solid #ff4d89;
                    outline: none;
                    color: #FFF;
                    z-index: 1000;
                    position: absolute;
                    bottom: 5px;
                    left: 75px;
                `,
        );

        deleteBtn.addEventListener("click", deleteListener);
        docElement.append(editBtn);
        docElement.append(deleteBtn);
      }
    }
  }, 500);
};

export const addButtonsToFlowChartTags = (
  editCallBack: (hash: string) => void,
  deleteCallBack: () => void,
) => {
  const editListener = (element: any) => {
    const { target } = element;
    if (!target) {
      return;
    }
    const { hash } = target.dataset;
    if (!hash) {
      return;
    }
    editCallBack(hash);
  };
  const deleteListener = (element: any) => {
    const editor = getEditor();
    if (!editor) {
      return;
    }
    const { target } = element;
    if (!target) {
      return;
    }
    const { hash } = target.dataset;
    if (!hash) {
      return;
    }
    const parentNode = editor.getElementsByClassName(
      `clasor-flowchart-${hash}`,
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }
    parentNode[0].remove();
    deleteCallBack();
  };
  return setTimeout(() => {
    const editor = getEditor();
    if (!editor) {
      return;
    }
    const flowchart = editor.querySelectorAll(".clasor-flowchart");
    if (flowchart && flowchart.length) {
      for (const docElement of flowchart) {
        if (docElement.querySelector("clasor-b") !== null) {}
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "ویرایش";
        editBtn.dataset.hash = docElement.dataset.hash || "";
        editBtn.setAttribute(
          "class",
          `btn clasor-tag-btn edit-btn-${
            docElement.dataset.hash || ""
          }`,
        );
        editBtn.setAttribute(
          "style",
          `
                    display: inline-block;
                    width: 65px;
                    height: 30px;
                    cursor: pointer;
                    background: #38a7ff;
                    border-radius: 3px;
                    border: 1px solid #38a7ff;
                    outline: none;
                    color: #FFF;
                    z-index: 1000;
                    position: absolute;
                    bottom: 5px;
                    left: 5px;
                `,
        );
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "حذف";
        deleteBtn.dataset.hash = docElement.dataset.hash || "";
        deleteBtn.setAttribute(
          "class",
          `btn clasor-tag-btn delete-btn-${
            docElement.dataset.hash || ""
          }`,
        );
        deleteBtn.setAttribute(
          "style",
          `
                    display: inline-block;
                    width: 65px;
                    height: 30px;
                    cursor: pointer;
                    background: #ff4d89;
                    border-radius: 3px;
                    border: 1px solid #ff4d89;
                    outline: none;
                    color: #FFF;
                    z-index: 1000;
                    position: absolute;
                    bottom: 5px;
                    left: 75px;
                `,
        );
        deleteBtn.addEventListener("click", deleteListener);
        editBtn.addEventListener("click", editListener);

        docElement.append(editBtn);
        docElement.append(deleteBtn);
      }
    }
  }, 500);
};

export const findHeaderLevel = (
  hString: string,
): {
  tag: string;
  level: number;
} => {
  let i;
  const tags = [
    {
      tag: "<h1", level: 1,
    },
    {
      tag: "<h2", level: 2,
    },
    {
      tag: "<h3", level: 3,
    },
    {
      tag: "<h4", level: 4,
    },
    {
      tag: "<h5", level: 5,
    },
    {
      tag: "<h6", level: 6,
    },
  ];
  const tag = hString.slice(0, 3);
  for (i = 0; i < tags.length; i++) {
    if (tag === tags[i].tag) break;
  }

  return tags[i];
};

export const getId = (content: string) => {
  const startPattern = "id=\"";
  const startIndex = content.indexOf(startPattern);
  if (startIndex !== -1) {
    const endIndex = content.indexOf("\"", startIndex + startPattern.length);
    return content.substring(startIndex + startPattern.length, endIndex);
  }
  return null;
};

export const recursiveChildrenCheck = (
  levelObj: {
    id: string;
    tag: string;
    level: number;
  },
  subArray: IOutline[],
) => {
  let j;
  if (subArray.length === 0) {
    subArray.push({
      ...levelObj,
      children: [],
    });
  } else {
    for (j = subArray.length - 1; j >= 0; j--) {
      if (levelObj.level > subArray[j].level) {
        break;
      }
    }
    if (j >= 0) {
      recursiveChildrenCheck(levelObj, subArray[j].children);
    } else {
      subArray.push({
        ...levelObj,
        children: [],
      });
    }
  }
};

export const downloadFileAndConvertBufferTo = (
  downloadApiAddress: string,
  convertType: BufferEncoding | undefined,
): Promise<string | null> => {
  return new Promise(async (resolve) => {
    await https.get(downloadApiAddress, (res: any) => {
      const chunks: (string | Uint8Array | undefined)[] = [];
      res.on("data", (chunk: any) => {
        chunks.push(chunk);
      });
      res.on("end", () => {
        const contentType = res.headers["content-type"];
        if (contentType !== "application/json") {
          const result = Buffer.concat(chunks as Uint8Array[]);
          const convertedData = result.toString(convertType);
          resolve(convertedData);
        } else {
          toast.error("دانلود فایل با خطا مواجه شد.");
          resolve(null);
        }
      });
    });
  });
};

let preHeadings: {
  outline: IOutline[];
  matches: string;
} = {
  outline: [],
  matches: "",
};
export const extractHeaders = (htmlContent: string) => {
  const content = htmlContent.replace(/&nbsp;/g, "").replace(/&zwnj;/g, " ");
  let j;
  let levelObj: ILevelObject = {
    id: "",
    tag: "",
    level: -1,
    text: "",
  };
  const pattern = new RegExp(/<(h[1-6]).*?(id="([^"]*?)".*?)?>(.+?)<\/\1>/gi);
  const matches = content.match(pattern) || [];
  let outline: IOutline[] = [];
  if (!(JSON.stringify(matches) === preHeadings.matches)) {
    for (const eachMatch of matches) {
      const tagAndid = findHeaderLevel(eachMatch);
      levelObj = {
        ...levelObj, ...tagAndid,
      };

      const id = getId(eachMatch) || uuidv4();
      levelObj = {
        ...levelObj, id,
      };
      if (levelObj) {
        levelObj.text = eachMatch.replace(/(<([^>]+)>)/gi, "");
        if (outline.length === 0) {
          outline = [
            ...outline,
            {
              ...levelObj,
              children: [],
            },
          ];
        } else {
          for (j = outline.length - 1; j >= 0; j--) {
            if (levelObj.level > outline[j].level) {
              break;
            }
          }
          if (j >= 0) {
            recursiveChildrenCheck(levelObj, outline[j].children);
          } else {
            outline = [
              ...outline,
              {
                ...levelObj,
                children: [],
              },
            ];
          }
        }
      }
    }
    preHeadings = {
      outline,
      matches: JSON.stringify(matches),
    };
  }

  return preHeadings.outline;
};

export const getEditor = () => {
  const editorIframe = document.querySelectorAll(
    ".cke_wysiwyg_frame",
  )[0] as HTMLIFrameElement;
  const editorInline = document.querySelectorAll(
    ".cke_editable_inline",
  )[0];
  return editorIframe?.contentWindow?.document || editorInline;
};

export const addButtonsToExtraDocTags = (
  editCallBack: (hash: string) => void,
  deleteCallBack: () => void,
) => {
  const editListener = (element: any) => {
    const { target } = element;
    if (!target) {
      return;
    }

    const hash = target.dataset.clasorExternalHash;
    if (!hash) {
      return;
    }
    editCallBack(hash);
  };
  const deleteListener = (element: any) => {
    const editor = getEditor();

    if (!editor) {
      return;
    }

    const { target } = element;
    if (!target) {
      return;
    }

    const hash = target.dataset.clasorExternalHash;
    if (!hash) {
      return;
    }

    const parentNode = editor.getElementsByClassName(
      `clasor-external-document-${hash}`,
    );
    if (!parentNode || !parentNode[0]) {
      return;
    }
    parentNode[0].remove();
    deleteCallBack();
  };

  return setTimeout(() => {
    const editor = getEditor();

    if (!editor) {
      return;
    }
    const external = editor.querySelectorAll(".clasor-external-document");
    if (external && external.length) {
      for (const docElement of external) {
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "ویرایش";
        editBtn.dataset.clasorExternalHash = docElement.dataset.clasorExternalHash || "";
        editBtn.setAttribute(
          "class",
          "btn clasor-tag-btn external-document-edit-btn",
        );
        editBtn.setAttribute(
          "style",
          `
                      display: inline-block;
                      width: 65px;
                      height: 30px;
                      cursor: pointer;
                      background: #38a7ff;
                      border-radius: 3px;
                      border: 1px solid #38a7ff;
                      outline: none;
                      color: #FFF;
                      z-index: 1000;
                      position: absolute;
                      bottom: 5px;
                      left: 5px;
                  `,
        );
        editBtn.addEventListener("click", editListener);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "حذف";
        deleteBtn.dataset.clasorExternalHash = docElement.dataset.clasorExternalHash || "";
        deleteBtn.setAttribute(
          "class",
          "btn clasor-tag-btn external-document-delete-btn",
        );
        deleteBtn.setAttribute(
          "style",
          `
                      display: inline-block;
                      width: 65px;
                      height: 30px;
                      cursor: pointer;
                      background: #ff4d89;
                      border-radius: 3px;
                      border: 1px solid #ff4d89;
                      outline: none;
                      color: #FFF;
                      z-index: 1000;
                      position: absolute;
                      bottom: 5px;
                      left: 75px;
                  `,
        );

        deleteBtn.addEventListener("click", deleteListener);

        docElement.append(editBtn);
        docElement.append(deleteBtn);
      }
    }
  }, 100);
};
