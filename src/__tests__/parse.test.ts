/*!
 * © 2023 Atypon Systems LLC
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
import { parse } from '../parse'

describe('parser', () => {
  test('parses a simple abstract', () => {
    const input = `<p>This is an abstract</p>`

    const output = parse(input)

    expect(output.toJSON()).toEqual({
      content: [
        {
          content: [
            {
              text: 'This is an abstract',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
      ],
      type: 'abstract',
    })
  })

  test('parses a abstract with italicised text', () => {
    const input = `<p>This is an <i>italicised</i> abstract</p>`

    const output = parse(input)

    expect(output.toJSON()).toEqual({
      content: [
        {
          content: [
            {
              text: 'This is an ',
              type: 'text',
            },
            {
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'italicised',
              type: 'text',
            },
            {
              text: ' abstract',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
      ],
      type: 'abstract',
    })
  })
})
