import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";

const inlineToolbarPlugin = createInlineToolbarPlugin({
  // Customize the list of buttons you want in the toolbar
  list: [
    { label: "FontSize", options: [10, 12, 14, 16, 18] },
    { label: "FontFamily", options: ["Arial", "Georgia", "Times New Roman"] },
    // Add other formatting buttons as needed
  ],
});
function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
    const data = new FormData(); // eslint-disable-line no-undef
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [text, setText] = useState(""); // New state to store the text
  console.log(text);

  const handleSaveText = () => {
    const currentContent = editorState.getCurrentContent();
    const plainText = currentContent.getPlainText(); // Get plain text
    console.log(currentContent);
    setText(plainText); // Update the text state
  };

  const onHandleKeyBindings = (e) => {
    if (e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example</header>
      <button onClick={handleSaveText}>Save Text</button>
      <Editor
        editorState={editorState}
        plugins={[inlineToolbarPlugin]}
        toolbarClassName="toolbarclassName="
        wrapperClassName="wrapperclassName="
        editorClassName="editorclassName="
        onEditorStateChange={setEditorState}
        onTab={onHandleKeyBindings}
        toolbar={{
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            alt: { present: true, mandatory: true },
          },
        }}
      />
    </div>
  );
};
export default TextEditor;
