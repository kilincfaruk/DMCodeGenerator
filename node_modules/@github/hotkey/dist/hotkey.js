export default function hotkey(event) {
    const { ctrlKey, altKey, metaKey, key } = event;
    const hotkeyString = [];
    const modifiers = [ctrlKey, altKey, metaKey, showShift(event)];
    for (const [i, mod] of modifiers.entries()) {
        if (mod)
            hotkeyString.push(modifierKeyNames[i]);
    }
    if (!modifierKeyNames.includes(key)) {
        hotkeyString.push(key);
    }
    return hotkeyString.join('+');
}
const modifierKeyNames = [`Control`, 'Alt', 'Meta', 'Shift'];
function showShift(event) {
    const { shiftKey, code, key } = event;
    return shiftKey && !(code.startsWith('Key') && key.toUpperCase() === key);
}
