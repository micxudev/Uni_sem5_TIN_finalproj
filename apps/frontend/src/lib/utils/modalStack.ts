let stack: symbol[] = [];

export function pushModal(id: symbol) {
    stack.push(id);
}

export function popModal(id: symbol) {
    stack = stack.filter(m => m !== id);
}

export function isTopModal(id: symbol) {
    return stack[stack.length - 1] === id;
}