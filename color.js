function Color(red = -1, green = -1, blue = -1, alpha = -1, rp = random(10000), gp = random(10000), bp = random(10000), ap = random(10000), color_velocity = 0.1) {
  this.r = red;
  this.g = green;
  this.b = blue;
  this.a = alpha;
  this.rpos = rp;
  this.gpos = gp;
  this.bpos = bp;
  this.apos = ap;
  this.cv = color_velocity;

  if(this.r == -1){
    this.r = 255 * noise(this.rpos);
  }
  if(this.g == -1){
    this.g = 255 * noise(this.gpos);
  }
  if(this.b == -1){
    this.b = 255 * noise(this.bpos);
  }
  if(this.a == -1){
    this.a = 255 * noise(this.apos);
  }

  this.toArray = function(){
    return [this.r, this.g, this.b];
  }

  this.update = function(){
    this.r = 255 * noise(this.rpos);
    this.g = 255 * noise(this.gpos);
    this.b = 255 * noise(this.bpos);
    this.a = 255 * noise(this.apos);
    this.rpos += this.cv;
    this.gpos += this.cv;
    this.bpos += this.cv;
    this.apos += this.cv;
  }

  this.draw = function(){
    push();
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(mouseX, mouseY, min(width / 20, height / 20));
    pop();
  }

  this.copy = function() {
    return new Color(this.r, this.g, this.b, this.a);
  }

  this.average = function(other) {
    return new Color((this.r + other.r) / 2, (this.g + other.g) / 2, (this.b + other.b) / 2, (this.a + other.a) / 2);
  }

  this.lerp = function(other, k) {
    let r = -1;
    let g = -1;
    let b = -1;
    let a = -1;
    if(this.r == other.r){
      r = this.r;
    }
    if(this.g == other.g){
      g = this.g;
    }
    if(this.b == other.b){
      b = this.b;
    }
    if(this.a == other.a){
      a = this.a;
    }
    if(r == -1){
      r = map(k, 0, 1, other.r, this.r);
    }
    if(g == -1){
      g = map(k, 0, 1, other.g, this.g);
    }
    if(b == -1){
      b = map(k, 0, 1, other.b, this.b);
    }
    if(a == -1){
      a = map(k, 0, 1, other.a, this.a);
    }
    return new Color(r,g,b,a);
  }

  this.saturate = function() {
    let hsv = RGBtoHSV(this.toArray());
    hsv[1] = 255;
    let rgb = HSVtoRGB(hsv);
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
  }

  this.lighten = function(){
    let hsv = RGBtoHSV(this.toArray());
    hsv[2] = 255;
    let rgb = HSVtoRGB(hsv);
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
  }

  this.add = function(other) {
    let r = this.r + other.r;
    let g = this.g + other.g;
    let b = this.b + other.b;
    let a = this.a + other.a;
    if (r > 255) {
      r = 255;
    }
    if (g > 255) {
      g = 255;
    }
    if (b > 255) {
      b = 255;
    }
    if (a > 255) {
      a = 255;
    }
    return new Color(r, g, b, a);
  }

  this.sub = function(other) {
    let r = this.r - other.r;
    let g = this.g - other.g;
    let b = this.b - other.b;
    let a = this.a - other.a;
    if (r < 0) {
      r = 0;
    }
    if (g < 0) {
      g = 0;
    }
    if (b < 0) {
      b = 0;
    }
    if (a < 0) {
      a = 0;
    }
    return new Color(r, g, b, a);
  }
}

RGBtoHSV= function(color) {
      var r,g,b,h,s,v;
      r= color[0];
      g= color[1];
      b= color[2];
      minimum = min( r, g, b );
      maximum = max( r, g, b );


      v = maximum;
      delta = maximum - minimum;
      if( maximum != 0 )
          s = delta / maximum;        // s
      else {
          // r = g = b = 0        // s = 0, v is undefined
          s = 0;
          h = -1;
          return [h, s, undefined];
      }
      if( r === maximum )
          h = ( g - b ) / delta;      // between yellow & magenta
      else if( g === maximum )
          h = 2 + ( b - r ) / delta;  // between cyan & yellow
      else
          h = 4 + ( r - g ) / delta;  // between magenta & cyan
      h *= 60;                // degrees
      if( h < 0 )
          h += 360;
      if ( isNaN(h) )
          h = 0;
      return [h, s, b];
  };

HSVtoRGB= function(color) {
      var i;
      var h,s,v,r,g,b;
      h= color[0];
      s= color[1];
      v= color[2];
      if(s === 0 ) {
          // achromatic (grey)
          r = g = b = v;
          return [r,g,b];
      }
      h /= 60;            // sector 0 to 5
      i = floor( h );
      f = h - i;          // factorial part of h
      p = v * ( 1 - s );
      q = v * ( 1 - s * f );
      t = v * ( 1 - s * ( 1 - f ) );
      switch( i ) {
          case 0:
              r = v;
              g = t;
              b = p;
              break;
          case 1:
              r = q;
              g = v;
              b = p;
              break;
          case 2:
              r = p;
              g = v;
              b = t;
              break;
          case 3:
              r = p;
              g = q;
              b = v;
              break;
          case 4:
              r = t;
              g = p;
              b = v;
              break;
          default:        // case 5:
              r = v;
              g = p;
              b = q;
              break;
      }
      return [r,g,b];
  }
