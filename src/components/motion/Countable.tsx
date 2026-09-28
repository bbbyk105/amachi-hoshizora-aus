// 「約70年」「40%」「32（軟水）」のような値の数字部分だけを数え上げの対象にする（data-count）。
// 年号（1000 以上）、容量や温度の幅（720ml・10-15℃）、数字の前に長い文字が付く値はそのまま出す。
const COUNTABLE = /^(\D{0,6}?)(\d+)((?:%|年|（| \(| years)[\s\S]*|)$/;

export function Countable({ value }: { value: string }) {
  const match = value.match(COUNTABLE);
  if (!match || Number(match[2]) >= 1000) return value;
  const [, prefix, number, suffix] = match;
  return (
    <>
      {prefix}
      <span data-count={number}>{number}</span>
      {suffix}
    </>
  );
}
