// 蔵の歴史（messages の heritage 名前空間）の型
export interface HeritagePhoto {
  image: string;
  caption: string;
}

export interface TimelineItem {
  wareki: string;
  year: string;
  text: string;
}

export interface Era {
  name: string;
  span: string;
  items: TimelineItem[];
}

export interface CraftItem {
  image: string;
  title: string;
  text: string;
}
