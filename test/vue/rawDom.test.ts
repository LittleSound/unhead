import { describe, it } from 'vitest'
import { ref } from 'vue'
import { createHead, useHead } from '@unhead/vue'
import { renderDOMHead } from '@unhead/dom'
import { basicSchema, useDom } from '../fixtures'

describe('vue dom', () => {
  test('titleTemplate', async () => {
    const dom = useDom()

    const head = createHead()

    useHead({
      title: 'test',
      titleTemplate: '%s | template',
    })

    await renderDOMHead(head, { document: dom.window.document })

    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html><head>

      <title>test | template</title></head>
      <body>

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)
  })
  it('basic', async () => {
    const head = createHead()

    const lang = ref('de')

    useHead(basicSchema)

    useHead({
      htmlAttrs: {
        lang: lang.value,
      },
    })

    const dom = useDom()

    await renderDOMHead(head, { document: dom.window.document })

    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html lang=\\"de\\" dir=\\"ltr\\"><head>

      <meta charset=\\"utf-8\\" data-h-207e30=\\"\\"><script src=\\"https://cdn.example.com/script.js\\" data-h-513614=\\"\\"></script><link rel=\\"icon\\" type=\\"image/x-icon\\" href=\\"https://cdn.example.com/favicon.ico\\" data-h-4a272f=\\"\\"></head>
      <body class=\\"dark\\">

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)
  })

  it('update', async () => {
    const head = createHead()

    const lang = ref('de')

    useHead(basicSchema)

    const pageSchema = head.push({
      htmlAttrs: {
        'class': 'pre-update',
        'lang': lang.value,
        'data-something-to-remove': 'test',
      },
    })

    const dom = useDom()

    await renderDOMHead(head, { document: dom.window.document })

    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html lang=\\"de\\" dir=\\"ltr\\" class=\\"pre-update\\" data-something-to-remove=\\"test\\"><head>

      <meta charset=\\"utf-8\\" data-h-207e30=\\"\\"><script src=\\"https://cdn.example.com/script.js\\" data-h-513614=\\"\\"></script><link rel=\\"icon\\" type=\\"image/x-icon\\" href=\\"https://cdn.example.com/favicon.ico\\" data-h-4a272f=\\"\\"></head>
      <body class=\\"dark\\">

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)

    lang.value = 'en'

    pageSchema.patch({
      htmlAttrs: {
        class: 'post-update',
        lang: lang.value,
      },
      bodyAttrs: {
        class: 'test',
      },
    })

    await renderDOMHead(head, { document: dom.window.document })
    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html lang=\\"en\\" dir=\\"ltr\\" class=\\"post-update\\"><head>

      <meta charset=\\"utf-8\\" data-h-207e30=\\"\\"><script src=\\"https://cdn.example.com/script.js\\" data-h-513614=\\"\\"></script><link rel=\\"icon\\" type=\\"image/x-icon\\" href=\\"https://cdn.example.com/favicon.ico\\" data-h-4a272f=\\"\\"></head>
      <body class=\\"dark test\\">

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)
  })

  it('dispose', async () => {
    const head = createHead()

    const entry = head.push(basicSchema)

    const dom = useDom()

    await renderDOMHead(head, { document: dom.window.document })

    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html lang=\\"en\\" dir=\\"ltr\\"><head>

      <meta charset=\\"utf-8\\" data-h-207e30=\\"\\"><script src=\\"https://cdn.example.com/script.js\\" data-h-513614=\\"\\"></script><link rel=\\"icon\\" type=\\"image/x-icon\\" href=\\"https://cdn.example.com/favicon.ico\\" data-h-4a272f=\\"\\"></head>
      <body class=\\"dark\\">

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)

    entry.dispose()

    expect(head.headEntries()).toMatchInlineSnapshot('[]')

    await renderDOMHead(head, { document: dom.window.document })
    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html><head>

      </head>
      <body class=\\"\\">

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)
  })

  it('update + dispose', async () => {
    const head = createHead()

    const entry = head.push(basicSchema)

    const dom = useDom()

    await renderDOMHead(head, { document: dom.window.document })

    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html lang=\\"en\\" dir=\\"ltr\\"><head>

      <meta charset=\\"utf-8\\" data-h-207e30=\\"\\"><script src=\\"https://cdn.example.com/script.js\\" data-h-513614=\\"\\"></script><link rel=\\"icon\\" type=\\"image/x-icon\\" href=\\"https://cdn.example.com/favicon.ico\\" data-h-4a272f=\\"\\"></head>
      <body class=\\"dark\\">

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)

    entry.patch({
      htmlAttrs: {
        lang: 'de',
        dir: 'rtl',
      },
      bodyAttrs: {
        class: ['test'],
      },
      script: [
        {
          children: 'console.log(\'hello\')',
          tagPosition: 'bodyClose',
        },
      ],
    })

    await renderDOMHead(head, { document: dom.window.document })
    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html lang=\\"de\\" dir=\\"rtl\\"><head>

      </head>
      <body class=\\"test\\">

      <div>
      <h1>hello world</h1>
      </div>



      <script data-h-d36dac=\\"\\">console.log('hello')</script></body></html>"
    `)

    entry.dispose()

    await renderDOMHead(head, { document: dom.window.document })
    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html><head>

      </head>
      <body class=\\"\\">

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)
  })

  it('update innerHtml', async () => {
    const head = createHead()

    const entry = head.push({
      script: [
        {
          children: 'console.log(\'hello\')',
        },
      ],
    })

    const dom = useDom()

    await renderDOMHead(head, { document: dom.window.document })

    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html><head>

      <script data-h-d36dac=\\"\\">console.log('hello')</script></head>
      <body>

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)

    entry.patch({
      script: [
        {
          children: 'console.log(\'hello world\')',
        },
      ],
    })

    await renderDOMHead(head, { document: dom.window.document })
    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html><head>

      <script data-h-2e1bca=\\"\\">console.log('hello world')</script></head>
      <body>

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)

    entry.dispose()

    await renderDOMHead(head, { document: dom.window.document })
    expect(dom.serialize()).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html><head>

      </head>
      <body>

      <div>
      <h1>hello world</h1>
      </div>



      </body></html>"
    `)
  })
})
