import React, { PureComponent } from 'react';
// import { PDFDocumentProxy } from 'pdfjs-dist';
import { pdfjs, Document, Page, PDFPageProxy } from 'react-pdf';
import { toPersinaDigit } from '../Helper/Utils';
import { getErrorHandler } from '../Store';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

declare interface IState {
  numPages: number;
  pageNumber: string;
  pageWidth: number;
  pageHeight: number;
}

declare interface IProps {
  pdfSource: string;
  handleCloseDialog: () => void;
}

declare interface IDocumentProps {
  externalLinkTarget?: '_self' | '_blank' | '_parent' | '_top';
  file: string;
  options: unknown;
  error: string;
  loading: string;
}

declare interface IPageProps {
  className: string;
  onClick: ((event: React.MouseEvent, page: PDFPageProxy) => void) | undefined;
  onRenderSuccess: () => null;
  renderAnnotationLayer: boolean;
  renderInteractiveForms: boolean;
  renderMode: 'canvas' | 'svg' | 'none';
  renderTextLayer: boolean;
  width: number;
  height: number;
  loading: string;
  error: string;
}

export default class PdfReader extends PureComponent<IProps, IState> {
  state: IState = {
    numPages: 0,
    pageNumber: '0',
    pageWidth: 0,
    pageHeight: 0,
  };

  onDocumentLoadError = (error: Error) => {
    const handleError = getErrorHandler();
    handleError(error);
  };

  onDocumentLoadSuccess = (document: { numPages: number }) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: '1',
    });
  };

  onPageRenderSuccess = () => null /* console.log('Rendered a page', page) */;

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  onItemClick = ({ pageNumber }: { pageNumber: string }) =>
    this.setState({ pageNumber });

  changePage = (offset: number) =>
    this.setState((prevState: IState) => ({
      pageNumber: `${(+prevState.pageNumber || 1) + offset}`,
    }));

  pageProps: IPageProps = {
    className: 'custom-classname-page',
    onClick: () => {} /* console.log('Clicked a page', { event, page }) */,
    onRenderSuccess: this.onPageRenderSuccess,
    renderAnnotationLayer: true,
    renderInteractiveForms: false,
    renderMode: 'canvas',
    renderTextLayer: false,
    width: this.state.pageWidth || 1240,
    height: this.state.pageHeight || 874,
    loading: 'در حال بارگیری سند ...',
    error: 'در دانلود سند از سرور مشکلی بوجود آمد ',
  };

  render() {
    const { numPages, pageNumber } = this.state;
    const { pageProps } = this;
    const { pdfSource, handleCloseDialog } = this.props;

    const documentProps: IDocumentProps = {
      externalLinkTarget: '_blank',
      file: pdfSource,
      options,
      error: 'در دانلود سند از سرور مشکلی بوجود آمد ',
      loading: 'در حال بارگیری سند ...',
    };
    return (
      <div>
        <button onClick={handleCloseDialog} className="clasor-close-btn">
          <svg
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{
              width: '25px',
              height: '25px',
              fill: 'red',
            }}
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
        <div className="pdf-reader">
          <div className="pdf-container">
            <div className="pdf">
              <div className="pdf-wrapper">
                <div className="pdf-wrapper__container">
                  <main className="pdf-wrapper__container__content">
                    <Document
                      {...documentProps}
                      className="custom-classname-document"
                      onItemClick={this.onItemClick}
                      onLoadError={this.onDocumentLoadError}
                      // onLoadProgress={this.onDocumentLoadProgress}
                      onLoadSuccess={this.onDocumentLoadSuccess}
                      onSourceError={this.onDocumentLoadError}
                    >
                      <div className="pdf-wrapper__container__content__document">
                        <Page {...pageProps} pageNumber={+pageNumber || 1} />
                      </div>
                      {
                        <div className="pdf-wrapper__container__content__controls">
                          <button
                            disabled={+pageNumber >= numPages}
                            onClick={this.nextPage}
                            type="button"
                            className="bp3-button bp3-minimal bp3-icon-chevron-left"
                          >
                            <svg
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"></path>
                            </svg>
                          </button>
                          <span>
                            {`صفحه  
                          ${
                            toPersinaDigit(String(pageNumber)) ||
                            (numPages ? 1 : '--')
                          }
                            از  
                          ${toPersinaDigit(String(numPages)) || '--'}`}
                          </span>
                          <button
                            disabled={+pageNumber <= 1}
                            onClick={this.previousPage}
                            type="button"
                            className="bp3-button bp3-minimal bp3-icon-chevron-right"
                          >
                            <svg
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
                            </svg>
                          </button>
                        </div>
                      }
                    </Document>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
