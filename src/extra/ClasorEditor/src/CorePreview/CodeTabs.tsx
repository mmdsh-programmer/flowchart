import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

declare interface IProps {
  languages: {
    title: string;
    code: string;
  }[];
  link: string | null;
}

const CodeTabs = (props: IProps) => {
  const { languages, link } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="clasor-code-container">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="clasor-code-link"
        >
          نمونه کد
        </a>
      ) : null}
      <div className="clasor-code-tab">
        {languages.map((lang, index) => (
          <div
            className={`clasor-code-item ${value === index ? 'active' : ''}`}
            key={index}
            onClick={() => handleChange(index)}
          >
            <span>{lang.title}</span>
          </div>
        ))}
      </div>
      <div className="clasor-code-content">
        <SyntaxHighlighter language={languages[value].title} style={dracula}>
          {languages[value].code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeTabs;
