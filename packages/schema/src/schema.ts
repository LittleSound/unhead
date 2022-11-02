import type { DataKeys, DefinedValueOrEmptyObject, Merge, MergeHead, Stringable, Base as _Base, BodyAttributes as _BodyAttributes, HtmlAttributes as _HtmlAttributes, Link as _Link, Meta as _Meta, Noscript as _Noscript, Script as _Script, Style as _Style } from '@zhead/schema'
import type { InnerContent, ResolvesDuplicates, TagPosition, TagPriority, TagUserProperties } from './tags'

export type Never<T> = {
  [P in keyof T]?: never
}

export type UserTagConfigWithoutInnerContent = TagPriority & TagPosition & ResolvesDuplicates & Never<InnerContent>
export type UserAttributesConfig = ResolvesDuplicates & Never<InnerContent & TagPriority & TagPosition>

export interface SchemaAugmentations extends MergeHead {
  base: UserAttributesConfig
  htmlAttrs: UserAttributesConfig
  bodyAttrs: UserAttributesConfig
  link: UserTagConfigWithoutInnerContent
  meta: UserTagConfigWithoutInnerContent
  style: TagUserProperties
  script: TagUserProperties
  noscript: TagUserProperties
}

type MaybeArray<T> = T | T[]

interface BaseMeta extends Omit<_Meta, 'content'> {
  /**
   * This attribute contains the value for the http-equiv, name or property attribute, depending on which is used.
   *
   * You can provide an array of values to create multiple tags sharing the same name, property or http-equiv.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content
   */
  content?: MaybeArray<Stringable>
}

export type EntryAugmentation = undefined | Record<string, any>

export type Title = string
export type TitleTemplate = string | null | ((title?: string) => string)
export type Base<E extends EntryAugmentation = {}> = Partial<Merge<SchemaAugmentations['base'], _Base>> & DefinedValueOrEmptyObject<E>
export type Link<E extends EntryAugmentation = {}> = _Link & DataKeys & SchemaAugmentations['link'] & DefinedValueOrEmptyObject<E>
export type Meta<E extends EntryAugmentation = {}> = BaseMeta & DataKeys & SchemaAugmentations['meta'] & DefinedValueOrEmptyObject<E>
export type Style<E extends EntryAugmentation = {}> = _Style & DataKeys & SchemaAugmentations['style'] & DefinedValueOrEmptyObject<E>
export type Script<E extends EntryAugmentation = {}> = _Script & DataKeys & SchemaAugmentations['script'] & DefinedValueOrEmptyObject<E>
export type Noscript<E extends EntryAugmentation = {}> = _Noscript & DataKeys & SchemaAugmentations['noscript'] & DefinedValueOrEmptyObject<E>
export type HtmlAttributes<E extends EntryAugmentation = {}> = _HtmlAttributes & DataKeys & SchemaAugmentations['htmlAttrs'] & DefinedValueOrEmptyObject<E>
export type BodyAttributes<E extends EntryAugmentation = {}> = _BodyAttributes & DataKeys & SchemaAugmentations['bodyAttrs'] & DefinedValueOrEmptyObject<E>

export interface Head<E extends MergeHead = SchemaAugmentations> {
  /**
   * The <title> HTML element defines the document's title that is shown in a browser's title bar or a page's tab.
   * It only contains text; tags within the element are ignored.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
   */
  title?: Title
  /**
   * Generate the title from a template.
   *
   * Should include a `%s` placeholder for the title, for example `%s - My Site`.
   */
  titleTemplate?: TitleTemplate
  /**
   * The <base> HTML element specifies the base URL to use for all relative URLs in a document.
   * There can be only one <base> element in a document.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
   */
  base?: Base<E['base']>
  /**
   * The <link> HTML element specifies relationships between the current document and an external resource.
   * This element is most commonly used to link to stylesheets, but is also used to establish site icons
   * (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-as
   */
  link?: Link<E['link']>[]
  /**
   * The <meta> element represents metadata that cannot be expressed in other HTML elements, like <link> or <script>.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   */
  meta?: Meta<E['meta']>[]
  /**
   * The <style> HTML element contains style information for a document, or part of a document.
   * It contains CSS, which is applied to the contents of the document containing the <style> element.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
   */
  style?: Style<E['style']>[]
  /**
   * The <script> HTML element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
   */
  script?: Script<E['script']>[]
  /**
   * The <noscript> HTML element defines a section of HTML to be inserted if a script type on the page is unsupported
   * or if scripting is currently turned off in the browser.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
   */
  noscript?: Noscript<E['noscript']>[]
  /**
   * Attributes for the <html> HTML element.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html
   */
  htmlAttrs?: HtmlAttributes<E['htmlAttrs']>
  /**
   * Attributes for the <body> HTML element.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body
   */
  bodyAttrs?: BodyAttributes<E['bodyAttrs']>
}

export { MergeHead } from '@zhead/schema'
