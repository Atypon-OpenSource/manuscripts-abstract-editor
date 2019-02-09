import { toggleMark } from 'prosemirror-commands'
import { MarkType } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { ToolbarConfig } from './components/AbstractToolbar'
import icons from './icons'
import { AbstractSchema, schema } from './schema'

const markActive = (type: MarkType) => (
  state: EditorState<AbstractSchema>
): boolean => {
  const { from, $from, to, empty } = state.selection

  return empty
    ? Boolean(type.isInSet(state.storedMarks || $from.marks()))
    : state.doc.rangeHasMark(from, to, type)
}

export const toolbar: ToolbarConfig<AbstractSchema> = {
  style: {
    bold: {
      title: 'Toggle bold',
      content: icons.bold,
      active: markActive(schema.marks.bold),
      enable: toggleMark(schema.marks.bold),
      run: toggleMark(schema.marks.bold),
    },
    italic: {
      title: 'Toggle italic',
      content: icons.italic,
      active: markActive(schema.marks.italic),
      enable: toggleMark(schema.marks.italic),
      run: toggleMark(schema.marks.italic),
    },
    underline: {
      title: 'Toggle underline',
      content: icons.underline,
      active: markActive(schema.marks.underline),
      enable: toggleMark(schema.marks.underline),
      run: toggleMark(schema.marks.underline),
    },
  },
  vertical: {
    subscript: {
      title: 'Toggle subscript',
      content: icons.subscript,
      active: markActive(schema.marks.subscript),
      enable: toggleMark(schema.marks.subscript),
      run: toggleMark(schema.marks.subscript),
    },
    superscript: {
      title: 'Toggle superscript',
      content: icons.superscript,
      active: markActive(schema.marks.superscript),
      enable: toggleMark(schema.marks.superscript),
      run: toggleMark(schema.marks.superscript),
    },
  },
}
