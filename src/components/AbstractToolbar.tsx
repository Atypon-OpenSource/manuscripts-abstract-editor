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
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React from 'react'
import styled from 'styled-components'

import { AbstractSchema } from '../schema'
import { toolbar } from '../toolbar'

const ToolbarItem = styled.div`
  display: inline-flex;
  position: relative;
`

const ToolbarButton = styled.button.attrs({
  type: 'button',
})<{
  'data-active'?: boolean
}>`
  background-color: ${(props) => (props['data-active'] ? '#eee' : '#fff')};
  border: 1px solid #d6d6d6;
  cursor: pointer;
  padding: 2px 12px;
  display: inline-flex;
  align-items: center;
  transition: 0.2s all;

  &:hover {
    background: ${(props) => (props['data-active'] ? '#eee' : '#f6f6f6')};
    z-index: 2;
  }

  &:active {
    background: #ddd;
  }

  &:disabled {
    opacity: 0.2;
  }
`

export const ToolbarContainer = styled.div`
  margin: 6px;
  display: flex;
  flex-wrap: wrap;
`

export const ToolbarGroup = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  white-space: nowrap;

  & ${ToolbarItem} button {
    margin-right: 0;
  }

  & ${ToolbarItem}:not(:first-of-type) button {
    margin-left: -1px;
  }

  & ${ToolbarItem}:first-of-type button {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  & ${ToolbarItem}:last-of-type button {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

interface ToolbarButtonConfig {
  title: string
  content: React.ReactNode
  active?: (state: EditorState) => boolean
  run: (state: EditorState, dispatch: (tr: Transaction) => void) => void
  enable?: (state: EditorState) => boolean
}

export interface ToolbarConfig {
  [key: string]: {
    [key: string]: ToolbarButtonConfig
  }
}

interface Props<S extends Schema> {
  view: EditorView
}

const Toolbar =
  <S extends Schema>(): React.FunctionComponent<Props<S>> =>
  ({ view }) =>
    (
      <ToolbarContainer>
        {Object.entries(toolbar).map(([groupKey, toolbarGroup]) => (
          <ToolbarGroup key={groupKey}>
            {Object.entries(toolbarGroup).map(([itemKey, item]) => (
              <ToolbarItem key={itemKey}>
                <ToolbarButton
                  title={item.title}
                  data-active={item.active && item.active(view.state)}
                  disabled={item.enable && !item.enable(view.state)}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    item.run(view.state, view.dispatch)
                  }}
                >
                  {item.content}
                </ToolbarButton>
              </ToolbarItem>
            ))}
          </ToolbarGroup>
        ))}
      </ToolbarContainer>
    )

export const AbstractToolbar = Toolbar<AbstractSchema>()
