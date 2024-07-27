export const level1Config = {
  gravity: 1400,
  playerSpeed: 400,
  jumpForce: 650,
  nblives: 3,
  playerStartPosX: 1500,
  playerStartPosY: 100,
  spiderPositions: [
    () => vec2(2000, 300),
    () => vec2(2020, 0),
    () => vec2(3200, 200),
    () => vec2(3500, 300),
  ],
  spiderAmplitudes: [300, 150, 150, 300],
  spiderSpeeds: [2, 1, 1, 2],
  spiderType: 1,
};
