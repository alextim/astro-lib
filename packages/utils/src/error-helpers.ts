export function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}
