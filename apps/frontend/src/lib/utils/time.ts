export function toHumanReadable(ms: number): string {
    if (ms < 1000) return `${ms}ms`;

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
        return `${seconds}s`;
    }

    return `${minutes}m ${seconds}s`;
}