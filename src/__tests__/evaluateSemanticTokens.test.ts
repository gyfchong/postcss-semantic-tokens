import { expect, it, beforeEach } from "vitest";
import postcss from "postcss";

import plugin from "../evaluateSemanticTokens";

declare module "vitest" {
  export interface TestContext {
    options?: {};
    input?: string;
  }
}

interface LocalTestContext {
  options?: {};
  input?: string;
}

beforeEach<LocalTestContext>(async (context) => {
  context.input = "{ box-shadow: 1px 1px 1px colour(interactive); }";
});

it("gets correct interactive colour", async ({ options, input }) => {
  let result = await postcss([plugin(options)]).process(input, {
    from: undefined,
  });

  expect(result.css).toEqual("{box-shadow: 1px 1px 1px #8b5cf6;}");
  expect(result.warnings()).toHaveLength(0);
});
