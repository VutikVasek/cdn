
#ifdef GL_ES
precision highp float;
#endif

// #ifdef GL_ES
// precision highp float;
// precision highp vec2;
// precision highp vec3;
// precision highp vec2;
// #endif

varying vec2 pos;
uniform float zoom;
uniform vec2 off;

uniform vec2 reSize;
uniform vec2 imSize;
uniform vec3 colors[16];

uniform float a;

uniform float x;
uniform float y;


//START help functions
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 getIndex(int id) {
  for (int i = 0; i < 16; i++)
    if (i == id) return colors[i];
}

int modulo(int x, float n) {
  return x - int(floor(float(x) / n) * n);
}

vec4 getColor(int i, float re, float im) {
  if (i == 171) return vec4(0., 0., 0., 255.);
  if (i < 2) return vec4(getIndex(1), 255.);
  else {
    float l = float(i) + 1. - log(log(re * re + im * im))/log(2.);
    vec4 c1 = vec4(getIndex(modulo(int(floor(l)), 16.) + int(int(floor(l)) == 0 ? 1 : 0)), 1.);
    //vec4 c1 = vec4(getIndex(modulo(int(floor(l)), 16.)), 1.);
    vec4 c2 = vec4(getIndex(modulo(int(ceil(l)),  16.)), 1.);
    return mix(c1, c2, fract(l));
  }
}
//END help functions



void main() {
  
  
  float re = map(pos.x, 0., 1., reSize.x, reSize.y);
  float im = map(pos.y, 0., 1., imSize.x, imSize.y);;

  float cre = re;
  float cim = im;
  
  int n = 0;
  
  for(int i = 0; i < 172; i++) {
    float zre = re * re - im * im;
    float zim = 2. * re * im;
    
    re = zre + x * cos(a);
    im = zim + y * sin(a);
    
    n = i;
    
    if(re*re + im*im > 20.) break;
    
  }
  
  
  vec4 c = getColor(n, re, im);
  
  gl_FragColor = c;
}

