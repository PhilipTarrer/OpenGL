// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  vec4 diffuse_color = vec4(0.8471, 0.0902, 0.8745, 1.0);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);

  float zx = vertTexCoord.x * 6.28 - 3.14;
  float zy = vertTexCoord.y * 6.28 - 3.14;

  for (int i = 0; i <= 20; i++) {
    float vecx = sin(zx) * cosh(zy);
    float vecy = cos(zx) * sinh(zy);
    float x = cx * vecx - cy * vecy;
    float y = cx * vecy + cy * vecx;
    zx = x;
    zy = y;
  }
  if (zx < 50 * 50 && zy < 50 * 50) {
    diffuse_color = vec4(1.0, 1.0, 1.0, 1.0);
  }

  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);

}