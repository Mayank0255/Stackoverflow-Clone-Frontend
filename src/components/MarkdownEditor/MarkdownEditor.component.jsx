import React, {useState, forwardRef, useImperativeHandle} from 'react';
import RichTextEditor from 'react-rte';

import './MarkdownEditor.styles.scss';

const MarkdownEditor = forwardRef((props, ref) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  useImperativeHandle(ref, () => ({
    cleanEditorState() {
      setValue(RichTextEditor.createEmptyValue());
    },
  }));

  const onChange = (newValue) => {
    setValue(newValue);
    if (props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      props.onChange(newValue.toString('html'));
    }
  };

  // The toolbarConfig object allows you to specify custom buttons, reorder buttons and to add custom css classes.
  // Supported inline styles: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Inline-Styles.md
  // Supported block types: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Custom-Block-Render.md#draft-default-block-render-map
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: [
      'INLINE_STYLE_BUTTONS',
      'BLOCK_TYPE_BUTTONS',
      'LINK_BUTTONS',
      // 'BLOCK_TYPE_DROPDOWN',
      // 'HISTORY_BUTTONS',
    ],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'button-format'},
      {label: 'Italic', style: 'ITALIC', className: 'button-format'},
      {label: 'Underline', style: 'UNDERLINE', className: 'button-format'},
      // {label: 'Monospace', style: 'CODE', className: 'button-format'},
    ],
    // BLOCK_TYPE_DROPDOWN: [
    //   {label: 'Normal', style: 'unstyled'},
    //   {label: 'Heading Large', style: 'header-one'},
    //   {label: 'Heading Medium', style: 'header-two'},
    //   {label: 'Heading Small', style: 'header-three'},
    // ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item', className: 'button-format'},
      {label: 'OL', style: 'ordered-list-item', className: 'button-format'},
      {label: 'Blockquote', style: 'blockquote', className: 'button-format'},
      {
        label: 'Code Block',
        style: 'code-block',
        className: 'button-format code-block',
      },
    ],
  };
  return (
    <RichTextEditor
      className='rich-text-editor-root'
      toolbarClassName='rich-text-editor-toolbar'
      editorClassName='rich-text-editor-editor'
      toolbarConfig={toolbarConfig}
      value={value}
      onChange={onChange}
    />
  );
});

export default MarkdownEditor;
