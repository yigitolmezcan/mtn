import type { CSSProperties } from "react";

export type PlayerOgData = {
  name: string;
  team: string;
  position: string;
  archetype: string;
  rating: number;
  portraitUrl: string;
  leagueBadgeUrl: string;
  crop?: {
    scale?: number;
    x?: number;
    y?: number;
  };
};

export type PlayerOgAssets = {
  backgroundUrl: string;
  brandLogoUrl: string;
};

const C = {
  orange: "#E6772E",
  white: "#F5F2EB",
  muted: "#A3A8AF",
  footer: "#777D86",
  pill: "#101318",
  pillBorder: "#2A2F36",
};

function splitPlayerName(name: string) {
  const words = name.trim().toUpperCase().split(/\s+/);
  if (words.length === 1) return [words[0], ""];
  return [words.slice(0, -1).join(" "), words.at(-1) ?? ""];
}

function nameSize(line: string, preferred: number) {
  if (line.length >= 18) return Math.round(preferred * 0.62);
  if (line.length >= 14) return Math.round(preferred * 0.72);
  if (line.length >= 11) return Math.round(preferred * 0.84);
  return preferred;
}

const absolute = (style: CSSProperties): CSSProperties => ({
  position: "absolute",
  display: "flex",
  ...style,
});

export function PlayerOgLayout({
  player,
  assets,
}: {
  player: PlayerOgData;
  assets: PlayerOgAssets;
}) {
  const [firstNameLine, secondNameLine] = splitPlayerName(player.name);
  const crop = {
    scale: player.crop?.scale ?? 1.38,
    x: player.crop?.x ?? 0,
    y: player.crop?.y ?? 28,
  };

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        position: "relative",
        display: "flex",
        overflow: "hidden",
        background: "#08090B",
        color: C.white,
        fontFamily: "Nimbus Sans",
      }}
    >
      <img
        src={assets.backgroundUrl}
        width="1200"
        height="630"
        style={absolute({ inset: 0, width: 1200, height: 630 })}
      />

      <div
        style={absolute({
          left: 52,
          top: 82,
          width: 436,
          height: 436,
          borderRadius: 999,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          background: C.orange,
          border: `9px solid ${C.white}`,
          outline: `7px solid ${C.orange}`,
        })}
      >
        <img
          src={player.portraitUrl}
          style={{
            position: "absolute",
            width: `${crop.scale * 100}%`,
            height: "auto",
            left: `calc(50% + ${crop.x}px)`,
            top: crop.y,
            transform: "translateX(-50%)",
            filter: "grayscale(100%)",
          }}
        />
      </div>

      <img
        src={assets.brandLogoUrl}
        width="54"
        height="54"
        style={absolute({ left: 536, top: 26, width: 54, height: 54 })}
      />
      <div style={absolute({ left: 604, top: 30, fontSize: 22, fontWeight: 700 })}>
        MEET THE NEWCOMERS
      </div>
      <div style={absolute({ left: 605, top: 57, fontSize: 12, color: "#8E949D" })}>
        EUROLEAGUE &amp; BSL PLAYER SCOUTING
      </div>

      <img
        src={player.leagueBadgeUrl}
        width="68"
        height="68"
        style={absolute({ left: 1094, top: 24, width: 68, height: 68 })}
      />

      <div
        style={absolute({
          left: 536,
          top: 128,
          minWidth: 98,
          height: 36,
          padding: "0 22px",
          borderRadius: 18,
          background: C.pill,
          border: `2px solid ${C.pillBorder}`,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
        })}
      >
        {player.position.toUpperCase()}
      </div>
      <div
        style={absolute({
          left: 646,
          top: 128,
          minWidth: 150,
          height: 36,
          padding: "0 24px",
          borderRadius: 18,
          background: C.pill,
          border: `2px solid ${C.pillBorder}`,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
        })}
      >
        {player.archetype.toUpperCase()}
      </div>

      <div style={absolute({ left: 536, top: 183, fontSize: 21, fontWeight: 700, color: C.orange })}>
        {player.team.toUpperCase()}
      </div>
      <div
        style={absolute({
          left: 532,
          top: 220,
          fontSize: nameSize(firstNameLine, 68),
          fontWeight: 400,
          lineHeight: 1,
          whiteSpace: "nowrap",
        })}
      >
        {firstNameLine}
      </div>
      <div
        style={absolute({
          left: 528,
          top: 286,
          fontSize: nameSize(secondNameLine, 92),
          fontWeight: 700,
          lineHeight: 1,
          whiteSpace: "nowrap",
        })}
      >
        {secondNameLine}
      </div>

      <div style={absolute({ left: 536, top: 373, width: 552, height: 4, background: C.orange })} />
      <div style={absolute({ left: 536, top: 395, width: 4, height: 155, background: C.orange })} />
      <div style={absolute({ left: 558, top: 405, fontSize: 18, fontWeight: 700, color: C.muted })}>
        MTN RATING
      </div>
      <div style={absolute({ left: 550, top: 432, fontSize: 110, fontWeight: 700, color: C.orange, lineHeight: 1 })}>
        {player.rating.toFixed(1)}
      </div>
      <div style={absolute({ left: 760, top: 484, fontSize: 32, fontWeight: 400 })}>/ 10</div>
      <div style={absolute({ left: 536, top: 590, fontSize: 13, color: C.footer })}>
        MEETNEWCOMERS.COM
      </div>
    </div>
  );
}
