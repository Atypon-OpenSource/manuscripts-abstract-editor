import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { schema } from './schema'

export const plugins = [
  history(),
  keymap({
    ...baseKeymap,
    'Mod-b': toggleMark(schema.marks.bold),
    'Mod-i': toggleMark(schema.marks.italic),
    'Mod-u': toggleMark(schema.marks.underline),
    'Mod-y': redo,
    'Mod-z': undo,
  }),
]
