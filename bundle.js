const validateNumber=(a,b)=>{if(!a)throw new Error("AsteriskPattern is missing");if(!b)throw new Error("Number for validation is missing");"number"==typeof b&&(b=b.toString());const c=a.replace(/\[.*?\]/,"@");let d=[];const e=/[xXnNzZ]/g,f=/[0-9]/g,g=/\[.*?\]/g,h=/[*#+]/g,j={X:"[0-9]",Z:"[1-9]",N:"[2-9]"};let k;do k=e.exec(c),k&&d.push({pattern:k[0],index:k.index-1,validate:(a,b,c)=>!!a.match(new RegExp(`^.{${b}}${j[c]}`))});while(k);let l;do l=f.exec(c),l&&d.push({pattern:l[0],index:l.index-1,validate:(a,b,c)=>parseInt(a[b])===parseInt(c)});while(l);let m;do m=g.exec(a),m&&d.push({pattern:m[0],index:m.index-1,validate:(a,b,c)=>!!a.match(new RegExp(`^.{${b}}${c}`))});while(m);let n;do n=h.exec(c),n&&d.push({pattern:n[0],index:n.index-1,validate:(a,b,c)=>a[b]===c});while(n);const o=c.lastIndexOf(".");0<o&&o===c.length-1&&d.push({pattern:".",index:o-1,validate:a=>a.length>=o});const p=c.lastIndexOf("!");return 0<p&&p===c.length-1&&d.push({pattern:"!",index:p-1,validate:a=>a.length>=p-1}),0>o&&0>p&&d.push({pattern:c.length-1,index:0,validate:a=>a.length===c.length-1}),d.sort((c,a)=>c.index-a.index).every(({pattern:a,index:c,validate:d})=>d(b,c,a))};exports.validateNumber=validateNumber;const modifyNumber=(a,{deleteFromStart:d=0,deleteFromEnd:e=0,prefix:b,suffix:c})=>`${b}${a.substring(parseInt(d),a.length-e)}${c}`;exports.parseNumber=(a,b)=>{try{if(!a)throw new Error("Number for validation is missing");if(!b)throw new Error("Information about asterisk pattern and number modification are missing");return Array.isArray(b)||(b=[b]),b.some(({pattern:b,...c})=>{const d=validateNumber(b,a);return d&&(a=modifyNumber(a,{...c})),d}),a}catch(a){throw a}};