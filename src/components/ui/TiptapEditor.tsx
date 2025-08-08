'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import './TipTapEditor.css'

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ value, onChange, placeholder }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[350px] p-4',
      },
      handleKeyDown: (view, event) => {
        // Prevent Enter key from bubbling up to form and triggering submission
        if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
          // Let TipTap handle the Enter key normally (create new line/paragraph)
          return false;
        }
        return false;
      },
    },
    immediatelyRender:false
    
  });

  // Update editor content when value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Set placeholder
  useEffect(() => {
    if (editor && placeholder) {
      editor.view.dom.setAttribute('data-placeholder', placeholder);
    }
  }, [editor, placeholder]);

  if (!editor) {
    return (
      <div className="h-96 bg-white rounded-lg flex items-center justify-center border border-gray-300">
        <div className="animate-pulse text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-700 bg-[#282c34] px-3 py-1 flex flex-wrap gap-1">
        <div className='border-r border-gray-700 px-2'>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Bold"
          >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Italic"
          >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`p-2 rounded ${editor.isActive('strike') ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Strikethrough"
          >
          <span className="line-through">S</span>
        </button>
          </div>
        {/* <div className="border-l border-gray-300 mx-1 h-6 self-center"></div> */}
        <div className='border-r border-gray-700 px-2'>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Heading 1"
          >
          H1
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Heading 2"
          >
          H2
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Heading 3"
          >
          H3
        </button>
          </div>
        {/* <div className="border-l border-gray-300 mx-1 h-6 self-center"></div> */}
        <div className='border-r border-gray-700 px-2'>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Bullet List"
          >
          • List
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Ordered List"
          >
          1. List
        </button>
        </div>
        {/* <div className="border-l border-gray-300 mx-1 h-6 self-center"></div> */}
        <div className='border-r border-gray-700 px-2'>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Blockquote"
          >
          ❝
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-[#111418]' : 'hover:bg-[#101010]'}`}
          title="Code Block"
          >
          {'</>'}
        </button>
          </div>
      </div>
      
      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="min-h-[400px] bg-transparent"
        style={{ minHeight: '400px' }}
      />
      
      <style jsx global>{`
        .tiptap:focus {
          outline: none;
        }
        
        .tiptap p {
          margin: 0.5rem 0;
        }
        
        .tiptap h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        .tiptap h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        .tiptap h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        .tiptap ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .tiptap blockquote {
          border-left: 3px solid #d1d5db;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #6b7280;
        }
        
        .tiptap pre {
          background-color: #24262a !important;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .tiptap code {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }
        
        .tiptap :first-child {
          margin-top: 0;
        }
        
        .tiptap :last-child {
          margin-bottom: 0;
        }
        
        .tiptap [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #000;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}