# clasor-editor

This library was generated with [tsdx](https://github.com/formium/tsdx).
> **❗⚠️❗ Warning**: <br>
> You need to use react@17.0.1

## usage

`npm i clasor-editor --save`

1_ display a content (Next.js) in PREVIEW mode :

```
import ClasorEditor from "clasor-editor";
const App = (props) => {
  const { versionInfo } = props;
  return (
    <div>
      <h1>
       Your content
      </h1>
      <div>
        <ClasorEditor
          mode="PREVIEW"
          versionInfo={...versionInfo};
          handleError={handleError} // Optional function to handle requests errors
          backServer={'url'} // Clasor backend server
          podSpaceServer={'url'} // Podspace server
        />
      </div>
    </div>
  )
}
export const getServerSideProps = async(context) => {
  try {
      const result = await Axios.get('');
      return({
         props:{
          versionInfo:{
            content: string;
            outline: string;
          },
         },
     }); 
  } catch (error) {
      // handle error
  }
}
export default App
```

2_ get a public document by it's hash in GETBYHASH mode:

```
import ClasorEditor from "clasor-editor";
const App = () => {
  return (
      <>
        <ClasorEditor
          mode="GETBYHASH"
          publicHash={"hash"}
          backServer={'Backend_Url'} // Clasor backend server that will be using for getting inner documents
          handleError={handleError} // Optional function to handle requests errors
          podSpaceServer={'url'} // Podspace server
        />
      </>
  );
};
```
You can use default styles or customize it :

```



```
