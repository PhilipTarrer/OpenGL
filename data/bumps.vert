// Vertex shader
// The vertex shader is run once for every vertex
// It can change the (x,y,z) of the vertex, as well as its normal for lighting.

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;

// Come from the geometry/material of the object
//attribute vec4 position;
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;

varying float offset;  // put your surface offset amount here

void main() {
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);
  vec2 temp = vec2(vertTexCoord.xy - vec2(0.5, 0.5));
  float distance = sqrt(temp.x*temp.x + temp.y*temp.y);

  offset = (sin(distance * 50.0) + 1.0) * 0.5;
  vec4 shift = 50.0 * offset * vec4(normal.xyz, 0.0);
  
  gl_Position = transform * (vertex + shift);
}
