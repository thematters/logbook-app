import { ImageExtension, ImageAttributes } from "remirror/extensions";
import { InputRule, wrappingInputRule } from "@remirror/pm/inputrules";
import type { PasteRule } from "@remirror/pm/paste-rules";
import type {
  ApplySchemaAttributes,
  // Handler,
  // InputRule,
  NodeSpecOverride,
  NodeExtensionSpec,
} from "@remirror/core-types";

export class FigcaptionExtension extends ImageExtension {
  createNodeSpec(
    extra: ApplySchemaAttributes,
    override: NodeSpecOverride
  ): NodeExtensionSpec {
    const spec = super.createNodeSpec(extra, override);
    // console.log("image spec:", spec);

    return {
      ...spec,
      attrs: {
        ...spec.attrs,
        figcaptionText: { default: spec.attrs?.alt || "" },
      },
      toDOM: (node) => [
        "figure",
        {
          style:
            "border: 1px solid var(--color-grey-lighter); padding: 8px; margin: 8px; text-align: center;",
        },
        spec.toDOM!(node),
        [
          "figcaption",
          // { style: 'background-color: #3d3d3d; color: #f1f1f1; padding: 8px;' },
          node.attrs.figcaptionText || spec.attrs?.alt || "untitled",
        ],
      ],
    };
  }

  createInputRules(): InputRule[] {
    // const regexp = new RegExp(String.raw`\s*\!\[(.*)\]\((https?://.*)\)`);
    const regexp = /(?:^|\s+)\!\[(.*)\]\((https?:\/\/.*)\)(?:$|\s+)/;
    // console.log("createInputRules:", regexp);

    return [
      // wrappingInputRule(regexp, this.type),
      new InputRule(regexp, (state, _match, start, end) => {
        // const { from, to } = getTextSelection(selection ?? tr.selection, tr.doc);
        const [, title, src] = _match;
        const node = this.type.create({
          title,
          src,
        } as ImageAttributes);
        // console.log("inputrule:", regexp, state, _match, start, end);

        const tr = state.tr;
        tr.replaceRangeWith(start, end, node);

        return tr;
      }),
    ];
  }

  createPasteRules(): PasteRule[] {
    return [
      {
        type: "node",
        nodeType: this.type,
        regexp: /(?:^|\s+)\!\[(.*)\]\((https?:\/\/.*)\)(?:$|\s+)/,
        startOfTextBlock: true,
      },
    ];
  }
}
