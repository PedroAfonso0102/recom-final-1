import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

type ZodSchema<T> = z.ZodType<T>;

function setNestedError(target: Record<string, unknown>, path: (string | number)[], value: unknown) {
  if (path.length === 0) {
    Object.assign(target, value);
    return;
  }

  let current: Record<string, unknown> = target;

  path.forEach((segment, index) => {
    const key = String(segment);
    const isLast = index === path.length - 1;

    if (isLast) {
      current[key] = value;
      return;
    }

    const existing = current[key];
    if (typeof existing !== "object" || existing === null) {
      current[key] = {};
    }

    current = current[key] as Record<string, unknown>;
  });
}

export function safeZodResolver<TFieldValues extends FieldValues>(schema: ZodSchema<TFieldValues>): Resolver<TFieldValues> {
  return async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const errors: Record<string, unknown> = {};

    for (const issue of result.error.issues) {
      const path = (issue.path.length > 0 ? issue.path : ["root"]) as (string | number)[];
      setNestedError(errors, path, {
        type: issue.code,
        message: issue.message,
      });
    }

    return {
      values: {},
      errors: errors as FieldErrors<TFieldValues>,
    };
  };
}
