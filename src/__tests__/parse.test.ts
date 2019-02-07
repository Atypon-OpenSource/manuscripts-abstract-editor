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
