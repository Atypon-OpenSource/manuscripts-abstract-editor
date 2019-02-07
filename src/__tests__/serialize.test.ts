import { schema } from '../schema'
import { serialize } from '../serialize'

describe('serialize', () => {
  test('serializes a simple abstract', () => {
    const input = schema.nodeFromJSON({
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

    const output = serialize(input)

    expect(output).toEqual(`<p>This is an abstract</p>`)
  })

  test('serializes an abstract with italicised text', () => {
    const input = schema.nodeFromJSON({
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

    const output = serialize(input)

    expect(output).toEqual(`<p>This is an <i>italicised</i> abstract</p>`)
  })
})
