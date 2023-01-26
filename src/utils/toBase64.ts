export const toBase64 = (file: File): Promise<string | ArrayBuffer> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    try {
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader as any).result);
        reader.onerror = error => reject(error);
    } catch (e) {
    }
});