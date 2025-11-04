// highlight current nav link
const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
document.querySelectorAll('.nav a').forEach(a=>{
  const href = a.getAttribute('href').toLowerCase();
  if (href === page) a.classList.add('active');
  if (page === 'index.html' && href === 'index.html') a.classList.add('active');
});

// optional: swap image -> short MP4 on hover (cards with data-video="path.mp4")
document.querySelectorAll('.media[data-video]').forEach(el=>{
  const img = el.querySelector('img');
  const previewSrc = el.dataset.video;
  if(!img || !previewSrc) return;
  let vid;
  function createVid(){
    const v = document.createElement('video');
    v.src = previewSrc; v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
    v.style.width='100%'; v.style.height='100%'; v.style.objectFit='cover';
    return v;
  }
  el.addEventListener('mouseenter', ()=>{
    vid = vid || createVid();
    img.replaceWith(vid);
    vid.play().catch(()=>{});
  });
  el.addEventListener('mouseleave', ()=>{
    if(vid && el.contains(vid)) vid.replaceWith(img);
  });
});
