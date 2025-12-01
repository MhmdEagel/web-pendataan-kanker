class LegendItem {
   title: string;
    color: string;
    isFor: (cases: number) => boolean;
    textColor?: string

   constructor(title : string, color : string, isFor : (cases:number) => boolean, textColor? : string) {
    this.title = title
    this.color = color
    this.isFor = isFor
    this.textColor = textColor != null ? textColor : "black";
   }
}

export default LegendItem;