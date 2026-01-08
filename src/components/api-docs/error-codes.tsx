import type { ErrorCode } from "./types";

interface ErrorCodesProps {
  errors: ErrorCode[];
}

export function ErrorCodes({ errors }: ErrorCodesProps) {
  return (
    <div className="border rounded-md">
      {errors.map((error) => (
        <div
          key={error.code}
          className="border-b border-border last:border-b-0 p-3"
        >
          <div>
            <div className="font-mono text-sm font-semibold text-red-600 whitespace-nowrap flex-1">
              {error.code}
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground my-2!">
                {error.description}
              </p>
              {error.details && (
                <p className="text-xs text-muted-foreground italic m-0!">
                  {error.details}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
