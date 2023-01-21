import { extTypeToColor, previewTiles, previewTilesMap } from "../utils";

export const Preview = ({ tileSize }: { tileSize: number }) => {
  return (
    <div className="flex justify-start gap-x-5 gap-y-2 flex-wrap max-w-[700px]">
      {previewTiles.map((preview) => (
        <div className="flex space-x-1 items-center">
          <div
            className="rounded-md"
            style={{
              backgroundColor: extTypeToColor[preview],
              width: tileSize - 10,
              height: tileSize - 10,
            }}
          />
          <div className="font-bold text-lg text-gray-800">
            {previewTilesMap[preview]}
          </div>
        </div>
      ))}
    </div>
  );
};
