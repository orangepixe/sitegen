
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Enter text...',
  className,
  id,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow common formatting shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold');
          handleInput();
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic');
          handleInput();
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline');
          handleInput();
          break;
      }
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className={cn("border border-input rounded-md", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-input bg-muted/50">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="px-2 py-1 text-sm border rounded hover:bg-muted"
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="px-2 py-1 text-sm border rounded hover:bg-muted"
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => formatText('underline')}
          className="px-2 py-1 text-sm border rounded hover:bg-muted"
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() => formatText('formatBlock', 'h2')}
          className="px-2 py-1 text-sm border rounded hover:bg-muted"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => formatText('formatBlock', 'h3')}
          className="px-2 py-1 text-sm border rounded hover:bg-muted"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => formatText('formatBlock', 'p')}
          className="px-2 py-1 text-sm border rounded hover:bg-muted"
          title="Paragraph"
        >
          P
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          type="button"
          onClick={() => formatText('insertUnorderedList')}
          className="px-2 py-1 text-sm border rounded hover:bg-muted"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => formatText('insertOrderedList')}
          className="px-2 py-1 text-sm border rounded hover:bg-muted"
          title="Numbered List"
        >
          1. List
        </button>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={cn(
          "min-h-[200px] p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "prose prose-sm max-w-none [&_*]:my-1",
          // Placeholder styling using CSS classes
          "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:italic"
        )}
        style={{ 
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
        id={id}
      />
    </div>
  );
};

export { RichTextEditor };
