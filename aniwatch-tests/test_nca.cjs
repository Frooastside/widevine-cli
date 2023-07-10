const J = require("./nA.cjs");

console.log(Au(4582, 2997));
console.log(dO(897, 1725))

function Au(J5, J6) {
  return g(J6 - 799, J5);
}

function dO(J5, J6) {
    return I(J5 - -866, J6);
  }

function I(g, __B) {
  return J[g - 217];
}

/*function g(arg1, __arg2) {
  return base64UrlDecode(J[arg1 - 217]);
}*/

function B(I, g) {
  return rc4Encrypt(J[I - 217], g);
}

function g(I, B) {
    var d = J;
    return (
      (g = function (D, i) {
        D = D - 217;
        var C = d[D];
        console.log(C)
        if (g.gHqYGg === undefined) {
          var f = function (V) {
            var X = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
            var H = "",
              x = "";
            for (
              var r = 0, b, E, v = 0;
              (E = V.charAt(v++));
              ~E && ((b = r % 4 ? b * 64 + E : E), r++ % 4) ? (H += String.fromCharCode(255 & (b >> ((-2 * r) & 6)))) : 0
            ) {
              E = X.indexOf(E);
            }
            for (var O = 0, z = H.length; O < z; O++) {
              x += "%" + ("00" + H.charCodeAt(O).toString(16)).slice(-2);
            }
            return decodeURIComponent(x);
          };
          (g.TypUhd = f), (I = arguments), (g.gHqYGg = true);
        }
        var t = d[0],
          N = D + t,
          u = I[N];
        return !u ? ((C = g.TypUhd(C)), (I[N] = C)) : (C = u), C;
      }),
      g(I, B)
    );
  }

function base64UrlDecode(input) {
  const base64Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
  let binaryString = "";
  let paddingCount = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    const charIndex = base64Chars.indexOf(char);

    if (charIndex !== -1) {
      binaryString += charIndex.toString(2).padStart(6, "0");
    } else if (char === "=") {
      paddingCount++;
    }
  }

  binaryString = binaryString.slice(0, binaryString.length - paddingCount * 2);

  let decodedString = "";
  for (let i = 0; i < binaryString.length; i += 8) {
    const byte = binaryString.substr(i, 8);
    decodedString += String.fromCharCode(parseInt(byte, 2));
  }

  return decodeURIComponent(decodedString);
}

function rc4Encrypt(input, key) {
  let state = [];
  let index = 0;
  let encrypted = "";

  input = base64UrlDecode(input);

  // Key Scheduling Algorithm (KSA)
  for (let i = 0; i < 256; i++) {
    state[i] = i;
  }

  for (let i = 0; i < 256; i++) {
    index = (index + state[i] + key.charCodeAt(i % key.length)) % 256;
    let temp = state[i];
    state[i] = state[index];
    state[index] = temp;
  }

  let i = 0;
  let j = 0;

  // Pseudo-random generation algorithm (PRGA) and encryption
  for (let z = 0; z < input.length; z++) {
    i = (i + 1) % 256;
    j = (j + state[i]) % 256;
    let temp = state[i];
    state[i] = state[j];
    state[j] = temp;
    encrypted += String.fromCharCode(input.charCodeAt(z) ^ state[(state[i] + state[j]) % 256]);
  }

  return encrypted;
}
