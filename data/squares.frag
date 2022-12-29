// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  float pi = 3.1415926535897932384626433832795;
  float x = vertTexCoord.x;
  float y = vertTexCoord.y;
  float oldx = vertTexCoord.x;
  x = x * cos(pi / 4.0) - y * sin(pi / 4.0) + 0.5;
  y = oldx * sin(pi / 4.0) + y * cos(pi / 4.0) - 0.2;

  float alpha = 1.0;
  float centerX = 0.5;
  float centerY = 0.1;
  float length = 0.07;
  float count = 0.0;
  float xl = centerX;
  float xr = centerX;
  
  
  for (int i = 0; i < 5; i++) {
    float dx = abs(x - centerX);
    float dy = abs(y - centerY);

    // vertical square calc 
    if (dx < length && dy < length) {
      alpha = 0.0;
    }

    int squares = 0;
    if (i == 1 || i == 3) {
      squares = 1;
    }
    else if (i == 2) {
      squares = 2;
    }

    if (dy < length) {
      for (int p = 0; p < squares; p++) {
        xl = xl - 0.2;
        xr = xr + 0.2;
        float dxl = abs(x - xl);
        float dxr = abs(x - xr);
        if (dxl < length || dxr < length) {
          alpha = 0.0;
        }
      }
    }


    centerY += 0.2;
  }

  


  gl_FragColor = vec4(0.2, 0.4, 1.0, alpha);
}

