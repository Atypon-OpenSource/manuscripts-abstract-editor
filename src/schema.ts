/*!
 * © 2019 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Schema } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

export type Nodes = 'text' | 'abstract' | 'paragraph'
export type Marks =
  | 'bold'
  | 'italic'
  | 'smallcaps'
  | 'subscript'
  | 'superscript'
  | 'underline'

export type AbstractSchema = Schema<Nodes, Marks>

export const schema: AbstractSchema = new Schema<Nodes, Marks>({
  marks: {
    bold: {
      parseDOM: [
        {
          // Google Docs can produce content wrapped in <b style="fontWeight:normal">, which isn't actually bold. This workaround is copied from prosemirror-schema-basic.
          getAttrs: (dom) =>
            (dom as HTMLElement).style.fontWeight !== 'normal' && null,
          tag: 'b',
        },
        { tag: 'strong' },
        {
          // This regex, copied from prosemirror-schema-basic, matches all the possible "font-weight" values that can mean "bold".
          getAttrs: (value) =>
            /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null,
          style: 'font-weight',
        },
      ],
      toDOM: () => ['b'],
    },
    italic: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM() {
        return ['i']
      },
    },
    smallcaps: {
      parseDOM: [
        { style: 'font-variant=small-caps' },
        { style: 'font-variant-caps=small-caps' }, // TODO: all the other font-variant-caps options?
      ],
      toDOM: () => [
        'span',
        {
          style: 'font-variant:small-caps',
        },
      ],
    },
    subscript: {
      excludes: 'superscript',
      group: 'position',
      parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
      toDOM: () => ['sub'],
    },
    superscript: {
      excludes: 'subscript',
      group: 'position',
      parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
      toDOM: () => ['sup'],
    },
    underline: {
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
      toDOM: () => ['u'],
    },
  },
  nodes: {
    abstract: {
      content: 'paragraph*',
      marks: 'bold italic smallcaps subscript superscript underline',
      parseDOM: [{ tag: 'div' }],
      toDOM: () => ['div', 0],
    },
    paragraph: {
      content: 'text*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: (node) => ['p', 0],
    },
    text: {},
  },
  topNode: 'abstract',
})
