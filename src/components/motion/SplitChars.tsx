// 見出しを1文字ずつ動かすための分割。Server Component 専用（Client で使うと
// Node と ブラウザの Intl.Segmenter の差でハイドレーションがずれる可能性がある）。
// 語（「世界」など）はひとかたまりで折り返さないので、語の途中で改行しない。

// 行頭に来てはいけない閉じ記号は前の語に、行末に残ってはいけない開き記号は次の語につける
const CLOSING = /^[、。，．」』）】〕！？!?,.:;…]+$/;
const OPENING = /^[「『（【〔“"(]+$/;
const SPACE = /^\s+$/;

function toGroups(text: string): string[] {
  const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
  const groups: string[] = [];
  let opening = "";

  for (const { segment } of segmenter.segment(text)) {
    const last = groups.length - 1;
    if (SPACE.test(segment)) {
      groups.push(" ");
    } else if (CLOSING.test(segment) && last >= 0 && groups[last] !== " ") {
      groups[last] += segment;
    } else if (OPENING.test(segment)) {
      opening += segment;
    } else {
      groups.push(opening + segment);
      opening = "";
    }
  }
  if (opening) groups.push(opening);
  return groups;
}

export function SplitChars({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {toGroups(text).map((group, i) =>
          group === " " ? (
            " "
          ) : (
            <span key={i} className="inline-block whitespace-nowrap">
              {Array.from(group).map((char, j) => (
                <span key={j} data-char className="inline-block">
                  {char}
                </span>
              ))}
            </span>
          ),
        )}
      </span>
    </>
  );
}
