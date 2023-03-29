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

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React from 'react'

import { parse } from '../parse'
import { plugins } from '../plugins'
import { schema } from '../schema'
import { serialize } from '../serialize'
import { Abstract, AbstractProps } from './Abstract'

interface Props extends AbstractProps {
  handleChange?: (value: string) => void
  handleStateChange?: (view: EditorView, docChanged: boolean) => void
}

export class AbstractField extends Abstract<Props> {
  public constructor(props: Props) {
    super(props)

    this.editorRef = React.createRef()

    const attributes: { [name: string]: string } = {
      class: 'abstract-editor',
    }

    if ('tabIndex' in this.props) {
      attributes.tabindex = String(this.props.tabIndex)
    }

    this.view = new EditorView(null, {
      attributes,
      dispatchTransaction: (transaction) => {
        const { state, transactions } =
          this.view.state.applyTransaction(transaction)

        this.view.updateState(state)
        this.updateClassList()

        const docChanged = transactions.some((tr) => tr.docChanged)

        if (this.props.handleStateChange) {
          this.props.handleStateChange(this.view, docChanged)
        }

        // TODO: debounce this to reduce serialization
        if (this.props.handleChange && docChanged) {
          this.props.handleChange(serialize(state.doc))
        }
      },
      handleDOMEvents: {
        focus: (view) => {
          if (this.props.handleStateChange) {
            this.props.handleStateChange(view, false)
          }

          return false
        },
      },
      state: EditorState.create({
        doc: parse(props.value),
        plugins,
        schema,
      }),
    })
  }

  public componentDidMount() {
    if (this.editorRef.current) {
      this.editorRef.current.appendChild(this.view.dom)
    }

    this.updateClassList()

    if (this.props.autoFocus) {
      this.view.focus()
    }
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (!this.view.hasFocus()) {
      this.view.updateState(
        EditorState.create({
          doc: parse(nextProps.value),
          plugins: this.view.state.plugins,
          schema: this.view.state.schema,
        })
      )
      this.updateClassList()
    }
  }
}
