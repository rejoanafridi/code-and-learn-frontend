/* eslint-disable no-unused-vars */
/**
 * This is a placeholder for an unused variable to avoid ESLint warnings
 * Use this when you need to silence ESLint warnings for unused variables
 * that are necessary in the code structure (like when destructuring)
 *
 * @example
 * // Instead of:
 * const { watch, setValue, errors } = methods; // errors is unused
 *
 * // Use:
 * const { watch, setValue, errors } = methods;
 * noop(errors);
 */
export const noop = (...args) => {
    // Do nothing - just silence ESLint warnings
}

/**
 * A ignore handler for try/catch blocks to properly handle errors while
 * avoiding ESLint warnings for unused error variables
 *
 * @example
 * // Instead of:
 * try {
 *   // some code
 * } catch (error) {
 *   // We don't use error - ESLint warns
 * }
 *
 * // Use:
 * try {
 *   // some code
 * } catch (error) {
 *   ignoreError(error);
 * }
 */
export const ignoreError = (error) => {
    // Intentionally empty - just silence ESLint
}
