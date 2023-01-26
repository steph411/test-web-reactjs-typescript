export const normalizeText = (val: number): String =>
  val < 10 ? `0${val}` : `${val}`;

export const trimText = (text: string, max: number) => {
    return text.length > max ? text.substring(0, max) + "..." : text;
}
