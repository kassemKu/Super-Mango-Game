var hi = Object.defineProperty;
var o = (r, t) => hi(r, "name", { value: t, configurable: !0 });
var ur = (() => {
  for (var r = new Uint8Array(128), t = 0; t < 64; t++)
    r[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
  return (u) => {
    for (
      var w = u.length,
        E = new Uint8Array(
          (((w - (u[w - 1] == "=") - (u[w - 2] == "=")) * 3) / 4) | 0
        ),
        B = 0,
        z = 0;
      B < w;

    ) {
      var N = r[u.charCodeAt(B++)],
        q = r[u.charCodeAt(B++)],
        Q = r[u.charCodeAt(B++)],
        se = r[u.charCodeAt(B++)];
      (E[z++] = (N << 2) | (q >> 4)),
        (E[z++] = (q << 4) | (Q >> 2)),
        (E[z++] = (Q << 6) | se);
    }
    return E;
  };
})();
function Se(r) {
  return (r * Math.PI) / 180;
}
o(Se, "deg2rad");
function Je(r) {
  return (r * 180) / Math.PI;
}
o(Je, "rad2deg");
function Me(r, t, u) {
  return t > u ? Me(r, u, t) : Math.min(Math.max(r, t), u);
}
o(Me, "clamp");
function Ce(r, t, u) {
  if (typeof r == "number" && typeof t == "number") return r + (t - r) * u;
  if (r instanceof x && t instanceof x) return r.lerp(t, u);
  if (r instanceof $ && t instanceof $) return r.lerp(t, u);
  throw new Error(
    `Bad value for lerp(): ${r}, ${t}. Only number, Vec2 and Color is supported.`
  );
}
o(Ce, "lerp");
function jt(r, t, u, w, E) {
  return w + ((r - t) / (u - t)) * (E - w);
}
o(jt, "map");
function lr(r, t, u, w, E) {
  return Me(jt(r, t, u, w, E), w, E);
}
o(lr, "mapc");
var x = class r {
  static {
    o(this, "Vec2");
  }
  x = 0;
  y = 0;
  constructor(t = 0, u = t) {
    (this.x = t), (this.y = u);
  }
  static fromAngle(t) {
    let u = Se(t);
    return new r(Math.cos(u), Math.sin(u));
  }
  static LEFT = new r(-1, 0);
  static RIGHT = new r(1, 0);
  static UP = new r(0, -1);
  static DOWN = new r(0, 1);
  clone() {
    return new r(this.x, this.y);
  }
  add(...t) {
    let u = C(...t);
    return new r(this.x + u.x, this.y + u.y);
  }
  sub(...t) {
    let u = C(...t);
    return new r(this.x - u.x, this.y - u.y);
  }
  scale(...t) {
    let u = C(...t);
    return new r(this.x * u.x, this.y * u.y);
  }
  dist(...t) {
    let u = C(...t);
    return this.sub(u).len();
  }
  sdist(...t) {
    let u = C(...t);
    return this.sub(u).slen();
  }
  len() {
    return Math.sqrt(this.dot(this));
  }
  slen() {
    return this.dot(this);
  }
  unit() {
    let t = this.len();
    return t === 0 ? new r(0) : this.scale(1 / t);
  }
  normal() {
    return new r(this.y, -this.x);
  }
  reflect(t) {
    return this.sub(t.scale(2 * this.dot(t)));
  }
  project(t) {
    return t.scale(t.dot(this) / t.len());
  }
  reject(t) {
    return this.sub(this.project(t));
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  angle(...t) {
    let u = C(...t);
    return Je(Math.atan2(this.y - u.y, this.x - u.x));
  }
  angleBetween(...t) {
    let u = C(...t);
    return Je(Math.atan2(this.cross(u), this.dot(u)));
  }
  lerp(t, u) {
    return new r(Ce(this.x, t.x, u), Ce(this.y, t.y, u));
  }
  slerp(t, u) {
    let w = this.dot(t),
      E = this.cross(t),
      B = Math.atan2(E, w);
    return this.scale(Math.sin((1 - u) * B))
      .add(t.scale(Math.sin(u * B)))
      .scale(1 / E);
  }
  isZero() {
    return this.x === 0 && this.y === 0;
  }
  toFixed(t) {
    return new r(Number(this.x.toFixed(t)), Number(this.y.toFixed(t)));
  }
  transform(t) {
    return t.multVec2(this);
  }
  eq(t) {
    return this.x === t.x && this.y === t.y;
  }
  bbox() {
    return new ce(this, 0, 0);
  }
  toString() {
    return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
};
function C(...r) {
  if (r.length === 1) {
    if (r[0] instanceof x) return new x(r[0].x, r[0].y);
    if (Array.isArray(r[0]) && r[0].length === 2) return new x(...r[0]);
  }
  return new x(...r);
}
o(C, "vec2");
var $ = class r {
  static {
    o(this, "Color");
  }
  r = 255;
  g = 255;
  b = 255;
  constructor(t, u, w) {
    (this.r = Me(t, 0, 255)),
      (this.g = Me(u, 0, 255)),
      (this.b = Me(w, 0, 255));
  }
  static fromArray(t) {
    return new r(t[0], t[1], t[2]);
  }
  static fromHex(t) {
    if (typeof t == "number")
      return new r((t >> 16) & 255, (t >> 8) & 255, (t >> 0) & 255);
    if (typeof t == "string") {
      let u = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
      return new r(parseInt(u[1], 16), parseInt(u[2], 16), parseInt(u[3], 16));
    } else throw new Error("Invalid hex color format");
  }
  static fromHSL(t, u, w) {
    if (u == 0) return new r(255 * w, 255 * w, 255 * w);
    let E = o(
        (se, U, X) => (
          X < 0 && (X += 1),
          X > 1 && (X -= 1),
          X < 1 / 6
            ? se + (U - se) * 6 * X
            : X < 1 / 2
            ? U
            : X < 2 / 3
            ? se + (U - se) * (2 / 3 - X) * 6
            : se
        ),
        "hue2rgb"
      ),
      B = w < 0.5 ? w * (1 + u) : w + u - w * u,
      z = 2 * w - B,
      N = E(z, B, t + 1 / 3),
      q = E(z, B, t),
      Q = E(z, B, t - 1 / 3);
    return new r(Math.round(N * 255), Math.round(q * 255), Math.round(Q * 255));
  }
  static RED = new r(255, 0, 0);
  static GREEN = new r(0, 255, 0);
  static BLUE = new r(0, 0, 255);
  static YELLOW = new r(255, 255, 0);
  static MAGENTA = new r(255, 0, 255);
  static CYAN = new r(0, 255, 255);
  static WHITE = new r(255, 255, 255);
  static BLACK = new r(0, 0, 0);
  clone() {
    return new r(this.r, this.g, this.b);
  }
  lighten(t) {
    return new r(this.r + t, this.g + t, this.b + t);
  }
  darken(t) {
    return this.lighten(-t);
  }
  invert() {
    return new r(255 - this.r, 255 - this.g, 255 - this.b);
  }
  mult(t) {
    return new r(
      (this.r * t.r) / 255,
      (this.g * t.g) / 255,
      (this.b * t.b) / 255
    );
  }
  lerp(t, u) {
    return new r(Ce(this.r, t.r, u), Ce(this.g, t.g, u), Ce(this.b, t.b, u));
  }
  eq(t) {
    return this.r === t.r && this.g === t.g && this.b === t.b;
  }
  toString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
  toHex() {
    return (
      "#" +
      ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
        .toString(16)
        .slice(1)
    );
  }
};
function J(...r) {
  if (r.length === 0) return new $(255, 255, 255);
  if (r.length === 1) {
    if (r[0] instanceof $) return r[0].clone();
    if (typeof r[0] == "string") return $.fromHex(r[0]);
    if (Array.isArray(r[0]) && r[0].length === 3) return $.fromArray(r[0]);
  }
  return new $(...r);
}
o(J, "rgb");
var hr = o((r, t, u) => $.fromHSL(r, t, u), "hsl2rgb"),
  ae = class r {
    static {
      o(this, "Quad");
    }
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(t, u, w, E) {
      (this.x = t), (this.y = u), (this.w = w), (this.h = E);
    }
    scale(t) {
      return new r(
        this.x + this.w * t.x,
        this.y + this.h * t.y,
        this.w * t.w,
        this.h * t.h
      );
    }
    pos() {
      return new x(this.x, this.y);
    }
    clone() {
      return new r(this.x, this.y, this.w, this.h);
    }
    eq(t) {
      return (
        this.x === t.x && this.y === t.y && this.w === t.w && this.h === t.h
      );
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };
function re(r, t, u, w) {
  return new ae(r, t, u, w);
}
o(re, "quad");
var be = class r {
  static {
    o(this, "Mat4");
  }
  m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  constructor(t) {
    t && (this.m = t);
  }
  static translate(t) {
    return new r([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, 0, 1]);
  }
  static scale(t) {
    return new r([t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  static rotateX(t) {
    t = Se(-t);
    let u = Math.cos(t),
      w = Math.sin(t);
    return new r([1, 0, 0, 0, 0, u, -w, 0, 0, w, u, 0, 0, 0, 0, 1]);
  }
  static rotateY(t) {
    t = Se(-t);
    let u = Math.cos(t),
      w = Math.sin(t);
    return new r([u, 0, w, 0, 0, 1, 0, 0, -w, 0, u, 0, 0, 0, 0, 1]);
  }
  static rotateZ(t) {
    t = Se(-t);
    let u = Math.cos(t),
      w = Math.sin(t);
    return new r([u, -w, 0, 0, w, u, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  translate(t) {
    return (
      (this.m[12] += this.m[0] * t.x + this.m[4] * t.y),
      (this.m[13] += this.m[1] * t.x + this.m[5] * t.y),
      (this.m[14] += this.m[2] * t.x + this.m[6] * t.y),
      (this.m[15] += this.m[3] * t.x + this.m[7] * t.y),
      this
    );
  }
  scale(t) {
    return (
      (this.m[0] *= t.x),
      (this.m[4] *= t.y),
      (this.m[1] *= t.x),
      (this.m[5] *= t.y),
      (this.m[2] *= t.x),
      (this.m[6] *= t.y),
      (this.m[3] *= t.x),
      (this.m[7] *= t.y),
      this
    );
  }
  rotate(t) {
    t = Se(-t);
    let u = Math.cos(t),
      w = Math.sin(t),
      E = this.m[0],
      B = this.m[1],
      z = this.m[4],
      N = this.m[5];
    return (
      (this.m[0] = E * u + B * w),
      (this.m[1] = -E * w + B * u),
      (this.m[4] = z * u + N * w),
      (this.m[5] = -z * w + N * u),
      this
    );
  }
  mult(t) {
    let u = [];
    for (let w = 0; w < 4; w++)
      for (let E = 0; E < 4; E++)
        u[w * 4 + E] =
          this.m[0 * 4 + E] * t.m[w * 4 + 0] +
          this.m[1 * 4 + E] * t.m[w * 4 + 1] +
          this.m[2 * 4 + E] * t.m[w * 4 + 2] +
          this.m[3 * 4 + E] * t.m[w * 4 + 3];
    return new r(u);
  }
  multVec2(t) {
    return new x(
      t.x * this.m[0] + t.y * this.m[4] + this.m[12],
      t.x * this.m[1] + t.y * this.m[5] + this.m[13]
    );
  }
  getTranslation() {
    return new x(this.m[12], this.m[13]);
  }
  getScale() {
    if (this.m[0] != 0 || this.m[1] != 0) {
      let t = this.m[0] * this.m[5] - this.m[1] * this.m[4],
        u = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
      return new x(u, t / u);
    } else if (this.m[4] != 0 || this.m[5] != 0) {
      let t = this.m[0] * this.m[5] - this.m[1] * this.m[4],
        u = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
      return new x(t / u, u);
    } else return new x(0, 0);
  }
  getRotation() {
    if (this.m[0] != 0 || this.m[1] != 0) {
      let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
      return Je(
        this.m[1] > 0 ? Math.acos(this.m[0] / t) : -Math.acos(this.m[0] / t)
      );
    } else if (this.m[4] != 0 || this.m[5] != 0) {
      let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
      return Je(
        Math.PI / 2 -
          (this.m[5] > 0
            ? Math.acos(-this.m[4] / t)
            : -Math.acos(this.m[4] / t))
      );
    } else return 0;
  }
  getSkew() {
    if (this.m[0] != 0 || this.m[1] != 0) {
      let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
      return new x(
        Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t),
        0
      );
    } else if (this.m[4] != 0 || this.m[5] != 0) {
      let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
      return new x(
        0,
        Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t)
      );
    } else return new x(0, 0);
  }
  invert() {
    let t = [],
      u = this.m[10] * this.m[15] - this.m[14] * this.m[11],
      w = this.m[9] * this.m[15] - this.m[13] * this.m[11],
      E = this.m[9] * this.m[14] - this.m[13] * this.m[10],
      B = this.m[8] * this.m[15] - this.m[12] * this.m[11],
      z = this.m[8] * this.m[14] - this.m[12] * this.m[10],
      N = this.m[8] * this.m[13] - this.m[12] * this.m[9],
      q = this.m[6] * this.m[15] - this.m[14] * this.m[7],
      Q = this.m[5] * this.m[15] - this.m[13] * this.m[7],
      se = this.m[5] * this.m[14] - this.m[13] * this.m[6],
      U = this.m[4] * this.m[15] - this.m[12] * this.m[7],
      X = this.m[4] * this.m[14] - this.m[12] * this.m[6],
      h = this.m[5] * this.m[15] - this.m[13] * this.m[7],
      W = this.m[4] * this.m[13] - this.m[12] * this.m[5],
      me = this.m[6] * this.m[11] - this.m[10] * this.m[7],
      Ge = this.m[5] * this.m[11] - this.m[9] * this.m[7],
      v = this.m[5] * this.m[10] - this.m[9] * this.m[6],
      ue = this.m[4] * this.m[11] - this.m[8] * this.m[7],
      ge = this.m[4] * this.m[10] - this.m[8] * this.m[6],
      ie = this.m[4] * this.m[9] - this.m[8] * this.m[5];
    (t[0] = this.m[5] * u - this.m[6] * w + this.m[7] * E),
      (t[4] = -(this.m[4] * u - this.m[6] * B + this.m[7] * z)),
      (t[8] = this.m[4] * w - this.m[5] * B + this.m[7] * N),
      (t[12] = -(this.m[4] * E - this.m[5] * z + this.m[6] * N)),
      (t[1] = -(this.m[1] * u - this.m[2] * w + this.m[3] * E)),
      (t[5] = this.m[0] * u - this.m[2] * B + this.m[3] * z),
      (t[9] = -(this.m[0] * w - this.m[1] * B + this.m[3] * N)),
      (t[13] = this.m[0] * E - this.m[1] * z + this.m[2] * N),
      (t[2] = this.m[1] * q - this.m[2] * Q + this.m[3] * se),
      (t[6] = -(this.m[0] * q - this.m[2] * U + this.m[3] * X)),
      (t[10] = this.m[0] * h - this.m[1] * U + this.m[3] * W),
      (t[14] = -(this.m[0] * se - this.m[1] * X + this.m[2] * W)),
      (t[3] = -(this.m[1] * me - this.m[2] * Ge + this.m[3] * v)),
      (t[7] = this.m[0] * me - this.m[2] * ue + this.m[3] * ge),
      (t[11] = -(this.m[0] * Ge - this.m[1] * ue + this.m[3] * ie)),
      (t[15] = this.m[0] * v - this.m[1] * ge + this.m[2] * ie);
    let oe =
      this.m[0] * t[0] +
      this.m[1] * t[4] +
      this.m[2] * t[8] +
      this.m[3] * t[12];
    for (let ye = 0; ye < 4; ye++)
      for (let I = 0; I < 4; I++) t[ye * 4 + I] *= 1 / oe;
    return new r(t);
  }
  clone() {
    return new r([...this.m]);
  }
  toString() {
    return this.m.toString();
  }
};
function Tn(r, t, u, w = Math.sin) {
  return r + ((w(u) + 1) / 2) * (t - r);
}
o(Tn, "wave");
var di = 1103515245,
  fi = 12345,
  cr = 2147483648,
  mt = class {
    static {
      o(this, "RNG");
    }
    seed;
    constructor(t) {
      this.seed = t;
    }
    gen() {
      return (this.seed = (di * this.seed + fi) % cr), this.seed / cr;
    }
    genNumber(t, u) {
      return t + this.gen() * (u - t);
    }
    genVec2(t, u) {
      return new x(this.genNumber(t.x, u.x), this.genNumber(t.y, u.y));
    }
    genColor(t, u) {
      return new $(
        this.genNumber(t.r, u.r),
        this.genNumber(t.g, u.g),
        this.genNumber(t.b, u.b)
      );
    }
    genAny(...t) {
      if (t.length === 0) return this.gen();
      if (t.length === 1) {
        if (typeof t[0] == "number") return this.genNumber(0, t[0]);
        if (t[0] instanceof x) return this.genVec2(C(0, 0), t[0]);
        if (t[0] instanceof $) return this.genColor(J(0, 0, 0), t[0]);
      } else if (t.length === 2) {
        if (typeof t[0] == "number" && typeof t[1] == "number")
          return this.genNumber(t[0], t[1]);
        if (t[0] instanceof x && t[1] instanceof x)
          return this.genVec2(t[0], t[1]);
        if (t[0] instanceof $ && t[1] instanceof $)
          return this.genColor(t[0], t[1]);
      }
    }
  },
  Sn = new mt(Date.now());
function dr(r) {
  return r != null && (Sn.seed = r), Sn.seed;
}
o(dr, "randSeed");
function wt(...r) {
  return Sn.genAny(...r);
}
o(wt, "rand");
function An(...r) {
  return Math.floor(wt(...r));
}
o(An, "randi");
function fr(r) {
  return wt() <= r;
}
o(fr, "chance");
function mr(r) {
  return r[An(r.length)];
}
o(mr, "choose");
function pr(r, t) {
  return (
    r.pos.x + r.width > t.pos.x &&
    r.pos.x < t.pos.x + t.width &&
    r.pos.y + r.height > t.pos.y &&
    r.pos.y < t.pos.y + t.height
  );
}
o(pr, "testRectRect");
function mi(r, t) {
  if (
    (r.p1.x === r.p2.x && r.p1.y === r.p2.y) ||
    (t.p1.x === t.p2.x && t.p1.y === t.p2.y)
  )
    return null;
  let u =
    (t.p2.y - t.p1.y) * (r.p2.x - r.p1.x) -
    (t.p2.x - t.p1.x) * (r.p2.y - r.p1.y);
  if (u === 0) return null;
  let w =
      ((t.p2.x - t.p1.x) * (r.p1.y - t.p1.y) -
        (t.p2.y - t.p1.y) * (r.p1.x - t.p1.x)) /
      u,
    E =
      ((r.p2.x - r.p1.x) * (r.p1.y - t.p1.y) -
        (r.p2.y - r.p1.y) * (r.p1.x - t.p1.x)) /
      u;
  return w < 0 || w > 1 || E < 0 || E > 1 ? null : w;
}
o(mi, "testLineLineT");
function We(r, t) {
  let u = mi(r, t);
  return u
    ? C(r.p1.x + u * (r.p2.x - r.p1.x), r.p1.y + u * (r.p2.y - r.p1.y))
    : null;
}
o(We, "testLineLine");
function gr(r, t) {
  if (pt(r, t.p1) || pt(r, t.p2)) return !0;
  let u = r.points();
  return (
    !!We(t, new Pe(u[0], u[1])) ||
    !!We(t, new Pe(u[1], u[2])) ||
    !!We(t, new Pe(u[2], u[3])) ||
    !!We(t, new Pe(u[3], u[0]))
  );
}
o(gr, "testRectLine");
function pt(r, t) {
  return (
    t.x > r.pos.x &&
    t.x < r.pos.x + r.width &&
    t.y > r.pos.y &&
    t.y < r.pos.y + r.height
  );
}
o(pt, "testRectPoint");
function wr(r, t) {
  let u = t.sub(r.p1),
    w = r.p2.sub(r.p1);
  if (Math.abs(u.cross(w)) > Number.EPSILON) return !1;
  let E = u.dot(w) / w.dot(w);
  return E >= 0 && E <= 1;
}
o(wr, "testLinePoint");
function On(r, t) {
  let u = r.p2.sub(r.p1),
    w = u.dot(u),
    E = r.p1.sub(t.center),
    B = 2 * u.dot(E),
    z = E.dot(E) - t.radius * t.radius,
    N = B * B - 4 * w * z;
  if (w <= Number.EPSILON || N < 0) return !1;
  if (N == 0) {
    let q = -B / (2 * w);
    if (q >= 0 && q <= 1) return !0;
  } else {
    let q = (-B + Math.sqrt(N)) / (2 * w),
      Q = (-B - Math.sqrt(N)) / (2 * w);
    if ((q >= 0 && q <= 1) || (Q >= 0 && Q <= 1)) return !0;
  }
  return vr(t, r.p1);
}
o(On, "testLineCircle");
function vr(r, t) {
  return r.center.sdist(t) < r.radius * r.radius;
}
o(vr, "testCirclePoint");
function br(r, t) {
  let u = t.pts[t.pts.length - 1];
  for (let w of t.pts) {
    if (On(new Pe(u, w), r)) return !0;
    u = w;
  }
  return vr(r, t.pts[0]) ? !0 : Pn(t, r.center);
}
o(br, "testCirclePolygon");
function Pn(r, t) {
  let u = !1,
    w = r.pts;
  for (let E = 0, B = w.length - 1; E < w.length; B = E++)
    w[E].y > t.y != w[B].y > t.y &&
      t.x < ((w[B].x - w[E].x) * (t.y - w[E].y)) / (w[B].y - w[E].y) + w[E].x &&
      (u = !u);
  return u;
}
o(Pn, "testPolygonPoint");
var Pe = class r {
    static {
      o(this, "Line");
    }
    p1;
    p2;
    constructor(t, u) {
      (this.p1 = t.clone()), (this.p2 = u.clone());
    }
    transform(t) {
      return new r(t.multVec2(this.p1), t.multVec2(this.p2));
    }
    bbox() {
      return ce.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new r(this.p1, this.p2);
    }
  },
  ce = class r {
    static {
      o(this, "Rect");
    }
    pos;
    width;
    height;
    constructor(t, u, w) {
      (this.pos = t.clone()), (this.width = u), (this.height = w);
    }
    static fromPoints(t, u) {
      return new r(t.clone(), u.x - t.x, u.y - t.y);
    }
    center() {
      return new x(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [
        this.pos,
        this.pos.add(this.width, 0),
        this.pos.add(this.width, this.height),
        this.pos.add(0, this.height),
      ];
    }
    transform(t) {
      return new He(this.points().map((u) => t.multVec2(u)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new r(this.pos.clone(), this.width, this.height);
    }
    distToPoint(t) {
      return Math.sqrt(this.sdistToPoint(t));
    }
    sdistToPoint(t) {
      let u = this.pos,
        w = this.pos.add(this.width, this.height),
        E = Math.max(u.x - t.x, 0, t.x - w.x),
        B = Math.max(u.y - t.y, 0, t.y - w.y);
      return E * E + B * B;
    }
  },
  gt = class r {
    static {
      o(this, "Circle");
    }
    center;
    radius;
    constructor(t, u) {
      (this.center = t.clone()), (this.radius = u);
    }
    transform(t) {
      return new Cn(this.center, this.radius, this.radius).transform(t);
    }
    bbox() {
      return ce.fromPoints(
        this.center.sub(C(this.radius)),
        this.center.add(C(this.radius))
      );
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new r(this.center, this.radius);
    }
  },
  Cn = class r {
    static {
      o(this, "Ellipse");
    }
    center;
    radiusX;
    radiusY;
    constructor(t, u, w) {
      (this.center = t.clone()), (this.radiusX = u), (this.radiusY = w);
    }
    transform(t) {
      return new r(
        t.multVec2(this.center),
        t.m[0] * this.radiusX,
        t.m[5] * this.radiusY
      );
    }
    bbox() {
      return ce.fromPoints(
        this.center.sub(C(this.radiusX, this.radiusY)),
        this.center.add(C(this.radiusX, this.radiusY))
      );
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new r(this.center, this.radiusX, this.radiusY);
    }
  },
  He = class r {
    static {
      o(this, "Polygon");
    }
    pts;
    constructor(t) {
      if (t.length < 3)
        throw new Error("Polygons should have at least 3 vertices");
      this.pts = t;
    }
    transform(t) {
      return new r(this.pts.map((u) => t.multVec2(u)));
    }
    bbox() {
      let t = C(Number.MAX_VALUE),
        u = C(-Number.MAX_VALUE);
      for (let w of this.pts)
        (t.x = Math.min(t.x, w.x)),
          (u.x = Math.max(u.x, w.x)),
          (t.y = Math.min(t.y, w.y)),
          (u.y = Math.max(u.y, w.y));
      return ce.fromPoints(t, u);
    }
    area() {
      let t = 0,
        u = this.pts.length;
      for (let w = 0; w < u; w++) {
        let E = this.pts[w],
          B = this.pts[(w + 1) % u];
        (t += E.x * B.y * 0.5), (t -= B.x * E.y * 0.5);
      }
      return Math.abs(t);
    }
    clone() {
      return new r(this.pts.map((t) => t.clone()));
    }
  };
function yr(r, t) {
  let u = Number.MAX_VALUE,
    w = C(0);
  for (let E of [r, t])
    for (let B = 0; B < E.pts.length; B++) {
      let z = E.pts[B],
        q = E.pts[(B + 1) % E.pts.length].sub(z).normal().unit(),
        Q = Number.MAX_VALUE,
        se = -Number.MAX_VALUE;
      for (let W = 0; W < r.pts.length; W++) {
        let me = r.pts[W].dot(q);
        (Q = Math.min(Q, me)), (se = Math.max(se, me));
      }
      let U = Number.MAX_VALUE,
        X = -Number.MAX_VALUE;
      for (let W = 0; W < t.pts.length; W++) {
        let me = t.pts[W].dot(q);
        (U = Math.min(U, me)), (X = Math.max(X, me));
      }
      let h = Math.min(se, X) - Math.max(Q, U);
      if (h < 0) return null;
      if (h < Math.abs(u)) {
        let W = X - Q,
          me = U - se;
        (u = Math.abs(W) < Math.abs(me) ? W : me), (w = q.scale(u));
      }
    }
  return w;
}
o(yr, "sat");
var vt = class extends Map {
    static {
      o(this, "IDList");
    }
    lastID;
    constructor(...t) {
      super(...t), (this.lastID = 0);
    }
    push(t) {
      let u = this.lastID;
      return this.set(u, t), this.lastID++, u;
    }
    pushd(t) {
      let u = this.push(t);
      return () => this.delete(u);
    }
  },
  Re = class r {
    static {
      o(this, "EventController");
    }
    paused = !1;
    cancel;
    constructor(t) {
      this.cancel = t;
    }
    static join(t) {
      let u = new r(() => t.forEach((w) => w.cancel()));
      return (
        Object.defineProperty(u, "paused", {
          get: () => t[0].paused,
          set: (w) => t.forEach((E) => (E.paused = w)),
        }),
        (u.paused = !1),
        u
      );
    }
  },
  ve = class {
    static {
      o(this, "Event");
    }
    handlers = new vt();
    add(t) {
      let u = this.handlers.pushd((...E) => {
          w.paused || t(...E);
        }),
        w = new Re(u);
      return w;
    }
    addOnce(t) {
      let u = this.add((...w) => {
        u.cancel(), t(...w);
      });
      return u;
    }
    next() {
      return new Promise((t) => this.addOnce(t));
    }
    trigger(...t) {
      this.handlers.forEach((u) => u(...t));
    }
    numListeners() {
      return this.handlers.size;
    }
  },
  De = class {
    static {
      o(this, "EventHandler");
    }
    handlers = {};
    on(t, u) {
      return (
        this.handlers[t] || (this.handlers[t] = new ve()),
        this.handlers[t].add(u)
      );
    }
    onOnce(t, u) {
      let w = this.on(t, (...E) => {
        w.cancel(), u(...E);
      });
      return w;
    }
    next(t) {
      return new Promise((u) => {
        this.onOnce(t, (...w) => u(w[0]));
      });
    }
    trigger(t, ...u) {
      this.handlers[t] && this.handlers[t].trigger(...u);
    }
    remove(t) {
      delete this.handlers[t];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(t) {
      return this.handlers[t]?.numListeners() ?? 0;
    }
  };
function Mn(r, t) {
  let u = typeof r,
    w = typeof t;
  if (u !== w) return !1;
  if (u === "object" && w === "object" && r !== null && t !== null) {
    let E = Object.keys(r),
      B = Object.keys(t);
    if (E.length !== B.length) return !1;
    for (let z of E) {
      let N = r[z],
        q = t[z];
      if (!(typeof N == "function" && typeof q == "function") && !Mn(N, q))
        return !1;
    }
    return !0;
  }
  return r === t;
}
o(Mn, "deepEq");
function pi(r) {
  let t = window.atob(r),
    u = t.length,
    w = new Uint8Array(u);
  for (let E = 0; E < u; E++) w[E] = t.charCodeAt(E);
  return w.buffer;
}
o(pi, "base64ToArrayBuffer");
function xr(r) {
  return pi(r.split(",")[1]);
}
o(xr, "dataURLToArrayBuffer");
function _t(r, t) {
  let u = document.createElement("a");
  (u.href = t), (u.download = r), u.click();
}
o(_t, "download");
function Rn(r, t) {
  _t(r, "data:text/plain;charset=utf-8," + t);
}
o(Rn, "downloadText");
function Ur(r, t) {
  Rn(r, JSON.stringify(t));
}
o(Ur, "downloadJSON");
function Dn(r, t) {
  let u = URL.createObjectURL(t);
  _t(r, u), URL.revokeObjectURL(u);
}
o(Dn, "downloadBlob");
var Gn = o((r) => r.match(/^data:\w+\/\w+;base64,.+/), "isDataURL"),
  Er = o((r) => r.split(".").pop(), "getExt"),
  Sr = (() => {
    let r = 0;
    return () => r++;
  })();
var kt = class {
  static {
    o(this, "BinaryHeap");
  }
  _items;
  _compareFn;
  constructor(t = (u, w) => u < w) {
    (this._compareFn = t), (this._items = []);
  }
  insert(t) {
    this._items.push(t), this.moveUp(this._items.length - 1);
  }
  remove() {
    if (this._items.length === 0) return null;
    let t = this._items[0],
      u = this._items.pop();
    return (
      this._items.length !== 0 && ((this._items[0] = u), this.moveDown(0)), t
    );
  }
  clear() {
    this._items.splice(0, this._items.length);
  }
  moveUp(t) {
    for (; t > 0; ) {
      let u = Math.floor((t - 1) / 2);
      if (
        !this._compareFn(this._items[t], this._items[u]) &&
        this._items[t] >= this._items[u]
      )
        break;
      this.swap(t, u), (t = u);
    }
  }
  moveDown(t) {
    for (; t < Math.floor(this._items.length / 2); ) {
      let u = 2 * t + 1;
      if (
        (u < this._items.length - 1 &&
          !this._compareFn(this._items[u], this._items[u + 1]) &&
          ++u,
        this._compareFn(this._items[t], this._items[u]))
      )
        break;
      this.swap(t, u), (t = u);
    }
  }
  swap(t, u) {
    [this._items[t], this._items[u]] = [this._items[u], this._items[t]];
  }
  get length() {
    return this._items.length;
  }
};
var Fn = {
  "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
    buttons: {
      0: "south",
      1: "east",
      2: "west",
      3: "north",
      4: "lshoulder",
      5: "rshoulder",
      6: "ltrigger",
      7: "rtrigger",
      8: "select",
      9: "start",
      10: "lstick",
      11: "rstick",
      12: "dpad-up",
      13: "dpad-down",
      14: "dpad-left",
      15: "dpad-right",
      16: "home",
      17: "capture",
    },
    sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
  },
  "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
    buttons: {
      0: "south",
      1: "east",
      2: "west",
      3: "north",
      4: "lshoulder",
      5: "rshoulder",
      9: "select",
      10: "lstick",
      16: "start",
    },
    sticks: { left: { x: 0, y: 1 } },
  },
  "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
    buttons: {
      0: "south",
      1: "east",
      2: "west",
      3: "north",
      4: "lshoulder",
      5: "rshoulder",
      9: "start",
      10: "lstick",
      16: "select",
    },
    sticks: { left: { x: 0, y: 1 } },
  },
  "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
    buttons: {
      0: "south",
      1: "east",
      2: "west",
      3: "north",
      4: "lshoulder",
      5: "rshoulder",
      6: "ltrigger",
      7: "rtrigger",
      8: "select",
      9: "start",
      10: "lstick",
      11: "rstick",
      12: "dpad-up",
      13: "dpad-down",
      14: "dpad-left",
      15: "dpad-right",
      16: "home",
      17: "capture",
    },
    sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
  },
  default: {
    buttons: {
      0: "south",
      1: "east",
      2: "west",
      3: "north",
      4: "lshoulder",
      5: "rshoulder",
      6: "ltrigger",
      7: "rtrigger",
      8: "select",
      9: "start",
      10: "lstick",
      11: "rstick",
      12: "dpad-up",
      13: "dpad-down",
      14: "dpad-left",
      15: "dpad-right",
      16: "home",
    },
    sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
  },
};
var Qe = class {
    static {
      o(this, "ButtonState");
    }
    pressed = new Set([]);
    pressedRepeat = new Set([]);
    released = new Set([]);
    down = new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(t) {
      this.pressed.add(t), this.pressedRepeat.add(t), this.down.add(t);
    }
    pressRepeat(t) {
      this.pressedRepeat.add(t);
    }
    release(t) {
      this.down.delete(t), this.pressed.delete(t), this.released.add(t);
    }
  },
  Bn = class {
    static {
      o(this, "GamepadState");
    }
    buttonState = new Qe();
    stickState = new Map();
  },
  Ln = class {
    static {
      o(this, "FPSCounter");
    }
    dts = [];
    timer = 0;
    fps = 0;
    tick(t) {
      this.dts.push(t),
        (this.timer += t),
        this.timer >= 1 &&
          ((this.timer = 0),
          (this.fps = Math.round(
            1 / (this.dts.reduce((u, w) => u + w) / this.dts.length)
          )),
          (this.dts = []));
    }
  },
  Cr = o((r) => {
    if (!r.canvas) throw new Error("Please provide a canvas");
    let t = {
      canvas: r.canvas,
      loopID: null,
      stopped: !1,
      dt: 0,
      time: 0,
      realTime: 0,
      fpsCounter: new Ln(),
      timeScale: 1,
      skipTime: !1,
      numFrames: 0,
      paused: !1,
      mousePos: new x(0),
      mouseDeltaPos: new x(0),
      keyState: new Qe(),
      mouseState: new Qe(),
      mergedGamepadState: new Bn(),
      gamepadStates: new Map(),
      gamepads: [],
      charInputted: [],
      isMouseMoved: !1,
      lastWidth: r.canvas.offsetWidth,
      lastHeight: r.canvas.offsetHeight,
      events: new De(),
    };
    function u() {
      return t.canvas;
    }
    o(u, "canvas");
    function w() {
      return t.dt * t.timeScale;
    }
    o(w, "dt");
    function E() {
      return t.time;
    }
    o(E, "time");
    function B() {
      return t.fpsCounter.fps;
    }
    o(B, "fps");
    function z() {
      return t.numFrames;
    }
    o(z, "numFrames");
    function N() {
      return t.canvas.toDataURL();
    }
    o(N, "screenshot");
    function q(d) {
      t.canvas.style.cursor = d;
    }
    o(q, "setCursor");
    function Q() {
      return t.canvas.style.cursor;
    }
    o(Q, "getCursor");
    function se(d) {
      if (d)
        try {
          let b = t.canvas.requestPointerLock();
          b.catch && b.catch((T) => console.error(T));
        } catch (b) {
          console.error(b);
        }
      else document.exitPointerLock();
    }
    o(se, "setCursorLocked");
    function U() {
      return !!document.pointerLockElement;
    }
    o(U, "isCursorLocked");
    function X(d) {
      d.requestFullscreen
        ? d.requestFullscreen()
        : d.webkitRequestFullscreen && d.webkitRequestFullscreen();
    }
    o(X, "enterFullscreen");
    function h() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    o(h, "exitFullscreen");
    function W() {
      return document.fullscreenElement || document.webkitFullscreenElement;
    }
    o(W, "getFullscreenElement");
    function me(d = !0) {
      d ? X(t.canvas) : h();
    }
    o(me, "setFullscreen");
    function Ge() {
      return !!W();
    }
    o(Ge, "isFullscreen");
    function v() {
      t.stopped = !0;
      for (let d in le) t.canvas.removeEventListener(d, le[d]);
      for (let d in Ae) document.removeEventListener(d, Ae[d]);
      for (let d in he) window.removeEventListener(d, he[d]);
      Rt.disconnect();
    }
    o(v, "quit");
    function ue(d) {
      t.loopID !== null && cancelAnimationFrame(t.loopID);
      let b = 0,
        T = o((V) => {
          if (t.stopped) return;
          if (t.paused || document.visibilityState !== "visible") {
            t.loopID = requestAnimationFrame(T);
            return;
          }
          let Z = V / 1e3,
            _ = Z - t.realTime,
            Ee = r.maxFPS ? 1 / r.maxFPS : 0;
          (t.realTime = Z),
            (b += _),
            b > Ee &&
              (t.skipTime ||
                ((t.dt = b), (t.time += w()), t.fpsCounter.tick(t.dt)),
              (b = 0),
              (t.skipTime = !1),
              t.numFrames++,
              Pt(),
              d(),
              cn()),
            (t.loopID = requestAnimationFrame(T));
        }, "frame");
      T(0);
    }
    o(ue, "run");
    function ge() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    o(ge, "isTouchscreen");
    function ie() {
      return t.mousePos.clone();
    }
    o(ie, "mousePos");
    function oe() {
      return t.mouseDeltaPos.clone();
    }
    o(oe, "mouseDeltaPos");
    function ye(d = "left") {
      return t.mouseState.pressed.has(d);
    }
    o(ye, "isMousePressed");
    function I(d = "left") {
      return t.mouseState.down.has(d);
    }
    o(I, "isMouseDown");
    function A(d = "left") {
      return t.mouseState.released.has(d);
    }
    o(A, "isMouseReleased");
    function tt() {
      return t.isMouseMoved;
    }
    o(tt, "isMouseMoved");
    function Te(d) {
      return d === void 0
        ? t.keyState.pressed.size > 0
        : t.keyState.pressed.has(d);
    }
    o(Te, "isKeyPressed");
    function Yt(d) {
      return d === void 0
        ? t.keyState.pressedRepeat.size > 0
        : t.keyState.pressedRepeat.has(d);
    }
    o(Yt, "isKeyPressedRepeat");
    function nt(d) {
      return d === void 0 ? t.keyState.down.size > 0 : t.keyState.down.has(d);
    }
    o(nt, "isKeyDown");
    function qe(d) {
      return d === void 0
        ? t.keyState.released.size > 0
        : t.keyState.released.has(d);
    }
    o(qe, "isKeyReleased");
    function Xt(d) {
      return d === void 0
        ? t.mergedGamepadState.buttonState.pressed.size > 0
        : t.mergedGamepadState.buttonState.pressed.has(d);
    }
    o(Xt, "isGamepadButtonPressed");
    function Wt(d) {
      return d === void 0
        ? t.mergedGamepadState.buttonState.down.size > 0
        : t.mergedGamepadState.buttonState.down.has(d);
    }
    o(Wt, "isGamepadButtonDown");
    function $e(d) {
      return d === void 0
        ? t.mergedGamepadState.buttonState.released.size > 0
        : t.mergedGamepadState.buttonState.released.has(d);
    }
    o($e, "isGamepadButtonReleased");
    function Jt(d) {
      return t.events.on("resize", d);
    }
    o(Jt, "onResize");
    let ze = o((d, b) => {
        if (typeof d == "function") return t.events.on("keyDown", d);
        if (typeof d == "string" && typeof b == "function")
          return t.events.on("keyDown", (T) => T === d && b(d));
      }, "onKeyDown"),
      Qt = o((d, b) => {
        if (typeof d == "function") return t.events.on("keyPress", d);
        if (typeof d == "string" && typeof b == "function")
          return t.events.on("keyPress", (T) => T === d && b(d));
      }, "onKeyPress"),
      Zt = o((d, b) => {
        if (typeof d == "function") return t.events.on("keyPressRepeat", d);
        if (typeof d == "string" && typeof b == "function")
          return t.events.on("keyPressRepeat", (T) => T === d && b(d));
      }, "onKeyPressRepeat"),
      yt = o((d, b) => {
        if (typeof d == "function") return t.events.on("keyRelease", d);
        if (typeof d == "string" && typeof b == "function")
          return t.events.on("keyRelease", (T) => T === d && b(d));
      }, "onKeyRelease");
    function xt(d, b) {
      return typeof d == "function"
        ? t.events.on("mouseDown", (T) => d(T))
        : t.events.on("mouseDown", (T) => T === d && b(T));
    }
    o(xt, "onMouseDown");
    function Ut(d, b) {
      return typeof d == "function"
        ? t.events.on("mousePress", (T) => d(T))
        : t.events.on("mousePress", (T) => T === d && b(T));
    }
    o(Ut, "onMousePress");
    function Ie(d, b) {
      return typeof d == "function"
        ? t.events.on("mouseRelease", (T) => d(T))
        : t.events.on("mouseRelease", (T) => T === d && b(T));
    }
    o(Ie, "onMouseRelease");
    function en(d) {
      return t.events.on("mouseMove", () => d(ie(), oe()));
    }
    o(en, "onMouseMove");
    function tn(d) {
      return t.events.on("charInput", d);
    }
    o(tn, "onCharInput");
    function nn(d) {
      return t.events.on("touchStart", d);
    }
    o(nn, "onTouchStart");
    function rn(d) {
      return t.events.on("touchMove", d);
    }
    o(rn, "onTouchMove");
    function sn(d) {
      return t.events.on("touchEnd", d);
    }
    o(sn, "onTouchEnd");
    function on(d) {
      return t.events.on("scroll", d);
    }
    o(on, "onScroll");
    function Et(d, b) {
      if (typeof d == "function") return t.events.on("gamepadButtonDown", d);
      if (typeof d == "string" && typeof b == "function")
        return t.events.on("gamepadButtonDown", (T) => T === d && b(d));
    }
    o(Et, "onGamepadButtonDown");
    function St(d, b) {
      if (typeof d == "function") return t.events.on("gamepadButtonPress", d);
      if (typeof d == "string" && typeof b == "function")
        return t.events.on("gamepadButtonPress", (T) => T === d && b(d));
    }
    o(St, "onGamepadButtonPress");
    function Ct(d, b) {
      if (typeof d == "function") return t.events.on("gamepadButtonRelease", d);
      if (typeof d == "string" && typeof b == "function")
        return t.events.on("gamepadButtonRelease", (T) => T === d && b(d));
    }
    o(Ct, "onGamepadButtonRelease");
    function Tt(d, b) {
      return t.events.on("gamepadStick", (T, V) => T === d && b(V));
    }
    o(Tt, "onGamepadStick");
    function At(d) {
      t.events.on("gamepadConnect", d);
    }
    o(At, "onGamepadConnect");
    function an(d) {
      t.events.on("gamepadDisconnect", d);
    }
    o(an, "onGamepadDisconnect");
    function rt(d) {
      return t.mergedGamepadState.stickState.get(d) || new x(0);
    }
    o(rt, "getGamepadStick");
    function un() {
      return [...t.charInputted];
    }
    o(un, "charInputted");
    function Ot() {
      return [...t.gamepads];
    }
    o(Ot, "getGamepads");
    function Pt() {
      t.events.trigger("input"),
        t.keyState.down.forEach((d) => t.events.trigger("keyDown", d)),
        t.mouseState.down.forEach((d) => t.events.trigger("mouseDown", d)),
        it();
    }
    o(Pt, "processInput");
    function cn() {
      t.keyState.update(),
        t.mouseState.update(),
        t.mergedGamepadState.buttonState.update(),
        t.mergedGamepadState.stickState.forEach((d, b) => {
          t.mergedGamepadState.stickState.set(b, new x(0));
        }),
        (t.charInputted = []),
        (t.isMouseMoved = !1),
        t.gamepadStates.forEach((d) => {
          d.buttonState.update(),
            d.stickState.forEach((b, T) => {
              d.stickState.set(T, new x(0));
            });
        });
    }
    o(cn, "resetInput");
    function st(d) {
      let b = {
        index: d.index,
        isPressed: (T) =>
          t.gamepadStates.get(d.index).buttonState.pressed.has(T),
        isDown: (T) => t.gamepadStates.get(d.index).buttonState.down.has(T),
        isReleased: (T) =>
          t.gamepadStates.get(d.index).buttonState.released.has(T),
        getStick: (T) => t.gamepadStates.get(d.index).stickState.get(T),
      };
      return (
        t.gamepads.push(b),
        t.gamepadStates.set(d.index, {
          buttonState: new Qe(),
          stickState: new Map([
            ["left", new x(0)],
            ["right", new x(0)],
          ]),
        }),
        b
      );
    }
    o(st, "registerGamepad");
    function Mt(d) {
      (t.gamepads = t.gamepads.filter((b) => b.index !== d.index)),
        t.gamepadStates.delete(d.index);
    }
    o(Mt, "removeGamepad");
    function it() {
      for (let d of navigator.getGamepads())
        d && !t.gamepadStates.has(d.index) && st(d);
      for (let d of t.gamepads) {
        let b = navigator.getGamepads()[d.index],
          V = (r.gamepads ?? {})[b.id] ?? Fn[b.id] ?? Fn.default,
          Z = t.gamepadStates.get(d.index);
        for (let _ = 0; _ < b.buttons.length; _++)
          b.buttons[_].pressed
            ? (Z.buttonState.down.has(V.buttons[_]) ||
                (t.mergedGamepadState.buttonState.press(V.buttons[_]),
                Z.buttonState.press(V.buttons[_]),
                t.events.trigger("gamepadButtonPress", V.buttons[_])),
              t.events.trigger("gamepadButtonDown", V.buttons[_]))
            : Z.buttonState.down.has(V.buttons[_]) &&
              (t.mergedGamepadState.buttonState.release(V.buttons[_]),
              Z.buttonState.release(V.buttons[_]),
              t.events.trigger("gamepadButtonRelease", V.buttons[_]));
        for (let _ in V.sticks) {
          let Ee = V.sticks[_],
            Fe = new x(b.axes[Ee.x], b.axes[Ee.y]);
          Z.stickState.set(_, Fe),
            t.mergedGamepadState.stickState.set(_, Fe),
            t.events.trigger("gamepadStick", _, Fe);
        }
      }
    }
    o(it, "processGamepad");
    let le = {},
      Ae = {},
      he = {};
    le.mousemove = (d) => {
      let b = new x(d.offsetX, d.offsetY),
        T = new x(d.movementX, d.movementY);
      t.events.onOnce("input", () => {
        (t.isMouseMoved = !0),
          (t.mousePos = b),
          (t.mouseDeltaPos = T),
          t.events.trigger("mouseMove");
      });
    };
    let ot = ["left", "middle", "right", "back", "forward"];
    (le.mousedown = (d) => {
      t.events.onOnce("input", () => {
        let b = ot[d.button];
        b && (t.mouseState.press(b), t.events.trigger("mousePress", b));
      });
    }),
      (le.mouseup = (d) => {
        t.events.onOnce("input", () => {
          let b = ot[d.button];
          b && (t.mouseState.release(b), t.events.trigger("mouseRelease", b));
        });
      });
    let ln = new Set([
        " ",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ]),
      at = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
        " ": "space",
      };
    (le.keydown = (d) => {
      ln.has(d.key) && d.preventDefault(),
        t.events.onOnce("input", () => {
          let b = at[d.key] || d.key.toLowerCase();
          b.length === 1
            ? (t.events.trigger("charInput", b), t.charInputted.push(b))
            : b === "space" &&
              (t.events.trigger("charInput", " "), t.charInputted.push(" ")),
            d.repeat
              ? (t.keyState.pressRepeat(b),
                t.events.trigger("keyPressRepeat", b))
              : (t.keyState.press(b),
                t.events.trigger("keyPressRepeat", b),
                t.events.trigger("keyPress", b));
        });
    }),
      (le.keyup = (d) => {
        t.events.onOnce("input", () => {
          let b = at[d.key] || d.key.toLowerCase();
          t.keyState.release(b), t.events.trigger("keyRelease", b);
        });
      }),
      (le.touchstart = (d) => {
        d.preventDefault(),
          t.events.onOnce("input", () => {
            let b = [...d.changedTouches],
              T = t.canvas.getBoundingClientRect();
            r.touchToMouse !== !1 &&
              ((t.mousePos = new x(b[0].clientX - T.x, b[0].clientY - T.y)),
              t.mouseState.press("left"),
              t.events.trigger("mousePress", "left")),
              b.forEach((V) => {
                t.events.trigger(
                  "touchStart",
                  new x(V.clientX - T.x, V.clientY - T.y),
                  V
                );
              });
          });
      }),
      (le.touchmove = (d) => {
        d.preventDefault(),
          t.events.onOnce("input", () => {
            let b = [...d.changedTouches],
              T = t.canvas.getBoundingClientRect();
            r.touchToMouse !== !1 &&
              ((t.mousePos = new x(b[0].clientX - T.x, b[0].clientY - T.y)),
              t.events.trigger("mouseMove")),
              b.forEach((V) => {
                t.events.trigger(
                  "touchMove",
                  new x(V.clientX - T.x, V.clientY - T.y),
                  V
                );
              });
          });
      }),
      (le.touchend = (d) => {
        t.events.onOnce("input", () => {
          let b = [...d.changedTouches],
            T = t.canvas.getBoundingClientRect();
          r.touchToMouse !== !1 &&
            ((t.mousePos = new x(b[0].clientX - T.x, b[0].clientY - T.y)),
            t.mouseState.release("left"),
            t.events.trigger("mouseRelease", "left")),
            b.forEach((V) => {
              t.events.trigger(
                "touchEnd",
                new x(V.clientX - T.x, V.clientY - T.y),
                V
              );
            });
        });
      }),
      (le.touchcancel = (d) => {
        t.events.onOnce("input", () => {
          let b = [...d.changedTouches],
            T = t.canvas.getBoundingClientRect();
          r.touchToMouse !== !1 &&
            ((t.mousePos = new x(b[0].clientX - T.x, b[0].clientY - T.y)),
            t.mouseState.release("left"),
            t.events.trigger("mouseRelease", "left")),
            b.forEach((V) => {
              t.events.trigger(
                "touchEnd",
                new x(V.clientX - T.x, V.clientY - T.y),
                V
              );
            });
        });
      }),
      (le.wheel = (d) => {
        d.preventDefault(),
          t.events.onOnce("input", () => {
            t.events.trigger("scroll", new x(d.deltaX, d.deltaY));
          });
      }),
      (le.contextmenu = (d) => d.preventDefault()),
      (Ae.visibilitychange = () => {
        document.visibilityState === "visible" && (t.skipTime = !0);
      }),
      (he.gamepadconnected = (d) => {
        let b = st(d.gamepad);
        t.events.onOnce("input", () => {
          t.events.trigger("gamepadConnect", b);
        });
      }),
      (he.gamepaddisconnected = (d) => {
        let b = Ot().filter((T) => T.index === d.gamepad.index)[0];
        Mt(d.gamepad),
          t.events.onOnce("input", () => {
            t.events.trigger("gamepadDisconnect", b);
          });
      });
    for (let d in le) t.canvas.addEventListener(d, le[d]);
    for (let d in Ae) document.addEventListener(d, Ae[d]);
    for (let d in he) window.addEventListener(d, he[d]);
    let Rt = new ResizeObserver((d) => {
      for (let b of d)
        if (b.target === t.canvas) {
          if (
            t.lastWidth === t.canvas.offsetWidth &&
            t.lastHeight === t.canvas.offsetHeight
          )
            return;
          (t.lastWidth = t.canvas.offsetWidth),
            (t.lastHeight = t.canvas.offsetHeight),
            t.events.onOnce("input", () => {
              t.events.trigger("resize");
            });
        }
    });
    return (
      Rt.observe(t.canvas),
      {
        dt: w,
        time: E,
        run: ue,
        canvas: u,
        fps: B,
        numFrames: z,
        quit: v,
        setFullscreen: me,
        isFullscreen: Ge,
        setCursor: q,
        screenshot: N,
        getGamepads: Ot,
        getCursor: Q,
        setCursorLocked: se,
        isCursorLocked: U,
        isTouchscreen: ge,
        mousePos: ie,
        mouseDeltaPos: oe,
        isKeyDown: nt,
        isKeyPressed: Te,
        isKeyPressedRepeat: Yt,
        isKeyReleased: qe,
        isMouseDown: I,
        isMousePressed: ye,
        isMouseReleased: A,
        isMouseMoved: tt,
        isGamepadButtonPressed: Xt,
        isGamepadButtonDown: Wt,
        isGamepadButtonReleased: $e,
        getGamepadStick: rt,
        charInputted: un,
        onResize: Jt,
        onKeyDown: ze,
        onKeyPress: Qt,
        onKeyPressRepeat: Zt,
        onKeyRelease: yt,
        onMouseDown: xt,
        onMousePress: Ut,
        onMouseRelease: Ie,
        onMouseMove: en,
        onCharInput: tn,
        onTouchStart: nn,
        onTouchMove: rn,
        onTouchEnd: sn,
        onScroll: on,
        onGamepadButtonDown: Et,
        onGamepadButtonPress: St,
        onGamepadButtonRelease: Ct,
        onGamepadStick: Tt,
        onGamepadConnect: At,
        onGamepadDisconnect: an,
        events: t.events,
        get paused() {
          return t.paused;
        },
        set paused(d) {
          t.paused = d;
        },
      }
    );
  }, "default");
var Ht = 2.5949095,
  Tr = 1.70158 + 1,
  Ar = (2 * Math.PI) / 3,
  Or = (2 * Math.PI) / 4.5,
  qt = {
    linear: (r) => r,
    easeInSine: (r) => 1 - Math.cos((r * Math.PI) / 2),
    easeOutSine: (r) => Math.sin((r * Math.PI) / 2),
    easeInOutSine: (r) => -(Math.cos(Math.PI * r) - 1) / 2,
    easeInQuad: (r) => r * r,
    easeOutQuad: (r) => 1 - (1 - r) * (1 - r),
    easeInOutQuad: (r) =>
      r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2,
    easeInCubic: (r) => r * r * r,
    easeOutCubic: (r) => 1 - Math.pow(1 - r, 3),
    easeInOutCubic: (r) =>
      r < 0.5 ? 4 * r * r * r : 1 - Math.pow(-2 * r + 2, 3) / 2,
    easeInQuart: (r) => r * r * r * r,
    easeOutQuart: (r) => 1 - Math.pow(1 - r, 4),
    easeInOutQuart: (r) =>
      r < 0.5 ? 8 * r * r * r * r : 1 - Math.pow(-2 * r + 2, 4) / 2,
    easeInQuint: (r) => r * r * r * r * r,
    easeOutQuint: (r) => 1 - Math.pow(1 - r, 5),
    easeInOutQuint: (r) =>
      r < 0.5 ? 16 * r * r * r * r * r : 1 - Math.pow(-2 * r + 2, 5) / 2,
    easeInExpo: (r) => (r === 0 ? 0 : Math.pow(2, 10 * r - 10)),
    easeOutExpo: (r) => (r === 1 ? 1 : 1 - Math.pow(2, -10 * r)),
    easeInOutExpo: (r) =>
      r === 0
        ? 0
        : r === 1
        ? 1
        : r < 0.5
        ? Math.pow(2, 20 * r - 10) / 2
        : (2 - Math.pow(2, -20 * r + 10)) / 2,
    easeInCirc: (r) => 1 - Math.sqrt(1 - Math.pow(r, 2)),
    easeOutCirc: (r) => Math.sqrt(1 - Math.pow(r - 1, 2)),
    easeInOutCirc: (r) =>
      r < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * r, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * r + 2, 2)) + 1) / 2,
    easeInBack: (r) => Tr * r * r * r - 1.70158 * r * r,
    easeOutBack: (r) =>
      1 + Tr * Math.pow(r - 1, 3) + 1.70158 * Math.pow(r - 1, 2),
    easeInOutBack: (r) =>
      r < 0.5
        ? (Math.pow(2 * r, 2) * ((Ht + 1) * 2 * r - Ht)) / 2
        : (Math.pow(2 * r - 2, 2) * ((Ht + 1) * (r * 2 - 2) + Ht) + 2) / 2,
    easeInElastic: (r) =>
      r === 0
        ? 0
        : r === 1
        ? 1
        : -Math.pow(2, 10 * r - 10) * Math.sin((r * 10 - 10.75) * Ar),
    easeOutElastic: (r) =>
      r === 0
        ? 0
        : r === 1
        ? 1
        : Math.pow(2, -10 * r) * Math.sin((r * 10 - 0.75) * Ar) + 1,
    easeInOutElastic: (r) =>
      r === 0
        ? 0
        : r === 1
        ? 1
        : r < 0.5
        ? -(Math.pow(2, 20 * r - 10) * Math.sin((20 * r - 11.125) * Or)) / 2
        : (Math.pow(2, -20 * r + 10) * Math.sin((20 * r - 11.125) * Or)) / 2 +
          1,
    easeInBounce: (r) => 1 - qt.easeOutBounce(1 - r),
    easeOutBounce: (r) =>
      r < 1 / 2.75
        ? 7.5625 * r * r
        : r < 2 / 2.75
        ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75
        : r < 2.5 / 2.75
        ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375
        : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375,
    easeInOutBounce: (r) =>
      r < 0.5
        ? (1 - qt.easeOutBounce(1 - 2 * r)) / 2
        : (1 + qt.easeOutBounce(2 * r - 1)) / 2,
  },
  Ze = qt;
var bt = class {
  static {
    o(this, "Timer");
  }
  time;
  action;
  finished = !1;
  paused = !1;
  constructor(t, u) {
    (this.time = t), (this.action = u);
  }
  tick(t) {
    return this.finished || this.paused
      ? !1
      : ((this.time -= t),
        this.time <= 0
          ? (this.action(), (this.finished = !0), (this.time = 0), !0)
          : !1);
  }
  reset(t) {
    (this.time = t), (this.finished = !1);
  }
};
var Pr =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
var Mr = ur(
  "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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
);
var Rr =
  "data:image/png;base64,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";
var Dr =
  "data:image/png;base64,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";
var xi = "3000.1.0",
  Gr =
    " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  $t = "topleft",
  Fr = 64,
  Ui = "monospace",
  zt = "monospace",
  Ei = 36,
  Br = 64,
  Lr = 256,
  Ir = 2048,
  Vr = 2048,
  Nr = 2048,
  jr = 2048,
  kr = 0.1,
  Si = 64,
  _r = "nearest",
  Ci = 8,
  Ti = 4,
  $r = [
    { name: "a_pos", size: 2 },
    { name: "a_uv", size: 2 },
    { name: "a_color", size: 4 },
  ],
  Kt = $r.reduce((r, t) => r + t.size, 0),
  zr = 2048,
  Hr = zr * 4 * Kt,
  qr = zr * 6,
  Ai = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`,
  Oi = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`,
  In = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`,
  Vn = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`,
  Pi = new Set(["id", "require"]),
  Mi = new Set(["add", "update", "draw", "destroy", "inspect", "drawInspect"]);
function et(r) {
  switch (r) {
    case "topleft":
      return new x(-1, -1);
    case "top":
      return new x(0, -1);
    case "topright":
      return new x(1, -1);
    case "left":
      return new x(-1, 0);
    case "center":
      return new x(0, 0);
    case "right":
      return new x(1, 0);
    case "botleft":
      return new x(-1, 1);
    case "bot":
      return new x(0, 1);
    case "botright":
      return new x(1, 1);
    default:
      return r;
  }
}
o(et, "anchorPt");
function Ri(r) {
  switch (r) {
    case "left":
      return 0;
    case "center":
      return 0.5;
    case "right":
      return 1;
    default:
      return 0;
  }
}
o(Ri, "alignPt");
function Di(r) {
  return r.createBuffer(1, 1, 44100);
}
o(Di, "createEmptyAudioBuffer");
var ho = o((r = {}) => {
  let t = r.root ?? document.body;
  t === document.body &&
    ((document.body.style.width = "100%"),
    (document.body.style.height = "100%"),
    (document.body.style.margin = "0px"),
    (document.documentElement.style.width = "100%"),
    (document.documentElement.style.height = "100%"));
  let u =
      r.canvas ??
      (() => {
        let e = document.createElement("canvas");
        return t.appendChild(e), e;
      })(),
    w = r.scale ?? 1,
    E = r.width && r.height && !r.stretch && !r.letterbox;
  E
    ? ((u.width = r.width * w), (u.height = r.height * w))
    : ((u.width = u.parentElement.offsetWidth),
      (u.height = u.parentElement.offsetHeight));
  let B = u.width,
    z = u.height,
    N = r.pixelDensity || window.devicePixelRatio;
  (u.width *= N), (u.height *= N);
  let q = ["outline: none", "cursor: default"];
  E
    ? (q.push(`width: ${B}px`), q.push(`height: ${z}px`))
    : (q.push("width: 100%"), q.push("height: 100%")),
    r.crisp &&
      (q.push("image-rendering: pixelated"),
      q.push("image-rendering: crisp-edges")),
    (u.style.cssText = q.join(";")),
    (u.tabIndex = 0);
  let Q = document.createElement("canvas");
  (Q.width = Lr), (Q.height = Lr);
  let se = Q.getContext("2d", { willReadFrequently: !0 }),
    U = Cr({
      canvas: u,
      touchToMouse: r.touchToMouse,
      gamepads: r.gamepads,
      pixelDensity: r.pixelDensity,
      maxFPS: r.maxFPS,
    }),
    X = [],
    h = U.canvas().getContext("webgl", {
      antialias: !0,
      depth: !0,
      stencil: !0,
      alpha: !0,
      preserveDrawingBuffer: !0,
    });
  class W {
    static {
      o(this, "Texture");
    }
    src = null;
    glTex;
    width;
    height;
    constructor(n, s, i = {}) {
      (this.glTex = h.createTexture()),
        X.push(() => this.free()),
        this.bind(),
        n &&
          s &&
          h.texImage2D(
            h.TEXTURE_2D,
            0,
            h.RGBA,
            n,
            s,
            0,
            h.RGBA,
            h.UNSIGNED_BYTE,
            null
          ),
        (this.width = n),
        (this.height = s);
      let a = (() => {
          switch (i.filter ?? r.texFilter) {
            case "linear":
              return h.LINEAR;
            case "nearest":
              return h.NEAREST;
            default:
              return h.NEAREST;
          }
        })(),
        c = (() => {
          switch (i.wrap) {
            case "repeat":
              return h.REPEAT;
            case "clampToEdge":
              return h.CLAMP_TO_EDGE;
            default:
              return h.CLAMP_TO_EDGE;
          }
        })();
      h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, a),
        h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, a),
        h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, c),
        h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T, c),
        this.unbind();
    }
    static fromImage(n, s = {}) {
      let i = new W(0, 0, s);
      return (
        i.bind(),
        h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, h.RGBA, h.UNSIGNED_BYTE, n),
        (i.width = n.width),
        (i.height = n.height),
        i.unbind(),
        (i.src = n),
        i
      );
    }
    update(n, s = 0, i = 0) {
      this.bind(),
        h.texSubImage2D(h.TEXTURE_2D, 0, s, i, h.RGBA, h.UNSIGNED_BYTE, n),
        this.unbind();
    }
    bind() {
      h.bindTexture(h.TEXTURE_2D, this.glTex);
    }
    unbind() {
      h.bindTexture(h.TEXTURE_2D, null);
    }
    free() {
      h.deleteTexture(this.glTex);
    }
  }
  class me {
    static {
      o(this, "TexPacker");
    }
    tex;
    canvas;
    ctx;
    x = 0;
    y = 0;
    curHeight = 0;
    constructor(n, s) {
      (this.canvas = document.createElement("canvas")),
        (this.canvas.width = n),
        (this.canvas.height = s),
        (this.tex = W.fromImage(this.canvas)),
        (this.ctx = this.canvas.getContext("2d"));
    }
    add(n) {
      if (n.width > this.canvas.width || n.height > this.canvas.height)
        throw new Error(
          `Texture size (${n.width} x ${n.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`
        );
      this.x + n.width > this.canvas.width &&
        ((this.x = 0), (this.y += this.curHeight), (this.curHeight = 0)),
        this.y + n.height > this.canvas.height &&
          (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
          (this.tex = W.fromImage(this.canvas)),
          (this.x = 0),
          (this.y = 0),
          (this.curHeight = 0));
      let s = new x(this.x, this.y);
      return (
        (this.x += n.width),
        n.height > this.curHeight && (this.curHeight = n.height),
        n instanceof ImageData
          ? this.ctx.putImageData(n, s.x, s.y)
          : this.ctx.drawImage(n, s.x, s.y),
        this.tex.update(this.canvas),
        [
          this.tex,
          new ae(
            s.x / this.canvas.width,
            s.y / this.canvas.height,
            n.width / this.canvas.width,
            n.height / this.canvas.height
          ),
        ]
      );
    }
  }
  class Ge {
    static {
      o(this, "FrameBuffer");
    }
    tex;
    glFrameBuffer;
    glRenderBuffer;
    constructor(n, s, i = {}) {
      (this.tex = new W(n, s, i)),
        (this.glFrameBuffer = h.createFramebuffer()),
        (this.glRenderBuffer = h.createRenderbuffer()),
        X.push(() => this.free()),
        this.bind(),
        h.renderbufferStorage(h.RENDERBUFFER, h.DEPTH_STENCIL, n, s),
        h.framebufferTexture2D(
          h.FRAMEBUFFER,
          h.COLOR_ATTACHMENT0,
          h.TEXTURE_2D,
          this.tex.glTex,
          0
        ),
        h.framebufferRenderbuffer(
          h.FRAMEBUFFER,
          h.DEPTH_STENCIL_ATTACHMENT,
          h.RENDERBUFFER,
          this.glRenderBuffer
        ),
        this.unbind();
    }
    get width() {
      return this.tex.width;
    }
    get height() {
      return this.tex.height;
    }
    bind() {
      h.bindFramebuffer(h.FRAMEBUFFER, this.glFrameBuffer),
        h.bindRenderbuffer(h.RENDERBUFFER, this.glRenderBuffer);
    }
    unbind() {
      h.bindFramebuffer(h.FRAMEBUFFER, null),
        h.bindRenderbuffer(h.RENDERBUFFER, null);
    }
    free() {
      h.deleteFramebuffer(this.glFrameBuffer),
        h.deleteRenderbuffer(this.glRenderBuffer),
        this.tex.free();
    }
  }
  let v = (() => {
    let e = it(In, Vn),
      n = W.fromImage(
        new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
      ),
      s =
        r.width && r.height
          ? new Ge(r.width * N, r.height * N)
          : new Ge(h.drawingBufferWidth, h.drawingBufferHeight),
      i = null,
      a = 1;
    r.background &&
      ((i = $.fromArray(r.background)),
      (a = r.background[3] ?? 1),
      h.clearColor(i.r / 255, i.g / 255, i.b / 255, a)),
      h.enable(h.BLEND),
      h.enable(h.SCISSOR_TEST),
      h.blendFuncSeparate(
        h.SRC_ALPHA,
        h.ONE_MINUS_SRC_ALPHA,
        h.ONE,
        h.ONE_MINUS_SRC_ALPHA
      );
    let c = h.createBuffer();
    h.bindBuffer(h.ARRAY_BUFFER, c),
      h.bufferData(h.ARRAY_BUFFER, Hr * 4, h.DYNAMIC_DRAW),
      $r.reduce(
        (m, l, p) => (
          h.vertexAttribPointer(p, l.size, h.FLOAT, !1, Kt * 4, m),
          h.enableVertexAttribArray(p),
          m + l.size * 4
        ),
        0
      ),
      h.bindBuffer(h.ARRAY_BUFFER, null);
    let f = h.createBuffer();
    h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, f),
      h.bufferData(h.ELEMENT_ARRAY_BUFFER, qr * 4, h.DYNAMIC_DRAW),
      h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null);
    let g = W.fromImage(
      new ImageData(
        new Uint8ClampedArray([
          128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128,
          128, 255,
        ]),
        2,
        2
      ),
      { wrap: "repeat", filter: "nearest" }
    );
    return {
      drawCalls: 0,
      lastDrawCalls: 0,
      defShader: e,
      curShader: e,
      frameBuffer: s,
      postShader: null,
      postShaderUniform: null,
      defTex: n,
      curTex: n,
      curUniform: {},
      vbuf: c,
      ibuf: f,
      vqueue: [],
      iqueue: [],
      transform: new be(),
      transformStack: [],
      bgTex: g,
      bgColor: i,
      bgAlpha: a,
      width: r.width ?? h.drawingBufferWidth / N / w,
      height: r.height ?? h.drawingBufferHeight / N / w,
      viewport: {
        x: 0,
        y: 0,
        width: h.drawingBufferWidth,
        height: h.drawingBufferHeight,
      },
      fixed: !1,
    };
  })();
  class ue {
    static {
      o(this, "SpriteData");
    }
    tex;
    frames = [new ae(0, 0, 1, 1)];
    anims = {};
    slice9 = null;
    constructor(n, s, i = {}, a = null) {
      (this.tex = n),
        s && (this.frames = s),
        (this.anims = i),
        (this.slice9 = a);
    }
    static from(n, s = {}) {
      return typeof n == "string"
        ? ue.fromURL(n, s)
        : Promise.resolve(ue.fromImage(n, s));
    }
    static fromImage(n, s = {}) {
      let [i, a] = I.packer.add(n),
        c = s.frames
          ? s.frames.map(
              (f) =>
                new ae(a.x + f.x * a.w, a.y + f.y * a.h, f.w * a.w, f.h * a.h)
            )
          : yt(s.sliceX || 1, s.sliceY || 1, a.x, a.y, a.w, a.h);
      return new ue(i, c, s.anims, s.slice9);
    }
    static fromURL(n, s = {}) {
      return $e(n).then((i) => ue.fromImage(i, s));
    }
  }
  class ge {
    static {
      o(this, "SoundData");
    }
    buf;
    constructor(n) {
      this.buf = n;
    }
    static fromArrayBuffer(n) {
      return new Promise((s, i) => ie.ctx.decodeAudioData(n, s, i)).then(
        (s) => new ge(s)
      );
    }
    static fromURL(n) {
      return Gn(n)
        ? ge.fromArrayBuffer(xr(n))
        : Wt(n).then((s) => ge.fromArrayBuffer(s));
    }
  }
  let ie = (() => {
    let e = new (window.AudioContext || window.webkitAudioContext)(),
      n = e.createGain();
    n.connect(e.destination);
    let s = new ge(Di(e));
    return (
      e
        .decodeAudioData(Mr.buffer.slice(0))
        .then((i) => {
          s.buf = i;
        })
        .catch((i) => {
          console.error("Failed to load burp: ", i);
        }),
      { ctx: e, masterNode: n, burpSnd: s }
    );
  })();
  class oe {
    static {
      o(this, "Asset");
    }
    loaded = !1;
    data = null;
    error = null;
    onLoadEvents = new ve();
    onErrorEvents = new ve();
    onFinishEvents = new ve();
    constructor(n) {
      n.then((s) => {
        (this.data = s), this.onLoadEvents.trigger(s);
      })
        .catch((s) => {
          if (((this.error = s), this.onErrorEvents.numListeners() > 0))
            this.onErrorEvents.trigger(s);
          else throw s;
        })
        .finally(() => {
          this.onFinishEvents.trigger(), (this.loaded = !0);
        });
    }
    static loaded(n) {
      let s = new oe(Promise.resolve(n));
      return (s.data = n), (s.loaded = !0), s;
    }
    onLoad(n) {
      return (
        this.loaded && this.data ? n(this.data) : this.onLoadEvents.add(n), this
      );
    }
    onError(n) {
      return (
        this.loaded && this.error ? n(this.error) : this.onErrorEvents.add(n),
        this
      );
    }
    onFinish(n) {
      return this.loaded ? n() : this.onFinishEvents.add(n), this;
    }
    then(n) {
      return this.onLoad(n);
    }
    catch(n) {
      return this.onError(n);
    }
    finally(n) {
      return this.onFinish(n);
    }
  }
  class ye {
    static {
      o(this, "AssetBucket");
    }
    assets = new Map();
    lastUID = 0;
    add(n, s) {
      let i = n ?? this.lastUID++ + "",
        a = new oe(s);
      return this.assets.set(i, a), a;
    }
    addLoaded(n, s) {
      let i = n ?? this.lastUID++ + "",
        a = oe.loaded(s);
      return this.assets.set(i, a), a;
    }
    get(n) {
      return this.assets.get(n);
    }
    progress() {
      if (this.assets.size === 0) return 1;
      let n = 0;
      return (
        this.assets.forEach((s) => {
          s.loaded && n++;
        }),
        n / this.assets.size
      );
    }
  }
  let I = {
      urlPrefix: "",
      sprites: new ye(),
      fonts: new ye(),
      bitmapFonts: new ye(),
      sounds: new ye(),
      shaders: new ye(),
      custom: new ye(),
      packer: new me(Nr, jr),
      loaded: !1,
    },
    A = {
      events: new De(),
      objEvents: new De(),
      root: dn([]),
      gravity: 0,
      scenes: {},
      logs: [],
      cam: {
        pos: null,
        scale: new x(1),
        angle: 0,
        shake: 0,
        transform: new be(),
      },
    };
  function tt(e) {
    return I.custom.add(null, e);
  }
  o(tt, "load");
  function Te() {
    let e = [I.sprites, I.sounds, I.shaders, I.fonts, I.bitmapFonts, I.custom];
    return e.reduce((n, s) => n + s.progress(), 0) / e.length;
  }
  o(Te, "loadProgress");
  function Yt(e) {
    return e !== void 0 && (I.urlPrefix = e), I.urlPrefix;
  }
  o(Yt, "loadRoot");
  function nt(e) {
    let n = I.urlPrefix + e;
    return fetch(n).then((s) => {
      if (!s.ok) throw new Error(`Failed to fetch ${n}`);
      return s;
    });
  }
  o(nt, "fetchURL");
  function qe(e) {
    return nt(e).then((n) => n.json());
  }
  o(qe, "fetchJSON");
  function Xt(e) {
    return nt(e).then((n) => n.text());
  }
  o(Xt, "fetchText");
  function Wt(e) {
    return nt(e).then((n) => n.arrayBuffer());
  }
  o(Wt, "fetchArrayBuffer");
  function $e(e) {
    let n = new Image();
    return (
      (n.crossOrigin = "anonymous"),
      (n.src = Gn(e) ? e : I.urlPrefix + e),
      new Promise((s, i) => {
        (n.onload = () => s(n)),
          (n.onerror = () => i(new Error(`Failed to load image from "${e}"`)));
      })
    );
  }
  o($e, "loadImg");
  function Jt(e, n) {
    return I.custom.add(e, qe(n));
  }
  o(Jt, "loadJSON");
  class ze {
    static {
      o(this, "FontData");
    }
    fontface;
    outline;
    filter;
    constructor(n, s = {}) {
      (this.fontface = n),
        (this.outline = s.outline ?? 0),
        (this.filter = s.filter ?? _r);
    }
  }
  function Qt(e, n, s = {}) {
    let i = new FontFace(e, typeof n == "string" ? `url(${n})` : n);
    return (
      document.fonts.add(i),
      I.fonts.add(
        e,
        i
          .load()
          .catch((a) => {
            throw new Error(`Failed to load font from "${n}": ${a}`);
          })
          .then((a) => new ze(a, s))
      )
    );
  }
  o(Qt, "loadFont");
  function Zt(e, n, s, i, a = {}) {
    return I.bitmapFonts.add(
      e,
      $e(n).then((c) => le(W.fromImage(c, a), s, i, a.chars ?? Gr))
    );
  }
  o(Zt, "loadBitmapFont");
  function yt(e = 1, n = 1, s = 0, i = 0, a = 1, c = 1) {
    let f = [],
      g = a / e,
      m = c / n;
    for (let l = 0; l < n; l++)
      for (let p = 0; p < e; p++) f.push(new ae(s + p * g, i + l * m, g, m));
    return f;
  }
  o(yt, "slice");
  function xt(e, n) {
    return tt(
      typeof n == "string"
        ? new Promise((s, i) => {
            qe(n).then((a) => {
              xt(e, a).then(s).catch(i);
            });
          })
        : ue.from(e).then((s) => {
            let i = {};
            for (let a in n) {
              let c = n[a],
                f = s.frames[0],
                g = Nr * f.w,
                m = jr * f.h,
                l = c.frames
                  ? c.frames.map(
                      (S) =>
                        new ae(
                          f.x + ((c.x + S.x) / g) * f.w,
                          f.y + ((c.y + S.y) / m) * f.h,
                          (S.w / g) * f.w,
                          (S.h / m) * f.h
                        )
                    )
                  : yt(
                      c.sliceX || 1,
                      c.sliceY || 1,
                      f.x + (c.x / g) * f.w,
                      f.y + (c.y / m) * f.h,
                      (c.width / g) * f.w,
                      (c.height / m) * f.h
                    ),
                p = new ue(s.tex, l, c.anims);
              I.sprites.addLoaded(a, p), (i[a] = p);
            }
            return i;
          })
    );
  }
  o(xt, "loadSpriteAtlas");
  function Ut(e, n = {}) {
    let s = document.createElement("canvas"),
      i = e[0].width,
      a = e[0].height;
    (s.width = i * e.length), (s.height = a);
    let c = s.getContext("2d");
    e.forEach((g, m) => {
      g instanceof ImageData
        ? c.putImageData(g, m * i, 0)
        : c.drawImage(g, m * i, 0);
    });
    let f = c.getImageData(0, 0, e.length * i, a);
    return ue.fromImage(f, { ...n, sliceX: e.length, sliceY: 1 });
  }
  o(Ut, "createSpriteSheet");
  function Ie(e, n, s = { sliceX: 1, sliceY: 1, anims: {} }) {
    return Array.isArray(n)
      ? n.some((i) => typeof i == "string")
        ? I.sprites.add(
            e,
            Promise.all(
              n.map((i) => (typeof i == "string" ? $e(i) : Promise.resolve(i)))
            ).then((i) => Ut(i, s))
          )
        : I.sprites.addLoaded(e, Ut(n, s))
      : typeof n == "string"
      ? I.sprites.add(e, ue.from(n, s))
      : I.sprites.addLoaded(e, ue.fromImage(n, s));
  }
  o(Ie, "loadSprite");
  function en(e, n) {
    return I.sprites.add(
      e,
      new Promise(async (s) => {
        let i = typeof n == "string" ? await qe(n) : n,
          a = await Promise.all(i.frames.map($e)),
          c = document.createElement("canvas");
        (c.width = i.width), (c.height = i.height * i.frames.length);
        let f = c.getContext("2d");
        a.forEach((m, l) => {
          f.drawImage(m, 0, l * i.height);
        });
        let g = await Ie(null, c, { sliceY: i.frames.length, anims: i.anims });
        s(g);
      })
    );
  }
  o(en, "loadPedit");
  function tn(e, n, s) {
    typeof n == "string" &&
      !s &&
      (s = n.replace(new RegExp(`${Er(n)}$`), "json"));
    let i = typeof s == "string" ? qe(s) : Promise.resolve(s);
    return I.sprites.add(
      e,
      i.then((a) => {
        let c = a.meta.size,
          f = a.frames.map(
            (m) =>
              new ae(
                m.frame.x / c.w,
                m.frame.y / c.h,
                m.frame.w / c.w,
                m.frame.h / c.h
              )
          ),
          g = {};
        for (let m of a.meta.frameTags)
          m.from === m.to
            ? (g[m.name] = m.from)
            : (g[m.name] = {
                from: m.from,
                to: m.to,
                speed: 10,
                loop: !0,
                pingpong: m.direction === "pingpong",
              });
        return ue.from(n, { frames: f, anims: g });
      })
    );
  }
  o(tn, "loadAseprite");
  function nn(e, n, s) {
    return I.shaders.addLoaded(e, it(n, s));
  }
  o(nn, "loadShader");
  function rn(e, n, s) {
    let i = o((c) => (c ? Xt(c) : Promise.resolve(null)), "resolveUrl"),
      a = Promise.all([i(n), i(s)]).then(([c, f]) => it(c, f));
    return I.shaders.add(e, a);
  }
  o(rn, "loadShaderURL");
  function sn(e, n) {
    return I.sounds.add(
      e,
      typeof n == "string" ? ge.fromURL(n) : ge.fromArrayBuffer(n)
    );
  }
  o(sn, "loadSound");
  function on(e = "bean") {
    return Ie(e, Pr);
  }
  o(on, "loadBean");
  function Et(e) {
    return I.sprites.get(e);
  }
  o(Et, "getSprite");
  function St(e) {
    return I.sounds.get(e);
  }
  o(St, "getSound");
  function Ct(e) {
    return I.fonts.get(e);
  }
  o(Ct, "getFont");
  function Tt(e) {
    return I.bitmapFonts.get(e);
  }
  o(Tt, "getBitmapFont");
  function At(e) {
    return I.shaders.get(e);
  }
  o(At, "getShader");
  function an(e) {
    return I.custom.get(e);
  }
  o(an, "getAsset");
  function rt(e) {
    if (typeof e == "string") {
      let n = Et(e);
      if (n) return n;
      if (Te() < 1) return null;
      throw new Error(`Sprite not found: ${e}`);
    } else {
      if (e instanceof ue) return oe.loaded(e);
      if (e instanceof oe) return e;
      throw new Error(`Invalid sprite: ${e}`);
    }
  }
  o(rt, "resolveSprite");
  function un(e) {
    if (typeof e == "string") {
      let n = St(e);
      if (n) return n;
      if (Te() < 1) return null;
      throw new Error(`Sound not found: ${e}`);
    } else {
      if (e instanceof ge) return oe.loaded(e);
      if (e instanceof oe) return e;
      throw new Error(`Invalid sound: ${e}`);
    }
  }
  o(un, "resolveSound");
  function Ot(e) {
    if (!e) return v.defShader;
    if (typeof e == "string") {
      let n = At(e);
      if (n) return n.data ?? n;
      if (Te() < 1) return null;
      throw new Error(`Shader not found: ${e}`);
    } else if (e instanceof oe) return e.data ? e.data : e;
    return e;
  }
  o(Ot, "resolveShader");
  function Pt(e) {
    if (!e) return Pt(r.font ?? Ui);
    if (typeof e == "string") {
      let n = Tt(e),
        s = Ct(e);
      if (n) return n.data ?? n;
      if (s) return s.data ?? s;
      if (document.fonts.check(`${Br}px ${e}`)) return e;
      if (Te() < 1) return null;
      throw new Error(`Font not found: ${e}`);
    } else if (e instanceof oe) return e.data ? e.data : e;
    return e;
  }
  o(Pt, "resolveFont");
  function cn(e) {
    return (
      e !== void 0 && (ie.masterNode.gain.value = e), ie.masterNode.gain.value
    );
  }
  o(cn, "volume");
  function st(e, n = {}) {
    let s = ie.ctx,
      i = n.paused ?? !1,
      a = s.createBufferSource(),
      c = new ve(),
      f = s.createGain(),
      g = n.seek ?? 0,
      m = 0,
      l = 0,
      p = !1;
    (a.loop = !!n.loop),
      (a.detune.value = n.detune ?? 0),
      (a.playbackRate.value = n.speed ?? 1),
      a.connect(f),
      (a.onended = () => {
        G() >= a.buffer?.duration && c.trigger();
      }),
      f.connect(ie.masterNode),
      (f.gain.value = n.volume ?? 1);
    let S = o((M) => {
        (a.buffer = M.buf), i || ((m = s.currentTime), a.start(0, g), (p = !0));
      }, "start"),
      R = un(e);
    R instanceof oe && R.onLoad(S);
    let G = o(() => {
        if (!a.buffer) return 0;
        let M = i ? l - m : s.currentTime - m,
          O = a.buffer.duration;
        return a.loop ? M % O : Math.min(M, O);
      }, "getTime"),
      k = o((M) => {
        let O = s.createBufferSource();
        return (
          (O.buffer = M.buffer),
          (O.loop = M.loop),
          (O.playbackRate.value = M.playbackRate.value),
          (O.detune.value = M.detune.value),
          (O.onended = M.onended),
          O.connect(f),
          O
        );
      }, "cloneNode");
    return {
      set paused(M) {
        if (i !== M)
          if (((i = M), M)) p && (a.stop(), (p = !1)), (l = s.currentTime);
          else {
            a = k(a);
            let O = l - m;
            a.start(0, O), (p = !0), (m = s.currentTime - O), (l = 0);
          }
      },
      get paused() {
        return i;
      },
      play(M = 0) {
        this.seek(M), (this.paused = !1);
      },
      seek(M) {
        a.buffer?.duration &&
          (M > a.buffer.duration ||
            (i
              ? ((a = k(a)), (m = l - M))
              : (a.stop(),
                (a = k(a)),
                (m = s.currentTime - M),
                a.start(0, M),
                (p = !0),
                (l = 0))));
      },
      set speed(M) {
        a.playbackRate.value = M;
      },
      get speed() {
        return a.playbackRate.value;
      },
      set detune(M) {
        a.detune.value = M;
      },
      get detune() {
        return a.detune.value;
      },
      set volume(M) {
        f.gain.value = Math.max(M, 0);
      },
      get volume() {
        return f.gain.value;
      },
      set loop(M) {
        a.loop = M;
      },
      get loop() {
        return a.loop;
      },
      duration() {
        return a.buffer?.duration ?? 0;
      },
      time() {
        return G() % this.duration();
      },
      onEnd(M) {
        return c.add(M);
      },
      then(M) {
        return this.onEnd(M);
      },
    };
  }
  o(st, "play");
  function Mt(e) {
    return st(ie.burpSnd, e);
  }
  o(Mt, "burp");
  function it(e = In, n = Vn) {
    let s = Ai.replace("{{user}}", e ?? In),
      i = Oi.replace("{{user}}", n ?? Vn),
      a = h.createShader(h.VERTEX_SHADER),
      c = h.createShader(h.FRAGMENT_SHADER);
    h.shaderSource(a, s),
      h.shaderSource(c, i),
      h.compileShader(a),
      h.compileShader(c);
    let f = h.createProgram();
    if (
      (X.push(() => h.deleteProgram(f)),
      h.attachShader(f, a),
      h.attachShader(f, c),
      h.bindAttribLocation(f, 0, "a_pos"),
      h.bindAttribLocation(f, 1, "a_uv"),
      h.bindAttribLocation(f, 2, "a_color"),
      h.linkProgram(f),
      !h.getProgramParameter(f, h.LINK_STATUS))
    ) {
      let g = o((S) => {
          let R = /^ERROR:\s0:(?<line>\d+):\s(?<msg>.+)/,
            G = S.match(R);
          return {
            line: Number(G.groups.line),
            msg: G.groups.msg.replace(/\n\0$/, ""),
          };
        }, "formatShaderError"),
        m = h.getShaderInfoLog(a),
        l = h.getShaderInfoLog(c),
        p = "";
      if (m) {
        let S = g(m);
        p += `Vertex shader line ${S.line - 14}: ${S.msg}`;
      }
      if (l) {
        let S = g(l);
        p += `Fragment shader line ${S.line - 14}: ${S.msg}`;
      }
      throw new Error(p);
    }
    return (
      h.deleteShader(a),
      h.deleteShader(c),
      {
        bind() {
          h.useProgram(f);
        },
        unbind() {
          h.useProgram(null);
        },
        free() {
          h.deleteProgram(f);
        },
        send(g) {
          for (let m in g) {
            let l = g[m],
              p = h.getUniformLocation(f, m);
            typeof l == "number"
              ? h.uniform1f(p, l)
              : l instanceof be
              ? h.uniformMatrix4fv(p, !1, new Float32Array(l.m))
              : l instanceof $
              ? h.uniform3f(p, l.r, l.g, l.b)
              : l instanceof x && h.uniform2f(p, l.x, l.y);
          }
        },
      }
    );
  }
  o(it, "makeShader");
  function le(e, n, s, i) {
    let a = e.width / n,
      c = {},
      f = i.split("").entries();
    for (let [g, m] of f)
      c[m] = new ae((g % a) * n, Math.floor(g / a) * s, n, s);
    return { tex: e, map: c, size: s };
  }
  o(le, "makeFont");
  function Ae(e, n, s, i = v.defTex, a = v.defShader, c = {}) {
    let f = Ot(a);
    if (!f || f instanceof oe) return;
    (i !== v.curTex ||
      f !== v.curShader ||
      !Mn(v.curUniform, c) ||
      v.vqueue.length + e.length * Kt > Hr ||
      v.iqueue.length + n.length > qr) &&
      he();
    let g = v.fixed || s ? v.transform : A.cam.transform.mult(v.transform);
    for (let m of e) {
      let l = Rt(g.multVec2(m.pos));
      v.vqueue.push(
        l.x,
        l.y,
        m.uv.x,
        m.uv.y,
        m.color.r / 255,
        m.color.g / 255,
        m.color.b / 255,
        m.opacity
      );
    }
    for (let m of n) v.iqueue.push(m + v.vqueue.length / Kt - e.length);
    (v.curTex = i), (v.curShader = f), (v.curUniform = c);
  }
  o(Ae, "drawRaw");
  function he() {
    !v.curTex ||
      !v.curShader ||
      v.vqueue.length === 0 ||
      v.iqueue.length === 0 ||
      (h.bindBuffer(h.ARRAY_BUFFER, v.vbuf),
      h.bufferSubData(h.ARRAY_BUFFER, 0, new Float32Array(v.vqueue)),
      h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, v.ibuf),
      h.bufferSubData(h.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(v.iqueue)),
      v.curShader.bind(),
      v.curShader.send(v.curUniform),
      v.curTex.bind(),
      h.drawElements(h.TRIANGLES, v.iqueue.length, h.UNSIGNED_SHORT, 0),
      v.curTex.unbind(),
      v.curShader.unbind(),
      h.bindBuffer(h.ARRAY_BUFFER, null),
      h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null),
      (v.vqueue.length = 0),
      (v.iqueue.length = 0),
      v.drawCalls++);
  }
  o(he, "flush");
  function ot() {
    h.clear(h.COLOR_BUFFER_BIT),
      v.frameBuffer.bind(),
      h.viewport(0, 0, v.frameBuffer.width, v.frameBuffer.height),
      h.clear(h.COLOR_BUFFER_BIT),
      v.bgColor ||
        Be(() => {
          Ee({
            width: pe(),
            height: we(),
            quad: new ae(0, 0, pe() / Fr, we() / Fr),
            tex: v.bgTex,
            fixed: !0,
          });
        }),
      (v.drawCalls = 0),
      (v.fixed = !1),
      (v.transformStack.length = 0),
      (v.transform = new be());
  }
  o(ot, "frameStart");
  function ln(e, n) {
    (v.postShader = e), (v.postShaderUniform = n ?? null);
  }
  o(ln, "usePostEffect");
  function at() {
    he(),
      v.frameBuffer.unbind(),
      h.viewport(0, 0, h.drawingBufferWidth, h.drawingBufferHeight),
      he();
    let e = v.width,
      n = v.height;
    (v.width = h.drawingBufferWidth / N),
      (v.height = h.drawingBufferHeight / N),
      Fe({
        flipY: !0,
        tex: v.frameBuffer.tex,
        pos: new x(v.viewport.x, v.viewport.y),
        width: v.viewport.width,
        height: v.viewport.height,
        shader: v.postShader,
        uniform:
          typeof v.postShaderUniform == "function"
            ? v.postShaderUniform()
            : v.postShaderUniform,
        fixed: !0,
      }),
      he(),
      (v.width = e),
      (v.height = n),
      (v.lastDrawCalls = v.drawCalls);
  }
  o(at, "frameEnd");
  function Rt(e) {
    return new x((e.x / pe()) * 2 - 1, (-e.y / we()) * 2 + 1);
  }
  o(Rt, "screen2ndc");
  function d(e) {
    v.transform = e.clone();
  }
  o(d, "pushMatrix");
  function b(...e) {
    if (e[0] === void 0) return;
    let n = C(...e);
    (n.x === 0 && n.y === 0) || v.transform.translate(n);
  }
  o(b, "pushTranslate");
  function T(...e) {
    if (e[0] === void 0) return;
    let n = C(...e);
    (n.x === 1 && n.y === 1) || v.transform.scale(n);
  }
  o(T, "pushScale");
  function V(e) {
    e && v.transform.rotate(e);
  }
  o(V, "pushRotate");
  function Z() {
    v.transformStack.push(v.transform.clone());
  }
  o(Z, "pushTransform");
  function _() {
    v.transformStack.length > 0 && (v.transform = v.transformStack.pop());
  }
  o(_, "popTransform");
  function Ee(e) {
    if (e.width === void 0 || e.height === void 0)
      throw new Error('drawUVQuad() requires property "width" and "height".');
    if (e.width <= 0 || e.height <= 0) return;
    let n = e.width,
      s = e.height,
      a = et(e.anchor || $t).scale(new x(n, s).scale(-0.5)),
      c = e.quad || new ae(0, 0, 1, 1),
      f = e.color || J(255, 255, 255),
      g = e.opacity ?? 1,
      m = e.tex ? kr / e.tex.width : 0,
      l = e.tex ? kr / e.tex.height : 0,
      p = c.x + m,
      S = c.y + l,
      R = c.w - m * 2,
      G = c.h - l * 2;
    Z(),
      b(e.pos),
      V(e.angle),
      T(e.scale),
      b(a),
      Ae(
        [
          {
            pos: new x(-n / 2, s / 2),
            uv: new x(e.flipX ? p + R : p, e.flipY ? S : S + G),
            color: f,
            opacity: g,
          },
          {
            pos: new x(-n / 2, -s / 2),
            uv: new x(e.flipX ? p + R : p, e.flipY ? S + G : S),
            color: f,
            opacity: g,
          },
          {
            pos: new x(n / 2, -s / 2),
            uv: new x(e.flipX ? p : p + R, e.flipY ? S + G : S),
            color: f,
            opacity: g,
          },
          {
            pos: new x(n / 2, s / 2),
            uv: new x(e.flipX ? p : p + R, e.flipY ? S : S + G),
            color: f,
            opacity: g,
          },
        ],
        [0, 1, 3, 1, 2, 3],
        e.fixed,
        e.tex,
        e.shader,
        e.uniform
      ),
      _();
  }
  o(Ee, "drawUVQuad");
  function Fe(e) {
    if (!e.tex) throw new Error('drawTexture() requires property "tex".');
    let n = e.quad ?? new ae(0, 0, 1, 1),
      s = e.tex.width * n.w,
      i = e.tex.height * n.h,
      a = new x(1);
    if (e.tiled) {
      let c = Math.ceil((e.width || s) / s),
        f = Math.ceil((e.height || i) / i),
        m = et(e.anchor || $t)
          .add(new x(1, 1))
          .scale(0.5)
          .scale(c * s, f * i);
      for (let l = 0; l < c; l++)
        for (let p = 0; p < f; p++)
          Ee(
            Object.assign({}, e, {
              pos: (e.pos || new x(0)).add(new x(s * l, i * p)).sub(m),
              scale: a.scale(e.scale || new x(1)),
              tex: e.tex,
              quad: n,
              width: s,
              height: i,
              anchor: "topleft",
            })
          );
    } else
      e.width && e.height
        ? ((a.x = e.width / s), (a.y = e.height / i))
        : e.width
        ? ((a.x = e.width / s), (a.y = a.x))
        : e.height && ((a.y = e.height / i), (a.x = a.y)),
        Ee(
          Object.assign({}, e, {
            scale: a.scale(e.scale || new x(1)),
            tex: e.tex,
            quad: n,
            width: s,
            height: i,
          })
        );
  }
  o(Fe, "drawTexture");
  function Kr(e) {
    if (!e.sprite) throw new Error('drawSprite() requires property "sprite"');
    let n = rt(e.sprite);
    if (!n || !n.data) return;
    let s = n.data.frames[e.frame ?? 0];
    if (!s) throw new Error(`Frame not found: ${e.frame ?? 0}`);
    Fe(
      Object.assign({}, e, {
        tex: n.data.tex,
        quad: s.scale(e.quad ?? new ae(0, 0, 1, 1)),
      })
    );
  }
  o(Kr, "drawSprite");
  function ut(e, n, s, i, a, c = 1) {
    (i = Se(i % 360)), (a = Se(a % 360)), a <= i && (a += Math.PI * 2);
    let f = [],
      g = Math.ceil(((a - i) / Se(8)) * c),
      m = (a - i) / g;
    for (let l = i; l < a; l += m)
      f.push(e.add(n * Math.cos(l), s * Math.sin(l)));
    return f.push(e.add(n * Math.cos(a), s * Math.sin(a))), f;
  }
  o(ut, "getArcPts");
  function xe(e) {
    if (e.width === void 0 || e.height === void 0)
      throw new Error('drawRect() requires property "width" and "height".');
    if (e.width <= 0 || e.height <= 0) return;
    let n = e.width,
      s = e.height,
      a = et(e.anchor || $t)
        .add(1, 1)
        .scale(new x(n, s).scale(-0.5)),
      c = [new x(0, 0), new x(n, 0), new x(n, s), new x(0, s)];
    if (e.radius) {
      let f = Math.min(Math.min(n, s) / 2, e.radius);
      c = [
        new x(f, 0),
        new x(n - f, 0),
        ...ut(new x(n - f, f), f, f, 270, 360),
        new x(n, f),
        new x(n, s - f),
        ...ut(new x(n - f, s - f), f, f, 0, 90),
        new x(n - f, s),
        new x(f, s),
        ...ut(new x(f, s - f), f, f, 90, 180),
        new x(0, s - f),
        new x(0, f),
        ...ut(new x(f, f), f, f, 180, 270),
      ];
    }
    Ve(
      Object.assign({}, e, {
        offset: a,
        pts: c,
        ...(e.gradient
          ? {
              colors: e.horizontal
                ? [e.gradient[0], e.gradient[1], e.gradient[1], e.gradient[0]]
                : [e.gradient[0], e.gradient[0], e.gradient[1], e.gradient[1]],
            }
          : {}),
      })
    );
  }
  o(xe, "drawRect");
  function ct(e) {
    let { p1: n, p2: s } = e;
    if (!n || !s)
      throw new Error('drawLine() requires properties "p1" and "p2".');
    let i = e.width || 1,
      a = s
        .sub(n)
        .unit()
        .normal()
        .scale(i * 0.5),
      c = [n.sub(a), n.add(a), s.add(a), s.sub(a)].map((f) => ({
        pos: new x(f.x, f.y),
        uv: new x(0),
        color: e.color ?? $.WHITE,
        opacity: e.opacity ?? 1,
      }));
    Ae(c, [0, 1, 3, 1, 2, 3], e.fixed, v.defTex, e.shader, e.uniform);
  }
  o(ct, "drawLine");
  function Nn(e) {
    let n = e.pts;
    if (!n) throw new Error('drawLines() requires property "pts".');
    if (!(n.length < 2))
      if (e.radius && n.length >= 3) {
        let s = n[0].sdist(n[1]);
        for (let a = 1; a < n.length - 1; a++)
          s = Math.min(n[a].sdist(n[a + 1]), s);
        let i = Math.min(e.radius, Math.sqrt(s) / 2);
        ct(Object.assign({}, e, { p1: n[0], p2: n[1] }));
        for (let a = 1; a < n.length - 2; a++) {
          let c = n[a],
            f = n[a + 1];
          ct(Object.assign({}, e, { p1: c, p2: f }));
        }
        ct(Object.assign({}, e, { p1: n[n.length - 2], p2: n[n.length - 1] }));
      } else
        for (let s = 0; s < n.length - 1; s++)
          ct(Object.assign({}, e, { p1: n[s], p2: n[s + 1] })),
            e.join !== "none" &&
              Ke(Object.assign({}, e, { pos: n[s], radius: e.width / 2 }));
  }
  o(Nn, "drawLines");
  function jn(e) {
    if (!e.p1 || !e.p2 || !e.p3)
      throw new Error('drawPolygon() requires properties "p1", "p2" and "p3".');
    return Ve(Object.assign({}, e, { pts: [e.p1, e.p2, e.p3] }));
  }
  o(jn, "drawTriangle");
  function Ke(e) {
    if (typeof e.radius != "number")
      throw new Error('drawCircle() requires property "radius".');
    e.radius !== 0 &&
      kn(
        Object.assign({}, e, { radiusX: e.radius, radiusY: e.radius, angle: 0 })
      );
  }
  o(Ke, "drawCircle");
  function kn(e) {
    if (e.radiusX === void 0 || e.radiusY === void 0)
      throw new Error(
        'drawEllipse() requires properties "radiusX" and "radiusY".'
      );
    if (e.radiusX === 0 || e.radiusY === 0) return;
    let n = e.start ?? 0,
      s = e.end ?? 360,
      i = et(e.anchor ?? "center").scale(new x(-e.radiusX, -e.radiusY)),
      a = ut(i, e.radiusX, e.radiusY, n, s, e.resolution);
    a.unshift(i);
    let c = Object.assign({}, e, {
      pts: a,
      radius: 0,
      ...(e.gradient
        ? {
            colors: [e.gradient[0], ...Array(a.length - 1).fill(e.gradient[1])],
          }
        : {}),
    });
    if (s - n >= 360 && e.outline) {
      e.fill !== !1 && Ve(Object.assign(c, { outline: null })),
        Ve(Object.assign(c, { pts: a.slice(1), fill: !1 }));
      return;
    }
    Ve(c);
  }
  o(kn, "drawEllipse");
  function Ve(e) {
    if (!e.pts) throw new Error('drawPolygon() requires property "pts".');
    let n = e.pts.length;
    if (!(n < 3)) {
      if ((Z(), b(e.pos), T(e.scale), V(e.angle), b(e.offset), e.fill !== !1)) {
        let s = e.color ?? $.WHITE,
          i = e.pts.map((c, f) => ({
            pos: new x(c.x, c.y),
            uv: new x(0, 0),
            color: e.colors ? e.colors[f] ?? s : s,
            opacity: e.opacity ?? 1,
          })),
          a = [...Array(n - 2).keys()].map((c) => [0, c + 1, c + 2]).flat();
        Ae(i, e.indices ?? a, e.fixed, v.defTex, e.shader, e.uniform);
      }
      e.outline &&
        Nn({
          pts: [...e.pts, e.pts[0]],
          radius: e.radius,
          width: e.outline.width,
          color: e.outline.color,
          join: e.outline.join,
          uniform: e.uniform,
          fixed: e.fixed,
          opacity: e.opacity,
        }),
        _();
    }
  }
  o(Ve, "drawPolygon");
  function _n(e, n, s) {
    he(),
      h.clear(h.STENCIL_BUFFER_BIT),
      h.enable(h.STENCIL_TEST),
      h.stencilFunc(h.NEVER, 1, 255),
      h.stencilOp(h.REPLACE, h.REPLACE, h.REPLACE),
      n(),
      he(),
      h.stencilFunc(s, 1, 255),
      h.stencilOp(h.KEEP, h.KEEP, h.KEEP),
      e(),
      he(),
      h.disable(h.STENCIL_TEST);
  }
  o(_n, "drawStenciled");
  function Yr(e, n) {
    _n(e, n, h.EQUAL);
  }
  o(Yr, "drawMasked");
  function Xr(e, n) {
    _n(e, n, h.NOTEQUAL);
  }
  o(Xr, "drawSubtracted");
  function Hn() {
    return (v.viewport.width + v.viewport.height) / (v.width + v.height);
  }
  o(Hn, "getViewportScale");
  function Be(e) {
    he();
    let n = v.width,
      s = v.height;
    (v.width = v.viewport.width),
      (v.height = v.viewport.height),
      e(),
      he(),
      (v.width = n),
      (v.height = s);
  }
  o(Be, "drawUnscaled");
  function qn(e, n) {
    n.pos && (e.pos = e.pos.add(n.pos)),
      n.scale && (e.scale = e.scale.scale(C(n.scale))),
      n.angle && (e.angle += n.angle),
      n.color && (e.color = e.color.mult(n.color)),
      n.opacity && (e.opacity *= n.opacity);
  }
  o(qn, "applyCharTransform");
  let $n = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
  function Wr(e) {
    let n = {},
      s = e.replace($n, "$2"),
      i = 0;
    for (let a of e.matchAll($n)) {
      let c = a.index - i;
      for (let f = 0; f < a.groups.text.length; f++)
        n[f + c] = [a.groups.style];
      i += a[0].length - a.groups.text.length;
    }
    return { charStyleMap: n, text: s };
  }
  o(Wr, "compileStyledText");
  let hn = {};
  function Ne(e) {
    if (e.text === void 0)
      throw new Error('formatText() requires property "text".');
    let n = Pt(e.font);
    if (e.text === "" || n instanceof oe || !n)
      return { width: 0, height: 0, chars: [], opt: e };
    let { charStyleMap: s, text: i } = Wr(e.text + ""),
      a = i.split("");
    if (n instanceof ze || typeof n == "string") {
      let K = n instanceof ze ? n.fontface.family : n,
        j =
          n instanceof ze
            ? { outline: n.outline, filter: n.filter }
            : { outline: 0, filter: _r },
        L = hn[K] ?? {
          font: { tex: new W(Ir, Vr, { filter: j.filter }), map: {}, size: Br },
          cursor: new x(0),
          outline: j.outline,
        };
      hn[K] || (hn[K] = L), (n = L.font);
      for (let de of a)
        if (!L.font.map[de]) {
          let y = se;
          y.clearRect(0, 0, Q.width, Q.height),
            (y.font = `${n.size}px ${K}`),
            (y.textBaseline = "top"),
            (y.textAlign = "left"),
            (y.fillStyle = "#ffffff");
          let P = y.measureText(de),
            D = Math.ceil(P.width),
            F = n.size;
          L.outline &&
            ((y.lineJoin = "round"),
            (y.lineWidth = L.outline * 2),
            (y.strokeStyle = "#000000"),
            y.strokeText(de, L.outline, L.outline),
            (D += L.outline * 2),
            (F += L.outline * 3)),
            y.fillText(de, L.outline, L.outline);
          let H = y.getImageData(0, 0, D, F);
          if (
            L.cursor.x + D > Ir &&
            ((L.cursor.x = 0), (L.cursor.y += F), L.cursor.y > Vr)
          )
            throw new Error("Font atlas exceeds character limit");
          n.tex.update(H, L.cursor.x, L.cursor.y),
            (n.map[de] = new ae(L.cursor.x, L.cursor.y, D, F)),
            (L.cursor.x += D);
        }
    }
    let c = e.size || n.size,
      f = C(e.scale ?? 1).scale(c / n.size),
      g = e.lineSpacing ?? 0,
      m = e.letterSpacing ?? 0,
      l = 0,
      p = 0,
      S = 0,
      R = [],
      G = [],
      k = 0,
      M = null,
      O = null;
    for (; k < a.length; ) {
      let K = a[k];
      if (
        K ===
        `
`
      )
        (S += c + g),
          R.push({ width: l - m, chars: G }),
          (M = null),
          (O = null),
          (l = 0),
          (G = []);
      else {
        let j = n.map[K];
        if (j) {
          let L = j.w * f.x;
          e.width &&
            l + L > e.width &&
            ((S += c + g),
            M != null &&
              ((k -= G.length - M),
              (K = a[k]),
              (j = n.map[K]),
              (L = j.w * f.x),
              (G = G.slice(0, M - 1)),
              (l = O)),
            (M = null),
            (O = null),
            R.push({ width: l - m, chars: G }),
            (l = 0),
            (G = [])),
            G.push({
              tex: n.tex,
              width: j.w,
              height: j.h,
              quad: new ae(
                j.x / n.tex.width,
                j.y / n.tex.height,
                j.w / n.tex.width,
                j.h / n.tex.height
              ),
              ch: K,
              pos: new x(l, S),
              opacity: e.opacity ?? 1,
              color: e.color ?? $.WHITE,
              scale: C(f),
              angle: 0,
            }),
            K === " " && ((M = G.length), (O = l)),
            (l += L),
            (p = Math.max(p, l)),
            (l += m);
        }
      }
      k++;
    }
    R.push({ width: l - m, chars: G }), (S += c), e.width && (p = e.width);
    let te = [];
    for (let K of R) {
      let j = (p - K.width) * Ri(e.align ?? "left");
      for (let L of K.chars) {
        let de = n.map[L.ch],
          y = te.length;
        if (
          ((L.pos = L.pos.add(j, 0).add(de.w * f.x * 0.5, de.h * f.y * 0.5)),
          e.transform)
        ) {
          let P =
            typeof e.transform == "function"
              ? e.transform(y, L.ch)
              : e.transform;
          P && qn(L, P);
        }
        if (s[y]) {
          let P = s[y];
          for (let D of P) {
            let F = e.styles[D],
              H = typeof F == "function" ? F(y, L.ch) : F;
            H && qn(L, H);
          }
        }
        te.push(L);
      }
    }
    return { width: p, height: S, chars: te, opt: e };
  }
  o(Ne, "formatText");
  function zn(e) {
    je(Ne(e));
  }
  o(zn, "drawText");
  function je(e) {
    Z(),
      b(e.opt.pos),
      V(e.opt.angle),
      b(
        et(e.opt.anchor ?? "topleft")
          .add(1, 1)
          .scale(e.width, e.height)
          .scale(-0.5)
      ),
      e.chars.forEach((n) => {
        Ee({
          tex: n.tex,
          width: n.width,
          height: n.height,
          pos: n.pos,
          scale: n.scale,
          angle: n.angle,
          color: n.color,
          opacity: n.opacity,
          quad: n.quad,
          anchor: "center",
          uniform: e.opt.uniform,
          shader: e.opt.shader,
          fixed: e.opt.fixed,
        });
      }),
      _();
  }
  o(je, "drawFormattedText");
  function pe() {
    return v.width;
  }
  o(pe, "width");
  function we() {
    return v.height;
  }
  o(we, "height");
  let Ye = {};
  function Jr(e) {
    return new x(
      ((e.x - v.viewport.x) * pe()) / v.viewport.width,
      ((e.y - v.viewport.y) * we()) / v.viewport.height
    );
  }
  o(Jr, "windowToContent");
  function Qr(e) {
    return new x(
      (e.x * v.viewport.width) / v.width,
      (e.y * v.viewport.height) / v.height
    );
  }
  o(Qr, "contentToView");
  function Dt() {
    return Jr(U.mousePos());
  }
  o(Dt, "mousePos"),
    (Ye.error = (e) => {
      if (e.error) bn(e.error);
      else {
        if (e.message === "Script error.") return;
        bn(new Error(e.message));
      }
    }),
    (Ye.unhandledrejection = (e) => bn(e.reason));
  for (let e in Ye) window.addEventListener(e, Ye[e]);
  let ee = {
    inspect: !1,
    timeScale: 1,
    showLog: !0,
    fps: () => U.fps(),
    numFrames: () => U.numFrames(),
    stepFrame: ir,
    drawCalls: () => v.drawCalls,
    clearLog: () => (A.logs = []),
    log: (e) => {
      let n = r.logMax ?? Ci;
      A.logs.unshift({ msg: e, time: U.time() }),
        A.logs.length > n && (A.logs = A.logs.slice(0, n));
    },
    error: (e) => ee.log(new Error(e.toString ? e.toString() : e)),
    curRecording: null,
    get paused() {
      return U.paused;
    },
    set paused(e) {
      (U.paused = e), e ? ie.ctx.suspend() : ie.ctx.resume();
    },
  };
  function Ue() {
    return U.dt();
  }
  o(Ue, "dt");
  function Zr(...e) {
    return (
      e.length > 0 && (A.cam.pos = C(...e)),
      A.cam.pos ? A.cam.pos.clone() : Vt()
    );
  }
  o(Zr, "camPos");
  function es(...e) {
    return e.length > 0 && (A.cam.scale = C(...e)), A.cam.scale.clone();
  }
  o(es, "camScale");
  function ts(e) {
    return e !== void 0 && (A.cam.angle = e), A.cam.angle;
  }
  o(ts, "camRot");
  function ns(e = 12) {
    A.cam.shake += e;
  }
  o(ns, "shake");
  function Kn(e) {
    return A.cam.transform.multVec2(e);
  }
  o(Kn, "toScreen");
  function Yn(e) {
    return A.cam.transform.invert().multVec2(e);
  }
  o(Yn, "toWorld");
  function Gt(e) {
    let n = new be();
    return (
      e.pos && n.translate(e.pos),
      e.scale && n.scale(e.scale),
      e.angle && n.rotate(e.angle),
      e.parent ? n.mult(e.parent.transform) : n
    );
  }
  o(Gt, "calcTransform");
  function dn(e) {
    let n = new Map(),
      s = {},
      i = new De(),
      a = [],
      c = null,
      f = !1,
      g = {
        id: Sr(),
        hidden: !1,
        transform: new be(),
        children: [],
        parent: null,
        set paused(l) {
          if (l !== f) {
            f = l;
            for (let p of a) p.paused = l;
          }
        },
        get paused() {
          return f;
        },
        add(l) {
          let p = Array.isArray(l) ? dn(l) : l;
          if (p.parent)
            throw new Error("Cannot add a game obj that already has a parent.");
          return (
            (p.parent = this),
            (p.transform = Gt(p)),
            this.children.push(p),
            p.trigger("add", p),
            A.events.trigger("add", p),
            p
          );
        },
        readd(l) {
          let p = this.children.indexOf(l);
          return (
            p !== -1 && (this.children.splice(p, 1), this.children.push(l)), l
          );
        },
        remove(l) {
          let p = this.children.indexOf(l);
          if (p !== -1) {
            (l.parent = null), this.children.splice(p, 1);
            let S = o((R) => {
              R.trigger("destroy"),
                A.events.trigger("destroy", R),
                R.children.forEach((G) => S(G));
            }, "trigger");
            S(l);
          }
        },
        removeAll(l) {
          if (l) this.get(l).forEach((p) => this.remove(p));
          else for (let p of [...this.children]) this.remove(p);
        },
        update() {
          this.paused ||
            (this.children
              .sort((l, p) => (l.z ?? 0) - (p.z ?? 0))
              .forEach((l) => l.update()),
            this.trigger("update"));
        },
        draw() {
          if (this.hidden) return;
          let l = v.fixed;
          this.fixed && (v.fixed = !0),
            Z(),
            b(this.pos),
            T(this.scale),
            V(this.angle),
            this.trigger("draw"),
            this.children
              .sort((p, S) => (p.z ?? 0) - (S.z ?? 0))
              .forEach((p) => p.draw()),
            _(),
            (v.fixed = l);
        },
        drawInspect() {
          this.hidden ||
            (Z(),
            b(this.pos),
            T(this.scale),
            V(this.angle),
            this.children
              .sort((l, p) => (l.z ?? 0) - (p.z ?? 0))
              .forEach((l) => l.drawInspect()),
            this.trigger("drawInspect"),
            _());
        },
        use(l) {
          if (!l) return;
          if (typeof l == "string") return this.use({ id: l });
          let p = [];
          l.id &&
            (this.unuse(l.id), (s[l.id] = []), (p = s[l.id]), n.set(l.id, l));
          for (let R in l) {
            if (Pi.has(R)) continue;
            let G = Object.getOwnPropertyDescriptor(l, R);
            if (
              (typeof G.value == "function" && (l[R] = l[R].bind(this)),
              G.set && Object.defineProperty(l, R, { set: G.set.bind(this) }),
              G.get && Object.defineProperty(l, R, { get: G.get.bind(this) }),
              Mi.has(R))
            ) {
              let k =
                R === "add"
                  ? () => {
                      (c = o((M) => p.push(M), "onCurCompCleanup")),
                        l[R](),
                        (c = null);
                    }
                  : l[R];
              p.push(this.on(R, k).cancel);
            } else if (this[R] === void 0)
              Object.defineProperty(this, R, {
                get: () => l[R],
                set: (k) => (l[R] = k),
                configurable: !0,
                enumerable: !0,
              }),
                p.push(() => delete this[R]);
            else throw new Error(`Duplicate component property: "${R}"`);
          }
          let S = o(() => {
            if (l.require) {
              for (let R of l.require)
                if (!this.c(R))
                  throw new Error(
                    `Component "${l.id}" requires component "${R}"`
                  );
            }
          }, "checkDeps");
          l.destroy && p.push(l.destroy.bind(this)),
            this.exists()
              ? (S(),
                l.add &&
                  ((c = o((R) => p.push(R), "onCurCompCleanup")),
                  l.add.call(this),
                  (c = null)))
              : l.require && p.push(this.on("add", S).cancel);
        },
        unuse(l) {
          s[l] && (s[l].forEach((p) => p()), delete s[l]),
            n.has(l) && n.delete(l);
        },
        c(l) {
          return n.get(l);
        },
        get(l, p = {}) {
          let S = p.recursive
            ? this.children.flatMap(
                o(function R(G) {
                  return [G, ...G.children.flatMap(R)];
                }, "recurse")
              )
            : this.children;
          if (((S = S.filter((R) => (l ? R.is(l) : !0))), p.liveUpdate)) {
            let R = o(
              (G) => (p.recursive ? this.isAncestorOf(G) : G.parent === this),
              "isChild"
            );
            mn((G) => {
              R(G) && G.is(l) && S.push(G);
            }),
              Xn((G) => {
                if (R(G) && G.is(l)) {
                  let k = S.findIndex((M) => M.id === G.id);
                  k !== -1 && S.splice(k, 1);
                }
              });
          }
          return S;
        },
        isAncestorOf(l) {
          return l.parent
            ? l.parent === this || this.isAncestorOf(l.parent)
            : !1;
        },
        exists() {
          return A.root.isAncestorOf(this);
        },
        is(l) {
          if (l === "*") return !0;
          if (Array.isArray(l)) {
            for (let p of l) if (!this.c(p)) return !1;
            return !0;
          } else return this.c(l) != null;
        },
        on(l, p) {
          let S = i.on(l, p.bind(this));
          return c && c(() => S.cancel()), S;
        },
        trigger(l, ...p) {
          i.trigger(l, ...p), A.objEvents.trigger(l, this, ...p);
        },
        destroy() {
          this.parent && this.parent.remove(this);
        },
        inspect() {
          let l = {};
          for (let [p, S] of n) l[p] = S.inspect ? S.inspect() : null;
          return l;
        },
        onAdd(l) {
          return this.on("add", l);
        },
        onUpdate(l) {
          return this.on("update", l);
        },
        onDraw(l) {
          return this.on("draw", l);
        },
        onDestroy(l) {
          return this.on("destroy", l);
        },
        clearEvents() {
          i.clear();
        },
      },
      m = [
        "onKeyPress",
        "onKeyPressRepeat",
        "onKeyDown",
        "onKeyRelease",
        "onMousePress",
        "onMouseDown",
        "onMouseRelease",
        "onMouseMove",
        "onCharInput",
        "onMouseMove",
        "onTouchStart",
        "onTouchMove",
        "onTouchEnd",
        "onScroll",
        "onGamepadButtonPress",
        "onGamepadButtonDown",
        "onGamepadButtonRelease",
        "onGamepadStick",
      ];
    for (let l of m)
      g[l] = (...p) => {
        let S = U[l](...p);
        return a.push(S), g.onDestroy(() => S.cancel()), S;
      };
    for (let l of e) g.use(l);
    return g;
  }
  o(dn, "make");
  function Le(e, n, s) {
    return (
      A.objEvents[e] || (A.objEvents[e] = new vt()),
      A.objEvents.on(e, (i, ...a) => {
        i.is(n) && s(i, ...a);
      })
    );
  }
  o(Le, "on");
  let fn = o((e, n) => {
      if (typeof e == "function" && n === void 0) {
        let s = dt([{ update: e }]);
        return {
          get paused() {
            return s.paused;
          },
          set paused(i) {
            s.paused = i;
          },
          cancel: () => s.destroy(),
        };
      } else if (typeof e == "string") return Le("update", e, n);
    }, "onUpdate"),
    rs = o((e, n) => {
      if (typeof e == "function" && n === void 0) {
        let s = dt([{ draw: e }]);
        return {
          get paused() {
            return s.hidden;
          },
          set paused(i) {
            s.hidden = i;
          },
          cancel: () => s.destroy(),
        };
      } else if (typeof e == "string") return Le("draw", e, n);
    }, "onDraw");
  function mn(e, n) {
    if (typeof e == "function" && n === void 0) return A.events.on("add", e);
    if (typeof e == "string") return Le("add", e, n);
  }
  o(mn, "onAdd");
  function Xn(e, n) {
    if (typeof e == "function" && n === void 0)
      return A.events.on("destroy", e);
    if (typeof e == "string") return Le("destroy", e, n);
  }
  o(Xn, "onDestroy");
  function ss(e, n, s) {
    return Le("collide", e, (i, a, c) => a.is(n) && s(i, a, c));
  }
  o(ss, "onCollide");
  function is(e, n, s) {
    return Le("collideUpdate", e, (i, a, c) => a.is(n) && s(i, a, c));
  }
  o(is, "onCollideUpdate");
  function os(e, n, s) {
    return Le("collideEnd", e, (i, a, c) => a.is(n) && s(i, a, c));
  }
  o(os, "onCollideEnd");
  function Ft(e, n) {
    rr(e, { recursive: !0 }).forEach(n), mn(e, n);
  }
  o(Ft, "forAllCurrentAndFuture");
  function as(e, n) {
    if (typeof e == "function") return U.onMousePress(e);
    {
      let s = [];
      return (
        Ft(e, (i) => {
          if (!i.area)
            throw new Error(
              "onClick() requires the object to have area() component"
            );
          s.push(i.onClick(() => n(i)));
        }),
        Re.join(s)
      );
    }
  }
  o(as, "onClick");
  function us(e, n) {
    let s = [];
    return (
      Ft(e, (i) => {
        if (!i.area)
          throw new Error(
            "onHover() requires the object to have area() component"
          );
        s.push(i.onHover(() => n(i)));
      }),
      Re.join(s)
    );
  }
  o(us, "onHover");
  function cs(e, n) {
    let s = [];
    return (
      Ft(e, (i) => {
        if (!i.area)
          throw new Error(
            "onHoverUpdate() requires the object to have area() component"
          );
        s.push(i.onHoverUpdate(() => n(i)));
      }),
      Re.join(s)
    );
  }
  o(cs, "onHoverUpdate");
  function ls(e, n) {
    let s = [];
    return (
      Ft(e, (i) => {
        if (!i.area)
          throw new Error(
            "onHoverEnd() requires the object to have area() component"
          );
        s.push(i.onHoverEnd(() => n(i)));
      }),
      Re.join(s)
    );
  }
  o(ls, "onHoverEnd");
  function Bt(e, n) {
    let s = 0,
      i = [];
    n && i.push(n);
    let a = fn(() => {
      (s += Ue()), s >= e && (a.cancel(), i.forEach((c) => c()));
    });
    return {
      paused: a.paused,
      cancel: a.cancel,
      onEnd(c) {
        i.push(c);
      },
      then(c) {
        return this.onEnd(c), this;
      },
    };
  }
  o(Bt, "wait");
  function hs(e, n) {
    let s = null,
      i = o(() => {
        (s = Bt(e, i)), n();
      }, "newAction");
    return (
      (s = Bt(0, i)),
      {
        get paused() {
          return s.paused;
        },
        set paused(a) {
          s.paused = a;
        },
        cancel: () => s.cancel(),
      }
    );
  }
  o(hs, "loop");
  function Wn() {
    U.onKeyPress("f1", () => {
      ee.inspect = !ee.inspect;
    }),
      U.onKeyPress("f2", () => {
        ee.clearLog();
      }),
      U.onKeyPress("f8", () => {
        ee.paused = !ee.paused;
      }),
      U.onKeyPress("f7", () => {
        ee.timeScale = lt(Me(ee.timeScale - 0.2, 0, 2), 1);
      }),
      U.onKeyPress("f9", () => {
        ee.timeScale = lt(Me(ee.timeScale + 0.2, 0, 2), 1);
      }),
      U.onKeyPress("f10", () => {
        ee.stepFrame();
      });
  }
  o(Wn, "enterDebugMode");
  function Jn() {
    U.onKeyPress("b", () => Mt());
  }
  o(Jn, "enterBurpMode");
  function ds(e) {
    A.gravity = e;
  }
  o(ds, "setGravity");
  function fs() {
    return A.gravity;
  }
  o(fs, "getGravity");
  function ms(...e) {
    e.length === 1 || e.length === 2
      ? ((v.bgColor = J(e[0])), e[1] && (v.bgAlpha = e[1]))
      : (e.length === 3 || e.length === 4) &&
        ((v.bgColor = J(e[0], e[1], e[2])), e[3] && (v.bgAlpha = e[3])),
      h.clearColor(
        v.bgColor.r / 255,
        v.bgColor.g / 255,
        v.bgColor.b / 255,
        v.bgAlpha
      );
  }
  o(ms, "setBackground");
  function ps() {
    return v.bgColor.clone();
  }
  o(ps, "getBackground");
  function Lt(...e) {
    return {
      id: "pos",
      pos: C(...e),
      moveBy(...n) {
        this.pos = this.pos.add(C(...n));
      },
      move(...n) {
        this.moveBy(C(...n).scale(Ue()));
      },
      moveTo(...n) {
        if (typeof n[0] == "number" && typeof n[1] == "number")
          return this.moveTo(C(n[0], n[1]), n[2]);
        let s = n[0],
          i = n[1];
        if (i === void 0) {
          this.pos = C(s);
          return;
        }
        let a = s.sub(this.pos);
        if (a.len() <= i * Ue()) {
          this.pos = C(s);
          return;
        }
        this.move(a.unit().scale(i));
      },
      worldPos() {
        return this.parent
          ? this.parent.transform.multVec2(this.pos)
          : this.pos;
      },
      screenPos() {
        let n = this.worldPos();
        return ht(this) ? n : Kn(n);
      },
      inspect() {
        return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
      },
      drawInspect() {
        Ke({ color: J(255, 0, 0), radius: 4 / Hn() });
      },
    };
  }
  o(Lt, "pos");
  function It(...e) {
    return e.length === 0
      ? It(1)
      : {
          id: "scale",
          scale: C(...e),
          scaleTo(...n) {
            this.scale = C(...n);
          },
          scaleBy(...n) {
            this.scale.scale(C(...n));
          },
          inspect() {
            return `(${lt(this.scale.x, 2)}, ${lt(this.scale.y, 2)})`;
          },
        };
  }
  o(It, "scale");
  function gs(e) {
    return {
      id: "rotate",
      angle: e ?? 0,
      rotateBy(n) {
        this.angle += n;
      },
      rotateTo(n) {
        this.angle = n;
      },
      inspect() {
        return `${Math.round(this.angle)}`;
      },
    };
  }
  o(gs, "rotate");
  function ws(...e) {
    return {
      id: "color",
      color: J(...e),
      inspect() {
        return this.color.toString();
      },
    };
  }
  o(ws, "color");
  function lt(e, n) {
    return Number(e.toFixed(n));
  }
  o(lt, "toFixed");
  function vs(e) {
    return {
      id: "opacity",
      opacity: e ?? 1,
      inspect() {
        return `${lt(this.opacity, 1)}`;
      },
      fadeOut(n = 1, s = Ze.linear) {
        return yn(this.opacity, 0, n, (i) => (this.opacity = i), s);
      },
    };
  }
  o(vs, "opacity");
  function pn(e) {
    if (!e) throw new Error("Please define an anchor");
    return {
      id: "anchor",
      anchor: e,
      inspect() {
        return typeof this.anchor == "string"
          ? this.anchor
          : this.anchor.toString();
      },
    };
  }
  o(pn, "anchor");
  function bs(e) {
    return {
      id: "z",
      z: e,
      inspect() {
        return `${this.z}`;
      },
    };
  }
  o(bs, "z");
  function ys(e, n) {
    return {
      id: "follow",
      require: ["pos"],
      follow: { obj: e, offset: n ?? C(0) },
      add() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      },
      update() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      },
    };
  }
  o(ys, "follow");
  function xs(e, n) {
    let s = typeof e == "number" ? x.fromAngle(e) : e.unit();
    return {
      id: "move",
      require: ["pos"],
      update() {
        this.move(s.scale(n));
      },
    };
  }
  o(xs, "move");
  let Us = 200;
  function Es(e = {}) {
    let n = e.distance ?? Us,
      s = !1;
    return {
      id: "offscreen",
      require: ["pos"],
      isOffScreen() {
        let i = this.screenPos(),
          a = new ce(C(0), pe(), we());
        return !pt(a, i) && a.sdistToPoint(i) > n * n;
      },
      onExitScreen(i) {
        return this.on("exitView", i);
      },
      onEnterScreen(i) {
        return this.on("enterView", i);
      },
      update() {
        this.isOffScreen()
          ? (s || (this.trigger("exitView"), (s = !0)),
            e.hide && (this.hidden = !0),
            e.pause && (this.paused = !0),
            e.destroy && this.destroy())
          : (s && (this.trigger("enterView"), (s = !1)),
            e.hide && (this.hidden = !1),
            e.pause && (this.paused = !1));
      },
    };
  }
  o(Es, "offscreen");
  function ht(e) {
    return e.fixed ? !0 : e.parent ? ht(e.parent) : !1;
  }
  o(ht, "isFixed");
  function Ss(e = {}) {
    let n = {},
      s = new Set();
    return {
      id: "area",
      collisionIgnore: e.collisionIgnore ?? [],
      add() {
        this.area.cursor && this.onHover(() => U.setCursor(this.area.cursor)),
          this.onCollideUpdate((i, a) => {
            n[i.id] || this.trigger("collide", i, a),
              (n[i.id] = a),
              s.add(i.id);
          });
      },
      update() {
        for (let i in n)
          s.has(Number(i)) ||
            (this.trigger("collideEnd", n[i].target), delete n[i]);
        s.clear();
      },
      drawInspect() {
        let i = this.localArea();
        Z(), T(this.area.scale), b(this.area.offset);
        let a = {
          outline: { width: 4 / Hn(), color: J(0, 0, 255) },
          anchor: this.anchor,
          fill: !1,
          fixed: ht(this),
        };
        i instanceof ce
          ? xe({ ...a, pos: i.pos, width: i.width, height: i.height })
          : i instanceof He
          ? Ve({ ...a, pts: i.pts })
          : i instanceof gt && Ke({ ...a, pos: i.center, radius: i.radius }),
          _();
      },
      area: {
        shape: e.shape ?? null,
        scale: e.scale ? C(e.scale) : C(1),
        offset: e.offset ?? C(0),
        cursor: e.cursor ?? null,
      },
      isClicked() {
        return U.isMousePressed() && this.isHovering();
      },
      isHovering() {
        let i = ht(this) ? Dt() : Yn(Dt());
        return this.hasPoint(i);
      },
      checkCollision(i) {
        return n[i.id] ?? null;
      },
      getCollisions() {
        return Object.values(n);
      },
      isColliding(i) {
        return !!n[i.id];
      },
      isOverlapping(i) {
        let a = n[i.id];
        return a && a.hasOverlap();
      },
      onClick(i) {
        let a = U.onMousePress("left", () => {
          this.isHovering() && i();
        });
        return this.onDestroy(() => a.cancel()), a;
      },
      onHover(i) {
        let a = !1;
        return this.onUpdate(() => {
          a ? (a = this.isHovering()) : this.isHovering() && ((a = !0), i());
        });
      },
      onHoverUpdate(i) {
        return this.onUpdate(() => {
          this.isHovering() && i();
        });
      },
      onHoverEnd(i) {
        let a = !1;
        return this.onUpdate(() => {
          a ? this.isHovering() || ((a = !1), i()) : (a = this.isHovering());
        });
      },
      onCollide(i, a) {
        if (typeof i == "function" && a === void 0)
          return this.on("collide", i);
        if (typeof i == "string")
          return this.onCollide((c, f) => {
            c.is(i) && a(c, f);
          });
      },
      onCollideUpdate(i, a) {
        if (typeof i == "function" && a === void 0)
          return this.on("collideUpdate", i);
        if (typeof i == "string")
          return this.on("collideUpdate", (c, f) => c.is(i) && a(c, f));
      },
      onCollideEnd(i, a) {
        if (typeof i == "function" && a === void 0)
          return this.on("collideEnd", i);
        if (typeof i == "string")
          return this.on("collideEnd", (c) => c.is(i) && a(c));
      },
      hasPoint(i) {
        return Pn(this.worldArea(), i);
      },
      resolveCollision(i) {
        let a = this.checkCollision(i);
        a &&
          !a.resolved &&
          ((this.pos = this.pos.add(a.displacement)), (a.resolved = !0));
      },
      localArea() {
        return this.area.shape ? this.area.shape : this.renderArea();
      },
      worldArea() {
        let i = this.localArea();
        if (!(i instanceof He || i instanceof ce))
          throw new Error("Only support polygon and rect shapes for now");
        let a = this.transform
          .clone()
          .scale(C(this.area.scale ?? 1))
          .translate(this.area.offset);
        if (i instanceof ce) {
          let c = et(this.anchor || $t)
            .add(1, 1)
            .scale(-0.5)
            .scale(i.width, i.height);
          a.translate(c);
        }
        return i.transform(a);
      },
      screenArea() {
        let i = this.worldArea();
        return ht(this) ? i : i.transform(A.cam.transform);
      },
    };
  }
  o(Ss, "area");
  function Xe(e) {
    return {
      color: e.color,
      opacity: e.opacity,
      anchor: e.anchor,
      outline: e.outline,
      shader: e.shader,
      uniform: e.uniform,
    };
  }
  o(Xe, "getRenderProps");
  function gn(e, n = {}) {
    let s = null,
      i = null,
      a = null,
      c = new ve();
    if (!e)
      throw new Error("Please pass the resource name or data to sprite()");
    let f = o((g, m, l, p) => {
      let S = C(1, 1);
      return (
        l && p
          ? ((S.x = l / (g.width * m.w)), (S.y = p / (g.height * m.h)))
          : l
          ? ((S.x = l / (g.width * m.w)), (S.y = S.x))
          : p && ((S.y = p / (g.height * m.h)), (S.x = S.y)),
        S
      );
    }, "calcTexScale");
    return {
      id: "sprite",
      width: 0,
      height: 0,
      frame: n.frame || 0,
      quad: n.quad || new ae(0, 0, 1, 1),
      animSpeed: n.animSpeed ?? 1,
      flipX: n.flipX ?? !1,
      flipY: n.flipY ?? !1,
      draw() {
        if (!s) return;
        let g = s.frames[this.frame ?? 0];
        if (!g) throw new Error(`Frame not found: ${this.frame ?? 0}`);
        if (s.slice9) {
          let { left: m, right: l, top: p, bottom: S } = s.slice9,
            R = s.tex.width * g.w,
            G = s.tex.height * g.h,
            k = this.width - m - l,
            M = this.height - p - S,
            O = m / R,
            te = l / R,
            K = 1 - O - te,
            j = p / G,
            L = S / G,
            de = 1 - j - L,
            y = [
              re(0, 0, O, j),
              re(O, 0, K, j),
              re(O + K, 0, te, j),
              re(0, j, O, de),
              re(O, j, K, de),
              re(O + K, j, te, de),
              re(0, j + de, O, L),
              re(O, j + de, K, L),
              re(O + K, j + de, te, L),
              re(0, 0, m, p),
              re(m, 0, k, p),
              re(m + k, 0, l, p),
              re(0, p, m, M),
              re(m, p, k, M),
              re(m + k, p, l, M),
              re(0, p + M, m, S),
              re(m, p + M, k, S),
              re(m + k, p + M, l, S),
            ];
          for (let P = 0; P < 9; P++) {
            let D = y[P],
              F = y[P + 9];
            Fe(
              Object.assign(Xe(this), {
                pos: F.pos(),
                tex: s.tex,
                quad: g.scale(D),
                flipX: this.flipX,
                flipY: this.flipY,
                tiled: n.tiled,
                width: F.w,
                height: F.h,
              })
            );
          }
        } else
          Fe(
            Object.assign(Xe(this), {
              tex: s.tex,
              quad: g,
              flipX: this.flipX,
              flipY: this.flipY,
              tiled: n.tiled,
              width: this.width,
              height: this.height,
            })
          );
      },
      add() {
        let g = o((l) => {
            let p = l.frames[0].clone();
            n.quad && (p = p.scale(n.quad));
            let S = f(l.tex, p, n.width, n.height);
            (this.width = l.tex.width * p.w * S.x),
              (this.height = l.tex.height * p.h * S.y),
              n.anim && this.play(n.anim),
              (s = l),
              c.trigger(s);
          }, "setSpriteData"),
          m = rt(e);
        m ? m.onLoad(g) : wn(() => g(rt(e).data));
      },
      update() {
        if (!i) return;
        let g = s.anims[i.name];
        if (typeof g == "number") {
          this.frame = g;
          return;
        }
        if (g.speed === 0) throw new Error("Sprite anim speed cannot be 0");
        (i.timer += Ue() * this.animSpeed),
          i.timer >= 1 / i.speed &&
            ((i.timer = 0),
            (this.frame += a),
            (this.frame < Math.min(g.from, g.to) ||
              this.frame > Math.max(g.from, g.to)) &&
              (i.loop
                ? i.pingpong
                  ? ((this.frame -= a), (a *= -1), (this.frame += a))
                  : (this.frame = g.from)
                : ((this.frame = g.to), i.onEnd(), this.stop())));
      },
      play(g, m = {}) {
        if (!s) {
          c.add(() => this.play(g, m));
          return;
        }
        let l = s.anims[g];
        if (l === void 0) throw new Error(`Anim not found: ${g}`);
        i && this.stop(),
          (i =
            typeof l == "number"
              ? {
                  name: g,
                  timer: 0,
                  loop: !1,
                  pingpong: !1,
                  speed: 0,
                  onEnd: () => {},
                }
              : {
                  name: g,
                  timer: 0,
                  loop: m.loop ?? l.loop ?? !1,
                  pingpong: m.pingpong ?? l.pingpong ?? !1,
                  speed: m.speed ?? l.speed ?? 10,
                  onEnd: m.onEnd ?? (() => {}),
                }),
          (a = typeof l == "number" ? null : l.from < l.to ? 1 : -1),
          (this.frame = typeof l == "number" ? l : l.from),
          this.trigger("animStart", g);
      },
      stop() {
        if (!i) return;
        let g = i.name;
        (i = null), this.trigger("animEnd", g);
      },
      numFrames() {
        return s?.frames.length ?? 0;
      },
      curAnim() {
        return i?.name;
      },
      onAnimEnd(g) {
        return this.on("animEnd", g);
      },
      onAnimStart(g) {
        return this.on("animStart", g);
      },
      renderArea() {
        return new ce(C(0), this.width, this.height);
      },
      inspect() {
        if (typeof e == "string") return `"${e}"`;
      },
    };
  }
  o(gn, "sprite");
  function Cs(e, n = {}) {
    function s(i) {
      let a = Ne(
        Object.assign(Xe(i), {
          text: i.text + "",
          size: i.textSize,
          font: i.font,
          width: n.width && i.width,
          align: i.align,
          letterSpacing: i.letterSpacing,
          lineSpacing: i.lineSpacing,
          transform: i.textTransform,
          styles: i.textStyles,
        })
      );
      return (
        n.width || (i.width = a.width / (i.scale?.x || 1)),
        (i.height = a.height / (i.scale?.y || 1)),
        a
      );
    }
    return (
      o(s, "update"),
      {
        id: "text",
        text: e,
        textSize: n.size ?? Ei,
        font: n.font,
        width: n.width,
        height: 0,
        align: n.align,
        lineSpacing: n.lineSpacing,
        letterSpacing: n.letterSpacing,
        textTransform: n.transform,
        textStyles: n.styles,
        add() {
          wn(() => s(this));
        },
        draw() {
          je(s(this));
        },
        renderArea() {
          return new ce(C(0), this.width, this.height);
        },
      }
    );
  }
  o(Cs, "text");
  function Ts(e, n, s = {}) {
    return {
      id: "rect",
      width: e,
      height: n,
      radius: s.radius || 0,
      draw() {
        xe(
          Object.assign(Xe(this), {
            width: this.width,
            height: this.height,
            radius: this.radius,
          })
        );
      },
      renderArea() {
        return new ce(C(0), this.width, this.height);
      },
      inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      },
    };
  }
  o(Ts, "rect");
  function As(e, n) {
    return {
      id: "rect",
      width: e,
      height: n,
      draw() {
        Ee(Object.assign(Xe(this), { width: this.width, height: this.height }));
      },
      renderArea() {
        return new ce(C(0), this.width, this.height);
      },
      inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      },
    };
  }
  o(As, "uvquad");
  function Os(e) {
    return {
      id: "circle",
      radius: e,
      draw() {
        Ke(Object.assign(Xe(this), { radius: this.radius }));
      },
      renderArea() {
        return new ce(
          new x(this.anchor ? 0 : -this.radius),
          this.radius * 2,
          this.radius * 2
        );
      },
      inspect() {
        return `${Math.ceil(this.radius)}`;
      },
    };
  }
  o(Os, "circle");
  function Ps(e = 1, n = J(0, 0, 0)) {
    return { id: "outline", outline: { width: e, color: n } };
  }
  o(Ps, "outline");
  function Qn() {
    return {
      id: "timer",
      wait(e, n) {
        let s = [];
        n && s.push(n);
        let i = 0,
          a = this.onUpdate(() => {
            (i += Ue()), i >= e && (s.forEach((c) => c()), a.cancel());
          });
        return {
          get paused() {
            return a.paused;
          },
          set paused(c) {
            a.paused = c;
          },
          cancel: a.cancel,
          onEnd(c) {
            s.push(c);
          },
          then(c) {
            return this.onEnd(c), this;
          },
        };
      },
      loop(e, n) {
        let s = null,
          i = o(() => {
            (s = this.wait(e, i)), n();
          }, "newAction");
        return (
          (s = this.wait(0, i)),
          {
            get paused() {
              return s.paused;
            },
            set paused(a) {
              s.paused = a;
            },
            cancel: () => s.cancel(),
          }
        );
      },
      tween(e, n, s, i, a = Ze.linear) {
        let c = 0,
          f = [],
          g = this.onUpdate(() => {
            c += Ue();
            let m = Math.min(c / s, 1);
            i(Ce(e, n, a(m))),
              m === 1 && (g.cancel(), i(n), f.forEach((l) => l()));
          });
        return {
          get paused() {
            return g.paused;
          },
          set paused(m) {
            g.paused = m;
          },
          onEnd(m) {
            f.push(m);
          },
          then(m) {
            return this.onEnd(m), this;
          },
          cancel() {
            g.cancel();
          },
          finish() {
            g.cancel(), i(n), f.forEach((m) => m());
          },
        };
      },
    };
  }
  o(Qn, "timer");
  let Ms = 640,
    Rs = 65536;
  function Ds(e = {}) {
    let n = C(0),
      s = null,
      i = null,
      a = !1;
    return {
      id: "body",
      require: ["pos", "area"],
      jumpForce: e.jumpForce ?? Ms,
      gravityScale: e.gravityScale ?? 1,
      isStatic: e.isStatic ?? !1,
      mass: e.mass ?? 1,
      add() {
        if (this.mass === 0) throw new Error("Can't set body mass to 0");
        this.onCollideUpdate((c, f) => {
          if (
            c.is("body") &&
            !f.resolved &&
            (this.trigger("beforePhysicsResolve", f),
            c.trigger("beforePhysicsResolve", f.reverse()),
            !f.resolved && !(this.isStatic && c.isStatic))
          ) {
            if (!this.isStatic && !c.isStatic) {
              let g = this.mass + c.mass;
              (this.pos = this.pos.add(f.displacement.scale(c.mass / g))),
                (c.pos = c.pos.add(f.displacement.scale(-this.mass / g))),
                (this.transform = Gt(this)),
                (c.transform = Gt(c));
            } else {
              let g = !this.isStatic && c.isStatic ? f : f.reverse();
              (g.source.pos = g.source.pos.add(g.displacement)),
                (g.source.transform = Gt(g.source));
            }
            (f.resolved = !0),
              this.trigger("physicsResolve", f),
              c.trigger("physicsResolve", f.reverse());
          }
        }),
          this.onPhysicsResolve((c) => {
            A.gravity &&
              (c.isBottom() && this.isFalling()
                ? ((n.y = 0),
                  (s = c.target),
                  (i = c.target.pos),
                  a ? (a = !1) : this.trigger("ground", s))
                : c.isTop() &&
                  this.isJumping() &&
                  ((n.y = 0), this.trigger("headbutt", c.target)));
          });
      },
      update() {
        if (!A.gravity || this.isStatic) return;
        if (
          (a && ((s = null), (i = null), this.trigger("fallOff"), (a = !1)), s)
        )
          if (!this.isOverlapping(s) || !s.exists() || !s.is("body")) a = !0;
          else {
            !s.pos.eq(i) &&
              e.stickToPlatform !== !1 &&
              this.moveBy(s.pos.sub(i)),
              (i = s.pos);
            return;
          }
        let c = n.y;
        (n.y += A.gravity * this.gravityScale * Ue()),
          (n.y = Math.min(n.y, e.maxVelocity ?? Rs)),
          c < 0 && n.y >= 0 && this.trigger("fall"),
          this.move(n);
      },
      onPhysicsResolve(c) {
        return this.on("physicsResolve", c);
      },
      onBeforePhysicsResolve(c) {
        return this.on("beforePhysicsResolve", c);
      },
      curPlatform() {
        return s;
      },
      isGrounded() {
        return s !== null;
      },
      isFalling() {
        return n.y > 0;
      },
      isJumping() {
        return n.y < 0;
      },
      jump(c) {
        (s = null), (i = null), (n.y = -c || -this.jumpForce);
      },
      onGround(c) {
        return this.on("ground", c);
      },
      onFall(c) {
        return this.on("fall", c);
      },
      onFallOff(c) {
        return this.on("fallOff", c);
      },
      onHeadbutt(c) {
        return this.on("headbutt", c);
      },
    };
  }
  o(Ds, "body");
  function Gs(e = 2) {
    let n = e;
    return {
      id: "doubleJump",
      require: ["body"],
      numJumps: e,
      add() {
        this.onGround(() => {
          n = this.numJumps;
        });
      },
      doubleJump(s) {
        n <= 0 ||
          (n < this.numJumps && this.trigger("doubleJump"), n--, this.jump(s));
      },
      onDoubleJump(s) {
        return this.on("doubleJump", s);
      },
      inspect() {
        return `${n}`;
      },
    };
  }
  o(Gs, "doubleJump");
  function Fs(e, n) {
    return {
      id: "shader",
      shader: e,
      ...(typeof n == "function"
        ? {
            uniform: n(),
            update() {
              this.uniform = n();
            },
          }
        : { uniform: n }),
    };
  }
  o(Fs, "shader");
  function Bs() {
    return { id: "fixed", fixed: !0 };
  }
  o(Bs, "fixed");
  function Zn(e) {
    return { id: "stay", stay: !0, scenesToStay: e };
  }
  o(Zn, "stay");
  function Ls(e) {
    if (e == null)
      throw new Error("health() requires the initial amount of hp");
    let n = e;
    return {
      id: "health",
      hurt(s = 1) {
        this.setHP(e - s), this.trigger("hurt", s);
      },
      heal(s = 1) {
        this.setHP(e + s), this.trigger("heal", s);
      },
      hp() {
        return e;
      },
      maxHP() {
        return n;
      },
      setHP(s) {
        (e = s), e <= 0 && this.trigger("death");
      },
      onHurt(s) {
        return this.on("hurt", s);
      },
      onHeal(s) {
        return this.on("heal", s);
      },
      onDeath(s) {
        return this.on("death", s);
      },
      inspect() {
        return `${e}`;
      },
    };
  }
  o(Ls, "health");
  function Is(e, n = {}) {
    if (e == null) throw new Error("lifespan() requires time");
    let s = n.fade ?? 0;
    return {
      id: "lifespan",
      async add() {
        await Bt(e),
          s > 0 &&
            this.opacity &&
            (await yn(
              this.opacity,
              0,
              s,
              (i) => (this.opacity = i),
              Ze.linear
            )),
          this.destroy();
      },
    };
  }
  o(Is, "lifespan");
  function Vs(e, n, s) {
    if (!e) throw new Error("state() requires an initial state");
    let i = {};
    function a(m) {
      i[m] ||
        (i[m] = {
          enter: new ve(),
          end: new ve(),
          update: new ve(),
          draw: new ve(),
        });
    }
    o(a, "initStateEvents");
    function c(m, l, p) {
      return a(l), i[l][m].add(p);
    }
    o(c, "on");
    function f(m, l, ...p) {
      a(l), i[l][m].trigger(...p);
    }
    o(f, "trigger");
    let g = !1;
    return {
      id: "state",
      state: e,
      enterState(m, ...l) {
        if (((g = !0), n && !n.includes(m)))
          throw new Error(`State not found: ${m}`);
        let p = this.state;
        if (s) {
          if (!s?.[p]) return;
          let S = typeof s[p] == "string" ? [s[p]] : s[p];
          if (!S.includes(m))
            throw new Error(
              `Cannot transition state from "${p}" to "${m}". Available transitions: ${S.map(
                (R) => `"${R}"`
              ).join(", ")}`
            );
        }
        f("end", p, ...l),
          (this.state = m),
          f("enter", m, ...l),
          f("enter", `${p} -> ${m}`, ...l);
      },
      onStateTransition(m, l, p) {
        return c("enter", `${m} -> ${l}`, p);
      },
      onStateEnter(m, l) {
        return c("enter", m, l);
      },
      onStateUpdate(m, l) {
        return c("update", m, l);
      },
      onStateDraw(m, l) {
        return c("draw", m, l);
      },
      onStateEnd(m, l) {
        return c("end", m, l);
      },
      update() {
        g || (f("enter", e), (g = !0)), f("update", this.state);
      },
      draw() {
        f("draw", this.state);
      },
      inspect() {
        return this.state;
      },
    };
  }
  o(Vs, "state");
  function Ns(e = 1) {
    let n = 0,
      s = !1;
    return {
      require: ["opacity"],
      add() {
        this.opacity = 0;
      },
      update() {
        s ||
          ((n += Ue()),
          (this.opacity = jt(n, 0, e, 0, 1)),
          n >= e && ((this.opacity = 1), (s = !0)));
      },
    };
  }
  o(Ns, "fadeIn");
  function wn(e) {
    I.loaded ? e() : A.events.on("load", e);
  }
  o(wn, "onLoad");
  function js(e, n) {
    A.scenes[e] = n;
  }
  o(js, "scene");
  function ks(e, ...n) {
    if (!A.scenes[e]) throw new Error(`Scene not found: ${e}`);
    A.events.onOnce("frameEnd", () => {
      A.events.trigger("sceneLeave", e),
        U.events.clear(),
        A.events.clear(),
        A.objEvents.clear(),
        [...A.root.children].forEach((s) => {
          (!s.stay || (s.scenesToStay && !s.scenesToStay.includes(e))) &&
            A.root.remove(s);
        }),
        A.root.clearEvents(),
        (A.cam = {
          pos: null,
          scale: C(1),
          angle: 0,
          shake: 0,
          transform: new be(),
        }),
        A.scenes[e](...n),
        r.debug !== !1 && Wn(),
        r.burp && Jn();
    });
  }
  o(ks, "go");
  function _s(e) {
    return A.events.on("sceneLeave", e);
  }
  o(_s, "onSceneLeave");
  function Hs(e, n) {
    try {
      return JSON.parse(window.localStorage[e]);
    } catch {
      return n ? (er(e, n), n) : null;
    }
  }
  o(Hs, "getData");
  function er(e, n) {
    window.localStorage[e] = JSON.stringify(n);
  }
  o(er, "setData");
  function tr(e, ...n) {
    let s = e(ke),
      i;
    typeof s == "function" ? (i = s(...n)(ke)) : (i = s);
    for (let a in i) (ke[a] = i[a]), r.global !== !1 && (window[a] = i[a]);
    return ke;
  }
  o(tr, "plug");
  function Vt() {
    return C(pe() / 2, we() / 2);
  }
  o(Vt, "center");
  let qs;
  ((O) => (
    (O[(O.None = 0)] = "None"),
    (O[(O.Left = 1)] = "Left"),
    (O[(O.Top = 2)] = "Top"),
    (O[(O.LeftTop = 3)] = "LeftTop"),
    (O[(O.Right = 4)] = "Right"),
    (O[(O.Horizontal = 5)] = "Horizontal"),
    (O[(O.RightTop = 6)] = "RightTop"),
    (O[(O.HorizontalTop = 7)] = "HorizontalTop"),
    (O[(O.Bottom = 8)] = "Bottom"),
    (O[(O.LeftBottom = 9)] = "LeftBottom"),
    (O[(O.Vertical = 10)] = "Vertical"),
    (O[(O.LeftVertical = 11)] = "LeftVertical"),
    (O[(O.RightBottom = 12)] = "RightBottom"),
    (O[(O.HorizontalBottom = 13)] = "HorizontalBottom"),
    (O[(O.RightVertical = 14)] = "RightVertical"),
    (O[(O.All = 15)] = "All")
  ))((qs ||= {}));
  function nr(e = {}) {
    let n = C(0),
      s = e.isObstacle ?? !1,
      i = e.cost ?? 0,
      a = e.edges ?? [],
      c = o(() => {
        let g = { left: 1, top: 2, right: 4, bottom: 8 };
        return a.map((m) => g[m] || 0).reduce((m, l) => m | l, 0);
      }, "getEdgeMask"),
      f = c();
    return {
      id: "tile",
      tilePosOffset: e.offset ?? C(0),
      set tilePos(g) {
        let m = this.getLevel();
        (n = g.clone()),
          (this.pos = C(
            this.tilePos.x * m.tileWidth(),
            this.tilePos.y * m.tileHeight()
          ).add(this.tilePosOffset));
      },
      get tilePos() {
        return n;
      },
      set isObstacle(g) {
        s !== g && ((s = g), this.getLevel().invalidateNavigationMap());
      },
      get isObstacle() {
        return s;
      },
      set cost(g) {
        i !== g && ((i = g), this.getLevel().invalidateNavigationMap());
      },
      get cost() {
        return i;
      },
      set edges(g) {
        (a = g), (f = c()), this.getLevel().invalidateNavigationMap();
      },
      get edges() {
        return a;
      },
      get edgeMask() {
        return f;
      },
      getLevel() {
        return this.parent;
      },
      moveLeft() {
        this.tilePos = this.tilePos.add(C(-1, 0));
      },
      moveRight() {
        this.tilePos = this.tilePos.add(C(1, 0));
      },
      moveUp() {
        this.tilePos = this.tilePos.add(C(0, -1));
      },
      moveDown() {
        this.tilePos = this.tilePos.add(C(0, 1));
      },
    };
  }
  o(nr, "tile");
  function $s(e, n) {
    if (!n.tileWidth || !n.tileHeight)
      throw new Error("Must provide tileWidth and tileHeight.");
    let s = dt([Lt(n.pos ?? C(0))]),
      i = e.length,
      a = 0,
      c = null,
      f = null,
      g = null,
      m = null,
      l = o((y) => y.x + y.y * a, "tile2Hash"),
      p = o((y) => C(Math.floor(y % a), Math.floor(y / a)), "hash2Tile"),
      S = o(() => {
        c = [];
        for (let y of s.children) R(y);
      }, "createSpatialMap"),
      R = o((y) => {
        let P = l(y.tilePos);
        c[P] ? c[P].push(y) : (c[P] = [y]);
      }, "insertIntoSpatialMap"),
      G = o((y) => {
        let P = l(y.tilePos);
        if (c[P]) {
          let D = c[P].indexOf(y);
          D >= 0 && c[P].splice(D, 1);
        }
      }, "removeFromSpatialMap"),
      k = o(() => {
        let y = !1;
        for (let P of s.children) {
          let D = s.pos2Tile(P.pos);
          (P.tilePos.x != D.x || P.tilePos.y != D.y) &&
            ((y = !0), G(P), (P.tilePos.x = D.x), (P.tilePos.y = D.y), R(P));
        }
        y && s.trigger("spatial_map_changed");
      }, "updateSpatialMap"),
      M = o(() => {
        let y = s.getSpatialMap(),
          P = s.numRows() * s.numColumns();
        f ? (f.length = P) : (f = new Array(P)), f.fill(1, 0, P);
        for (let D = 0; D < y.length; D++) {
          let F = y[D];
          if (F) {
            let H = 0;
            for (let Y of F)
              if (Y.isObstacle) {
                H = 1 / 0;
                break;
              } else H += Y.cost;
            f[D] = H || 1;
          }
        }
      }, "createCostMap"),
      O = o(() => {
        let y = s.getSpatialMap(),
          P = s.numRows() * s.numColumns();
        g ? (g.length = P) : (g = new Array(P)), g.fill(15, 0, P);
        for (let D = 0; D < y.length; D++) {
          let F = y[D];
          if (F) {
            let H = F.length,
              Y = 15;
            for (let ne = 0; ne < H; ne++) Y |= F[ne].edgeMask;
            g[D] = Y;
          }
        }
      }, "createEdgeMap"),
      te = o(() => {
        let y = s.numRows() * s.numColumns(),
          P = o((F, H) => {
            let Y = [];
            for (Y.push(F); Y.length > 0; ) {
              let ne = Y.pop();
              L(ne).forEach((fe) => {
                m[fe] < 0 && ((m[fe] = H), Y.push(fe));
              });
            }
          }, "traverse");
        m ? (m.length = y) : (m = new Array(y)), m.fill(-1, 0, y);
        let D = 0;
        for (let F = 0; F < f.length; F++) {
          if (m[F] >= 0) {
            D++;
            continue;
          }
          P(F, D), D++;
        }
      }, "createConnectivityMap"),
      K = o((y, P) => f[P], "getCost"),
      j = o((y, P) => {
        let D = p(y),
          F = p(P);
        return D.dist(F);
      }, "getHeuristic"),
      L = o((y, P) => {
        let D = [],
          F = Math.floor(y % a),
          H = F > 0 && g[y] & 1 && f[y - 1] !== 1 / 0,
          Y = y >= a && g[y] & 2 && f[y - a] !== 1 / 0,
          ne = F < a - 1 && g[y] & 4 && f[y + 1] !== 1 / 0,
          fe = y < a * i - a - 1 && g[y] & 8 && f[y + a] !== 1 / 0;
        return (
          P
            ? (H &&
                (Y && D.push(y - a - 1),
                D.push(y - 1),
                fe && D.push(y + a - 1)),
              Y && D.push(y - a),
              ne &&
                (Y && D.push(y - a + 1),
                D.push(y + 1),
                fe && D.push(y + a + 1)),
              fe && D.push(y + a))
            : (H && D.push(y - 1),
              Y && D.push(y - a),
              ne && D.push(y + 1),
              fe && D.push(y + a)),
          D
        );
      }, "getNeighbours"),
      de = {
        id: "level",
        tileWidth() {
          return n.tileWidth;
        },
        tileHeight() {
          return n.tileHeight;
        },
        spawn(y, ...P) {
          let D = C(...P),
            F = (() => {
              if (typeof y == "string") {
                if (n.tiles[y]) {
                  if (typeof n.tiles[y] != "function")
                    throw new Error(
                      "Level symbol def must be a function returning a component list"
                    );
                  return n.tiles[y](D);
                } else if (n.wildcardTile) return n.wildcardTile(y, D);
              } else {
                if (Array.isArray(y)) return y;
                throw new Error("Expected a symbol or a component list");
              }
            })();
          if (!F) return null;
          let H = !1,
            Y = !1;
          for (let fe of F)
            fe.id === "tile" && (Y = !0), fe.id === "pos" && (H = !0);
          H || F.push(Lt()), Y || F.push(nr());
          let ne = s.add(F);
          return (
            H && (ne.tilePosOffset = ne.pos.clone()),
            (ne.tilePos = D),
            c &&
              (R(ne),
              this.trigger("spatial_map_changed"),
              this.trigger("navigation_map_invalid")),
            ne
          );
        },
        numColumns() {
          return a;
        },
        numRows() {
          return i;
        },
        levelWidth() {
          return a * this.tileWidth();
        },
        levelHeight() {
          return i * this.tileHeight();
        },
        tile2Pos(...y) {
          return C(...y).scale(this.tileWidth(), this.tileHeight());
        },
        pos2Tile(...y) {
          let P = C(...y);
          return C(
            Math.floor(P.x / this.tileWidth()),
            Math.floor(P.y / this.tileHeight())
          );
        },
        getSpatialMap() {
          return c || S(), c;
        },
        onSpatialMapChanged(y) {
          return this.on("spatial_map_changed", y);
        },
        onNavigationMapInvalid(y) {
          return this.on("navigation_map_invalid", y);
        },
        getAt(y) {
          c || S();
          let P = l(y);
          return c[P] || [];
        },
        update() {
          c && k();
        },
        invalidateNavigationMap() {
          (f = null), (g = null), (m = null);
        },
        onNavigationMapChanged(y) {
          return this.on("navigation_map_changed", y);
        },
        getTilePath(y, P, D = {}) {
          if (
            (f || M(),
            g || O(),
            m || te(),
            y.x < 0 ||
              y.x >= a ||
              y.y < 0 ||
              y.y >= i ||
              P.x < 0 ||
              P.x >= a ||
              P.y < 0 ||
              P.y >= i)
          )
            return null;
          let F = l(y),
            H = l(P);
          if (f[H] === 1 / 0) return null;
          if (F === H) return [];
          if (m[F] != -1 && m[F] !== m[H]) return null;
          let Y = new kt((Oe, Un) => Oe.cost < Un.cost);
          Y.insert({ cost: 0, node: F });
          let ne = new Map();
          ne.set(F, F);
          let fe = new Map();
          for (fe.set(F, 0); Y.length !== 0; ) {
            let Oe = Y.remove()?.node;
            if (Oe === H) break;
            let Un = L(Oe, D.allowDiagonals);
            for (let _e of Un) {
              let En = (fe.get(Oe) || 0) + K(Oe, _e) + j(_e, H);
              (!fe.has(_e) || En < fe.get(_e)) &&
                (fe.set(_e, En),
                Y.insert({ cost: En, node: _e }),
                ne.set(_e, Oe));
            }
          }
          let xn = [],
            ft = H,
            li = p(ft);
          for (xn.push(li); ft !== F; ) {
            ft = ne.get(ft);
            let Oe = p(ft);
            xn.push(Oe);
          }
          return xn.reverse();
        },
        getPath(y, P, D = {}) {
          let F = this.tileWidth(),
            H = this.tileHeight(),
            Y = this.getTilePath(this.pos2Tile(y), this.pos2Tile(P), D);
          return Y
            ? [
                y,
                ...Y.slice(1, -1).map((ne) => ne.scale(F, H).add(F / 2, H / 2)),
                P,
              ]
            : null;
        },
      };
    return (
      s.use(de),
      s.onNavigationMapInvalid(() => {
        s.invalidateNavigationMap(), s.trigger("navigation_map_changed");
      }),
      e.forEach((y, P) => {
        let D = y.split("");
        (a = Math.max(D.length, a)),
          D.forEach((F, H) => {
            s.spawn(F, C(H, P));
          });
      }),
      s
    );
  }
  o($s, "addLevel");
  function zs(e = {}) {
    let n = null,
      s = null,
      i = null,
      a = null;
    return {
      id: "agent",
      require: ["pos", "tile"],
      agentSpeed: e.speed ?? 100,
      allowDiagonals: e.allowDiagonals ?? !0,
      getDistanceToTarget() {
        return n ? this.pos.dist(n) : 0;
      },
      getNextLocation() {
        return s && i ? s[i] : null;
      },
      getPath() {
        return s ? s.slice() : null;
      },
      getTarget() {
        return n;
      },
      isNavigationFinished() {
        return s ? i === null : !0;
      },
      isTargetReachable() {
        return s !== null;
      },
      isTargetReached() {
        return n ? this.pos.eq(n) : !0;
      },
      setTarget(c) {
        (n = c),
          (s = this.getLevel().getPath(this.pos, n, {
            allowDiagonals: this.allowDiagonals,
          })),
          (i = s ? 0 : null),
          s
            ? (a ||
                ((a = this.getLevel().onNavigationMapChanged(() => {
                  s &&
                    i !== null &&
                    ((s = this.getLevel().getPath(this.pos, n, {
                      allowDiagonals: this.allowDiagonals,
                    })),
                    (i = s ? 0 : null),
                    s
                      ? this.trigger("navigation-next", this, s[i])
                      : this.trigger("navigation-ended", this));
                })),
                this.onDestroy(() => a.cancel())),
              this.trigger("navigation-started", this),
              this.trigger("navigation-next", this, s[i]))
            : this.trigger("navigation-ended", this);
      },
      update() {
        if (s && i !== null) {
          if (this.pos.sdist(s[i]) < 2)
            if (i === s.length - 1) {
              (this.pos = n.clone()),
                (i = null),
                this.trigger("navigation-ended", this),
                this.trigger("target-reached", this);
              return;
            } else i++, this.trigger("navigation-next", this, s[i]);
          this.moveTo(s[i], this.agentSpeed);
        }
      },
      onNavigationStarted(c) {
        return this.on("navigation-started", c);
      },
      onNavigationNext(c) {
        return this.on("navigation-next", c);
      },
      onNavigationEnded(c) {
        return this.on("navigation-ended", c);
      },
      onTargetReached(c) {
        return this.on("target-reached", c);
      },
      inspect() {
        return JSON.stringify({
          target: JSON.stringify(n),
          path: JSON.stringify(s),
        });
      },
    };
  }
  o(zs, "agent");
  function Ks(e) {
    let n = U.canvas().captureStream(e),
      s = ie.ctx.createMediaStreamDestination();
    ie.masterNode.connect(s);
    let i = new MediaRecorder(n),
      a = [];
    return (
      (i.ondataavailable = (c) => {
        c.data.size > 0 && a.push(c.data);
      }),
      (i.onerror = () => {
        ie.masterNode.disconnect(s), n.getTracks().forEach((c) => c.stop());
      }),
      i.start(),
      {
        resume() {
          i.resume();
        },
        pause() {
          i.pause();
        },
        stop() {
          return (
            i.stop(),
            ie.masterNode.disconnect(s),
            n.getTracks().forEach((c) => c.stop()),
            new Promise((c) => {
              i.onstop = () => {
                c(new Blob(a, { type: "video/mp4" }));
              };
            })
          );
        },
        download(c = "kaboom.mp4") {
          this.stop().then((f) => Dn(c, f));
        },
      }
    );
  }
  o(Ks, "record");
  function Ys() {
    return document.activeElement === U.canvas();
  }
  o(Ys, "isFocused");
  function Xs(e) {
    e.destroy();
  }
  o(Xs, "destroy");
  let dt = A.root.add.bind(A.root),
    Ws = A.root.readd.bind(A.root),
    Js = A.root.removeAll.bind(A.root),
    rr = A.root.get.bind(A.root);
  function sr(e = 2, n = 1) {
    let s = 0;
    return {
      id: "boom",
      require: ["scale"],
      update() {
        let i = Math.sin(s * e) * n;
        i < 0 && this.destroy(), (this.scale = C(i)), (s += Ue());
      },
    };
  }
  o(sr, "boom");
  let Qs = Ie(null, Rr),
    Zs = Ie(null, Dr);
  function ei(e, n = {}) {
    let s = dt([Lt(e), Zn()]),
      i = (n.speed || 1) * 5,
      a = n.scale || 1;
    s.add([gn(Zs), It(0), pn("center"), sr(i, a), ...(n.comps ?? [])]);
    let c = s.add([gn(Qs), It(0), pn("center"), Qn(), ...(n.comps ?? [])]);
    return (
      c.wait(0.4 / i, () => c.use(sr(i, a))), c.onDestroy(() => s.destroy()), s
    );
  }
  o(ei, "addKaboom");
  function ir() {
    A.root.update();
  }
  o(ir, "updateFrame");
  class vn {
    static {
      o(this, "Collision");
    }
    source;
    target;
    displacement;
    resolved = !1;
    constructor(n, s, i, a = !1) {
      (this.source = n),
        (this.target = s),
        (this.displacement = i),
        (this.resolved = a);
    }
    reverse() {
      return new vn(
        this.target,
        this.source,
        this.displacement.scale(-1),
        this.resolved
      );
    }
    hasOverlap() {
      return !this.displacement.isZero();
    }
    isLeft() {
      return this.displacement.x > 0;
    }
    isRight() {
      return this.displacement.x < 0;
    }
    isTop() {
      return this.displacement.y > 0;
    }
    isBottom() {
      return this.displacement.y < 0;
    }
    preventResolution() {
      this.resolved = !0;
    }
  }
  function ti() {
    let e = {},
      n = r.hashGridSize || Si,
      s = new be(),
      i = [];
    function a(c) {
      if (
        (i.push(s.clone()),
        c.pos && s.translate(c.pos),
        c.scale && s.scale(c.scale),
        c.angle && s.rotate(c.angle),
        (c.transform = s.clone()),
        c.c("area") && !c.paused)
      ) {
        let f = c,
          m = f.worldArea().bbox(),
          l = Math.floor(m.pos.x / n),
          p = Math.floor(m.pos.y / n),
          S = Math.ceil((m.pos.x + m.width) / n),
          R = Math.ceil((m.pos.y + m.height) / n),
          G = new Set();
        for (let k = l; k <= S; k++)
          for (let M = p; M <= R; M++)
            if (!e[k]) (e[k] = {}), (e[k][M] = [f]);
            else if (!e[k][M]) e[k][M] = [f];
            else {
              let O = e[k][M];
              e: for (let te of O) {
                if (!te.exists() || G.has(te.id)) continue;
                for (let j of f.collisionIgnore) if (te.is(j)) continue e;
                for (let j of te.collisionIgnore) if (f.is(j)) continue e;
                let K = yr(f.worldArea(), te.worldArea());
                if (K) {
                  let j = new vn(f, te, K);
                  f.trigger("collideUpdate", te, j);
                  let L = j.reverse();
                  (L.resolved = j.resolved), te.trigger("collideUpdate", f, L);
                }
                G.add(te.id);
              }
              O.push(f);
            }
      }
      c.children.forEach(a), (s = i.pop());
    }
    o(a, "checkObj"), a(A.root);
  }
  o(ti, "checkFrame");
  function ni() {
    let e = A.cam,
      n = x.fromAngle(wt(0, 360)).scale(e.shake);
    (e.shake = Ce(e.shake, 0, 5 * Ue())),
      (e.transform = new be()
        .translate(Vt())
        .scale(e.scale)
        .rotate(e.angle)
        .translate((e.pos ?? Vt()).scale(-1).add(n))),
      A.root.draw(),
      he();
  }
  o(ni, "drawFrame");
  function ri() {
    let e = Te();
    A.events.numListeners("loading") > 0
      ? A.events.trigger("loading", e)
      : Be(() => {
          let n = pe() / 2,
            s = 24,
            i = C(pe() / 2, we() / 2).sub(C(n / 2, s / 2));
          xe({ pos: C(0), width: pe(), height: we(), color: J(0, 0, 0) }),
            xe({
              pos: i,
              width: n,
              height: s,
              fill: !1,
              outline: { width: 4 },
            }),
            xe({ pos: i, width: n * e, height: s });
        });
  }
  o(ri, "drawLoadScreen");
  function or(e, n) {
    Be(() => {
      let s = C(8);
      Z(), b(e);
      let i = Ne({
          text: n,
          font: zt,
          size: 16,
          pos: s,
          color: J(255, 255, 255),
          fixed: !0,
        }),
        a = i.width + s.x * 2,
        c = i.height + s.x * 2;
      e.x + a >= pe() && b(C(-a, 0)),
        e.y + c >= we() && b(C(0, -c)),
        xe({
          width: a,
          height: c,
          color: J(0, 0, 0),
          radius: 4,
          opacity: 0.8,
          fixed: !0,
        }),
        je(i),
        _();
    });
  }
  o(or, "drawInspectText");
  function si() {
    if (ee.inspect) {
      let e = null;
      for (let n of A.root.get("*", { recursive: !0 }))
        if (n.c("area") && n.isHovering()) {
          e = n;
          break;
        }
      if ((A.root.drawInspect(), e)) {
        let n = [],
          s = e.inspect();
        for (let i in s) s[i] ? n.push(`${i}: ${s[i]}`) : n.push(`${i}`);
        or(
          Qr(Dt()),
          n.join(`
`)
        );
      }
      or(C(8), `FPS: ${ee.fps()}`);
    }
    ee.paused &&
      Be(() => {
        Z(), b(pe(), 0), b(-8, 8);
        let e = 32;
        xe({
          width: e,
          height: e,
          anchor: "topright",
          color: J(0, 0, 0),
          opacity: 0.8,
          radius: 4,
          fixed: !0,
        });
        for (let n = 1; n <= 2; n++)
          xe({
            width: 4,
            height: e * 0.6,
            anchor: "center",
            pos: C((-e / 3) * n, e * 0.5),
            color: J(255, 255, 255),
            radius: 2,
            fixed: !0,
          });
        _();
      }),
      ee.timeScale !== 1 &&
        Be(() => {
          Z(), b(pe(), we()), b(-8, -8);
          let e = 8,
            n = Ne({
              text: ee.timeScale.toFixed(1),
              font: zt,
              size: 16,
              color: J(255, 255, 255),
              pos: C(-e),
              anchor: "botright",
              fixed: !0,
            });
          xe({
            width: n.width + e * 2 + e * 4,
            height: n.height + e * 2,
            anchor: "botright",
            color: J(0, 0, 0),
            opacity: 0.8,
            radius: 4,
            fixed: !0,
          });
          for (let s = 0; s < 2; s++) {
            let i = ee.timeScale < 1;
            jn({
              p1: C(-n.width - e * (i ? 2 : 3.5), -e),
              p2: C(-n.width - e * (i ? 2 : 3.5), -e - n.height),
              p3: C(-n.width - e * (i ? 3.5 : 2), -e - n.height / 2),
              pos: C(-s * e * 1 + (i ? -e * 0.5 : 0), 0),
              color: J(255, 255, 255),
              fixed: !0,
            });
          }
          je(n), _();
        }),
      ee.curRecording &&
        Be(() => {
          Z(),
            b(0, we()),
            b(24, -24),
            Ke({
              radius: 12,
              color: J(255, 0, 0),
              opacity: Tn(0, 1, U.time() * 4),
              fixed: !0,
            }),
            _();
        }),
      ee.showLog &&
        A.logs.length > 0 &&
        Be(() => {
          Z(), b(0, we()), b(8, -8);
          let e = 8,
            n = [];
          for (let i of A.logs) {
            let a = "",
              c = i.msg instanceof Error ? "error" : "info";
            (a += `[time]${i.time.toFixed(2)}[/time]`),
              (a += " "),
              (a += `[${c}]${
                i.msg?.toString ? i.msg.toString() : i.msg
              }[/${c}]`),
              n.push(a);
          }
          A.logs = A.logs.filter((i) => U.time() - i.time < (r.logTime || Ti));
          let s = Ne({
            text: n.join(`
`),
            font: zt,
            pos: C(e, -e),
            anchor: "botleft",
            size: 16,
            width: pe() * 0.6,
            lineSpacing: e / 2,
            fixed: !0,
            styles: {
              time: { color: J(127, 127, 127) },
              info: { color: J(255, 255, 255) },
              error: { color: J(255, 0, 127) },
            },
          });
          xe({
            width: s.width + e * 2,
            height: s.height + e * 2,
            anchor: "botleft",
            color: J(0, 0, 0),
            radius: 4,
            opacity: 0.8,
            fixed: !0,
          }),
            je(s),
            _();
        });
  }
  o(si, "drawDebug"), r.debug !== !1 && Wn(), r.burp && Jn();
  function ii(e) {
    A.events.on("loading", e);
  }
  o(ii, "onLoading");
  function oi(e) {
    U.onResize(e);
  }
  o(oi, "onResize");
  function ai(e) {
    A.events.on("error", e);
  }
  o(ai, "onError");
  function bn(e) {
    U.run(() => {
      Be(() => {
        let i = pe(),
          a = we(),
          c = {
            size: 36,
            width: i - 32 * 2,
            letterSpacing: 4,
            lineSpacing: 4,
            font: zt,
            fixed: !0,
          };
        xe({ width: i, height: a, color: J(0, 0, 255), fixed: !0 });
        let f = Ne({
          ...c,
          text: e.name,
          pos: C(32),
          color: J(255, 128, 0),
          fixed: !0,
        });
        je(f),
          zn({
            ...c,
            text: e.message,
            pos: C(32, 32 + f.height + 16),
            fixed: !0,
          }),
          _(),
          A.events.trigger("error", e);
      });
    });
  }
  o(bn, "handleErr");
  function ui(e) {
    X.push(e);
  }
  o(ui, "onCleanup");
  function ci() {
    A.events.onOnce("frameEnd", () => {
      U.quit();
      for (let n in Ye) window.removeEventListener(n, Ye[n]);
      h.clear(h.COLOR_BUFFER_BIT | h.DEPTH_BUFFER_BIT | h.STENCIL_BUFFER_BIT);
      let e = h.getParameter(h.MAX_TEXTURE_IMAGE_UNITS);
      for (let n = 0; n < e; n++)
        h.activeTexture(h.TEXTURE0 + n),
          h.bindTexture(h.TEXTURE_2D, null),
          h.bindTexture(h.TEXTURE_CUBE_MAP, null);
      h.bindBuffer(h.ARRAY_BUFFER, null),
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null),
        h.bindRenderbuffer(h.RENDERBUFFER, null),
        h.bindFramebuffer(h.FRAMEBUFFER, null),
        X.forEach((n) => n()),
        h.deleteBuffer(v.vbuf),
        h.deleteBuffer(v.ibuf);
    });
  }
  o(ci, "quit");
  function yn(e, n, s, i, a = Ze.linear) {
    let c = 0,
      f = [],
      g = fn(() => {
        c += Ue();
        let m = Math.min(c / s, 1);
        i(Ce(e, n, a(m))), m === 1 && (g.cancel(), i(n), f.forEach((l) => l()));
      });
    return {
      get paused() {
        return g.paused;
      },
      set paused(m) {
        g.paused = m;
      },
      onEnd(m) {
        f.push(m);
      },
      then(m) {
        return this.onEnd(m), this;
      },
      cancel() {
        g.cancel();
      },
      finish() {
        g.cancel(), i(n), f.forEach((m) => m());
      },
    };
  }
  o(yn, "tween");
  let Nt = !0;
  U.run(() => {
    I.loaded ||
      (Te() === 1 && !Nt && ((I.loaded = !0), A.events.trigger("load"))),
      (!I.loaded && r.loadingScreen !== !1) || Nt
        ? (ot(), ri(), at())
        : (ee.paused || ir(), ti(), ot(), ni(), r.debug !== !1 && si(), at()),
      Nt && (Nt = !1),
      A.events.trigger("frameEnd");
  });
  function ar() {
    let e = N,
      n = h.drawingBufferWidth / e,
      s = h.drawingBufferHeight / e;
    if (U.isFullscreen()) {
      let i = window.innerWidth,
        a = window.innerHeight,
        c = i / a,
        f = n / s;
      if (c > f) {
        let g = window.innerHeight * f;
        v.viewport = { x: (i - g) / 2, y: 0, width: g, height: a };
      } else {
        let g = window.innerWidth / f;
        v.viewport = { x: 0, y: (a - g) / 2, width: i, height: g };
      }
      return;
    }
    if (r.letterbox) {
      if (!r.width || !r.height)
        throw new Error("Letterboxing requires width and height defined.");
      let i = n / s,
        a = r.width / r.height;
      if (i > a) {
        let c = s * a,
          f = (n - c) / 2;
        v.viewport = { x: f, y: 0, width: c, height: s };
      } else {
        let c = n / a,
          f = (s - c) / 2;
        v.viewport = { x: 0, y: f, width: n, height: c };
      }
      return;
    }
    if (r.stretch && (!r.width || !r.height))
      throw new Error("Stretching requires width and height defined.");
    v.viewport = { x: 0, y: 0, width: n, height: s };
  }
  o(ar, "updateViewport"),
    U.onResize(() => {
      if (U.isFullscreen()) return;
      let e = r.width && r.height;
      (e && !r.stretch && !r.letterbox) ||
        ((u.width = u.offsetWidth * N),
        (u.height = u.offsetHeight * N),
        ar(),
        e ||
          (v.frameBuffer.free(),
          (v.frameBuffer = new Ge(h.drawingBufferWidth, h.drawingBufferHeight)),
          (v.width = h.drawingBufferWidth / N),
          (v.height = h.drawingBufferHeight / N)));
    }),
    ar();
  let ke = {
    VERSION: xi,
    loadRoot: Yt,
    loadProgress: Te,
    loadSprite: Ie,
    loadSpriteAtlas: xt,
    loadSound: sn,
    loadBitmapFont: Zt,
    loadFont: Qt,
    loadShader: nn,
    loadShaderURL: rn,
    loadAseprite: tn,
    loadPedit: en,
    loadBean: on,
    loadJSON: Jt,
    load: tt,
    getSprite: Et,
    getSound: St,
    getFont: Ct,
    getBitmapFont: Tt,
    getShader: At,
    getAsset: an,
    Asset: oe,
    SpriteData: ue,
    SoundData: ge,
    width: pe,
    height: we,
    center: Vt,
    dt: Ue,
    time: U.time,
    screenshot: U.screenshot,
    record: Ks,
    isFocused: Ys,
    setCursor: U.setCursor,
    getCursor: U.getCursor,
    setCursorLocked: U.setCursorLocked,
    isCursorLocked: U.isCursorLocked,
    setFullscreen: U.setFullscreen,
    isFullscreen: U.isFullscreen,
    isTouchscreen: U.isTouchscreen,
    onLoad: wn,
    onLoading: ii,
    onResize: oi,
    onGamepadConnect: U.onGamepadConnect,
    onGamepadDisconnect: U.onGamepadDisconnect,
    onError: ai,
    onCleanup: ui,
    camPos: Zr,
    camScale: es,
    camRot: ts,
    shake: ns,
    toScreen: Kn,
    toWorld: Yn,
    setGravity: ds,
    getGravity: fs,
    setBackground: ms,
    getBackground: ps,
    getGamepads: U.getGamepads,
    add: dt,
    make: dn,
    destroy: Xs,
    destroyAll: Js,
    get: rr,
    readd: Ws,
    pos: Lt,
    scale: It,
    rotate: gs,
    color: ws,
    opacity: vs,
    anchor: pn,
    area: Ss,
    sprite: gn,
    text: Cs,
    rect: Ts,
    circle: Os,
    uvquad: As,
    outline: Ps,
    body: Ds,
    doubleJump: Gs,
    shader: Fs,
    timer: Qn,
    fixed: Bs,
    stay: Zn,
    health: Ls,
    lifespan: Is,
    z: bs,
    move: xs,
    offscreen: Es,
    follow: ys,
    state: Vs,
    fadeIn: Ns,
    tile: nr,
    agent: zs,
    on: Le,
    onUpdate: fn,
    onDraw: rs,
    onAdd: mn,
    onDestroy: Xn,
    onClick: as,
    onCollide: ss,
    onCollideUpdate: is,
    onCollideEnd: os,
    onHover: us,
    onHoverUpdate: cs,
    onHoverEnd: ls,
    onKeyDown: U.onKeyDown,
    onKeyPress: U.onKeyPress,
    onKeyPressRepeat: U.onKeyPressRepeat,
    onKeyRelease: U.onKeyRelease,
    onMouseDown: U.onMouseDown,
    onMousePress: U.onMousePress,
    onMouseRelease: U.onMouseRelease,
    onMouseMove: U.onMouseMove,
    onCharInput: U.onCharInput,
    onTouchStart: U.onTouchStart,
    onTouchMove: U.onTouchMove,
    onTouchEnd: U.onTouchEnd,
    onScroll: U.onScroll,
    onGamepadButtonDown: U.onGamepadButtonDown,
    onGamepadButtonPress: U.onGamepadButtonPress,
    onGamepadButtonRelease: U.onGamepadButtonRelease,
    onGamepadStick: U.onGamepadStick,
    mousePos: Dt,
    mouseDeltaPos: U.mouseDeltaPos,
    isKeyDown: U.isKeyDown,
    isKeyPressed: U.isKeyPressed,
    isKeyPressedRepeat: U.isKeyPressedRepeat,
    isKeyReleased: U.isKeyReleased,
    isMouseDown: U.isMouseDown,
    isMousePressed: U.isMousePressed,
    isMouseReleased: U.isMouseReleased,
    isMouseMoved: U.isMouseMoved,
    isGamepadButtonPressed: U.isGamepadButtonPressed,
    isGamepadButtonDown: U.isGamepadButtonDown,
    isGamepadButtonReleased: U.isGamepadButtonReleased,
    charInputted: U.charInputted,
    loop: hs,
    wait: Bt,
    play: st,
    volume: cn,
    burp: Mt,
    audioCtx: ie.ctx,
    Timer: bt,
    Line: Pe,
    Rect: ce,
    Circle: gt,
    Polygon: He,
    Vec2: x,
    Color: $,
    Mat4: be,
    Quad: ae,
    RNG: mt,
    rand: wt,
    randi: An,
    randSeed: dr,
    vec2: C,
    rgb: J,
    hsl2rgb: hr,
    quad: re,
    choose: mr,
    chance: fr,
    lerp: Ce,
    tween: yn,
    easings: Ze,
    map: jt,
    mapc: lr,
    wave: Tn,
    deg2rad: Se,
    rad2deg: Je,
    clamp: Me,
    testLineLine: We,
    testRectRect: pr,
    testRectLine: gr,
    testRectPoint: pt,
    testCirclePolygon: br,
    testLinePoint: wr,
    testLineCircle: On,
    drawSprite: Kr,
    drawText: zn,
    formatText: Ne,
    drawRect: xe,
    drawLine: ct,
    drawLines: Nn,
    drawTriangle: jn,
    drawCircle: Ke,
    drawEllipse: kn,
    drawUVQuad: Ee,
    drawPolygon: Ve,
    drawFormattedText: je,
    drawMasked: Yr,
    drawSubtracted: Xr,
    pushTransform: Z,
    popTransform: _,
    pushTranslate: b,
    pushScale: T,
    pushRotate: V,
    pushMatrix: d,
    usePostEffect: ln,
    debug: ee,
    scene: js,
    go: ks,
    onSceneLeave: _s,
    addLevel: $s,
    getData: Hs,
    setData: er,
    download: _t,
    downloadJSON: Ur,
    downloadText: Rn,
    downloadBlob: Dn,
    plug: tr,
    ASCII_CHARS: Gr,
    canvas: U.canvas(),
    addKaboom: ei,
    LEFT: x.LEFT,
    RIGHT: x.RIGHT,
    UP: x.UP,
    DOWN: x.DOWN,
    RED: $.RED,
    GREEN: $.GREEN,
    BLUE: $.BLUE,
    YELLOW: $.YELLOW,
    MAGENTA: $.MAGENTA,
    CYAN: $.CYAN,
    WHITE: $.WHITE,
    BLACK: $.BLACK,
    quit: ci,
    Event: ve,
    EventHandler: De,
    EventController: Re,
  };
  if ((r.plugins && r.plugins.forEach(tr), r.global !== !1))
    for (let e in ke) window[e] = ke[e];
  return U.canvas().focus(), ke;
}, "default");
export { ho as default };
//# sourceMappingURL=kaboom.mjs.map
