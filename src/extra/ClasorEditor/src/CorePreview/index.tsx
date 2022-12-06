import React, { useEffect, useRef, useMemo, Fragment, useState } from 'react';
import Tree from './Tree';
import ReactHtmlParser from 'react-html-parser';
import CodeTabs from './CodeTabs';
import FileAttachment from './FileAttachment';
import { EChart, EFlowType } from '../Enum';
import { getValue } from '../Store';
import { IOutline } from '../Interface';
import { IsJsonString } from '../Helper/Utils';
import FlowChartPreview from './FlowChartPreview';
import ReactDOM from 'react-dom';
import ChartJs from './ChartJs';

let timeOut: number;

const CorePreview = () => {
  const finalContentRef = useRef<boolean>(false);
  const content = getValue('content');

  const [shrink, setShrink] = useState<string[]>([]);

  const [activeId, setActiveLink] = useState('');

  const getFileAttachments = () => {
    const attachedFileInfo =
      document.getElementsByClassName('clasor-attach-file');
    if (attachedFileInfo && attachedFileInfo.length) {
      for (let i = 0; i < attachedFileInfo.length; ++i) {
        const attachedFile = attachedFileInfo[i];
        if (attachedFile) {
          attachedFile.setAttribute('style', '');
          const fileHash = attachedFile.getAttribute('data-clasor-hash');
          const fileName = attachedFile.getAttribute('data-name');
          const fileExtension = attachedFile.getAttribute('data-extension');
          if (fileHash && fileName && fileExtension && window) {
            ReactDOM.render(
              <FileAttachment
                fileName={fileName}
                fileHash={fileHash}
                fileExtension={fileExtension}
              />,
              attachedFile
            );
          }
        }
      }
    }
  };

  const getCodeSnippets = () => {
    const codeSnippet = document.getElementsByClassName('clasor-code-snippet');
    if (codeSnippet && codeSnippet.length) {
      for (let i = 0; i < codeSnippet.length; ++i) {
        const docElement = codeSnippet[i];
        if (docElement) {
          docElement.setAttribute('style', '');
          let codeContent = docElement.getAttribute('data-code');
          if (codeContent && IsJsonString(codeContent) && window) {
            codeContent = codeContent.replace(/<-h/g, '<h');
            const jsonLanguages = JSON.parse(codeContent);
            const link = docElement.getAttribute('data-link');
            ReactDOM.render(
              <CodeTabs languages={jsonLanguages} link={link} />,
              docElement
            );
            docElement.setAttribute('data-code', '');
          }
        }
      }
    }
  };

  const getFlowCharts = () => {
    const flowChartArray = document.getElementsByClassName('clasor-flowchart');
    if (flowChartArray?.length) {
      for (let i = 0; i < flowChartArray.length; ++i) {
        const element = flowChartArray[i];
        if (element) {
          const data = element.getAttribute('data-flow');
          const flowType = element.getAttribute('data-type') as EFlowType;
          const uId = element.getAttribute('data-hash');
          element.setAttribute('style', '');
          element.setAttribute('data-flow', '');
          if (data && window) {
            ReactDOM.render(
              <FlowChartPreview
                uId={uId || `${i}`}
                data={data}
                type={flowType}
              />,
              element
            );
          }
        }
      }
    }
  };

  const getCharts = () => {
    const chartJsElements = document.getElementsByClassName('chartjs');
    if (chartJsElements && chartJsElements.length) {
      for (let i = 0; i < chartJsElements.length; ++i) {
        const element = chartJsElements[i];
        if (element) {
          element.setAttribute('style', '');
          const chartData = element.getAttribute('data-chart') as EChart;
          const chartHeight = element.getAttribute('data-chart-height');
          const chartValue = element.getAttribute('data-chart-value');
          if (chartData && chartHeight && chartValue && window) {
            ReactDOM.render(
              <ChartJs
                type={chartData}
                height={parseInt(chartHeight)}
                data={JSON.parse(chartValue)}
              />,
              element
            );
          }
        }
      }
    }
  };

  const getContent = () => {
    const rawContent = content as string;
    let standardContent: string;
    standardContent = rawContent
      .replace(/[\n\r]/g, '')
      .replace(/<span><\/span>/g, '<br/>');
    return standardContent;
  };

  const handleShrink = (key: string) => {
    if (shrink.includes(key)) {
      setShrink(shrink.filter((item) => item !== key));
    } else {
      setShrink([...shrink, key]);
    }
  };

  const memoizedContent = useMemo(() => getContent(), [content]);

  useEffect(() => {
    clearTimeout(timeOut);
    getCodeSnippets();
    getFlowCharts();
    getCharts();
    getFileAttachments();
    finalContentRef.current = true;
    return () => {
      clearTimeout(timeOut);
    };
  }, [memoizedContent]);

  const outline = JSON.parse(getValue('outline') as string) as
    | {
        [index: string]: IOutline[];
      }
    | IOutline[];

  return (
    <div className="clasor-preview-wrapper">
      <div className="clasor-preview-container">
        <div className="clasor-outline">
          <label className="outline-label">نمای کلی</label>
          <div className="scrollable-outline">
            {outline.constructor === Array ? (
              <Tree
                activeId={activeId}
                setActiveLink={setActiveLink}
                list={outline}
              />
            ) : outline.constructor === Object ? (
              Object.keys(outline).map((key) => {
                const list = (
                  outline as {
                    [index: string]: IOutline[];
                  }
                )[key] as IOutline[];
                return (
                  <Fragment key={key}>
                    <label
                      className="clasor-tree-label"
                      onClick={() => handleShrink(key)}
                    >
                      {key === 'root' ? 'نمای اصلی' : key}
                    </label>
                    <Tree
                      activeId={activeId}
                      setActiveLink={setActiveLink}
                      list={list}
                      shrink={shrink.includes(key)}
                    />
                  </Fragment>
                );
              })
            ) : null}
          </div>
        </div>
        <div className="clasor-preview-content">
          {ReactHtmlParser(memoizedContent)}
        </div>
      </div>
      <div className="clasor-version">Clasor npm package version 3.0.17</div>
    </div>
  );
};

export default CorePreview;
