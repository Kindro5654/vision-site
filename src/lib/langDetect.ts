// Автовыбор языка по устройству посетителя.
// - Русскоязычное устройство (ru, uk, be, kk в языках браузера) → русская версия, иначе → английская.
// - Ручной выбор через переключатель RU / EN запоминается и дальше важнее автоопределения.
// - Поисковых и ИИ-ботов не трогаем: каждая версия индексируется по своему адресу (hreflang).
// - Переадресация только между парными страницами и не больше одного раза за сессию.
const PAIRS: [string, string][] = [
  ['/', '/en/'],
  ['/klubnyi-dom/', '/en/clubhouse/'],
  ['/o-klube/', '/en/about/'],
];

export const LANG_DETECT_SCRIPT = `(function(){
try{
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest&&e.target.closest('[data-lang-choice]');
    if(a){try{localStorage.setItem('vc-lang',a.getAttribute('data-lang-choice'));}catch(_){}}
  },true);
  var ua=navigator.userAgent||'';
  if(/bot|crawl|spider|slurp|preview|lighthouse|headless|facebookexternalhit|yandex|google|bing|telegram|whatsapp|vkshare|skype/i.test(ua)||navigator.webdriver)return;
  var ss=null;try{ss=sessionStorage;}catch(_){}
  if(ss&&ss.getItem('vc-lang-auto'))return;
  var saved=null;try{saved=localStorage.getItem('vc-lang');}catch(_){}
  var langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'']);
  var ruLike=false;
  for(var i=0;i<langs.length;i++){if(/^(ru|uk|be|kk)\\b/i.test(String(langs[i])))ruLike=true;}
  var want=(saved==='ru'||saved==='en')?saved:(ruLike?'ru':'en');
  var pairs=${JSON.stringify(PAIRS)};
  var p=location.pathname;if(p.charAt(p.length-1)!=='/')p+='/';
  var target=null;
  for(var k=0;k<pairs.length;k++){
    if(want==='en'&&p===pairs[k][0])target=pairs[k][1];
    if(want==='ru'&&p===pairs[k][1])target=pairs[k][0];
  }
  if(ss)ss.setItem('vc-lang-auto','1');
  if(target)location.replace(target+location.search+location.hash);
}catch(_){}
})();`;
