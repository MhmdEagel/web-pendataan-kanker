interface ILegendItem {
  title: string;
  color: string;
  isFor: (cases: number) => boolean;
  textColor?: string;
}

export default function Legend({
  legendItems,
}: {
  legendItems: ILegendItem[];
}) {
  return (
    <div
      className="flex text-[9px] sm:text-base"
    >
      {legendItems.map((item) => (
        <div
        className="px-2 sm:px-0 text-nowrap"
          key={item.title}
          style={{
            backgroundColor: item.color,
            flex: 1,
            display: "flex",
            alignItems: "center", // vertical
            justifyContent: "center", // horiztontal
            color: item.textColor != null ? item.textColor : "black",
            fontWeight: "bolder",
            height: "10vh"
          }}
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}
