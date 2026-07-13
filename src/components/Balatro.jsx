import { useEffect, useRef } from 'react';

const DEFAULT_OFFSET = [0.0, 0.0];

function hexToVec4(hex) {
  const hexStr = hex.replace('#', '');
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;

  if (hexStr.length === 6) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255;
    g = parseInt(hexStr.slice(2, 4), 16) / 255;
    b = parseInt(hexStr.slice(4, 6), 16) / 255;
  } else if (hexStr.length === 8) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255;
    g = parseInt(hexStr.slice(2, 4), 16) / 255;
    b = parseInt(hexStr.slice(4, 6), 16) / 255;
    a = parseInt(hexStr.slice(6, 8), 16) / 255;
  }

  return [r, g, b, a];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);

    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
       speed = iTime * speed;
    }
    speed += 302.2;

    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;

    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);

    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;

    vec2 uv2 = vec2(uv.x + uv.y);

    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }

    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);

    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || 'Shader compile failed.');
  }

  return shader;
}

function createProgram(gl) {
  const program = gl.createProgram();
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(info || 'Program link failed.');
  }

  return program;
}

export default function Balatro({
  spinRotation = -2.0,
  spinSpeed = 7.0,
  offset = DEFAULT_OFFSET,
  color1 = '#DE443B',
  color2 = '#006BB4',
  color3 = '#162325',
  contrast = 3.5,
  lighting = 0.4,
  spinAmount = 0.25,
  pixelFilter = 745.0,
  spinEase = 1.0,
  isRotate = false,
  mouseInteraction = true,
  style,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    container.style.background = '#000';

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    let gl;
    let program;
    let animationFrameId = 0;
    let positionBuffer;
    let uvBuffer;

    try {
      gl =
        canvas.getContext('webgl', { antialias: false, alpha: false }) ||
        canvas.getContext('experimental-webgl', { antialias: false, alpha: false });

      if (!gl) {
        throw new Error('WebGL is not supported.');
      }

      gl.clearColor(0, 0, 0, 1);
      program = createProgram(gl);

      const positionLocation = gl.getAttribLocation(program, 'position');
      const uvLocation = gl.getAttribLocation(program, 'uv');
      const uniforms = {
        iTime: gl.getUniformLocation(program, 'iTime'),
        iResolution: gl.getUniformLocation(program, 'iResolution'),
        uSpinRotation: gl.getUniformLocation(program, 'uSpinRotation'),
        uSpinSpeed: gl.getUniformLocation(program, 'uSpinSpeed'),
        uOffset: gl.getUniformLocation(program, 'uOffset'),
        uColor1: gl.getUniformLocation(program, 'uColor1'),
        uColor2: gl.getUniformLocation(program, 'uColor2'),
        uColor3: gl.getUniformLocation(program, 'uColor3'),
        uContrast: gl.getUniformLocation(program, 'uContrast'),
        uLighting: gl.getUniformLocation(program, 'uLighting'),
        uSpinAmount: gl.getUniformLocation(program, 'uSpinAmount'),
        uPixelFilter: gl.getUniformLocation(program, 'uPixelFilter'),
        uSpinEase: gl.getUniformLocation(program, 'uSpinEase'),
        uIsRotate: gl.getUniformLocation(program, 'uIsRotate'),
        uMouse: gl.getUniformLocation(program, 'uMouse'),
      };

      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
        gl.STATIC_DRAW
      );
      gl.enableVertexAttribArray(uvLocation);
      gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

      gl.useProgram(program);
      gl.uniform1f(uniforms.uSpinRotation, spinRotation);
      gl.uniform1f(uniforms.uSpinSpeed, spinSpeed);
      gl.uniform2f(uniforms.uOffset, offset[0], offset[1]);
      gl.uniform4fv(uniforms.uColor1, hexToVec4(color1));
      gl.uniform4fv(uniforms.uColor2, hexToVec4(color2));
      gl.uniform4fv(uniforms.uColor3, hexToVec4(color3));
      gl.uniform1f(uniforms.uContrast, contrast);
      gl.uniform1f(uniforms.uLighting, lighting);
      gl.uniform1f(uniforms.uSpinAmount, spinAmount);
      gl.uniform1f(uniforms.uPixelFilter, pixelFilter);
      gl.uniform1f(uniforms.uSpinEase, spinEase);
      gl.uniform1i(uniforms.uIsRotate, isRotate ? 1 : 0);
      gl.uniform2f(uniforms.uMouse, 0.5, 0.5);

      const resize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform3f(uniforms.iResolution, canvas.width, canvas.height, canvas.width / canvas.height);
      };

      const render = (time) => {
        gl.uniform1f(uniforms.iTime, time * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrameId = window.requestAnimationFrame(render);
      };

      const handleMouseMove = (event) => {
        if (!mouseInteraction) return;
        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = 1.0 - (event.clientY - rect.top) / rect.height;
        gl.uniform2f(uniforms.uMouse, x, y);
      };

      resize();
      window.addEventListener('resize', resize);
      container.addEventListener('mousemove', handleMouseMove);
      animationFrameId = window.requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', resize);
        container.removeEventListener('mousemove', handleMouseMove);
        window.cancelAnimationFrame(animationFrameId);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (uvBuffer) gl.deleteBuffer(uvBuffer);
        if (program) gl.deleteProgram(program);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        canvas.remove();
      };
    } catch {
      container.style.background =
        'linear-gradient(135deg, #7b0704 0%, #112522 52%, #040807 100%)';
      canvas.remove();
      return undefined;
    }
  }, [
    spinRotation,
    spinSpeed,
    offset,
    color1,
    color2,
    color3,
    contrast,
    lighting,
    spinAmount,
    pixelFilter,
    spinEase,
    isRotate,
    mouseInteraction,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#000',
        ...style,
      }}
    />
  );
}
