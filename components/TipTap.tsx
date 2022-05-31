import { useEditor, EditorContent, EditorContentProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";

interface TipTapProps {
  setText: (content: string) => void;
  allowBold?: boolean;
  allowBulletList?: boolean;
  defaultValue?: string;
}

type EditorContentPropsExtended = EditorContentProps & {
  allowBold: boolean;
  allowBulletList: boolean;
};

const MenuBar = ({
  editor,
  allowBold,
  allowBulletList,
}: EditorContentPropsExtended) => {
  if (!editor) {
    return null;
  }

  return (
    <MenuBarContainer>
      {allowBold && (
        <StyleButton
          type="button"
          onClick={(e) => {
            editor.chain().focus().toggleBold().run();
            e.preventDefault();
          }}
          isSelected={editor.isActive("bold")}
        >
          bold
        </StyleButton>
      )}

      {allowBulletList && (
        <StyleButton
          type="button"
          onClick={(e) => {
            editor.chain().focus().toggleBulletList().run();
            e.preventDefault();
          }}
          isSelected={editor.isActive("bulletList")}
        >
          bullet list
        </StyleButton>
      )}
    </MenuBarContainer>
  );
};

export default function TipTap({
  setText,
  allowBold = true,
  allowBulletList = true,
  defaultValue,
}: TipTapProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue,
    onUpdate({ editor }) {
      setText(editor.getHTML());
    },
  });

  return (
    <Container>
      <MenuBar
        editor={editor}
        allowBold={allowBold}
        allowBulletList={allowBulletList}
      />
      <StyledEditorContent
        data-testid="tip-tap"
        editor={editor}
        onClick={(e) => e.preventDefault()}
        type="text"
        onChange={(e) => e.preventDefault()}
      />
    </Container>
  );
}

interface StyleButton {
  isSelected: boolean;
}

const Container = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
`;

const MenuBarContainer = styled.div`
  margin-bottom: 8px;
`;

const StyleButton = styled.button<StyleButton>`
  background-color: ${(props) => (props.isSelected ? "black" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  margin-right: 10px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 2px 4px;
  transition: color, background-color 0.2s ease-in-out;
`;

const StyledEditorContent = styled(EditorContent)`
  background-color: var(--input);
`;
