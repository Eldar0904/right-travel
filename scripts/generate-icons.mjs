import {deflateSync} from 'node:zlib';
import {writeFileSync,mkdirSync} from 'node:fs';
const palette={bg:[23,62,53],lime:[214,236,156],white:[245,247,242]};
function crc32(buf){let crc=0xffffffff;for(const b of buf){crc^=b;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
function chunk(type,data){const name=Buffer.from(type);const size=Buffer.alloc(4);size.writeUInt32BE(data.length);const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(Buffer.concat([name,data])));return Buffer.concat([size,name,data,crc]);}
function polygon(x,y,points){let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const [xi,yi]=points[i],[xj,yj]=points[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)inside=!inside;}return inside;}
function png(size){const raw=Buffer.alloc((size*3+1)*size);for(let y=0;y<size;y++){for(let x=0;x<size;x++){const u=x/size,v=y/size,dx=u-.5,dy=v-.5,d=Math.hypot(dx,dy);let color=palette.bg;if(d>.285&&d<.305)color=palette.lime;if(polygon(u,v,[[.50,.24],[.65,.65],[.50,.57]]))color=palette.lime;if(polygon(u,v,[[.50,.24],[.35,.65],[.50,.57]]))color=palette.white;if(Math.hypot(u-.73,v-.26)<.022)color=palette.lime;const pos=y*(size*3+1)+1+x*3;raw.set(color,pos);}}const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(size,0);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=2;return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);}
mkdirSync('docs/icons',{recursive:true});
for(const [name,size]of [['apple-touch-icon',180],['icon-192',192],['icon-512',512],['icon-maskable',512]])writeFileSync(`docs/icons/${name}.png`,png(size));
console.log('Generated four PNG icons for iOS and web app installation.');
