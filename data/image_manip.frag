// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform sampler2D my_mask;
uniform float blur_flag;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  // grab the color values from the texture and the mask
  vec4 diffuse_color = texture2D(my_texture, vertTexCoord.xy);
  vec4 mask_color = texture2D(my_mask, vertTexCoord.xy);

  
  // simple diffuse shading model
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);

  
  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
  float radius = 5.0;

    if (mask_color.r < 0.1) {
      radius = 6.0;
    } else if (mask_color.r <= 0.5) {
      radius = 3.0;
    } else {
      radius = 0.0;
    }

    if (radius >= 0.0) {
      float texelX = 1.0 / textureSize(my_texture, 0).x;
      float texelY = 1.0 / textureSize(my_texture, 0).y;
      float count = 0.0;

      for (float x = -radius; x <= radius; x++) {
        for (float y = -radius; y <= radius; y++) {
          vec4 s = texture2D(my_texture, vertTexCoord.xy + vec2(x * texelX, y * texelY));
          color = color + s;
          count++;
        }
      }
      color = color / count;
      
    }
    if (blur_flag == 0.0) {
      diffuse_color = color;
    }
  
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
}
