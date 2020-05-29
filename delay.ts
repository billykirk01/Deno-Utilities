/**
 * Delay execution for a specific amount of time
 *
 * @param ms numnber of miliseconds to delay execution
 * @returns Promise<void>
 */
export async function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}